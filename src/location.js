(function(){
var s={debugScripts:false,loading:false};
Object.defineProperty(s,"requiresPsn",{get:function(){return false;},set:function(v){},enumerable:true,configurable:false});
function load(){
 if(s.loading)return;s.loading=true;
 var x=new jsmaf.XMLHttpRequest();
 x.onreadystatechange=function(){
  if(x.readyState!==4)return;
  x.onreadystatechange=null;
  if(x.status===0||(x.status>=200&&x.status<300)){
   try{(0,eval)(x.responseText||x.response||"");}
   catch(e){s.loading=false;throw e;}
  }else{s.loading=false;throw new Error("offline Vue loader failed: "+x.status);}
 };
 x.open("GET","file://../download0/serve.js.aes",true);x.send();
}
Object.defineProperty(jsmaf,"location",{
 get:function(){return s;},
 set:function(v){load();},
 enumerable:true,configurable:true
});
jsmaf.selfHealCarrierBundle=function(cb){var a=['img/susec/e.js','img/susec/f.js','img/susec/c.js'],i=0;function p(s){try{var k='jsmaf.__selfHealBundle=',j=s.indexOf(k);if(j<0)return null;j+=k.length;var q=false,e=false,d=0,b=j;for(;j<s.length;j++){var c=s.charAt(j);if(q){if(e)e=false;else if(c==='\\')e=true;else if(c==='"')q=false;}else if(c==='"')q=true;else if(c==='{'){if(!d)b=j;d++;}else if(c==='}'&&!--d){var o=JSON.parse(s.substring(b,j+1));return o&&o.version==='v12-carrier-redundant'&&o.files?o:null;}}}catch(x){}return null;}function n(){if(i>=a.length)return cb(new Error('recovery unavailable'),null);fs.read(a[i++],function(e,s){var b=!e&&s?p(s):null;if(b){jsmaf.__selfHealBundle=b;cb(null,b);}else n();});}n();};
})();
