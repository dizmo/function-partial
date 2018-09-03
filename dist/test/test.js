"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:trailing-comma no-console */
var chai_1 = require("chai");
var lib_1 = require("../lib");
require("mocha");
describe("Function.partial", function () {
    it("should exist", function () {
        chai_1.expect(Function.partial).to.not.be.an("undefined");
    });
    it("should be a function", function () {
        chai_1.expect(Function.partial).to.be.a("function");
    });
});
describe("partial", function () {
    it("should exist", function () {
        chai_1.expect(lib_1.partial).to.not.be.an("undefined");
    });
    it("should be a function", function () {
        chai_1.expect(lib_1.partial).to.be.a("function");
    });
});
describe("partial", function () {
    var add = function add(lhs, rhs) {
        return lhs + rhs;
    };
    it("should return a function", function () {
        chai_1.expect(lib_1.partial(add, { lhs: 1 })).to.be.a("function");
    });
    it("should bind 1st argument", function () {
        chai_1.expect(lib_1.partial(add, { lhs: +1 })(0)).to.eq(+1);
    });
    it("should bind 2nd argument", function () {
        chai_1.expect(lib_1.partial(add, { rhs: -1 })(0)).to.eq(-1);
    });
    it("should bind all arguments", function () {
        chai_1.expect(lib_1.partial(add, { lhs: +1, rhs: -1 })()).to.eq(0);
    });
    it("should bind all arguments out of order", function () {
        chai_1.expect(lib_1.partial(add, { rhs: -1, lhs: +1 })()).to.eq(0);
    });
});
describe("partial", function () {
    it("should preserve unbound `this` correctly", function () {
        var fn = function fn(zero) {
            chai_1.expect(zero).to.eq(0);
            return this;
        };
        var args = {
            zero: 0
        };
        chai_1.expect([lib_1.partial(fn, args)()]).to.have.members([undefined]);
    });
    it("should preserve bounded `this` correctly", function () {
        var fn = function fn(zero) {
            chai_1.expect(zero).to.eq(0);
            return this;
        };
        var args = {
            zero: 0
        };
        var self = {
            key: 1
        };
        chai_1.expect([lib_1.partial(fn, args).bind(self)()]).to.have.deep.members([self]);
    });
});
describe("partial", function () {
    var add = function add(lhs, rhs) {
        return lhs + rhs;
    };
    it("should be chainable", function () {
        var inc = lib_1.partial(add, { lhs: +1 });
        chai_1.expect(lib_1.partial(inc, { rhs: -1 })()).to.eq(0);
        var dec = lib_1.partial(add, { rhs: -1 });
        chai_1.expect(lib_1.partial(dec, { lhs: +1 })()).to.eq(0);
    });
});
//# sourceMappingURL=test.js.map