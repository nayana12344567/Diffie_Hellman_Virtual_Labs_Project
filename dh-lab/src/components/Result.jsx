export default function Result({ result, onGoToExperiment }) {
  if (!result) {
    return (
      <section>
        <h2 className="content-title">Result</h2>
        <p className="para">
          No result is available yet. Please run the experiment first.
        </p>
        <p className="center">
          <button type="button" className="btn primary" onClick={onGoToExperiment}>Go to Experiment</button>
        </p>
      </section>
    );
  }
  const s = (v) => v.toString();
  return (
    <section>
      <h2 className="content-title">Result</h2>

      <h3 className="sub-title">Input Parameters</h3>
      <table className="table">
        <tbody>
          <tr><th>p</th><td>{s(result.p)}</td></tr>
          <tr><th>g</th><td>{s(result.g)}</td></tr>
          <tr><th>Alice Private Key</th><td>{s(result.a)}</td></tr>
          <tr><th>Bob Private Key</th><td>{s(result.b)}</td></tr>
        </tbody>
      </table>

      <h3 className="sub-title">Generated Public Keys</h3>
      <table className="table">
        <tbody>
          <tr><th>Alice Public Key</th><td>{s(result.A)}</td></tr>
          <tr><th>Bob Public Key</th><td>{s(result.B)}</td></tr>
        </tbody>
      </table>

      <h3 className="sub-title">Shared Secret</h3>
      <table className="table">
        <tbody>
          <tr><th>Alice</th><td>{s(result.SA)}</td></tr>
          <tr><th>Bob</th><td>{s(result.SB)}</td></tr>
        </tbody>
      </table>

      <h3 className="sub-title">Verification</h3>
      {result.match
        ? <p className="status ok">&#10003; Shared secrets match</p>
        : <p className="status fail">&#10007; Shared secrets do not match</p>}

      <h3 className="sub-title">Conclusion</h3>
      <p className="para">
        {result.match
          ? 'Both Alice and Bob successfully generated the same shared secret.'
          : 'Alice and Bob did not generate the same shared secret. Please verify the parameters.'}
      </p>

      <div className="note">
        <b>How to read this page:</b> the public keys are the values Alice and Bob send over the
        open channel. The private keys never leave their owners. The shared secret is the value
        both of them calculate separately, and it can be used as a key for encryption.
      </div>
    </section>
  );
}
