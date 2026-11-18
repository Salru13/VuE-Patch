if(jsmaf.loader_has_run)throw new Error('loader already ran');jsmaf.loader_has_run=true;

if (typeof libc_addr === 'undefined') {
  include('userland.js');
}
include('binloader.js');
include('lapse.js');
include('kernel.js');
include('check-jailbroken.js');
function vuePatchCredit(){var t=new jsmaf.Text();t.text='Patched by XxXJoker13XxX';t.x=815;t.y=1040;t.style='white';jsmaf.root.children.push(t);}
function show_success(immediate) {
  if (immediate) {
    jsmaf.root.children.push(bg_success);vuePatchCredit();
    log('Showing Success Image...');
  } else {
    setTimeout(() => {
      jsmaf.root.children.push(bg_success);vuePatchCredit();
      log('Showing Success Image...');
    }, 2000);
  }
}
if (typeof startBgmIfEnabled === 'function') {
  startBgmIfEnabled();
}
var is_jailbroken = checkJailbroken();
var themeFolder = typeof CONFIG !== 'undefined' && typeof CONFIG.theme === 'string' ? CONFIG.theme : 'default';
function start_netctrl_readiness() {
  jsmaf.defer_netctrl_start=true;
  include('netctrl_c0w_twins.js');
  if(typeof setup_log_screen==='function'){var oldLogScreen=setup_log_screen;setup_log_screen=function(){oldLogScreen();vuePatchCredit();};setup_log_screen();}
  var readinessLast=Date.now(),readinessGood=0,readinessTimer=null;
  log('NetCtrl stabilization: monitoring...');
  readinessTimer=jsmaf.setInterval(function(){
    var n=Date.now(),d=n-readinessLast;
    readinessLast=n;
    if(d>=850&&d<=1250)readinessGood=Math.min(readinessGood+1,16);else readinessGood=0;
    if(readinessGood>=12){
      jsmaf.clearInterval(readinessTimer);
      readinessTimer=null;
      log('NetCtrl stabilization: ready');
      log('NetCtrl starting in 3 seconds...');
      jsmaf.setTimeout(function(){
        jsmaf.defer_netctrl_start=false;
        netctrl_exploit();
      },3000);
    }
  },1000);
}

