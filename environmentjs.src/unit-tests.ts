
import { JSEnvironment, JSRuntime } from './package-src/index';

export interface IUnitTest {
    name: string;
    executed: boolean
    passed: boolean;
    error: any;
    execute();
}

export class UnitTest implements IUnitTest {
    private _name: string;
    private _executed: boolean;
    private _passed: boolean;
    private _error: any;

    constructor(name: string, private fn: Function) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    get executed(): boolean {
        return this._executed;
    }

    get passed(): boolean {
        return this._passed;
    }

    get error(): any {
        return this._error;
    }

    execute() {
        console.log("Running test \"" + this.name + "\"");
        try {
            this.fn();
            this._passed = true;
        }
        catch (e) {
            this._passed = false;
            this._error = e;
        };

        console.log("Passed: " + this._passed);
        this._executed = true;
    }
}

const assert = (condition, message?: string) => {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
};

export class UnitTests {
    static createTests(expected: JSRuntime): IUnitTest[] {
        console.log("Creating tests");
        console.log("Runtime: " + JSEnvironment.runtimeName);
        console.log("Platform: " + JSEnvironment.platform);
        console.log("Product: " + JSEnvironment.product);
        console.log("Product Version: " + JSEnvironment.productVersion);
        return [
            new UnitTest("Eval isDOM", () => {
                assert(JSEnvironment.isDOM == (expected == JSRuntime.DOM));
            }),
            new UnitTest("Eval isNodeJS", () => {
                assert(JSEnvironment.isNodeJS == (expected == JSRuntime.NodeJS));
            }),
            new UnitTest("Eval runtime", () => {
                assert(JSEnvironment.runtime == expected);
            }),
            new UnitTest("Eval runtimeName", () => {
                let n: string;
                switch (expected) {
                    case JSRuntime.DOM:
                        n = "DOM";
                        break;
                    case JSRuntime.NodeJS:
                        n = "NodeJS";
                        break;
                }
                assert(JSEnvironment.runtimeName == n);
            })
        ];
    }
}