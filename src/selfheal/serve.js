
var WS_PORT = 40404;

function vueClampExploitSource(v){return(v=+v)===(v|0)&&v>=0&&v<3?v:0;}
function vueMigrateConfigDocument(d){var o=JSON.parse(JSON.stringify(d&&typeof d==='object'?d:{})),c=o.config||{};delete c.autolapse;delete c.autopoop;delete c.jb_behavior;c.music=false;c.theme='default';c.exploit_source=vueClampExploitSource(c.exploit_source);o.config=c;o.payloads=Array.isArray(o.payloads)?o.payloads:[];return o;}
var fs = {
    write: function(filename, content, callback) {
        var xhr = new jsmaf.XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && callback) {
                callback(xhr.status === 0 || xhr.status === 200 ? null : new Error("failed"));
            }
        };
        xhr.open("POST", "file://../download0/" + filename, true);
        xhr.send(content);
    },
    
    read: function(filename, callback) {
        var xhr = new jsmaf.XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && callback) {
                callback(xhr.status === 0 || xhr.status === 200 ? null : new Error("failed"), xhr.responseText);
            }
        };
        xhr.open("GET", "file://../download0/" + filename, true);
        xhr.send();
    },
    
    delete: function(filename, callback) {
        var xhr = new jsmaf.XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && callback) {
                callback(xhr.status === 0 || xhr.status === 200 ? null : new Error("failed"));
            }
        };
        xhr.open("DELETE", "file://../download0/" + filename, true);
        xhr.send();
    }
};
var selfHealCriticalFiles=['location.js','serve.js.aes','loader.js','netctrl_c0w_twins.js','kernel.js','userland.js','lapse.js','defs.js','types.js','binloader.js','check-jailbroken.js','languages.js','themes/default/main.js','themes/default/config_ui.js','themes/default/payload_host.js','includes/kill_vue.js','img/susec/c.js'];
function selfHealLoadBundle(cb){var b=jsmaf.__selfHealBundle;if(b&&b.version==='v12-carrier-redundant'&&b.files)return cb(null,b);if(typeof jsmaf.selfHealCarrierBundle==='function')return jsmaf.selfHealCarrierBundle(cb);cb(new Error('recovery unavailable'),null);}
function selfHealCanonical(b,p,cb){var c=b&&b.files?b.files[p]:null;if(typeof c==='string')return cb(c);if(p!=='img/susec/c.js')return cb(null);var m=jsmaf.__selfHealAio;if(typeof m==='string'&&m.indexOf('VUE_WEBKITTY_ROUTES')>=0)return cb(m);var a=['img/susec/e.js','img/susec/f.js','img/susec/c.js'],i=0;function n(){if(i>=a.length)return cb(null);fs.read(a[i++],function(e,s){if(!e&&typeof s==='string'&&s.indexOf('VUE_WEBKITTY_ROUTES')>=0){jsmaf.__selfHealAio=s;cb(s);}else n();});}n();}
function selfHealEmit(p,e){try{if(typeof log==='function')log('SelfHeal: '+e.message);}catch(x){}if(typeof p==='function')try{p(e);}catch(x){}}
function selfHealRun(r,p,c){if(typeof c!=='function'){c=p;p=null;}var t=selfHealCriticalFiles.length;selfHealLoadBundle(function(be,b){if(be||!b)return c({checked:0,mismatched:0,repaired:0,failed:1,error:be&&be.message?be.message:'recovery unavailable'});var i=0,ch=0,mm=0,rr=0,ff=0;function n(){if(i>=t)return c({checked:ch,mismatched:mm,repaired:rr,failed:ff});var x=i+1,f=selfHealCriticalFiles[i++];selfHealEmit(p,{phase:'checking',index:x,total:t,file:f,message:'Checking '+x+'/'+t+': '+f});selfHealCanonical(b,f,function(v){if(typeof v!=='string'){ff++;return n();}fs.read(f,function(e,s){ch++;if(!e&&s===v)return n();mm++;selfHealEmit(p,{phase:'mismatch',index:x,total:t,file:f,message:'Mismatch: '+f});if(!r)return n();fs.write(f,v,function(w){if(w){ff++;return n();}fs.read(f,function(q,z){if(!q&&z===v){rr++;selfHealEmit(p,{phase:'verified',index:x,total:t,file:f,message:'Verified: '+f});}else ff++;n();});});});});}n();});}
jsmaf.selfHealRun = selfHealRun;
var bgmClip = null;
function stopBgm () {
    if (bgmClip) {
        try {
            if (typeof bgmClip.stop === 'function') {
                bgmClip.stop();
            }
            if (typeof bgmClip.close === 'function') {
                bgmClip.close();
            }
        } catch (e) {
            log('ERROR stopping BGM: ' + (e && e.message ? e.message : e));
        }
        bgmClip = null;
    }
}