function is_exploit_complete() {
  fn.register(24, 'getuid', [], 'bigint');
  fn.register(585, 'is_in_sandbox', [], 'bigint');
  try {
    var uid = fn.getuid();
    var sandbox = fn.is_in_sandbox();
    if (!uid.eq(0) || !sandbox.eq(0)) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
}
function write64(addr, val) {
  mem.view(addr).setBigInt(0, new BigInt(val), true);
}
function read8(addr) {
  return mem.view(addr).getUint8(0);
}
function malloc(size) {
  return mem.malloc(size);
}
function get_fwversion() {
  var buf = malloc(0x8);
  var size = malloc(0x8);
  write64(size, 0x8);
  if (sysctlbyname('kern.sdk_version', buf, size, 0, 0)) {

    var version = byte2.toString(16) + '.' + byte1.toString(16).padStart(2, '0');
    return version;
  }
  return null;
}
var FW_VERSION = get_fwversion();
if (FW_VERSION === null) {
  log('ERROR: Failed to determine FW version');
  throw new Error('Failed to determine FW version');
}
function vueVersionCompare(a,b){a=String(a).split('.');b=String(b).split('.');return +a[0]===+b[0]?+(a[1]||0)-+(b[1]||0):+a[0]-+b[0];}
function vueVersionInRange(f,l,h){return vueVersionCompare(f,l)>=0&&vueVersionCompare(f,h)<=0;}
function vueNativeSupports(m,f){return m==='lapse'?vueVersionInRange(f,'7.00','12.02'):m==='netctrl'?(vueVersionInRange(f,'9.00','11.02')||vueVersionInRange(f,'12.50','13.00')):false;}
function vueWebSupports(m,f){return m==='aio-relapse'&&vueVersionInRange(f,'13.02','13.52');}
function vueWebRouteReady(m,f){return vueWebSupports(m,f);}
function vueAutoMethod(f){return vueVersionInRange(f,'13.02','13.52')?'aio-relapse':vueVersionInRange(f,'7.00','12.02')?'lapse':vueVersionInRange(f,'12.50','13.00')?'netctrl':null;}
function vueResolveExploitRoute(f,s){s=+s;if(s!==(s|0)||s<0||s>2)s=0;var m=vueAutoMethod(f);if(!m)return{method:null,source:'none',route:'none',fallback:false,supported:false,reason:'unsupported-firmware'};var v=vueNativeSupports(m,f),w=vueWebRouteReady(m,f);function r(x,y,z){return{method:m,source:x,route:m,fallback:y,supported:true,reason:z};}if(s===1){if(v)return r('vue',false,'preferred-vue');if(f==='13.02'||f==='13.04')return{method:m,source:'none',route:m,fallback:false,supported:false,reason:'vue-unsupported'};if(w)return r('web',true,'vue-unavailable');}else if(s===2){if(m==='lapse'&&!w)return{method:m,source:'web',supported:false,reason:'web-unsupported'};if(w)return r('web',false,'preferred-web');if(v)return r('vue',true,'web-unavailable');}else{if(v)return r('vue',false,'auto-preferred-vue');if(w)return r('web',false,'auto-preferred-web');}return{method:m,source:'none',route:m,fallback:false,supported:false,reason:'route-unavailable'};}
function vueRunJbRoute(r,f){if(!r||!r.supported){var m=r&&r.method?r.method:'Auto Detect';if(r&&(r.reason==='vue-unsupported'||r.reason==='web-unsupported')){var w=r.source==='web',q='KEX Source '+(w?'WEB':'VUE')+' not supported on FW '+f+'. Use AUTO or '+(w?'VUE':'WEB')+'.';if(typeof utils!=='undefined'&&utils.notify)utils.notify(q);jsmaf.loader_has_run=false;try{include('themes/'+themeFolder+'/main.js');}catch(e){}return false;}log('ERROR: JB method '+m+' unsupported on '+f);if(typeof utils!=='undefined'&&utils.notify)utils.notify(m+' unsupported on '+f);return false;}if(r.source==='web'){if(r.method!=='aio-relapse')throw new Error('WEB route unavailable');include('img/susec/c.js');if(typeof vueLocalhostGlobalEntry!=='function')throw new Error('AIO carrier entry missing');vueLocalhostGlobalEntry(f,'aio-relapse');return true;}if(r.method==='lapse'){lapse();return true;}if(r.method==='netctrl'){start_netctrl_readiness();return true;}return false;}

if (!is_jailbroken) {
  utils.notify(FW_VERSION+' Detected!');
  var selected_jb_route=vueResolveExploitRoute(FW_VERSION,0);
  var sourceLabel=selected_jb_route.source==='vue'?'VuE':selected_jb_route.source==='web'?'Web':'None';
  log('JB Route: method='+(selected_jb_route.method||'none')+' source='+sourceLabel+(selected_jb_route.fallback?' (fallback)':''));
  var route_started=vueRunJbRoute(selected_jb_route,FW_VERSION);
  var use_lapse=route_started&&selected_jb_route.source==='vue'&&selected_jb_route.method==='lapse';

  if (use_lapse) {
    var start_time = Date.now();
    var max_wait_seconds = 5;
    var max_wait_ms = max_wait_seconds * 1000;
    while (!is_exploit_complete()) {
      var elapsed = Date.now() - start_time;
      if (elapsed > max_wait_ms) {
        log('ERROR: Timeout waiting for exploit to complete (' + max_wait_seconds + ' seconds)');
        throw new Error('Lapse failed! restart and try again...');
      }
      var poll_start = Date.now();
      while (Date.now() - poll_start < 500) {}
    }
    var total_wait = ((Date.now() - start_time) / 1000).toFixed(1);
    log('Exploit completed successfully after ' + total_wait + ' seconds');
    log('Initializing binloader...');
    try {
      binloader_init();
      log('Binloader initialized and running!');
      if(typeof utils!=='undefined'&&typeof utils.notify==='function')utils.notify('XxXJokerXxX wishes you a good time!');
    } catch (e) {
      log('ERROR: Failed to initialize binloader');
      log('Error message: ' + e.message);
      log('Error name: ' + e.name);
      if (e.stack) log('Stack trace: ' + e.stack);
      throw e;
    }
  }
} else {
  utils.notify('Already Jailbroken!');
  try {
    include('themes/' + themeFolder + '/main.js');
  } catch (e) {/* escaped sandbox */}
}
function run_binloader() {
  log('Initializing binloader...');
  try {
    binloader_init();
    log('Binloader initialized and running!');
  } catch (e) {
    log('ERROR: Failed to initialize binloader');
    log('Error message: ' + e.message);
    log('Error name: ' + e.name);
    if (e.stack) {
      log('Stack trace: ' + e.stack);
    }
    throw e;
  }
}                                           