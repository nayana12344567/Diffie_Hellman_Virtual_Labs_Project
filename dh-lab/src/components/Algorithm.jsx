export default function Algorithm() {
  return (
    <section>
      <h2 className="content-title">Algorithm</h2>
      <p className="para-left">Follow these steps in order. The explanation after each step is in simple words.</p>
      <ol className="steps">
        <li>
          Select a prime number p.
          <span className="hint">Both Alice and Bob agree on this public number.</span>
        </li>
        <li>
          Select a generator g.
          <span className="hint">Also public. It must be greater than 1 and less than p.</span>
        </li>
        <li>
          Alice selects private key a.
          <span className="hint">A secret positive number known only to Alice.</span>
        </li>
        <li>
          Bob selects private key b.
          <span className="hint">A secret positive number known only to Bob.</span>
        </li>
        <li>
          Alice calculates A = g<sup>a</sup> mod p.
          <span className="hint">This is her public key. She sends A to Bob.</span>
        </li>
        <li>
          Bob calculates B = g<sup>b</sup> mod p.
          <span className="hint">This is his public key. He sends B to Alice.</span>
        </li>
        <li>
          Alice receives B and calculates S<sub>A</sub> = B<sup>a</sup> mod p.
          <span className="hint">She mixes Bob&apos;s public key with her own secret.</span>
        </li>
        <li>
          Bob receives A and calculates S<sub>B</sub> = A<sup>b</sup> mod p.
          <span className="hint">He mixes Alice&apos;s public key with his own secret.</span>
        </li>
        <li>
          Compare the shared secrets.
          <span className="hint">In real life they are not compared openly; here we compare them to verify the experiment.</span>
        </li>
        <li>
          If equal, the key exchange is successful.
          <span className="hint">The common secret can now be used as a key for encrypting messages.</span>
        </li>
      </ol>

      <h3 className="sub-title">How is a large power calculated quickly?</h3>
      <p className="para">
        Numbers like g<sup>a</sup> can have thousands of digits, so we never compute the full
        power first. This experiment uses <b>fast modular exponentiation</b> (square-and-multiply).
        It looks at the binary form of the exponent, repeatedly squares the base, multiplies only
        when needed, and takes mod p after every step so numbers stay small. For example, 5<sup>15</sup>
        needs only about 4 squarings instead of 14 multiplications.
      </p>
    </section>
  );
}
