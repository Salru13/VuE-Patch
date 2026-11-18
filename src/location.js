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
})();
