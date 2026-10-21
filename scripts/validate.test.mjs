import {test} from 'node:test';
import assert from 'node:assert/strict';
import {assertCleanReport} from './validate.mjs';
import {cp,mkdtemp,readFile,rm,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';

test('warnings fail even when a validator reports success',()=>{
  assert.throws(()=>assertCleanReport({success:true,strict:true,manifest:{warnings:['unknown field']}}));
  assert.throws(()=>assertCleanReport({success:true,strict:true,contents:[{errors:['missing skill']}]}));
  assert.throws(()=>assertCleanReport({success:true,strict:false}));
  assert.doesNotThrow(()=>assertCleanReport({success:true,strict:true,manifest:{errors:[],warnings:[]},contents:[]}));
});

test('real validator rejects warnings and package checks reject importer icon and missing references',async()=>{
  const scratch=await mkdtemp(join(tmpdir(),'bluebridge-negative-'));
  try {
    for(const path of ['plugins','.claude-plugin','.agents','schemas','README.md','LICENSE'])await cp(path,join(scratch,path),{recursive:true});
    const manifest=join(scratch,'plugins/bluebridge-sites/.claude-plugin/plugin.json');
    const original=await readFile(manifest,'utf8');
    const changed=JSON.parse(original);changed.icon='./assets/icon.png';
    await writeFile(manifest,JSON.stringify(changed));
    const verify=()=>spawnSync(process.execPath,[resolve('scripts/verify.mjs')],{cwd:scratch,encoding:'utf8'});
    const icon=verify();assert.notEqual(icon.status,0);assert.match(icon.stderr,/icon field/);
    const pkg=JSON.parse(await readFile('node_modules/@anthropic-ai/claude-code/package.json','utf8'));
    const cli=resolve('node_modules/@anthropic-ai/claude-code',pkg.bin.claude);
    const unknown=JSON.parse(original);unknown.unrecognizedValidationFixture=true;
    await writeFile(manifest,JSON.stringify(unknown));
    const result=spawnSync(cli,['plugin','validate',manifest,'--strict','--json'],{cwd:scratch,encoding:'utf8',timeout:60000,env:{...process.env,CLAUDE_CONFIG_DIR:join(scratch,'isolated-config'),DISABLE_TELEMETRY:'1'}});
    assert.equal(result.status,1,result.stderr);assert.throws(()=>assertCleanReport(JSON.parse(result.stdout)));
    await writeFile(manifest,original);
    await rm(join(scratch,'plugins/bluebridge-sites/skills/bluebridge-website/references/access.md'));
    assert.notEqual(verify().status,0,'Missing skill reference must fail');
  }finally{await rm(scratch,{recursive:true,force:true});}
});