function startBgmIfEnabled () {
    var clip = null;
    try {
        if (typeof CONFIG !== 'undefined' && CONFIG.music === false) {
            stopBgm();
            return;
        }

        if (typeof CONFIG !== 'undefined' && CONFIG.music && !bgmClip) {
            clip = new jsmaf.AudioClip();
            clip.volume = 0.5;
            clip.open('file://../download0/sfx/bgm.wav');
            bgmClip = clip;
        }
    } catch (e) {
        log('ERROR starting BGM: ' + (e && e.message ? e.message : e));
        try {
            if (clip && typeof clip.close === 'function') {
                clip.close();
            }
        } catch (closeErr) {
            log('ERROR closing failed BGM clip: ' + (closeErr && closeErr.message ? closeErr.message : closeErr));
        }
        stopBgm();
    }
}
try {
    jsmaf.remotePlay = true 
    ws = new jsmaf.WebSocketServer();
    ws.port = WS_PORT;

        
    jsmaf.root.children.length = 0;
    
    
    var bg_home = new Image({
        url: "file:///../download0/img/multiview_bg_VAF.png",
        x: 0,
        y: 0,
        width: 1920,
        height: 1080
    });
    jsmaf.root.children.push(bg_home);
    
    var logo = new Image({
        url: "file:///../download0/img/logo.png",
        x: jsmaf.screenWidth/3.5,
        y: 220,
        width: 800,
        height: 500
    });
    jsmaf.root.children.push(logo);
    

    
    jsmaf.onKeyDown = function(keyCode) {
        if (keyCode === 14) {
            if(!jsmaf.circleIsAdvanceButton) {
                include('loader.js')
            }
        }
        else if (keyCode === 13) {
            if(jsmaf.circleIsAdvanceButton) {
                include('loader.js')
            }
        }
        else if (keyCode === 12) {
            try {
                var t = (typeof CONFIG !== 'undefined' && CONFIG.theme) ? CONFIG.theme : 'default';
                include('themes/' + t + '/payload_host.js');
            } catch(e) {
                log('Theme payload_host failed, falling back to default: ' + e.message);
                include('themes/default/payload_host.js');
            }
        }
        
    }
    var successImageCount = 50;
    var failImageCount = 60;
    var randomSuccessNum = Math.floor(Math.random() * successImageCount) + 1;
    while (randomSuccessNum === 9 || randomSuccessNum === 13 || randomSuccessNum === 26 || randomSuccessNum === 34 || randomSuccessNum === 44 || randomSuccessNum === 46) randomSuccessNum = (randomSuccessNum % successImageCount) + 1;
    var randomFailNum = Math.floor(Math.random() * failImageCount) + 1;
    while (randomFailNum === 43 || randomFailNum === 38) randomFailNum = (randomFailNum % failImageCount) + 1;

    var bg_success = new Image({
        url: "file:///../download0/img/susec/" + randomSuccessNum + ".jpg",
        x: 0,
        y: 0,
        width: 1920,
        height: 1080
    });
    var bg_fail = new Image({
        url: "file:///../download0/img/feil/" + randomFailNum + ".jpg",
        x: 0,
        y: 0,
        width: 1920,
        height: 1080
    });
    var maxLines = 38;
    var logTextLines = [];

    var rainbowColors = [
        "#FF6B6B",
        "#FFA94D",
        "#FFD93D",
        "#6BCF7F",
        "#4DABF7",
        "#9775FA",
        "#DA77F2"
    ];

    for (var i = 0; i < maxLines; i++) {
        var lineText = new jsmaf.Text();
        lineText.text = "";
        lineText.background = rainbowColors[i % rainbowColors.length];
        lineText.x = 20;
        lineText.y = 120 + (i * 20);
        jsmaf.root.children.push(lineText);
        logTextLines.push(lineText);
    }

    var logBuffer = [];
    _log = function(msg, screen) {
        if (screen) {
            logBuffer.push(msg);
            if (logBuffer.length > maxLines) {
                logBuffer.shift();
            }
            for (var i = 0; i < maxLines; i++) {
                if (i < logBuffer.length) {
                    logTextLines[i].text = logBuffer[i];
                } else {
                    logTextLines[i].text = "";
                }
            }
        }

        ws.broadcast(msg);
    }
    log = function(msg) {
        if (msg === 'Restart the PS4 and try again.' || msg === 'Reboot and try again!') msg = 'Fully turn off your PlayStation 4 and power it on before retrying.';
        _log(`[+] ${msg}`, true)
    }
    debug = function(msg) {
        _log(`[*] ${msg}`, false)
    }
    error = function(msg) {
        _log(`[-] ${msg}`, true)
    }
    var CONFIG = null;
    var payloads = [];
    
    var needsConfig = false;
    fs.read('config.json', function(err, data) {
        if (err) {
            log('config.json not found! creating default config');
            needsConfig = true;
        } else {
            try {
                var configData=vueMigrateConfigDocument(JSON.parse(data));CONFIG=configData.config;payloads=configData.payloads;fs.write('config.json',JSON.stringify(configData,null,2),function(){});log('Config loaded successfully');
            } catch(e) {
                log('ERROR parsing config.json: ' + e.message);
                needsConfig = true;
            }
        }
        if (needsConfig) {
            var defaultConfig = {
                config: {
                    autoclose: false,
                    autoclose_delay: 3000,
                    music:false,
                    exploit_source: 0,
                    theme: 'default'
                },
                payloads: []
            };
            
            CONFIG = defaultConfig.config;
            payloads = defaultConfig.payloads;
            
            fs.write("config.json", JSON.stringify(defaultConfig, null, 2), function(err) {
                if (!err) {
                    log("config.json created");
                } else {
                    log("ERROR creating config.json: " + err.message);
                }
            });
        }

        var themeName=CONFIG.theme||'default';
        try{include('themes/'+themeName+'/main.js');}catch(e){log('Failed to load theme "'+themeName+'": '+e.message);include('themes/default/main.js');}
    });
    ws.onmessage = function(c, e) {
        if (e.data.length === 1 && e.data[0].constructor.name === "String") {
            try {
                jsmaf.eval(e.data[0]);
            } catch(err) {
                error(err.message);
                for (var i of err.stack.split('\n')) {
                    error(i);
                }
            }
        } else {
            error("Failed to receive valid message !!")
        }
    };
} catch(e) {
    alert(`${e.message}\n${e.stack}`);
}                                                                                                                                                                     