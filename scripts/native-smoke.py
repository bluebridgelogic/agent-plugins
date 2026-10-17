"""Optional native installation/update check; never uses the caller's agent profiles."""
import json, os, shutil, subprocess, tempfile
from pathlib import Path

root = Path(__file__).resolve().parents[1]
target_version = json.loads((root / "plugins/bluebridge-sites/plugin.json").read_text())["version"]
with tempfile.TemporaryDirectory(prefix="bluebridge-plugin-native-") as scratch:
    scratch = Path(scratch)
    fixture = scratch / "marketplace"
    for name in [".claude-plugin", ".agents", "plugins"]:
        shutil.copytree(root / name, fixture / name)
    def version(value):
        for name in ["plugins/bluebridge-sites/plugin.json", "plugins/bluebridge-sites/.claude-plugin/plugin.json"]:
            path = fixture / name
            data = json.loads(path.read_text()); data["version"] = value
            path.write_text(json.dumps(data))
        path = fixture / ".claude-plugin/marketplace.json"
        data = json.loads(path.read_text()); data["plugins"][0]["version"] = value
        path.write_text(json.dumps(data))
    def run(agent, *args):
        env = os.environ.copy()
        key = "CLAUDE_CONFIG_DIR" if agent == "claude" else "CODEX_HOME"
        env[key] = str(scratch / agent)
        Path(env[key]).mkdir(exist_ok=True)
        result = subprocess.run([agent, *args], env=env, text=True, capture_output=True, timeout=90)
        if result.returncode:
            raise RuntimeError(f"{agent} {' '.join(args)}: {result.stdout} {result.stderr}")
        return result.stdout
    version("0.1.99") # Private fixture; never a published version.
    for agent in ["claude", "codex"]:
        run(agent, "plugin", "marketplace", "add", str(fixture))
        run(agent, "plugin", "install" if agent == "claude" else "add", "bluebridge-sites@bluebridge")
        installed = json.loads(run(agent, "plugin", "list", "--json"))
        if agent == "codex": installed = installed["installed"]
        assert installed[0]["version"] == "0.1.99"
    version(target_version)
    run("claude", "plugin", "marketplace", "update", "bluebridge")
    run("claude", "plugin", "update", "bluebridge-sites@bluebridge")
    # Codex's current CLI refreshes installed content via add; local catalogs read directly.
    run("codex", "plugin", "add", "bluebridge-sites@bluebridge")
    for agent in ["claude", "codex"]:
        installed = json.loads(run(agent, "plugin", "list", "--json"))
        if agent == "codex": installed = installed["installed"]
        assert installed[0]["version"] == target_version, installed
        cache = scratch / agent / "plugins/cache/bluebridge/bluebridge-sites" / target_version
        expected_names = {"bluebridge-connect", "bluebridge-marketing-plan", "bluebridge-content-plan", "bluebridge-website", "bluebridge-results"}
        assert {path.parent.name for path in (cache / "skills").glob("*/SKILL.md")} == expected_names
        print(f"PASS: {agent} isolated install and version update; five product-prefixed cached skills.")
