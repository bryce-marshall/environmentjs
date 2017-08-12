/**
 * Represents a Javascript runtime environment.
 * @enum JSRuntime
 */
export enum JSRuntime {
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
    NodeJS = 2
}

/**
 * A static class that exposes properties which return information about the currently executing Javascript runtime environment.
 * @class JSEnvironment
 */
export class JSEnvironment {
    /** @internal */
    private static _r: JSRuntime = null;

    /**
     * Returns true if the current runtime environment is a browser DOM, otherwise returns false.
     * @property isDOM
     */
    static get isDOM(): boolean {
        return JSEnvironment.runtime == JSRuntime.DOM;
    }

    /**
     * Returns true if the current runtime environment is Node.js, otherwise returns false.
     * @property isNodeJS
     */
    static get isNodeJS(): boolean {
        return JSEnvironment.runtime == JSRuntime.NodeJS;
    }

    /**
     * Returns a JSRuntime value representing the type of the currently executing Javascript runtime environment.
     * @property runtime
     */
    static get runtime(): JSRuntime {
        if (JSEnvironment._r != null)
            return JSEnvironment._r;
        try {
            if (typeof window != "undefined" && typeof window.setTimeout === "function")
                JSEnvironment._r = JSRuntime.DOM;
            else if (typeof global != "undefined" && typeof global.setTimeout === "function")
                JSEnvironment._r = JSRuntime.NodeJS;
        }
        catch (e) { }

        return JSEnvironment._r != null ? JSEnvironment._r : JSRuntime.Unknown;
    }

    /**
     * Returns a string representing the name of the the currently executing Javascript runtime environment, or an empty string if the current environment cannot be identified.
     * @property runtime
     */
    static get runtimeName(): string {
        switch (JSEnvironment.runtime) {
            case JSRuntime.DOM:
                return "DOM";
            case JSRuntime.NodeJS:
                return "NodeJS";
            default:
                return "";
        }
    }

    /**
     * Returns a string representing the name of the platform hosting the currently executing Javascript runtime environment, or an empty string if the platform cannot be identified.
     * @property platform
     */
    static get platform(): string {
        switch (JSEnvironment.runtime) {
            case JSRuntime.DOM:
                return window.navigator.platform;

            case JSRuntime.NodeJS:
                return process.platform;
        }
        return "";
    }

    /**
     * Returns a string representing the product name of the currently executing Javascript runtime environment, or an empty string if the product name cannot be identified.
     * 
     * Remarks:
     * 
     * For DOM environments, this property simply returns window.navigator.appName, which cannot be used to reliably identify the host browser.
     * @property platform
     */
    static get product(): string {
        switch (JSEnvironment.runtime) {
            case JSRuntime.DOM:
                return window.navigator.appName;

            case JSRuntime.NodeJS:
                return "Node.js";
        }
        return "";
    }

    /**
     * Returns a string representing the version of the currently executing Javascript runtime environment, or an empty string if the version cannot be identified.
     * 
     * Remarks:
     * 
     * For DOM environments, this property simply returns window.navigator.appVersion, which cannot be used to reliably identify the version of the host browser.
     * @property platform
     */
    static get productVersion(): string {
        switch (JSEnvironment.runtime) {
            case JSRuntime.DOM:
                return window.navigator.appVersion;

            case JSRuntime.NodeJS:
                return process.version;
        }
        return "";
    }
}