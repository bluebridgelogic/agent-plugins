import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
const git=args=>spawnSync('git',args,{encoding:'utf8'});
const setting=git(['config','--get','core.hooksPath']);
if(setting.status!==0&&setting.status!==1)throw new Error(setting.stderr);
if(setting.stdout.trim()&&setting.stdout.trim()!=='.githooks')throw new Error('An existing hooksPath is configured; integrate the validation hook manually.');
if(!setting.stdout.trim()) {
  const location=git(['rev-parse','--git-path','hooks/pre-push']);
  if(location.status!==0)throw new Error(location.stderr);
  if(existsSync(location.stdout.trim()))throw new Error('An existing pre-push hook is installed; integrate validation manually.');
}
const result=git(['config','--local','core.hooksPath','.githooks']);
if(result.status!==0)throw new Error(result.stderr);
console.log('Enabled repository-local validation hook. No global Git configuration was changed.');
