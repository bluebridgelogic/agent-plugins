import {spawnSync} from 'node:child_process';
import {mkdtemp,rm,symlink} from 'node:fs/promises';
import {readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {validate} from './validate.mjs';

const root=dirname(dirname(fileURLToPath(import.meta.url)));
const run=(cmd,args,options={})=>{
  const result=spawnSync(cmd,args,{cwd:root,encoding:'utf8',...options});
  if(result.error||result.status!==0)throw result.error||new Error(result.stderr||'Pre-push snapshot failed');
  return result.stdout;
};
try {
  const lines=readFileSync(0,'utf8').trim().split('\n').filter(Boolean),seen=new Set();
  for(const line of lines) {
    const [localRef,sha,remoteRef]=line.split(/\s+/);
    if(/^0+$/.test(sha))continue;
    if(remoteRef==='refs/heads/main')throw new Error('Push a review branch and merge a checked PR; direct pushes to main are blocked by this hook.');
    const commit=run('git',['rev-parse','--verify',sha+'^{commit}']).trim();
    if(seen.has(commit))continue;seen.add(commit);
    const scratch=await mkdtemp(join(tmpdir(),'bluebridge-prepush-'));
    try {
      const archive=run('git',['archive','--format=tar',commit],{encoding:null,maxBuffer:32*1024*1024});
      run('tar',['-xf','-','-C',scratch],{input:archive});
      await symlink(join(root,'node_modules'),join(scratch,'node_modules'),'dir');
      console.log('Validating outgoing '+localRef+' at '+commit);
      await validate(scratch);
    }finally{await rm(scratch,{recursive:true,force:true});}
  }
}catch(error){console.error(error.message);process.exitCode=1;}
