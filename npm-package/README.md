# @brycemarshall/environmentjs

A utility for determining the executing script's runtime environment (either the DOM or Node.js).

## Installation

`npm install @brycemarshall/environmentjs`

#The module exports the following types:

```ts
/**
 * Represents a Javascript runtime environment.
 * @enum JSRuntime
 */
export declare enum JSRuntime {
    /**
     * An unknown runtime environment.
     */
    Unknown = 0,
    /**
     * A runtime environment hosted within a browser DOM (Document Object Model).
     */
    DOM = 1,
    /**
     * A runtime environment hosted within Node.js.
     */
    NodeJS = 2,
}
/**
 * A static class that exposes properties which return information about the currently executing Javascript runtime environment.
 * @class JSEnvironment
 */
export declare class JSEnvironment {
    /** @internal */
    private static _r;
    /**
     * Returns true if the current runtime environment is a browser DOM, otherwise returns false.
     * @property isDOM
     */
    static readonly isDOM: boolean;
    /**
     * Returns true if the current runtime environment is Node.js, otherwise returns false.
     * @property isNodeJS
     */
    static readonly isNodeJS: boolean;
    /**
     * Returns a JSRuntime value representing the type of the currently executing Javascript runtime environment.
     * @property runtime
     */
    static readonly runtime: JSRuntime;
    /**
     * Returns a string representing the name of the the currently executing Javascript runtime environment, or an empty string if the current environment cannot be identified.
     * @property runtime
     */
    static readonly runtimeName: string;
    /**
     * Returns a string representing the name of the platform hosting the currently executing Javascript runtime environment, or an empty string if the platform cannot be identified.
     * @property platform
     */
    static readonly platform: string;
    /**
     * Returns a string representing the product name of the currently executing Javascript runtime environment, or an empty string if the product name cannot be identified.
     *
     * Remarks:
     *
     * For DOM environments, this property simply returns window.navigator.appName, which cannot be used to reliably identify the host browser.
     * @property platform
     */
    static readonly product: string;
    /**
     * Returns a string representing the version of the currently executing Javascript runtime environment, or an empty string if the version cannot be identified.
     *
     * Remarks:
     *
     * For DOM environments, this property simply returns window.navigator.appVersion, which cannot be used to reliably identify the version of the host browser.
     * @property platform
     */
    static readonly productVersion: string;
}
```

## Contributors

 - Bryce Marshall

## MIT Licenced
