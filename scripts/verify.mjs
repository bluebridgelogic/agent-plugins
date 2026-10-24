import assert from 'node:assert/strict';
import Ajv2020 from 'ajv/dist/2020.js';
import {readFile,mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {unzipSync} from 'fflate';
import {collect,packageRelease,digest} from './package.mjs';
const json=async path=>JSON.parse(await readFile(path,'utf8'));
const root='plugins/bluebridge-sites';
const portable=await json(root+'/plugin.json'),claude=await json(root+'/.claude-plugin/plugin.json');
const ajv=new Ajv2020();
for(const name of ['plugin','mcp']) {
 const validate=ajv.compile(await json(`schemas/${name}.schema.json`));
 assert.ok(validate(await json(`${root}/${name}.json`)),JSON.stringify(validate.errors));
}
assert.equal(portable.name,claude.name);assert.equal(portable.version,claude.version);
const listing=portable.extensions['com.openai'].interface;
assert.ok(listing.shortDescription.length<=30,'OpenAI listing subtitle is limited to 30 characters');
assert.equal(claude.displayName,listing.displayName);
assert.ok(!Object.hasOwn(claude,'icon'),'Claude account marketplace rejects the top-level icon field');
assert.equal(listing.logo,listing.composerIcon);
assert.ok(listing.longDescription.length>0 && listing.longDescription.length<=4000);
assert.match(portable.version,/^\d+\.\d+\.\d+$/);
const files=await collect(root);
assert.match(listing.logo,/^\.\/assets\/[a-z-]+\.png$/);
const icon=files[listing.logo.slice(2)];
assert.ok(icon,'Referenced icon must be packaged');
assert.equal(icon.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
assert.equal(icon.readUInt32BE(16),icon.readUInt32BE(20),'Plugin icon must be square');
assert.ok(icon.readUInt32BE(16)>0);

const skillNames=['bluebridge-connect','bluebridge-marketing-plan','bluebridge-content-plan','bluebridge-website','bluebridge-results'];
for(const name of skillNames){
 assert.ok(files[`skills/${name}/SKILL.md`]);
 assert.ok(files[`skills/${name}/references/access.md`]);
 assert.match(files[`skills/${name}/SKILL.md`].toString(),new RegExp('name: '+name+'\\n'));
}
assert.ok(files[portable.extensions['com.openai'].onboardingSkill.slice(2)]);
for(const name of Object.keys(files))assert.ok(['README.md','LICENSE','assets/icon.png','plugin.json','mcp.json','.mcp.json','.claude-plugin/plugin.json'].includes(name)||/^skills\/[a-z-]+\/(SKILL.md|references\/(access|local-workspaces).md)$/.test(name),'Unexpected packaged file '+name);
for(const name of ['mcp.json','.mcp.json']){
 const config=JSON.parse(files[name]);const server=config.mcpServers['bluebridge-sites'];
 assert.equal(server.url,'https://manage.bluebridgelogic.com/mcp');
 assert.deepEqual(Object.keys(server).sort(),['type','url']);
}
const marketplace=await json('.claude-plugin/marketplace.json');
assert.equal(marketplace.plugins[0].version,portable.version);
assert.equal(marketplace.plugins[0].source,'./'+root);
assert.equal((await json('.agents/plugins/marketplace.json')).plugins[0].source.path,'./'+root);
const temp=await mkdtemp(join(tmpdir(),'bluebridge-package-'));
try{
 const first=await packageRelease(process.cwd(),temp),second=await packageRelease(process.cwd(),temp);
 assert.deepEqual(first,second,'Release archives must be reproducible');
 for(const [name,hash]of Object.entries(first.hashes)){
  const bytes=await readFile(join(temp,name));assert.equal(digest(bytes),hash);
  const entries=unzipSync(bytes);
  assert.ok(Object.keys(entries).every(path=>!path.includes('..')&&!path.includes('node_modules')&&!path.includes('.git/')));
  const base=name.startsWith('bluebridge-sites-')?'bluebridge-sites/':'bluebridge-plugins/plugins/bluebridge-sites/';
  for(const [path,content]of Object.entries(files))assert.deepEqual(Buffer.from(entries[base+path]),content,'Archive/source disagreement '+path);
 }
}finally{await rm(temp,{recursive:true,force:true});}
console.log('PASS: five skills, manifest/catalog consistency, onboarding target, connector boundaries, source inventory and reproducible archive integrity.');
