import assert from 'node:assert/strict';
import { modPow, isPrime, validateInputs, computeExchange, LARGE_EXAMPLE } from '../src/utils/diffieHellman.js';

const run = (i) => {
  const v = validateInputs(i);
  assert.equal(v.errors.length, 0, v.errors.join('; '));
  return computeExchange(v.values);
};

let r = run({ p: '23', g: '5', a: '6', b: '15' });
assert.deepEqual([r.A, r.B, r.SA, r.SB], [8n, 19n, 2n, 2n]);
console.log('Test 1 OK  A=8 B=19 SA=2 SB=2');

r = run({ p: '47', g: '5', a: '6', b: '15' });
assert.equal(r.SA, r.SB);
console.log('Test 2 OK  p=47 ->', `A=${r.A} B=${r.B} S=${r.SA}`);

r = run(LARGE_EXAMPLE);
assert.equal(r.SA, r.SB);
assert.equal(modPow(r.g, r.a * r.b, r.p), r.SA);
console.log('Test 3 OK  127-bit prime, S =', r.SA.toString());

assert.ok(isPrime(2n ** 127n - 1n) && !isPrime(2n ** 127n + 1n) && isPrime(2n ** 521n - 1n));
assert.ok(!isPrime(561n) && !isPrime(1n) && isPrime(97n));
console.log('Primality OK');

const bad = [
  [{ p: '', g: '5', a: '6', b: '15' }, 'empty p'],
  [{ p: '22', g: '5', a: '6', b: '15' }, 'composite p'],
  [{ p: '2', g: '5', a: '6', b: '15' }, 'p<=2'],
  [{ p: '23.5', g: '5', a: '6', b: '15' }, 'decimal p'],
  [{ p: 'abc', g: '5', a: '6', b: '15' }, 'non-numeric p'],
  [{ p: '23', g: '1', a: '6', b: '15' }, 'g=1'],
  [{ p: '23', g: '23', a: '6', b: '15' }, 'g=p'],
  [{ p: '23', g: '5', a: '-6', b: '15' }, 'negative a'],
  [{ p: '23', g: '5', a: '6', b: '0' }, 'b=0'],
  [{ p: '23', g: '5', a: '1e5', b: '15' }, 'exponent notation'],
  [{ p: '-23', g: '5', a: '6', b: '15' }, 'negative p'],
  [{ p: '23', g: '5', a: '6', b: '15'.padEnd(400, '1') }, 'huge b'],
];
for (const [i, name] of bad) {
  assert.ok(validateInputs(i).errors.length > 0, name);
}
console.log('Invalid-input tests OK (' + bad.length + ' cases)');
