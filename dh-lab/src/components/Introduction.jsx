export default function Introduction() {
  return (
    <section>
      <h2 className="content-title">Diffie-Hellman Key Exchange</h2>

      <p className="para">
        The Diffie-Hellman key exchange is a key agreement algorithm. It allows two parties to
        establish a common secret over a public channel without directly exchanging their private
        keys. Each party combines its own private key with the public value received from the
        other party, and both arrive at the same shared secret.
      </p>

      <h3 className="sub-title">What is the problem?</h3>
      <p className="para">
        Suppose Alice and Bob want to talk privately over the internet. They want to lock their
        messages with a secret key, but they have never met, so they have no secret key yet. If
        they send the key over the internet, an attacker can read it. Diffie-Hellman solves this
        problem: Alice and Bob can create the same secret key even though everyone can see the
        messages they send to each other.
      </p>

      <h3 className="sub-title">A simple idea: mixing paint</h3>
      <p className="para-left">Think of mixing colours:</p>
      <ol className="steps">
        <li>Alice and Bob publicly agree on one common colour, for example yellow.</li>
        <li>Alice secretly picks her own colour, and Bob secretly picks his own colour.</li>
        <li>Each person mixes the common colour with their secret colour and sends the mixture to the other.</li>
        <li>Alice adds her secret colour to Bob&apos;s mixture. Bob adds his secret colour to Alice&apos;s mixture.</li>
        <li>Both now have the same final colour. An attacker who saw only the mixtures cannot easily separate the colours.</li>
      </ol>
      <p className="para">
        In real Diffie-Hellman, &quot;mixing colours&quot; is replaced by a mathematical operation
        (power and remainder) that is easy to do in one direction but extremely hard to undo.
      </p>

      <h3 className="sub-title">Where is it used?</h3>
      <ul className="terms">
        <li>HTTPS and TLS, which protect websites.</li>
        <li>VPNs and secure shell (SSH) connections.</li>
        <li>Secure messaging applications.</li>
      </ul>

      <div className="note">
        <b>Why is it secure?</b> Everyone can see p, g, A and B, but to find the private key
        from them an attacker must solve the <i>discrete logarithm problem</i>. For very large
        primes (hundreds of digits) this is not possible with today&apos;s computers in a
        reasonable time.
      </div>
    </section>
  );
}
