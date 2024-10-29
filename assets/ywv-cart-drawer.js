(() => {
    var Qe = Object.defineProperty,
        qt = Object.defineProperties;
    var Ht = Object.getOwnPropertyDescriptors;
    var Ge = Object.getOwnPropertySymbols;
    var Mt = Object.prototype.hasOwnProperty,
        vt = Object.prototype.propertyIsEnumerable;
    var q = (e, t) => (t = Symbol[e]) ? t : Symbol.for("Symbol." + e),
        zt = e => {
            throw TypeError(e)
        };
    var Xe = (e, t, r) => t in e ? Qe(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: r
        }) : e[t] = r,
        B = (e, t) => {
            for (var r in t || (t = {})) Mt.call(t, r) && Xe(e, r, t[r]);
            if (Ge)
                for (var r of Ge(t)) vt.call(t, r) && Xe(e, r, t[r]);
            return e
        },
        Ze = (e, t) => qt(e, Ht(t));
    var Jt = (e, t) => {
        for (var r in t) Qe(e, r, {
            get: t[r],
            enumerable: !0
        })
    };
    var T = (e, t, r) => new Promise((n, o) => {
            var s = f => {
                    try {
                        c(r.next(f))
                    } catch (u) {
                        o(u)
                    }
                },
                i = f => {
                    try {
                        c(r.throw(f))
                    } catch (u) {
                        o(u)
                    }
                },
                c = f => f.done ? n(f.value) : Promise.resolve(f.value).then(s, i);
            c((r = r.apply(e, t)).next())
        }),
        I = function(e, t) {
            this[0] = e, this[1] = t
        },
        ge = (e, t, r) => {
            var n = (i, c, f, u) => {
                    try {
                        var l = r[i](c),
                            d = (c = l.value) instanceof I,
                            w = l.done;
                        Promise.resolve(d ? c[0] : c).then(E => d ? n(i === "return" ? i : "next", c[1] ? {
                            done: E.done,
                            value: E.value
                        } : E, f, u) : f({
                            value: E,
                            done: w
                        })).catch(E => n("throw", E, f, u))
                    } catch (E) {
                        u(E)
                    }
                },
                o = i => s[i] = c => new Promise((f, u) => n(i, c, f, u)),
                s = {};
            return r = r.apply(e, t), s[q("asyncIterator")] = () => s, o("next"), o("throw"), o("return"), s
        },
        Se = e => {
            var t = e[q("asyncIterator")],
                r = !1,
                n, o = {};
            return t == null ? (t = e[q("iterator")](), n = s => o[s] = i => t[s](i)) : (t = t.call(e), n = s => o[s] = i => {
                if (r) {
                    if (r = !1, s === "throw") throw i;
                    return i
                }
                return r = !0, {
                    done: !1,
                    value: new I(new Promise(c => {
                        var f = t[s](i);
                        f instanceof Object || zt("Object expected"), c(f)
                    }), 1)
                }
            }), o[q("iterator")] = () => o, n("next"), "throw" in t ? n("throw") : o.throw = s => {
                throw s
            }, "return" in t && n("return"), o
        },
        Ye = (e, t, r) => (t = e[q("asyncIterator")]) ? t.call(e) : (e = e[q("iterator")](), t = {}, r = (n, o) => (o = e[n]) && (t[n] = s => new Promise((i, c, f) => (s = o.call(e, s), f = s.done, Promise.resolve(s.value).then(u => i({
            value: u,
            done: f
        }), c)))), r("next"), r("return"), t);

    function K(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    }
    var {
        toString: Vt
    } = Object.prototype, {
        getPrototypeOf: Ae
    } = Object, se = (e => t => {
        let r = Vt.call(t);
        return e[r] || (e[r] = r.slice(8, -1).toLowerCase())
    })(Object.create(null)), N = e => (e = e.toLowerCase(), t => se(t) === e), ie = e => t => typeof t === e, {
        isArray: H
    } = Array, $ = ie("undefined");

    function Wt(e) {
        return e !== null && !$(e) && e.constructor !== null && !$(e.constructor) && C(e.constructor.isBuffer) && e.constructor.isBuffer(e)
    }
    var rt = N("ArrayBuffer");

    function Kt(e) {
        let t;
        return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && rt(e.buffer), t
    }
    var $t = ie("string"),
        C = ie("function"),
        nt = ie("number"),
        ae = e => e !== null && typeof e == "object",
        Gt = e => e === !0 || e === !1,
        oe = e => {
            if (se(e) !== "object") return !1;
            let t = Ae(e);
            return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e)
        },
        Xt = N("Date"),
        Qt = N("File"),
        Zt = N("Blob"),
        Yt = N("FileList"),
        er = e => ae(e) && C(e.pipe),
        tr = e => {
            let t;
            return e && (typeof FormData == "function" && e instanceof FormData || C(e.append) && ((t = se(e)) === "formdata" || t === "object" && C(e.toString) && e.toString() === "[object FormData]"))
        },
        rr = N("URLSearchParams"),
        [nr, or, sr, ir] = ["ReadableStream", "Request", "Response", "Headers"].map(N),
        ar = e => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");

    function G(e, t, {
        allOwnKeys: r = !1
    } = {}) {
        if (e === null || typeof e == "undefined") return;
        let n, o;
        if (typeof e != "object" && (e = [e]), H(e))
            for (n = 0, o = e.length; n < o; n++) t.call(null, e[n], n, e);
        else {
            let s = r ? Object.getOwnPropertyNames(e) : Object.keys(e),
                i = s.length,
                c;
            for (n = 0; n < i; n++) c = s[n], t.call(null, e[c], c, e)
        }
    }

    function ot(e, t) {
        t = t.toLowerCase();
        let r = Object.keys(e),
            n = r.length,
            o;
        for (; n-- > 0;)
            if (o = r[n], t === o.toLowerCase()) return o;
        return null
    }
    var j = typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : global,
        st = e => !$(e) && e !== j;

    function xe() {
        let {
            caseless: e
        } = st(this) && this || {}, t = {}, r = (n, o) => {
            let s = e && ot(t, o) || o;
            oe(t[s]) && oe(n) ? t[s] = xe(t[s], n) : oe(n) ? t[s] = xe({}, n) : H(n) ? t[s] = n.slice() : t[s] = n
        };
        for (let n = 0, o = arguments.length; n < o; n++) arguments[n] && G(arguments[n], r);
        return t
    }
    var cr = (e, t, r, {
            allOwnKeys: n
        } = {}) => (G(t, (o, s) => {
            r && C(o) ? e[s] = K(o, r) : e[s] = o
        }, {
            allOwnKeys: n
        }), e),
        ur = e => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
        lr = (e, t, r, n) => {
            e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
                value: t.prototype
            }), r && Object.assign(e.prototype, r)
        },
        fr = (e, t, r, n) => {
            let o, s, i, c = {};
            if (t = t || {}, e == null) return t;
            do {
                for (o = Object.getOwnPropertyNames(e), s = o.length; s-- > 0;) i = o[s], (!n || n(i, e, t)) && !c[i] && (t[i] = e[i], c[i] = !0);
                e = r !== !1 && Ae(e)
            } while (e && (!r || r(e, t)) && e !== Object.prototype);
            return t
        },
        dr = (e, t, r) => {
            e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
            let n = e.indexOf(t, r);
            return n !== -1 && n === r
        },
        pr = e => {
            if (!e) return null;
            if (H(e)) return e;
            let t = e.length;
            if (!nt(t)) return null;
            let r = new Array(t);
            for (; t-- > 0;) r[t] = e[t];
            return r
        },
        mr = (e => t => e && t instanceof e)(typeof Uint8Array != "undefined" && Ae(Uint8Array)),
        hr = (e, t) => {
            let n = (e && e[Symbol.iterator]).call(e),
                o;
            for (;
                (o = n.next()) && !o.done;) {
                let s = o.value;
                t.call(e, s[0], s[1])
            }
        },
        yr = (e, t) => {
            let r, n = [];
            for (;
                (r = e.exec(t)) !== null;) n.push(r);
            return n
        },
        Er = N("HTMLFormElement"),
        wr = e => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(r, n, o) {
            return n.toUpperCase() + o
        }),
        et = (({
            hasOwnProperty: e
        }) => (t, r) => e.call(t, r))(Object.prototype),
        br = N("RegExp"),
        it = (e, t) => {
            let r = Object.getOwnPropertyDescriptors(e),
                n = {};
            G(r, (o, s) => {
                let i;
                (i = t(o, s, e)) !== !1 && (n[s] = i || o)
            }), Object.defineProperties(e, n)
        },
        gr = e => {
            it(e, (t, r) => {
                if (C(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1) return !1;
                let n = e[r];
                if (C(n)) {
                    if (t.enumerable = !1, "writable" in t) {
                        t.writable = !1;
                        return
                    }
                    t.set || (t.set = () => {
                        throw Error("Can not rewrite read-only method '" + r + "'")
                    })
                }
            })
        },
        Sr = (e, t) => {
            let r = {},
                n = o => {
                    o.forEach(s => {
                        r[s] = !0
                    })
                };
            return H(e) ? n(e) : n(String(e).split(t)), r
        },
        Rr = () => {},
        xr = (e, t) => e != null && Number.isFinite(e = +e) ? e : t,
        Re = "abcdefghijklmnopqrstuvwxyz",
        tt = "0123456789",
        at = {
            DIGIT: tt,
            ALPHA: Re,
            ALPHA_DIGIT: Re + Re.toUpperCase() + tt
        },
        Ar = (e = 16, t = at.ALPHA_DIGIT) => {
            let r = "",
                {
                    length: n
                } = t;
            for (; e--;) r += t[Math.random() * n | 0];
            return r
        };

    function Or(e) {
        return !!(e && C(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator])
    }
    var Tr = e => {
            let t = new Array(10),
                r = (n, o) => {
                    if (ae(n)) {
                        if (t.indexOf(n) >= 0) return;
                        if (!("toJSON" in n)) {
                            t[o] = n;
                            let s = H(n) ? [] : {};
                            return G(n, (i, c) => {
                                let f = r(i, o + 1);
                                !$(f) && (s[c] = f)
                            }), t[o] = void 0, s
                        }
                    }
                    return n
                };
            return r(e, 0)
        },
        Cr = N("AsyncFunction"),
        Nr = e => e && (ae(e) || C(e)) && C(e.then) && C(e.catch),
        ct = ((e, t) => e ? setImmediate : t ? ((r, n) => (j.addEventListener("message", ({
            source: o,
            data: s
        }) => {
            o === j && s === r && n.length && n.shift()()
        }, !1), o => {
            n.push(o), j.postMessage(r, "*")
        }))(`axios@${Math.random()}`, []) : r => setTimeout(r))(typeof setImmediate == "function", C(j.postMessage)),
        Pr = typeof queueMicrotask != "undefined" ? queueMicrotask.bind(j) : typeof process != "undefined" && process.nextTick || ct,
        a = {
            isArray: H,
            isArrayBuffer: rt,
            isBuffer: Wt,
            isFormData: tr,
            isArrayBufferView: Kt,
            isString: $t,
            isNumber: nt,
            isBoolean: Gt,
            isObject: ae,
            isPlainObject: oe,
            isReadableStream: nr,
            isRequest: or,
            isResponse: sr,
            isHeaders: ir,
            isUndefined: $,
            isDate: Xt,
            isFile: Qt,
            isBlob: Zt,
            isRegExp: br,
            isFunction: C,
            isStream: er,
            isURLSearchParams: rr,
            isTypedArray: mr,
            isFileList: Yt,
            forEach: G,
            merge: xe,
            extend: cr,
            trim: ar,
            stripBOM: ur,
            inherits: lr,
            toFlatObject: fr,
            kindOf: se,
            kindOfTest: N,
            endsWith: dr,
            toArray: pr,
            forEachEntry: hr,
            matchAll: yr,
            isHTMLForm: Er,
            hasOwnProperty: et,
            hasOwnProp: et,
            reduceDescriptors: it,
            freezeMethods: gr,
            toObjectSet: Sr,
            toCamelCase: wr,
            noop: Rr,
            toFiniteNumber: xr,
            findKey: ot,
            global: j,
            isContextDefined: st,
            ALPHABET: at,
            generateString: Ar,
            isSpecCompliantForm: Or,
            toJSONObject: Tr,
            isAsyncFn: Cr,
            isThenable: Nr,
            setImmediate: ct,
            asap: Pr
        };

    function M(e, t, r, n, o) {
        Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), o && (this.response = o, this.status = o.status ? o.status : null)
    }
    a.inherits(M, Error, {
        toJSON: function() {
            return {
                message: this.message,
                name: this.name,
                description: this.description,
                number: this.number,
                fileName: this.fileName,
                lineNumber: this.lineNumber,
                columnNumber: this.columnNumber,
                stack: this.stack,
                config: a.toJSONObject(this.config),
                code: this.code,
                status: this.status
            }
        }
    });
    var ut = M.prototype,
        lt = {};
    ["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach(e => {
        lt[e] = {
            value: e
        }
    });
    Object.defineProperties(M, lt);
    Object.defineProperty(ut, "isAxiosError", {
        value: !0
    });
    M.from = (e, t, r, n, o, s) => {
        let i = Object.create(ut);
        return a.toFlatObject(e, i, function(f) {
            return f !== Error.prototype
        }, c => c !== "isAxiosError"), M.call(i, e.message, t, r, n, o), i.cause = e, i.name = e.name, s && Object.assign(i, s), i
    };
    var h = M;
    var ce = null;

    function Oe(e) {
        return a.isPlainObject(e) || a.isArray(e)
    }

    function dt(e) {
        return a.endsWith(e, "[]") ? e.slice(0, -2) : e
    }

    function ft(e, t, r) {
        return e ? e.concat(t).map(function(o, s) {
            return o = dt(o), !r && s ? "[" + o + "]" : o
        }).join(r ? "." : "") : t
    }

    function Fr(e) {
        return a.isArray(e) && !e.some(Oe)
    }
    var Lr = a.toFlatObject(a, {}, null, function(t) {
        return /^is[A-Z]/.test(t)
    });

    function Dr(e, t, r) {
        if (!a.isObject(e)) throw new TypeError("target must be an object");
        t = t || new(ce || FormData), r = a.toFlatObject(r, {
            metaTokens: !0,
            dots: !1,
            indexes: !1
        }, !1, function(y, m) {
            return !a.isUndefined(m[y])
        });
        let n = r.metaTokens,
            o = r.visitor || l,
            s = r.dots,
            i = r.indexes,
            f = (r.Blob || typeof Blob != "undefined" && Blob) && a.isSpecCompliantForm(t);
        if (!a.isFunction(o)) throw new TypeError("visitor must be a function");

        function u(p) {
            if (p === null) return "";
            if (a.isDate(p)) return p.toISOString();
            if (!f && a.isBlob(p)) throw new h("Blob is not supported. Use a Buffer instead.");
            return a.isArrayBuffer(p) || a.isTypedArray(p) ? f && typeof Blob == "function" ? new Blob([p]) : Buffer.from(p) : p
        }

        function l(p, y, m) {
            let b = p;
            if (p && !m && typeof p == "object") {
                if (a.endsWith(y, "{}")) y = n ? y : y.slice(0, -2), p = JSON.stringify(p);
                else if (a.isArray(p) && Fr(p) || (a.isFileList(p) || a.endsWith(y, "[]")) && (b = a.toArray(p))) return y = dt(y), b.forEach(function(A, L) {
                    !(a.isUndefined(A) || A === null) && t.append(i === !0 ? ft([y], L, s) : i === null ? y : y + "[]", u(A))
                }), !1
            }
            return Oe(p) ? !0 : (t.append(ft(m, y, s), u(p)), !1)
        }
        let d = [],
            w = Object.assign(Lr, {
                defaultVisitor: l,
                convertValue: u,
                isVisitable: Oe
            });

        function E(p, y) {
            if (!a.isUndefined(p)) {
                if (d.indexOf(p) !== -1) throw Error("Circular reference detected in " + y.join("."));
                d.push(p), a.forEach(p, function(b, R) {
                    (!(a.isUndefined(b) || b === null) && o.call(t, b, a.isString(R) ? R.trim() : R, y, w)) === !0 && E(b, y ? y.concat(R) : [R])
                }), d.pop()
            }
        }
        if (!a.isObject(e)) throw new TypeError("data must be an object");
        return E(e), t
    }
    var _ = Dr;

    function pt(e) {
        let t = {
            "!": "%21",
            "'": "%27",
            "(": "%28",
            ")": "%29",
            "~": "%7E",
            "%20": "+",
            "%00": "\0"
        };
        return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(n) {
            return t[n]
        })
    }

    function mt(e, t) {
        this._pairs = [], e && _(e, this, t)
    }
    var ht = mt.prototype;
    ht.append = function(t, r) {
        this._pairs.push([t, r])
    };
    ht.toString = function(t) {
        let r = t ? function(n) {
            return t.call(this, n, pt)
        } : pt;
        return this._pairs.map(function(o) {
            return r(o[0]) + "=" + r(o[1])
        }, "").join("&")
    };
    var ue = mt;

    function _r(e) {
        return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
    }

    function X(e, t, r) {
        if (!t) return e;
        let n = r && r.encode || _r,
            o = r && r.serialize,
            s;
        if (o ? s = o(t, r) : s = a.isURLSearchParams(t) ? t.toString() : new ue(t, r).toString(n), s) {
            let i = e.indexOf("#");
            i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + s
        }
        return e
    }
    var Te = class {
            constructor() {
                this.handlers = []
            }
            use(t, r, n) {
                return this.handlers.push({
                    fulfilled: t,
                    rejected: r,
                    synchronous: n ? n.synchronous : !1,
                    runWhen: n ? n.runWhen : null
                }), this.handlers.length - 1
            }
            eject(t) {
                this.handlers[t] && (this.handlers[t] = null)
            }
            clear() {
                this.handlers && (this.handlers = [])
            }
            forEach(t) {
                a.forEach(this.handlers, function(n) {
                    n !== null && t(n)
                })
            }
        },
        Ce = Te;
    var le = {
        silentJSONParsing: !0,
        forcedJSONParsing: !0,
        clarifyTimeoutError: !1
    };
    var yt = typeof URLSearchParams != "undefined" ? URLSearchParams : ue;
    var Et = typeof FormData != "undefined" ? FormData : null;
    var wt = typeof Blob != "undefined" ? Blob : null;
    var bt = {
        isBrowser: !0,
        classes: {
            URLSearchParams: yt,
            FormData: Et,
            Blob: wt
        },
        protocols: ["http", "https", "file", "blob", "url", "data"]
    };
    var Fe = {};
    Jt(Fe, {
        hasBrowserEnv: () => Pe,
        hasStandardBrowserEnv: () => Ur,
        hasStandardBrowserWebWorkerEnv: () => kr,
        navigator: () => Ne,
        origin: () => Br
    });
    var Pe = typeof window != "undefined" && typeof document != "undefined",
        Ne = typeof navigator == "object" && navigator || void 0,
        Ur = Pe && (!Ne || ["ReactNative", "NativeScript", "NS"].indexOf(Ne.product) < 0),
        kr = typeof WorkerGlobalScope != "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function",
        Br = Pe && window.location.href || "http://localhost";
    var g = B(B({}, Fe), bt);

    function Le(e, t) {
        return _(e, new g.classes.URLSearchParams, Object.assign({
            visitor: function(r, n, o, s) {
                return g.isNode && a.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments)
            }
        }, t))
    }

    function Ir(e) {
        return a.matchAll(/\w+|\[(\w*)]/g, e).map(t => t[0] === "[]" ? "" : t[1] || t[0])
    }

    function jr(e) {
        let t = {},
            r = Object.keys(e),
            n, o = r.length,
            s;
        for (n = 0; n < o; n++) s = r[n], t[s] = e[s];
        return t
    }

    function qr(e) {
        function t(r, n, o, s) {
            let i = r[s++];
            if (i === "__proto__") return !0;
            let c = Number.isFinite(+i),
                f = s >= r.length;
            return i = !i && a.isArray(o) ? o.length : i, f ? (a.hasOwnProp(o, i) ? o[i] = [o[i], n] : o[i] = n, !c) : ((!o[i] || !a.isObject(o[i])) && (o[i] = []), t(r, n, o[i], s) && a.isArray(o[i]) && (o[i] = jr(o[i])), !c)
        }
        if (a.isFormData(e) && a.isFunction(e.entries)) {
            let r = {};
            return a.forEachEntry(e, (n, o) => {
                t(Ir(n), o, r, 0)
            }), r
        }
        return null
    }
    var fe = qr;

    function Hr(e, t, r) {
        if (a.isString(e)) try {
            return (t || JSON.parse)(e), a.trim(e)
        } catch (n) {
            if (n.name !== "SyntaxError") throw n
        }
        return (r || JSON.stringify)(e)
    }
    var De = {
        transitional: le,
        adapter: ["xhr", "http", "fetch"],
        transformRequest: [function(t, r) {
            let n = r.getContentType() || "",
                o = n.indexOf("application/json") > -1,
                s = a.isObject(t);
            if (s && a.isHTMLForm(t) && (t = new FormData(t)), a.isFormData(t)) return o ? JSON.stringify(fe(t)) : t;
            if (a.isArrayBuffer(t) || a.isBuffer(t) || a.isStream(t) || a.isFile(t) || a.isBlob(t) || a.isReadableStream(t)) return t;
            if (a.isArrayBufferView(t)) return t.buffer;
            if (a.isURLSearchParams(t)) return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
            let c;
            if (s) {
                if (n.indexOf("application/x-www-form-urlencoded") > -1) return Le(t, this.formSerializer).toString();
                if ((c = a.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
                    let f = this.env && this.env.FormData;
                    return _(c ? {
                        "files[]": t
                    } : t, f && new f, this.formSerializer)
                }
            }
            return s || o ? (r.setContentType("application/json", !1), Hr(t)) : t
        }],
        transformResponse: [function(t) {
            let r = this.transitional || De.transitional,
                n = r && r.forcedJSONParsing,
                o = this.responseType === "json";
            if (a.isResponse(t) || a.isReadableStream(t)) return t;
            if (t && a.isString(t) && (n && !this.responseType || o)) {
                let i = !(r && r.silentJSONParsing) && o;
                try {
                    return JSON.parse(t)
                } catch (c) {
                    if (i) throw c.name === "SyntaxError" ? h.from(c, h.ERR_BAD_RESPONSE, this, null, this.response) : c
                }
            }
            return t
        }],
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        maxBodyLength: -1,
        env: {
            FormData: g.classes.FormData,
            Blob: g.classes.Blob
        },
        validateStatus: function(t) {
            return t >= 200 && t < 300
        },
        headers: {
            common: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": void 0
            }
        }
    };
    a.forEach(["delete", "get", "head", "post", "put", "patch"], e => {
        De.headers[e] = {}
    });
    var v = De;
    var Mr = a.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]),
        gt = e => {
            let t = {},
                r, n, o;
            return e && e.split(`
`).forEach(function(i) {
                o = i.indexOf(":"), r = i.substring(0, o).trim().toLowerCase(), n = i.substring(o + 1).trim(), !(!r || t[r] && Mr[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n)
            }), t
        };
    var St = Symbol("internals");

    function Q(e) {
        return e && String(e).trim().toLowerCase()
    }

    function de(e) {
        return e === !1 || e == null ? e : a.isArray(e) ? e.map(de) : String(e)
    }

    function vr(e) {
        let t = Object.create(null),
            r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g,
            n;
        for (; n = r.exec(e);) t[n[1]] = n[2];
        return t
    }
    var zr = e => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());

    function _e(e, t, r, n, o) {
        if (a.isFunction(n)) return n.call(this, t, r);
        if (o && (t = r), !!a.isString(t)) {
            if (a.isString(n)) return t.indexOf(n) !== -1;
            if (a.isRegExp(n)) return n.test(t)
        }
    }

    function Jr(e) {
        return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n)
    }

    function Vr(e, t) {
        let r = a.toCamelCase(" " + t);
        ["get", "set", "has"].forEach(n => {
            Object.defineProperty(e, n + r, {
                value: function(o, s, i) {
                    return this[n].call(this, t, o, s, i)
                },
                configurable: !0
            })
        })
    }
    var z = class {
        constructor(t) {
            t && this.set(t)
        }
        set(t, r, n) {
            let o = this;

            function s(c, f, u) {
                let l = Q(f);
                if (!l) throw new Error("header name must be a non-empty string");
                let d = a.findKey(o, l);
                (!d || o[d] === void 0 || u === !0 || u === void 0 && o[d] !== !1) && (o[d || f] = de(c))
            }
            let i = (c, f) => a.forEach(c, (u, l) => s(u, l, f));
            if (a.isPlainObject(t) || t instanceof this.constructor) i(t, r);
            else if (a.isString(t) && (t = t.trim()) && !zr(t)) i(gt(t), r);
            else if (a.isHeaders(t))
                for (let [c, f] of t.entries()) s(f, c, n);
            else t != null && s(r, t, n);
            return this
        }
        get(t, r) {
            if (t = Q(t), t) {
                let n = a.findKey(this, t);
                if (n) {
                    let o = this[n];
                    if (!r) return o;
                    if (r === !0) return vr(o);
                    if (a.isFunction(r)) return r.call(this, o, n);
                    if (a.isRegExp(r)) return r.exec(o);
                    throw new TypeError("parser must be boolean|regexp|function")
                }
            }
        }
        has(t, r) {
            if (t = Q(t), t) {
                let n = a.findKey(this, t);
                return !!(n && this[n] !== void 0 && (!r || _e(this, this[n], n, r)))
            }
            return !1
        }
        delete(t, r) {
            let n = this,
                o = !1;

            function s(i) {
                if (i = Q(i), i) {
                    let c = a.findKey(n, i);
                    c && (!r || _e(n, n[c], c, r)) && (delete n[c], o = !0)
                }
            }
            return a.isArray(t) ? t.forEach(s) : s(t), o
        }
        clear(t) {
            let r = Object.keys(this),
                n = r.length,
                o = !1;
            for (; n--;) {
                let s = r[n];
                (!t || _e(this, this[s], s, t, !0)) && (delete this[s], o = !0)
            }
            return o
        }
        normalize(t) {
            let r = this,
                n = {};
            return a.forEach(this, (o, s) => {
                let i = a.findKey(n, s);
                if (i) {
                    r[i] = de(o), delete r[s];
                    return
                }
                let c = t ? Jr(s) : String(s).trim();
                c !== s && delete r[s], r[c] = de(o), n[c] = !0
            }), this
        }
        concat(...t) {
            return this.constructor.concat(this, ...t)
        }
        toJSON(t) {
            let r = Object.create(null);
            return a.forEach(this, (n, o) => {
                n != null && n !== !1 && (r[o] = t && a.isArray(n) ? n.join(", ") : n)
            }), r
        } [Symbol.iterator]() {
            return Object.entries(this.toJSON())[Symbol.iterator]()
        }
        toString() {
            return Object.entries(this.toJSON()).map(([t, r]) => t + ": " + r).join(`
`)
        }
        get[Symbol.toStringTag]() {
            return "AxiosHeaders"
        }
        static from(t) {
            return t instanceof this ? t : new this(t)
        }
        static concat(t, ...r) {
            let n = new this(t);
            return r.forEach(o => n.set(o)), n
        }
        static accessor(t) {
            let n = (this[St] = this[St] = {
                    accessors: {}
                }).accessors,
                o = this.prototype;

            function s(i) {
                let c = Q(i);
                n[c] || (Vr(o, i), n[c] = !0)
            }
            return a.isArray(t) ? t.forEach(s) : s(t), this
        }
    };
    z.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
    a.reduceDescriptors(z.prototype, ({
        value: e
    }, t) => {
        let r = t[0].toUpperCase() + t.slice(1);
        return {
            get: () => e,
            set(n) {
                this[r] = n
            }
        }
    });
    a.freezeMethods(z);
    var x = z;

    function Z(e, t) {
        let r = this || v,
            n = t || r,
            o = x.from(n.headers),
            s = n.data;
        return a.forEach(e, function(c) {
            s = c.call(r, s, o.normalize(), t ? t.status : void 0)
        }), o.normalize(), s
    }

    function Y(e) {
        return !!(e && e.__CANCEL__)
    }

    function Rt(e, t, r) {
        h.call(this, e == null ? "canceled" : e, h.ERR_CANCELED, t, r), this.name = "CanceledError"
    }
    a.inherits(Rt, h, {
        __CANCEL__: !0
    });
    var F = Rt;

    function ee(e, t, r) {
        let n = r.config.validateStatus;
        !r.status || !n || n(r.status) ? e(r) : t(new h("Request failed with status code " + r.status, [h.ERR_BAD_REQUEST, h.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4], r.config, r.request, r))
    }

    function Ue(e) {
        let t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
        return t && t[1] || ""
    }

    function Wr(e, t) {
        e = e || 10;
        let r = new Array(e),
            n = new Array(e),
            o = 0,
            s = 0,
            i;
        return t = t !== void 0 ? t : 1e3,
            function(f) {
                let u = Date.now(),
                    l = n[s];
                i || (i = u), r[o] = f, n[o] = u;
                let d = s,
                    w = 0;
                for (; d !== o;) w += r[d++], d = d % e;
                if (o = (o + 1) % e, o === s && (s = (s + 1) % e), u - i < t) return;
                let E = l && u - l;
                return E ? Math.round(w * 1e3 / E) : void 0
            }
    }
    var xt = Wr;

    function Kr(e, t) {
        let r = 0,
            n = 1e3 / t,
            o, s, i = (u, l = Date.now()) => {
                r = l, o = null, s && (clearTimeout(s), s = null), e.apply(null, u)
            };
        return [(...u) => {
            let l = Date.now(),
                d = l - r;
            d >= n ? i(u, l) : (o = u, s || (s = setTimeout(() => {
                s = null, i(o)
            }, n - d)))
        }, () => o && i(o)]
    }
    var At = Kr;
    var J = (e, t, r = 3) => {
            let n = 0,
                o = xt(50, 250);
            return At(s => {
                let i = s.loaded,
                    c = s.lengthComputable ? s.total : void 0,
                    f = i - n,
                    u = o(f),
                    l = i <= c;
                n = i;
                let d = {
                    loaded: i,
                    total: c,
                    progress: c ? i / c : void 0,
                    bytes: f,
                    rate: u || void 0,
                    estimated: u && c && l ? (c - i) / u : void 0,
                    event: s,
                    lengthComputable: c != null,
                    [t ? "download" : "upload"]: !0
                };
                e(d)
            }, r)
        },
        ke = (e, t) => {
            let r = e != null;
            return [n => t[0]({
                lengthComputable: r,
                total: e,
                loaded: n
            }), t[1]]
        },
        Be = e => (...t) => a.asap(() => e(...t));
    var Ot = g.hasStandardBrowserEnv ? function() {
        let t = g.navigator && /(msie|trident)/i.test(g.navigator.userAgent),
            r = document.createElement("a"),
            n;

        function o(s) {
            let i = s;
            return t && (r.setAttribute("href", i), i = r.href), r.setAttribute("href", i), {
                href: r.href,
                protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
                host: r.host,
                search: r.search ? r.search.replace(/^\?/, "") : "",
                hash: r.hash ? r.hash.replace(/^#/, "") : "",
                hostname: r.hostname,
                port: r.port,
                pathname: r.pathname.charAt(0) === "/" ? r.pathname : "/" + r.pathname
            }
        }
        return n = o(window.location.href),
            function(i) {
                let c = a.isString(i) ? o(i) : i;
                return c.protocol === n.protocol && c.host === n.host
            }
    }() : function() {
        return function() {
            return !0
        }
    }();
    var Tt = g.hasStandardBrowserEnv ? {
        write(e, t, r, n, o, s) {
            let i = [e + "=" + encodeURIComponent(t)];
            a.isNumber(r) && i.push("expires=" + new Date(r).toGMTString()), a.isString(n) && i.push("path=" + n), a.isString(o) && i.push("domain=" + o), s === !0 && i.push("secure"), document.cookie = i.join("; ")
        },
        read(e) {
            let t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
            return t ? decodeURIComponent(t[3]) : null
        },
        remove(e) {
            this.write(e, "", Date.now() - 864e5)
        }
    } : {
        write() {},
        read() {
            return null
        },
        remove() {}
    };

    function Ie(e) {
        return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
    }

    function je(e, t) {
        return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e
    }

    function te(e, t) {
        return e && !Ie(t) ? je(e, t) : t
    }
    var Ct = e => e instanceof x ? B({}, e) : e;

    function P(e, t) {
        t = t || {};
        let r = {};

        function n(u, l, d) {
            return a.isPlainObject(u) && a.isPlainObject(l) ? a.merge.call({
                caseless: d
            }, u, l) : a.isPlainObject(l) ? a.merge({}, l) : a.isArray(l) ? l.slice() : l
        }

        function o(u, l, d) {
            if (a.isUndefined(l)) {
                if (!a.isUndefined(u)) return n(void 0, u, d)
            } else return n(u, l, d)
        }

        function s(u, l) {
            if (!a.isUndefined(l)) return n(void 0, l)
        }

        function i(u, l) {
            if (a.isUndefined(l)) {
                if (!a.isUndefined(u)) return n(void 0, u)
            } else return n(void 0, l)
        }

        function c(u, l, d) {
            if (d in t) return n(u, l);
            if (d in e) return n(void 0, u)
        }
        let f = {
            url: s,
            method: s,
            data: s,
            baseURL: i,
            transformRequest: i,
            transformResponse: i,
            paramsSerializer: i,
            timeout: i,
            timeoutMessage: i,
            withCredentials: i,
            withXSRFToken: i,
            adapter: i,
            responseType: i,
            xsrfCookieName: i,
            xsrfHeaderName: i,
            onUploadProgress: i,
            onDownloadProgress: i,
            decompress: i,
            maxContentLength: i,
            maxBodyLength: i,
            beforeRedirect: i,
            transport: i,
            httpAgent: i,
            httpsAgent: i,
            cancelToken: i,
            socketPath: i,
            responseEncoding: i,
            validateStatus: c,
            headers: (u, l) => o(Ct(u), Ct(l), !0)
        };
        return a.forEach(Object.keys(Object.assign({}, e, t)), function(l) {
            let d = f[l] || o,
                w = d(e[l], t[l], l);
            a.isUndefined(w) && d !== c || (r[l] = w)
        }), r
    }
    var pe = e => {
        let t = P({}, e),
            {
                data: r,
                withXSRFToken: n,
                xsrfHeaderName: o,
                xsrfCookieName: s,
                headers: i,
                auth: c
            } = t;
        t.headers = i = x.from(i), t.url = X(te(t.baseURL, t.url), e.params, e.paramsSerializer), c && i.set("Authorization", "Basic " + btoa((c.username || "") + ":" + (c.password ? unescape(encodeURIComponent(c.password)) : "")));
        let f;
        if (a.isFormData(r)) {
            if (g.hasStandardBrowserEnv || g.hasStandardBrowserWebWorkerEnv) i.setContentType(void 0);
            else if ((f = i.getContentType()) !== !1) {
                let [u, ...l] = f ? f.split(";").map(d => d.trim()).filter(Boolean) : [];
                i.setContentType([u || "multipart/form-data", ...l].join("; "))
            }
        }
        if (g.hasStandardBrowserEnv && (n && a.isFunction(n) && (n = n(t)), n || n !== !1 && Ot(t.url))) {
            let u = o && s && Tt.read(s);
            u && i.set(o, u)
        }
        return t
    };
    var $r = typeof XMLHttpRequest != "undefined",
        Nt = $r && function(e) {
            return new Promise(function(r, n) {
                let o = pe(e),
                    s = o.data,
                    i = x.from(o.headers).normalize(),
                    {
                        responseType: c,
                        onUploadProgress: f,
                        onDownloadProgress: u
                    } = o,
                    l, d, w, E, p;

                function y() {
                    E && E(), p && p(), o.cancelToken && o.cancelToken.unsubscribe(l), o.signal && o.signal.removeEventListener("abort", l)
                }
                let m = new XMLHttpRequest;
                m.open(o.method.toUpperCase(), o.url, !0), m.timeout = o.timeout;

                function b() {
                    if (!m) return;
                    let A = x.from("getAllResponseHeaders" in m && m.getAllResponseHeaders()),
                        O = {
                            data: !c || c === "text" || c === "json" ? m.responseText : m.response,
                            status: m.status,
                            statusText: m.statusText,
                            headers: A,
                            config: e,
                            request: m
                        };
                    ee(function(k) {
                        r(k), y()
                    }, function(k) {
                        n(k), y()
                    }, O), m = null
                }
                "onloadend" in m ? m.onloadend = b : m.onreadystatechange = function() {
                    !m || m.readyState !== 4 || m.status === 0 && !(m.responseURL && m.responseURL.indexOf("file:") === 0) || setTimeout(b)
                }, m.onabort = function() {
                    m && (n(new h("Request aborted", h.ECONNABORTED, e, m)), m = null)
                }, m.onerror = function() {
                    n(new h("Network Error", h.ERR_NETWORK, e, m)), m = null
                }, m.ontimeout = function() {
                    let L = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded",
                        O = o.transitional || le;
                    o.timeoutErrorMessage && (L = o.timeoutErrorMessage), n(new h(L, O.clarifyTimeoutError ? h.ETIMEDOUT : h.ECONNABORTED, e, m)), m = null
                }, s === void 0 && i.setContentType(null), "setRequestHeader" in m && a.forEach(i.toJSON(), function(L, O) {
                    m.setRequestHeader(O, L)
                }), a.isUndefined(o.withCredentials) || (m.withCredentials = !!o.withCredentials), c && c !== "json" && (m.responseType = o.responseType), u && ([w, p] = J(u, !0), m.addEventListener("progress", w)), f && m.upload && ([d, E] = J(f), m.upload.addEventListener("progress", d), m.upload.addEventListener("loadend", E)), (o.cancelToken || o.signal) && (l = A => {
                    m && (n(!A || A.type ? new F(null, e, m) : A), m.abort(), m = null)
                }, o.cancelToken && o.cancelToken.subscribe(l), o.signal && (o.signal.aborted ? l() : o.signal.addEventListener("abort", l)));
                let R = Ue(o.url);
                if (R && g.protocols.indexOf(R) === -1) {
                    n(new h("Unsupported protocol " + R + ":", h.ERR_BAD_REQUEST, e));
                    return
                }
                m.send(s || null)
            })
        };
    var Gr = (e, t) => {
            let {
                length: r
            } = e = e ? e.filter(Boolean) : [];
            if (t || r) {
                let n = new AbortController,
                    o, s = function(u) {
                        if (!o) {
                            o = !0, c();
                            let l = u instanceof Error ? u : this.reason;
                            n.abort(l instanceof h ? l : new F(l instanceof Error ? l.message : l))
                        }
                    },
                    i = t && setTimeout(() => {
                        i = null, s(new h(`timeout ${t} of ms exceeded`, h.ETIMEDOUT))
                    }, t),
                    c = () => {
                        e && (i && clearTimeout(i), i = null, e.forEach(u => {
                            u.unsubscribe ? u.unsubscribe(s) : u.removeEventListener("abort", s)
                        }), e = null)
                    };
                e.forEach(u => u.addEventListener("abort", s));
                let {
                    signal: f
                } = n;
                return f.unsubscribe = () => a.asap(c), f
            }
        },
        Pt = Gr;
    var Xr = function*(e, t) {
            let r = e.byteLength;
            if (!t || r < t) {
                yield e;
                return
            }
            let n = 0,
                o;
            for (; n < r;) o = n + t, yield e.slice(n, o), n = o
        },
        Qr = function(e, t) {
            return ge(this, null, function*() {
                try {
                    for (var r = Ye(Zr(e)), n, o, s; n = !(o = yield new I(r.next())).done; n = !1) {
                        let i = o.value;
                        yield* Se(Xr(i, t))
                    }
                } catch (o) {
                    s = [o]
                } finally {
                    try {
                        n && (o = r.return) && (yield new I(o.call(r)))
                    } finally {
                        if (s) throw s[0]
                    }
                }
            })
        },
        Zr = function(e) {
            return ge(this, null, function*() {
                if (e[Symbol.asyncIterator]) {
                    yield* Se(e);
                    return
                }
                let t = e.getReader();
                try {
                    for (;;) {
                        let {
                            done: r,
                            value: n
                        } = yield new I(t.read());
                        if (r) break;
                        yield n
                    }
                } finally {
                    yield new I(t.cancel())
                }
            })
        },
        qe = (e, t, r, n) => {
            let o = Qr(e, t),
                s = 0,
                i, c = u => {
                    i || (i = !0, n && n(u))
                };
            return new ReadableStream({
                pull(u) {
                    return T(this, null, function*() {
                        try {
                            let {
                                done: l,
                                value: d
                            } = yield o.next();
                            if (l) {
                                c(), u.close();
                                return
                            }
                            let w = d.byteLength;
                            if (r) {
                                let E = s += w;
                                r(E)
                            }
                            u.enqueue(new Uint8Array(d))
                        } catch (l) {
                            throw c(l), l
                        }
                    })
                },
                cancel(u) {
                    return c(u), o.return()
                }
            }, {
                highWaterMark: 2
            })
        };
    var he = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function",
        Lt = he && typeof ReadableStream == "function",
        Yr = he && (typeof TextEncoder == "function" ? (e => t => e.encode(t))(new TextEncoder) : e => T(void 0, null, function*() {
            return new Uint8Array(yield new Response(e).arrayBuffer())
        })),
        Dt = (e, ...t) => {
            try {
                return !!e(...t)
            } catch (r) {
                return !1
            }
        },
        en = Lt && Dt(() => {
            let e = !1,
                t = new Request(g.origin, {
                    body: new ReadableStream,
                    method: "POST",
                    get duplex() {
                        return e = !0, "half"
                    }
                }).headers.has("Content-Type");
            return e && !t
        }),
        Ft = 64 * 1024,
        He = Lt && Dt(() => a.isReadableStream(new Response("").body)),
        me = {
            stream: He && (e => e.body)
        };
    he && (e => {
        ["text", "arrayBuffer", "blob", "formData", "stream"].forEach(t => {
            !me[t] && (me[t] = a.isFunction(e[t]) ? r => r[t]() : (r, n) => {
                throw new h(`Response type '${t}' is not supported`, h.ERR_NOT_SUPPORT, n)
            })
        })
    })(new Response);
    var tn = e => T(void 0, null, function*() {
            if (e == null) return 0;
            if (a.isBlob(e)) return e.size;
            if (a.isSpecCompliantForm(e)) return (yield new Request(g.origin, {
                method: "POST",
                body: e
            }).arrayBuffer()).byteLength;
            if (a.isArrayBufferView(e) || a.isArrayBuffer(e)) return e.byteLength;
            if (a.isURLSearchParams(e) && (e = e + ""), a.isString(e)) return (yield Yr(e)).byteLength
        }),
        rn = (e, t) => T(void 0, null, function*() {
            let r = a.toFiniteNumber(e.getContentLength());
            return r == null ? tn(t) : r
        }),
        _t = he && (e => T(void 0, null, function*() {
            let {
                url: t,
                method: r,
                data: n,
                signal: o,
                cancelToken: s,
                timeout: i,
                onDownloadProgress: c,
                onUploadProgress: f,
                responseType: u,
                headers: l,
                withCredentials: d = "same-origin",
                fetchOptions: w
            } = pe(e);
            u = u ? (u + "").toLowerCase() : "text";
            let E = Pt([o, s && s.toAbortSignal()], i),
                p, y = E && E.unsubscribe && (() => {
                    E.unsubscribe()
                }),
                m;
            try {
                if (f && en && r !== "get" && r !== "head" && (m = yield rn(l, n)) !== 0) {
                    let O = new Request(t, {
                            method: "POST",
                            body: n,
                            duplex: "half"
                        }),
                        D;
                    if (a.isFormData(n) && (D = O.headers.get("content-type")) && l.setContentType(D), O.body) {
                        let [k, ne] = ke(m, J(Be(f)));
                        n = qe(O.body, Ft, k, ne)
                    }
                }
                a.isString(d) || (d = d ? "include" : "omit");
                let b = "credentials" in Request.prototype;
                p = new Request(t, Ze(B({}, w), {
                    signal: E,
                    method: r.toUpperCase(),
                    headers: l.normalize().toJSON(),
                    body: n,
                    duplex: "half",
                    credentials: b ? d : void 0
                }));
                let R = yield fetch(p), A = He && (u === "stream" || u === "response");
                if (He && (c || A && y)) {
                    let O = {};
                    ["status", "statusText", "headers"].forEach($e => {
                        O[$e] = R[$e]
                    });
                    let D = a.toFiniteNumber(R.headers.get("content-length")),
                        [k, ne] = c && ke(D, J(Be(c), !0)) || [];
                    R = new Response(qe(R.body, Ft, k, () => {
                        ne && ne(), y && y()
                    }), O)
                }
                u = u || "text";
                let L = yield me[a.findKey(me, u) || "text"](R, e);
                return !A && y && y(), yield new Promise((O, D) => {
                    ee(O, D, {
                        data: L,
                        headers: x.from(R.headers),
                        status: R.status,
                        statusText: R.statusText,
                        config: e,
                        request: p
                    })
                })
            } catch (b) {
                throw y && y(), b && b.name === "TypeError" && /fetch/i.test(b.message) ? Object.assign(new h("Network Error", h.ERR_NETWORK, e, p), {
                    cause: b.cause || b
                }) : h.from(b, b && b.code, e, p)
            }
        }));
    var Me = {
        http: ce,
        xhr: Nt,
        fetch: _t
    };
    a.forEach(Me, (e, t) => {
        if (e) {
            try {
                Object.defineProperty(e, "name", {
                    value: t
                })
            } catch (r) {}
            Object.defineProperty(e, "adapterName", {
                value: t
            })
        }
    });
    var Ut = e => `- ${e}`,
        nn = e => a.isFunction(e) || e === null || e === !1,
        ye = {
            getAdapter: e => {
                e = a.isArray(e) ? e : [e];
                let {
                    length: t
                } = e, r, n, o = {};
                for (let s = 0; s < t; s++) {
                    r = e[s];
                    let i;
                    if (n = r, !nn(r) && (n = Me[(i = String(r)).toLowerCase()], n === void 0)) throw new h(`Unknown adapter '${i}'`);
                    if (n) break;
                    o[i || "#" + s] = n
                }
                if (!n) {
                    let s = Object.entries(o).map(([c, f]) => `adapter ${c} ` + (f === !1 ? "is not supported by the environment" : "is not available in the build")),
                        i = t ? s.length > 1 ? `since :
` + s.map(Ut).join(`
`) : " " + Ut(s[0]) : "as no adapter specified";
                    throw new h("There is no suitable adapter to dispatch the request " + i, "ERR_NOT_SUPPORT")
                }
                return n
            },
            adapters: Me
        };

    function ve(e) {
        if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new F(null, e)
    }

    function Ee(e) {
        return ve(e), e.headers = x.from(e.headers), e.data = Z.call(e, e.transformRequest), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), ye.getAdapter(e.adapter || v.adapter)(e).then(function(n) {
            return ve(e), n.data = Z.call(e, e.transformResponse, n), n.headers = x.from(n.headers), n
        }, function(n) {
            return Y(n) || (ve(e), n && n.response && (n.response.data = Z.call(e, e.transformResponse, n.response), n.response.headers = x.from(n.response.headers))), Promise.reject(n)
        })
    }
    var we = "1.7.7";
    var ze = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
        ze[e] = function(n) {
            return typeof n === e || "a" + (t < 1 ? "n " : " ") + e
        }
    });
    var kt = {};
    ze.transitional = function(t, r, n) {
        function o(s, i) {
            return "[Axios v" + we + "] Transitional option '" + s + "'" + i + (n ? ". " + n : "")
        }
        return (s, i, c) => {
            if (t === !1) throw new h(o(i, " has been removed" + (r ? " in " + r : "")), h.ERR_DEPRECATED);
            return r && !kt[i] && (kt[i] = !0, console.warn(o(i, " has been deprecated since v" + r + " and will be removed in the near future"))), t ? t(s, i, c) : !0
        }
    };

    function on(e, t, r) {
        if (typeof e != "object") throw new h("options must be an object", h.ERR_BAD_OPTION_VALUE);
        let n = Object.keys(e),
            o = n.length;
        for (; o-- > 0;) {
            let s = n[o],
                i = t[s];
            if (i) {
                let c = e[s],
                    f = c === void 0 || i(c, s, e);
                if (f !== !0) throw new h("option " + s + " must be " + f, h.ERR_BAD_OPTION_VALUE);
                continue
            }
            if (r !== !0) throw new h("Unknown option " + s, h.ERR_BAD_OPTION)
        }
    }
    var be = {
        assertOptions: on,
        validators: ze
    };
    var U = be.validators,
        V = class {
            constructor(t) {
                this.defaults = t, this.interceptors = {
                    request: new Ce,
                    response: new Ce
                }
            }
            request(t, r) {
                return T(this, null, function*() {
                    try {
                        return yield this._request(t, r)
                    } catch (n) {
                        if (n instanceof Error) {
                            let o;
                            Error.captureStackTrace ? Error.captureStackTrace(o = {}) : o = new Error;
                            let s = o.stack ? o.stack.replace(/^.+\n/, "") : "";
                            try {
                                n.stack ? s && !String(n.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + s) : n.stack = s
                            } catch (i) {}
                        }
                        throw n
                    }
                })
            }
            _request(t, r) {
                typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = P(this.defaults, r);
                let {
                    transitional: n,
                    paramsSerializer: o,
                    headers: s
                } = r;
                n !== void 0 && be.assertOptions(n, {
                    silentJSONParsing: U.transitional(U.boolean),
                    forcedJSONParsing: U.transitional(U.boolean),
                    clarifyTimeoutError: U.transitional(U.boolean)
                }, !1), o != null && (a.isFunction(o) ? r.paramsSerializer = {
                    serialize: o
                } : be.assertOptions(o, {
                    encode: U.function,
                    serialize: U.function
                }, !0)), r.method = (r.method || this.defaults.method || "get").toLowerCase();
                let i = s && a.merge(s.common, s[r.method]);
                s && a.forEach(["delete", "get", "head", "post", "put", "patch", "common"], p => {
                    delete s[p]
                }), r.headers = x.concat(i, s);
                let c = [],
                    f = !0;
                this.interceptors.request.forEach(function(y) {
                    typeof y.runWhen == "function" && y.runWhen(r) === !1 || (f = f && y.synchronous, c.unshift(y.fulfilled, y.rejected))
                });
                let u = [];
                this.interceptors.response.forEach(function(y) {
                    u.push(y.fulfilled, y.rejected)
                });
                let l, d = 0,
                    w;
                if (!f) {
                    let p = [Ee.bind(this), void 0];
                    for (p.unshift.apply(p, c), p.push.apply(p, u), w = p.length, l = Promise.resolve(r); d < w;) l = l.then(p[d++], p[d++]);
                    return l
                }
                w = c.length;
                let E = r;
                for (d = 0; d < w;) {
                    let p = c[d++],
                        y = c[d++];
                    try {
                        E = p(E)
                    } catch (m) {
                        y.call(this, m);
                        break
                    }
                }
                try {
                    l = Ee.call(this, E)
                } catch (p) {
                    return Promise.reject(p)
                }
                for (d = 0, w = u.length; d < w;) l = l.then(u[d++], u[d++]);
                return l
            }
            getUri(t) {
                t = P(this.defaults, t);
                let r = te(t.baseURL, t.url);
                return X(r, t.params, t.paramsSerializer)
            }
        };
    a.forEach(["delete", "get", "head", "options"], function(t) {
        V.prototype[t] = function(r, n) {
            return this.request(P(n || {}, {
                method: t,
                url: r,
                data: (n || {}).data
            }))
        }
    });
    a.forEach(["post", "put", "patch"], function(t) {
        function r(n) {
            return function(s, i, c) {
                return this.request(P(c || {}, {
                    method: t,
                    headers: n ? {
                        "Content-Type": "multipart/form-data"
                    } : {},
                    url: s,
                    data: i
                }))
            }
        }
        V.prototype[t] = r(), V.prototype[t + "Form"] = r(!0)
    });
    var re = V;
    var Je = class e {
            constructor(t) {
                if (typeof t != "function") throw new TypeError("executor must be a function.");
                let r;
                this.promise = new Promise(function(s) {
                    r = s
                });
                let n = this;
                this.promise.then(o => {
                    if (!n._listeners) return;
                    let s = n._listeners.length;
                    for (; s-- > 0;) n._listeners[s](o);
                    n._listeners = null
                }), this.promise.then = o => {
                    let s, i = new Promise(c => {
                        n.subscribe(c), s = c
                    }).then(o);
                    return i.cancel = function() {
                        n.unsubscribe(s)
                    }, i
                }, t(function(s, i, c) {
                    n.reason || (n.reason = new F(s, i, c), r(n.reason))
                })
            }
            throwIfRequested() {
                if (this.reason) throw this.reason
            }
            subscribe(t) {
                if (this.reason) {
                    t(this.reason);
                    return
                }
                this._listeners ? this._listeners.push(t) : this._listeners = [t]
            }
            unsubscribe(t) {
                if (!this._listeners) return;
                let r = this._listeners.indexOf(t);
                r !== -1 && this._listeners.splice(r, 1)
            }
            toAbortSignal() {
                let t = new AbortController,
                    r = n => {
                        t.abort(n)
                    };
                return this.subscribe(r), t.signal.unsubscribe = () => this.unsubscribe(r), t.signal
            }
            static source() {
                let t;
                return {
                    token: new e(function(o) {
                        t = o
                    }),
                    cancel: t
                }
            }
        },
        Bt = Je;

    function Ve(e) {
        return function(r) {
            return e.apply(null, r)
        }
    }

    function We(e) {
        return a.isObject(e) && e.isAxiosError === !0
    }
    var Ke = {
        Continue: 100,
        SwitchingProtocols: 101,
        Processing: 102,
        EarlyHints: 103,
        Ok: 200,
        Created: 201,
        Accepted: 202,
        NonAuthoritativeInformation: 203,
        NoContent: 204,
        ResetContent: 205,
        PartialContent: 206,
        MultiStatus: 207,
        AlreadyReported: 208,
        ImUsed: 226,
        MultipleChoices: 300,
        MovedPermanently: 301,
        Found: 302,
        SeeOther: 303,
        NotModified: 304,
        UseProxy: 305,
        Unused: 306,
        TemporaryRedirect: 307,
        PermanentRedirect: 308,
        BadRequest: 400,
        Unauthorized: 401,
        PaymentRequired: 402,
        Forbidden: 403,
        NotFound: 404,
        MethodNotAllowed: 405,
        NotAcceptable: 406,
        ProxyAuthenticationRequired: 407,
        RequestTimeout: 408,
        Conflict: 409,
        Gone: 410,
        LengthRequired: 411,
        PreconditionFailed: 412,
        PayloadTooLarge: 413,
        UriTooLong: 414,
        UnsupportedMediaType: 415,
        RangeNotSatisfiable: 416,
        ExpectationFailed: 417,
        ImATeapot: 418,
        MisdirectedRequest: 421,
        UnprocessableEntity: 422,
        Locked: 423,
        FailedDependency: 424,
        TooEarly: 425,
        UpgradeRequired: 426,
        PreconditionRequired: 428,
        TooManyRequests: 429,
        RequestHeaderFieldsTooLarge: 431,
        UnavailableForLegalReasons: 451,
        InternalServerError: 500,
        NotImplemented: 501,
        BadGateway: 502,
        ServiceUnavailable: 503,
        GatewayTimeout: 504,
        HttpVersionNotSupported: 505,
        VariantAlsoNegotiates: 506,
        InsufficientStorage: 507,
        LoopDetected: 508,
        NotExtended: 510,
        NetworkAuthenticationRequired: 511
    };
    Object.entries(Ke).forEach(([e, t]) => {
        Ke[t] = e
    });
    var It = Ke;

    function jt(e) {
        let t = new re(e),
            r = K(re.prototype.request, t);
        return a.extend(r, re.prototype, t, {
            allOwnKeys: !0
        }), a.extend(r, t, null, {
            allOwnKeys: !0
        }), r.create = function(o) {
            return jt(P(e, o))
        }, r
    }
    var S = jt(v);
    S.Axios = re;
    S.CanceledError = F;
    S.CancelToken = Bt;
    S.isCancel = Y;
    S.VERSION = we;
    S.toFormData = _;
    S.AxiosError = h;
    S.Cancel = S.CanceledError;
    S.all = function(t) {
        return Promise.all(t)
    };
    S.spread = Ve;
    S.isAxiosError = We;
    S.mergeConfig = P;
    S.AxiosHeaders = x;
    S.formToJSON = e => fe(a.isHTMLForm(e) ? new FormData(e) : e);
    S.getAdapter = ye.getAdapter;
    S.HttpStatusCode = It;
    S.default = S;
    var W = S;
    var {
        Axios: hi,
        AxiosError: yi,
        CanceledError: Ei,
        isCancel: wi,
        CancelToken: bi,
        VERSION: gi,
        all: Si,
        Cancel: Ri,
        isAxiosError: xi,
        spread: Ai,
        toFormData: Oi,
        AxiosHeaders: Ti,
        HttpStatusCode: Ci,
        formToJSON: Ni,
        getAdapter: Pi,
        mergeConfig: Fi
    } = W;
    window.addEventListener("pageshow", function(e) {
        e.persisted && window.location.reload()
    });
    document.addEventListener("DOMContentLoaded", function() {
        let e = document.querySelector("#CartDrawer-Checkout1");
        e && (e.setAttribute("type", "button"), e.addEventListener("click", function(t) {
            return T(this, null, function*() {
                t.preventDefault(), e.disabled = !0;
                let r = document.querySelector(".checkbox-content input.check-box"),
                    n = document.querySelector(".free-stickers-pack"),
                    o = c => T(this, null, function*() {
                        try {
                            let f = yield W.post("/cart/add.js", c, {
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            });
                            console.log("added", f.data)
                        } catch (f) {
                            console.error("Error:", f)
                        }
                    }),
                    s = c => T(this, null, function*() {
                        try {
                            let f = yield W.post("/cart/update.js", {
                                updates: c
                            }, {
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            });
                            console.log("removed", f.data)
                        } catch (f) {
                            console.error("Error:", f)
                        }
                    }),
                    i = (c, f) => {
                        let u = c.some(l => l.variant_id === f);
                        return console.log("checkItemExist", u), u
                    };
                if (r || n) {
                    let c = yield W.get("/cart.js");
                    console.log("cartItems", c);
                    let f = document.querySelector(".safeguardId"),
                        u = document.querySelector(".freeProductId"),
                        l = {};
                    r && r.checked ? (console.log("safeguard", r.checked, parseInt(f.value)), i(c.data.items, parseInt(f.value)) || (l = {
                        id: parseInt(f.value),
                        quantity: 1
                    }, yield o(l))) : i(c.data.items, parseInt(f.value)) && (l[parseInt(f.value)] = 0, yield s(l)), n ? i(c.data.items, parseInt(u.value)) || (l = {
                        id: parseInt(u.value),
                        quantity: 1
                    }, yield o(l)) : i(c.data.items, parseInt(u.value)) && (l[parseInt(u.value)] = 0, yield s(l))
                }
                location.href = "/checkout"
            })
        }))
    });
})();