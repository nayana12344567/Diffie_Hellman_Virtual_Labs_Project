// All cryptographic arithmetic uses BigInt (no Number / Math.pow).

export const DEFAULTS = { p: '23', g: '5', a: '6', b: '15' };

// A large example: p = 2^127 - 1 (a Mersenne prime).
export const LARGE_EXAMPLE = {
  p: '170141183460469231731687303715884105727',
  g: '3',
  a: '123456789012345678901234567890',
  b: '987654321098765432109876543210',
};

const MAX_DIGITS = 300;

/** Fast modular exponentiation (square-and-multiply). */
export function modPow(base, exponent, modulus) {
  if (modulus === 1n) return 0n;
  let result = 1n;
  let b = ((base % modulus) + modulus) % modulus;
  let e = exponent;
  while (e > 0n) {
    if (e & 1n) result = (result * b) % modulus;
    e >>= 1n;
    b = (b * b) % modulus;
  }
  return result;
}

const SMALL_PRIMES = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n, 43n, 47n, 53n];

/**
 * Miller-Rabin primality test. Deterministic for n < 3.3 * 10^24
 * and overwhelmingly reliable for larger n (16 fixed prime bases).
 */
export function isPrime(n) {
  if (n < 2n) return false;
  for (const sp of SMALL_PRIMES) {
    if (n === sp) return true;
    if (n % sp === 0n) return false;
  }
  let d = n - 1n;
  let r = 0;
  while ((d & 1n) === 0n) {
    d >>= 1n;
    r += 1;
  }
  for (const a of SMALL_PRIMES) {
    let x = modPow(a, d, n);
    if (x === 1n || x === n - 1n) continue;
    let composite = true;
    for (let i = 1; i < r; i += 1) {
      x = (x * x) % n;
      if (x === n - 1n) {
        composite = false;
        break;
      }
    }
    if (composite) return false;
  }
  return true;
}

/** Parse a user string into a BigInt or return an error message. */
function parseInteger(raw, label) {
  const s = String(raw ?? '').trim();
  if (s === '') return { error: `${label} is required.` };
  if (/^[+-]?\d*\.\d*$/.test(s)) return { error: `${label} must be an integer (decimals are not allowed).` };
  if (!/^[+-]?\d+$/.test(s)) return { error: `${label} must be a numeric integer.` };
  if (s.startsWith('-')) return { error: `${label} must be a positive integer (negative values are not allowed).` };
  if (s.replace(/^\+/, '').replace(/^0+/, '').length > MAX_DIGITS) {
    return { error: `${label} is too large (maximum ${MAX_DIGITS} digits).` };
  }
  return { value: BigInt(s) };
}

/** Validate all four inputs. Returns { errors, values }. */
export function validateInputs({ p, g, a, b }) {
  const errors = [];
  const P = parseInteger(p, 'Prime number p');
  const G = parseInteger(g, 'Generator g');
  const A = parseInteger(a, "Alice's private key a");
  const B = parseInteger(b, "Bob's private key b");
  [P, G, A, B].forEach((r) => r.error && errors.push(r.error));

  if (P.value !== undefined) {
    if (P.value <= 2n) errors.push('Prime number p must be greater than 2.');
    else if (!isPrime(P.value)) errors.push('p is not a prime number. Please enter a valid prime.');
  }
  if (G.value !== undefined && P.value !== undefined && P.value > 2n) {
    if (!(G.value > 1n && G.value < P.value)) errors.push('Generator g must satisfy 1 < g < p.');
  }
  if (A.value !== undefined && A.value < 1n) errors.push("Alice's private key a must be positive (greater than 0).");
  if (B.value !== undefined && B.value < 1n) errors.push("Bob's private key b must be positive (greater than 0).");

  if (errors.length) return { errors, values: null };
  return { errors: [], values: { p: P.value, g: G.value, a: A.value, b: B.value } };
}

/** Run the full key exchange. */
export function computeExchange({ p, g, a, b }) {
  const A = modPow(g, a, p);
  const B = modPow(g, b, p);
  const SA = modPow(B, a, p);
  const SB = modPow(A, b, p);
  return { p, g, a, b, A, B, SA, SB, match: SA === SB };
}
