import {readFile,readdir,lstat,mkdir,writeFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {zipSync} from 'fflate';
import {pathToFileURL} from 'node:url';
export const digest = bytes => createHash('sha256').update(bytes).digest('hex');
export async function collect(root,prefix='') {
 const result={};
 for(const entry of (await readdir(root)).sort()) {
  const path=join(root,entry),name=prefix+entry,stat=await lstat(path);
  if(stat.isSymbolicLink())throw new Error('Release inputs cannot contain symlinks');
  if(stat.isDirectory())Object.assign(result,await collect(path,name+'/'));
  else if(stat.isFile())result[name]=await readFile(path);
  else throw new Error('Unsupported release input');
 }
 return result;
}
export function archive(files,prefix) {
 return zipSync(Object.fromEntries(Object.entries(files).sort(([a],[b])=>a.localeCompare(b)).map(([name,bytes])=>[prefix+'/'+name,[bytes,{mtime:new Date(2000,0,1,12)}]])),{level:6});
}
export async function packageRelease(root=process.cwd(),output=join(root,'.artifacts')) {
 const files=await collect(join(root,'plugins/bluebridge-sites'));
 const {version}=JSON.parse(files['plugin.json']);
 const pluginName=`bluebridge-sites-${version}.zip`,marketplaceName=`bluebridge-marketplace-${version}.zip`;
 const catalogFiles={};
 for(const name of ['.claude-plugin/marketplace.json','.agents/plugins/marketplace.json','README.md','LICENSE'])catalogFiles[name]=await readFile(join(root,name));
 for(const [name,bytes] of Object.entries(files))catalogFiles['plugins/bluebridge-sites/'+name]=bytes;
 const bundles={[pluginName]:archive(files,'bluebridge-sites'),[marketplaceName]:archive(catalogFiles,'bluebridge-plugins')};
 await mkdir(output,{recursive:true});
 const hashes={};
 for(const [name,bytes]of Object.entries(bundles)){await writeFile(join(output,name),bytes);hashes[name]=digest(bytes);}
 await writeFile(join(output,'SHA256SUMS'),Object.entries(hashes).map(([name,hash])=>`${hash}  ${name}`).join('\n')+'\n');
 await writeFile(join(output,'release.json'),JSON.stringify({version,stage:'candidate',serverURL:'https://manage.bluebridgelogic.com/mcp',files:hashes,actualAppInstallationVerified:false},null,2)+'\n');
 return {version,hashes};
}
if(import.meta.url===pathToFileURL(resolve(process.argv[1]||'')).href)console.log(JSON.stringify(await packageRelease(),null,2));
