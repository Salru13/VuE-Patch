const fsNode = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const serve = fsNode.readFileSync(path.join(root, 'src/selfheal/serve.js'), 'utf8');
const bundle = JSON.parse(fsNode.readFileSync(path.join(root, 'recovery/recovery-bundle.json'), 'utf8'));
const aio = fsNode.readFileSync(path.join(root, 'generated/recovery-c.js'), 'utf8');
const start = serve.indexOf('var selfHealCriticalFiles=');
const endMark = 'jsmaf.selfHealRun = selfHealRun;';
const end = serve.indexOf(endMark) + endMark.length;
if (start < 0 || end < endMark.length) throw new Error('SelfHeal section missing');
const section = serve.slice(start, end);

function runCase(initial, repair) {
  const files = { ...initial };
  const writes = [];
  const ctx = {
    jsmaf: { __selfHealBundle: bundle, __selfHealAio: aio },
    log() {},
    fs: {
      read(name, cb) {
        Object.prototype.hasOwnProperty.call(files, name) ? cb(null, files[name]) : cb(new Error('missing'), null);
      },
      write(name, data, cb) {
        writes.push(name);
        files[name] = data;
        cb(null);
      },
    },
  };
  vm.createContext(ctx);
  vm.runInContext(section, ctx);
  return new Promise(resolve => ctx.jsmaf.selfHealRun(repair, () => {}, result => resolve({ result, files, writes })));
}

(async () => {
  const healthy = { ...bundle.files, 'img/susec/c.js': aio };
  let run = await runCase(healthy, false);
  if (run.result.checked !== 17 || run.result.mismatched !== 0 || run.result.failed !== 0) throw new Error(`healthy ${JSON.stringify(run.result)}`);

  const damaged = { ...healthy };
  delete damaged['netctrl_c0w_twins.js'];
  damaged['themes/default/payload_host.js'] = '';
  run = await runCase(damaged, false);
  if (run.result.checked !== 17 || run.result.mismatched !== 2 || run.result.failed !== 0) throw new Error(`check ${JSON.stringify(run.result)}`);
  run = await runCase(damaged, true);
  if (run.result.repaired !== 2 || run.result.failed !== 0 || JSON.stringify(run.writes) !== JSON.stringify(['netctrl_c0w_twins.js', 'themes/default/payload_host.js'])) throw new Error(`repair ${JSON.stringify(run.result)} ${JSON.stringify(run.writes)}`);
  const post = await runCase(run.files, false);
  if (post.result.checked !== 17 || post.result.mismatched !== 0 || post.result.failed !== 0) throw new Error(`post ${JSON.stringify(post.result)}`);
  console.log('SELFHEAL_ENGINE_V12=PASS healthy=17/17 damaged=15/17 repaired=2 post=17/17');
})().catch(error => { console.error(error); process.exit(1); });
