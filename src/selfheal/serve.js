
var WS_PORT = 40404;

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


var selfHealCriticalFiles=['location.js','serve.js.aes','loader.js','netctrl_c0w_twins.js','kernel.js','userland.js','lapse.js','defs.js','types.js','binloader.js','check-jailbroken.js','languages.js','themes/default/main.js','themes/default/config_ui.js','themes/default/payload_host.js','includes/kill_vue.js'];
function selfHealLoadBundle(cb){if(jsmaf.__selfHealBundle&&jsmaf.__selfHealBundle.files){cb(null,jsmaf.__selfHealBundle);return;}var mods=['img/susec/a.js','img/feil/b.js','img/susec/c.js'],i=0,last=null;function next(){if(i>=mods.length){cb(last||new Error('recovery modules unavailable'),null);return;}var p=mods[i++];jsmaf.__selfHealBundle=null;try{include(p);}catch(e){last=e;next();return;}var b=jsmaf.__selfHealBundle;if(b&&b.files){cb(null,b);return;}last=new Error('invalid recovery module: '+p);next();}next();}
function selfHealEmit(progress,evt){try{if(typeof log==='function')log('SelfHeal: '+evt.message);}catch(le){}if(typeof progress==='function'){try{progress(evt);}catch(pe){}}}
function selfHealRun(repair,progress,cb){if(typeof cb!=='function'){cb=progress;progress=null;}var total=selfHealCriticalFiles.length;selfHealEmit(progress,{phase:'bundle',index:0,total:total,file:'',message:'Loading recovery bundle'});selfHealLoadBundle(function(be,b){if(be||!b){var em=be&&be.message?be.message:'recovery bundle unavailable';selfHealEmit(progress,{phase:'error',index:0,total:total,file:'',message:'Bundle error: '+em});cb({checked:0,mismatched:0,repaired:0,failed:1,error:em});return;}var i=0,checked=0,mismatched=0,repaired=0,failed=0;function next(){if(i>=total){selfHealEmit(progress,{phase:'done',index:total,total:total,file:'',message:'Done '+checked+'/'+total+' mismatch='+mismatched+' repaired='+repaired+' failed='+failed});cb({checked:checked,mismatched:mismatched,repaired:repaired,failed:failed});return;}var idx=i+1,p=selfHealCriticalFiles[i++],canonical=b.files[p];selfHealEmit(progress,{phase:'checking',index:idx,total:total,file:p,message:'Checking '+idx+'/'+total+': '+p});if(typeof canonical!=='string'){failed++;selfHealEmit(progress,{phase:'error',index:idx,total:total,file:p,message:'No recovery copy: '+p});next();return;}fs.read(p,function(re,current){checked++;if(!re&&current===canonical){next();return;}mismatched++;selfHealEmit(progress,{phase:'mismatch',index:idx,total:total,file:p,message:'Mismatch: '+p});if(!repair){next();return;}selfHealEmit(progress,{phase:'repairing',index:idx,total:total,file:p,message:'Repairing: '+p});fs.write(p,canonical,function(we){if(we){failed++;selfHealEmit(progress,{phase:'error',index:idx,total:total,file:p,message:'Write failed: '+p});next();return;}fs.read(p,function(ve,vd){if(!ve&&vd===canonical){repaired++;selfHealEmit(progress,{phase:'verified',index:idx,total:total,file:p,message:'Verified: '+p});}else{failed++;selfHealEmit(progress,{phase:'error',index:idx,total:total,file:p,message:'Verify failed: '+p});}next();});});});}next();});}
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
    while (randomSuccessNum === 9 || randomSuccessNum === 26 || randomSuccessNum === 34) randomSuccessNum = (randomSuccessNum % successImageCount) + 1;
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

        ws.broadcast(msg); // Still send to websocket too
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
                var configData = JSON.parse(data);
                CONFIG = configData.config || {};
                payloads = configData.payloads || [];
                log('Config loaded successfully');
            } catch(e) {
                log('ERROR parsing config.json: ' + e.message);
                needsConfig = true;
            }
        }
        if (needsConfig) {
            var defaultConfig = {
                config: {
                    autolapse: false,
                    autopoop: false,
                    autoclose: false,
                    autoclose_delay: 3000,
                    music:false,
                    jb_behavior: 0,
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

        if(CONFIG.autolapse){
            include('loader.js')
        } else if(CONFIG.autopoop){
            CONFIG.jb_behavior = 1
            include('loader.js')
        } 
        else {
            var themeName = CONFIG.theme || 'default';
            try {
                include('themes/' + themeName + '/main.js');
            } catch(e) {
                log('Failed to load theme "' + themeName + '": ' + e.message);
                log('Falling back to default theme');
                include('themes/default/main.js');
            }
        }
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
