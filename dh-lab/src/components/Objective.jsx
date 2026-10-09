export default function Objective() {
  return (
    <section>
      <h2 className="content-title">Objective</h2>
      <p className="para">
        To implement the Diffie-Hellman key exchange algorithm using a large prime group and
        understand how two parties establish a common shared secret.
      </p>

      <h3 className="sub-title">After this experiment you will be able to:</h3>
      <ul className="terms">
        <li>Explain why two people need a shared secret key and why sending it directly is risky.</li>
        <li>Calculate public keys and the shared secret using modular exponentiation.</li>
        <li>See that Alice and Bob always get the same shared secret.</li>
        <li>Understand why large prime numbers make the scheme hard to break.</li>
        <li>Check what happens when wrong inputs are given (for example, a number that is not prime).</li>
      </ul>

      <div className="note">
        <b>What you need to know first:</b> only basic ideas of powers (for example 2<sup>3</sup> = 8)
        and remainders (for example 17 divided by 5 leaves 2). Both are explained in the Theory section.
      </div>
    </section>
  );
}
