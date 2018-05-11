/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

var $Reader = $protobuf.Reader, $util = $protobuf.util;

var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.N = (function () {

    function N(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    N.prototype.starttime = 0;
    N.prototype.endtime = 0;
    N.prototype.longnote = false;
    N.prototype.parallel = false;

    N.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.N();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
                case 1:
                    m.starttime = r.int32();
                    break;
                case 2:
                    m.endtime = r.int32();
                    break;
                case 3:
                    m.longnote = r.bool();
                    break;
                case 4:
                    m.parallel = r.bool();
                    break;
                default:
                    r.skipType(t & 7);
                    break;
            }
        }
        return m;
    };

    N.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return N;
})();

$root.C = (function () {

    function C(p) {
        this.notes = [];
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    C.prototype.notes = $util.emptyArray;

    C.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.C();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
                case 1:
                    if (!(m.notes && m.notes.length))
                        m.notes = [];
                    m.notes.push($root.N.decode(r, r.uint32()));
                    break;
                default:
                    r.skipType(t & 7);
                    break;
            }
        }
        return m;
    };

    C.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return C;
})();

$root.M = (function () {

    function M(p) {
        this.channels = [];
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    M.prototype.channels = $util.emptyArray;
    M.prototype.speed = 0;

    M.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.M();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
                case 1:
                    if (!(m.channels && m.channels.length))
                        m.channels = [];
                    m.channels.push($root.C.decode(r, r.uint32()));
                    break;
                case 2:
                    m.speed = r.int32();
                    break;
                default:
                    r.skipType(t & 7);
                    break;
            }
        }
        return m;
    };

    M.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return M;
})();

module.exports = $root;
