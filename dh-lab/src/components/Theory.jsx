export default function Theory() {
  return (
    <section>
      <h2 className="content-title">Theory</h2>

      <h3 className="sub-title">1. Basic idea: remainder (mod)</h3>
      <p className="para">
        The expression <b>x mod p</b> means &quot;the remainder when x is divided by p&quot;. A clock
        is a good example: 17:00 is 5 o&apos;clock on a 12-hour clock because 17 mod 12 = 5. In
        the same way, 8<sup>2</sup> mod 5 = 64 mod 5 = 4.
      </p>

      <h3 className="sub-title">2. The terms used</h3>
      <ul className="terms">
        <li><b>Prime number p</b> &ndash; a number that has no divisors except 1 and itself (for example 23). It is public and all calculations are done mod p. In real systems p has 2048 bits or more.</li>
        <li><b>Generator g</b> &ndash; a public base number with 1 &lt; g &lt; p. Its powers, taken mod p, produce the values used in the exchange.</li>
        <li><b>Alice private key a</b> &ndash; a secret positive number chosen by Alice. She never shares it.</li>
        <li><b>Bob private key b</b> &ndash; a secret positive number chosen by Bob. He never shares it.</li>
        <li><b>Alice public key A</b> &ndash; calculated from g and a. Alice sends it to Bob openly.</li>
        <li><b>Bob public key B</b> &ndash; calculated from g and b. Bob sends it to Alice openly.</li>
        <li><b>Shared secret</b> &ndash; the common value that both Alice and Bob calculate on their own. It is used later as a key for encryption.</li>
      </ul>

      <h3 className="sub-title">3. Formulas</h3>
      <p className="para-left">Public keys:</p>
      <div className="formula">A = g<sup>a</sup> mod p</div>
      <div className="formula">B = g<sup>b</sup> mod p</div>
      <p className="para-left">Alice Shared Secret:</p>
      <div className="formula">S<sub>A</sub> = B<sup>a</sup> mod p</div>
      <p className="para-left">Bob Shared Secret:</p>
      <div className="formula">S<sub>B</sub> = A<sup>b</sup> mod p</div>

      <h3 className="sub-title">4. Why both get the same secret</h3>
      <p className="para">
        Alice puts B = g<sup>b</sup> into her formula, so S<sub>A</sub> = (g<sup>b</sup>)
        <sup>a</sup> mod p = g<sup>(ab)</sup> mod p. Bob puts A = g<sup>a</sup> into his formula,
        so S<sub>B</sub> = (g<sup>a</sup>)<sup>b</sup> mod p = g<sup>(ab)</sup> mod p.
      </p>
      <div className="formula">S<sub>A</sub> = S<sub>B</sub> = g<sup>(ab)</sup> mod p</div>
      <p className="para">
        Multiplication does not depend on order (a &times; b = b &times; a), so both parties
        obtain the same shared secret.
      </p>

      <h3 className="sub-title">5. Small worked example</h3>
      <p className="para-left">Let p = 23, g = 5, a = 6 and b = 15.</p>
      <table className="table">
        <tbody>
          <tr><th>Alice public key</th><td>A = 5<sup>6</sup> mod 23 = 15625 mod 23 = 8</td></tr>
          <tr><th>Bob public key</th><td>B = 5<sup>15</sup> mod 23 = 19</td></tr>
          <tr><th>Alice shared secret</th><td>S<sub>A</sub> = 19<sup>6</sup> mod 23 = 2</td></tr>
          <tr><th>Bob shared secret</th><td>S<sub>B</sub> = 8<sup>15</sup> mod 23 = 2</td></tr>
        </tbody>
      </table>

      <h3 className="sub-title">6. What is public and what is secret?</h3>
      <table className="table">
        <tbody>
          <tr><th>Public (an attacker can see)</th><td>p, g, A, B</td></tr>
          <tr><th>Secret (never sent)</th><td>a, b and the shared secret</td></tr>
        </tbody>
      </table>

      <h3 className="sub-title">7. Why large primes?</h3>
      <p className="para">
        With a small prime like 23, an attacker can simply try every value of a until A matches.
        With a prime of hundreds of digits, the number of possibilities is far too large to try.
        Finding a from g, p and A is the <i>discrete logarithm problem</i>, which has no known
        fast method for well-chosen large primes. That is why this experiment uses BigInt, which
        can store and calculate numbers of any size.
      </p>

      <div className="note">
        <b>Important limitation:</b> basic Diffie-Hellman does not check who you are talking to.
        An attacker sitting between Alice and Bob (a man-in-the-middle attack) can pretend to be
        each of them. Real systems therefore combine Diffie-Hellman with digital signatures or
        certificates.
      </div>
    </section>
  );
}
