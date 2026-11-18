const fsNode=require('fs'),vm=require('vm');
const root=require('path').resolve(__dirname,'..');
const serve=fsNode.readFileSync(root+'/src/selfheal/serve.js','utf8');
const mods={
 'img/susec/a.js': root+'/generated/recovery-a.js',
 'img/feil/b.js': root+'/generated/recovery-b.js',
 'img/susec/c.js': root+'/generated/recovery-c.js'
};
const start=serve.indexOf('var selfHealCriticalFiles=');
const end=serve.indexOf('jsmaf.selfHealRun = selfHealRun;')+'jsmaf.selfHealRun = selfHealRun;'.length;
if(start<0||end<0) throw new Error('selfheal section missing');
const section=serve.slice(start,end);
function readBundle(){
 const s=fsNode.readFileSync(root+'/generated/recovery-a.js','utf8');
 const c={jsmaf:{},JSON};vm.createContext(c);vm.runInContext(s,c);return c.jsmaf.__selfHealBundle;
}
function runCase(initial,repair,brokenModules=[]){
 const files={...initial},writes=[],loads=[];
 const ctx={jsmaf:{},log(){},JSON,fs:{
  read:(n,cb)=>Object.prototype.hasOwnProperty.call(files,n)?cb(null,files[n]):cb(new Error('missing'),null),
  write:(n,d,cb)=>{writes.push(n);files[n]=d;cb(null);}
 }};
 ctx.include=(name)=>{
   loads.push(name);
   if(brokenModules.includes(name)) throw new Error('simulated module failure '+name);
   const p=mods[name]; if(!p) throw new Error('unexpected include '+name);
   vm.runInContext(fsNode.readFileSync(p,'utf8'),ctx);
 };
 vm.createContext(ctx);vm.runInContext(section,ctx);
 return new Promise(resolve=>ctx.jsmaf.selfHealRun(repair,()=>{},r=>resolve({r,writes,files,loads})));
}
(async()=>{
 const b=readBundle(); if(!b||b.version!=='v8-external-recovery') throw new Error('bundle version');
 const canonical=b.files;if(Object.keys(canonical).length!==16) throw new Error('canonical count');
 let x=await runCase(canonical,false);
 if(!(x.r.checked===16&&x.r.mismatched===0&&x.r.failed===0)) throw new Error('healthy '+JSON.stringify(x.r));
 if(JSON.stringify(x.loads)!==JSON.stringify(['img/susec/a.js'])) throw new Error('primary load '+JSON.stringify(x.loads));
 x=await runCase(canonical,false,['img/susec/a.js']);
 if(!(x.r.checked===16&&x.r.mismatched===0&&x.r.failed===0)) throw new Error('fallback B');
 if(JSON.stringify(x.loads)!==JSON.stringify(['img/susec/a.js','img/feil/b.js'])) throw new Error('fallback B loads '+JSON.stringify(x.loads));
 x=await runCase(canonical,false,['img/susec/a.js','img/feil/b.js']);
 if(!(x.r.checked===16&&x.r.mismatched===0&&x.r.failed===0)) throw new Error('fallback C');
 if(JSON.stringify(x.loads)!==JSON.stringify(['img/susec/a.js','img/feil/b.js','img/susec/c.js'])) throw new Error('fallback C loads '+JSON.stringify(x.loads));
 const panic={...canonical};delete panic['netctrl_c0w_twins.js'];panic['themes/default/payload_host.js']='';
 x=await runCase(panic,false);
 if(!(x.r.checked===16&&x.r.mismatched===2&&x.r.failed===0)) throw new Error('panic check '+JSON.stringify(x.r));
 x=await runCase(panic,true);
 if(!(x.r.checked===16&&x.r.mismatched===2&&x.r.repaired===2&&x.r.failed===0)) throw new Error('repair '+JSON.stringify(x.r));
 if(JSON.stringify(x.writes)!==JSON.stringify(['netctrl_c0w_twins.js','themes/default/payload_host.js'])) throw new Error('writes '+JSON.stringify(x.writes));
 const post=await runCase(x.files,false);
 if(!(post.r.checked===16&&post.r.mismatched===0&&post.r.failed===0)) throw new Error('post '+JSON.stringify(post.r));
 x=await runCase(canonical,false,['img/susec/a.js','img/feil/b.js','img/susec/c.js']);
 if(!(x.r.checked===0&&x.r.failed===1)) throw new Error('all recovery fail '+JSON.stringify(x.r));
 console.log('SELFHEAL_ENGINE_V8=PASS');
 console.log('primary=A fallback=B fallback2=C');
 console.log('healthy=16/16');
 console.log('panic=14/16,2-mismatch');
 console.log('repair=2-writes');
 console.log('post=16/16');
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
