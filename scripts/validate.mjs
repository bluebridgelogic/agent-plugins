import {spawnSync} from 'node:child_process';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {dirname,join,resolve} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const scripts=dirname(fileURLToPath(import.meta.url));
export function assertCleanReport(report) {
  if(report.success!==true||report.strict!==true)throw new Error('Strict Claude validation did not succeed');
  const inspect=value=>{
    if(!value||typeof value!=='object')return;
    for(const [key,item] of Object.entries(value)) {
      if((key==='warnings'||key==='errors')&&Array.isArray(item)&&item.length)throw new Error('Claude validation returned '+key);
      inspect(item);
    }
  };
  inspect(report);
}
export async function validate(root=process.cwd()) {
  const cliPackage=JSON.parse(await readFile(join(scripts,'../node_modules/@anthropic-ai/claude-code/package.json'),'utf8'));
  const project=JSON.parse(await readFile(join(root,'package.json'),'utf8'));
  if(cliPackage.version!==project.devDependencies['@anthropic-ai/claude-code'])throw new Error('Install the pinned validator with npm ci');
  const cli=join(scripts,'../node_modules/@anthropic-ai/claude-code',cliPackage.bin.claude);
  const scratch=await mkdtemp(join(tmpdir(),'bluebridge-validation-'));
  const env={...process.env,CLAUDE_CONFIG_DIR:join(scratch,'claude'),DISABLE_TELEMETRY:'1',DISABLE_AUTOUPDATER:'1'};
  const run=(command,args)=>{
    const result=spawnSync(command,args,{cwd:root,env,encoding:'utf8',timeout:120000,maxBuffer:8*1024*1024});
    if(result.error)throw result.error;
    if(result.status!==0)throw new Error(result.stderr||result.stdout||'Validation command failed');
    return result.stdout;
  };
  try {
    // The source checks also reject the icon field observed to be stripped by the account importer.
    process.stdout.write(run(process.execPath,[join(scripts,'verify.mjs')]));
    for(const target of ['plugins/bluebridge-sites','.claude-plugin/marketplace.json']) {
      assertCleanReport(JSON.parse(run(cli,['plugin','validate',target,'--strict','--json'])));
      console.log('PASS: strict Claude '+target+' (CLI '+cliPackage.version+')');
    }
    process.stdout.write(run(process.execPath,[join(scripts,'package.mjs')]));
    console.log('Account importer: NOT RUN (requires separate authorized account/API validation).');
  } finally {await rm(scratch,{recursive:true,force:true});}
}
if(import.meta.url===pathToFileURL(resolve(process.argv[1]||'')).href) {
  try{await validate();}catch(error){console.error(error.message);process.exitCode=1;}
}
