import { UnitTests } from './unit-tests';
import { JSRuntime } from './package-src/index';

window.onload = function () {
    var unitTests = UnitTests.createTests(JSRuntime.DOM);

    for (let test of unitTests) {
        test.execute();
    }
}
