import { UnitTests } from './unit-tests';
import { JSRuntime } from './package-src/index';

var unitTests = UnitTests.createTests(JSRuntime.NodeJS);

for (let test of unitTests) {
    test.execute();
}
