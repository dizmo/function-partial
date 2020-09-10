import { expect } from "chai";
import { partial } from "../lib";

import "mocha";

describe("Function.partial", () => {
    it("should exist", () => {
        expect(Function.partial).to.not.be.an("undefined");
    });
    it("should be a function", () => {
        expect(Function.partial).to.be.a("function");
    });
});
describe("partial", () => {
    it("should exist", () => {
        expect(partial).to.not.be.an("undefined");
    });
    it("should be a function", () => {
        expect(partial).to.be.a("function");
    });
});
describe("partial", () => {
    const add = (lhs: number, rhs: number): number => {
        return lhs + rhs;
    };
    it("should return a function", () => {
        expect(partial(add, {lhs: 1})).to.be.a("function");
    });
    it("should bind 1st argument", () => {
        expect(partial(add, {lhs: +1})(0)).to.eq(+1);
    });
    it("should bind 2nd argument", () => {
        expect(partial(add, {rhs: -1})(0)).to.eq(-1);
    });
    it("should bind all arguments", () => {
        expect(partial(add, {lhs: +1, rhs: -1})()).to.eq(0);
    });
    it("should bind all arguments out of order", () => {
        expect(partial(add, {rhs: -1, lhs: +1})()).to.eq(0);
    });
});
describe("partial", () => {
    it("should preserve unbound `this` correctly", () => {
        const fn = function(this: any, zero: number): any {
            expect(zero).to.eq(0);
            return this;
        };
        const args = {
            zero: 0
        };
        expect([
            partial(fn, args)()
        ]).to.have.deep.members([
            undefined
        ]);
    });
    it("should preserve bounded `this` correctly", () => {
        const fn = function(this: any, zero: number): any {
            expect(zero).to.eq(0);
            return this;
        };
        const args = {
            zero: 0
        };
        const self = {
            key: 1
        };
        expect([
            partial(fn, args).bind(self)()
        ]).to.have.deep.members([
            self
        ]);
    });
});
describe("partial", () => {
    const add = (lhs: number, rhs: number): number => {
        return lhs + rhs;
    };
    it("should be chainable", () => {
        const inc = partial(add, {lhs: +1});
        expect(partial(inc, {rhs: -1})()).to.eq(0);
        const dec = partial(add, {rhs: -1});
        expect(partial(dec, {lhs: +1})()).to.eq(0);
    });
});
