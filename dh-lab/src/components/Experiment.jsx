import { useState } from 'react';
import { DEFAULTS, LARGE_EXAMPLE, validateInputs, computeExchange } from '../utils/diffieHellman.js';

const PUBLIC_FIELDS = [
  { key: 'p', label: 'Prime Number (p)' },
  { key: 'g', label: 'Generator (g)' },
];

const PARTICIPANTS = [
  { key: 'a', name: 'Alice', formulaKey: 'A', resultKey: 'A', sharedKey: 'SA' },
  { key: 'b', name: 'Bob', formulaKey: 'B', resultKey: 'B', sharedKey: 'SB' },
];

function PublicKeyEquation({ result, participant }) {
  if (!result) return <span className="equation"> {participant.formulaKey} = g<sup>{participant.key}</sup> mod p</span>;
  return (
    <span className="equation">
      {participant.formulaKey} = {result.g.toString()}<sup>{result[participant.key].toString()}</sup>
      {' '}mod {result.p.toString()} = {result[participant.resultKey].toString()}
    </span>
  );
}

function SharedSecretEquation({ result, participant }) {
  if (!result) {
    return (
      <span className="equation">
        S<sub>{participant.name[0]}</sub> = {participant.name === 'Alice' ? 'B' : 'A'}
        <sup>{participant.key}</sup> mod p
      </span>
    );
  }
  const receivedKey = participant.name === 'Alice' ? result.B : result.A;
  return (
    <span className="equation">
      S<sub>{participant.name[0]}</sub> = {receivedKey.toString()}
      <sup>{result[participant.key].toString()}</sup> mod {result.p.toString()}
      {' '}= {result[participant.sharedKey].toString()}
    </span>
  );
}

function FormulaStep({ number, title, formula, children }) {
  return (
    <div className="formula-step">
      <div className="formula-step-heading">
        <span>{number}</span>
        <strong>{title}</strong>
      </div>
      <p className="formula-general">{formula}</p>
      <div className="formula-substitution">{children}</div>
    </div>
  );
}

export default function Experiment({ result, onResult }) {
  const [inputs, setInputs] = useState({ ...DEFAULTS });
  const [errors, setErrors] = useState([]);

  const handleChange = (key) => (e) => {
    setInputs((previous) => ({ ...previous, [key]: e.target.value }));
    setErrors([]);
    onResult(null);
  };

  const handleCalculate = () => {
    try {
      const { errors: validationErrors, values } = validateInputs(inputs);
      if (validationErrors.length) {
        setErrors(validationErrors);
        onResult(null);
        return;
      }
      setErrors([]);
      onResult(computeExchange(values));
    } catch {
      setErrors(['Unexpected error while calculating. Please check your inputs.']);
      onResult(null);
    }
  };

  const handleReset = () => {
    setInputs({ ...DEFAULTS });
    setErrors([]);
    onResult(null);
  };

  const handleLoadExample = () => {
    setInputs({ ...LARGE_EXAMPLE });
    setErrors([]);
    onResult(null);
  };

  return (
    <section className="experiment-section">
      <h2 className="content-title">Experiment</h2>
      <p className="para experiment-intro">
        Follow the exchange from shared public parameters to independently calculated secret keys.
        All arithmetic uses BigInt and fast modular exponentiation.
      </p>

      <div className="step-section public-parameters">
        <div className="step-heading">
          <span className="step-number">STEP 01</span>
          <h3>Public Parameters</h3>
        </div>
        <p className="step-description">These values are publicly known and shared by both participants.</p>
        <div className="public-input-grid">
          {PUBLIC_FIELDS.map(({ key, label }) => (
            <div className="form-row" key={key}>
              <label htmlFor={`in-${key}`}>{label}</label>
              <input
                id={`in-${key}`}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                spellCheck="false"
                value={inputs[key]}
                onChange={handleChange(key)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="step-section participants-section">
        <div className="step-heading">
          <span className="step-number">STEP 02</span>
          <h3>Alice and Bob</h3>
        </div>
        <p className="step-description">Each participant keeps a private key and calculates a public key.</p>
        <div className="participant-grid">
          {PARTICIPANTS.map((participant) => (
            <article className={`participant-panel participant-${participant.name.toLowerCase()}`} key={participant.key}>
              <div className="participant-heading">
                <span className="participant-avatar" aria-hidden="true">{participant.name[0]}</span>
                <div>
                  <h4>{participant.name}</h4>
                  <span className="participant-role">Key exchange participant</span>
                </div>
              </div>
              <div className="form-row participant-input">
                <label htmlFor={`in-${participant.key}`}>Private Key ({participant.key})</label>
                <input
                  id={`in-${participant.key}`}
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  spellCheck="false"
                  value={inputs[participant.key]}
                  onChange={handleChange(participant.key)}
                />
              </div>
              <div className="public-key-display">
                <span className="result-label">Public Key</span>
                <strong>{result ? result[participant.resultKey].toString() : 'Waiting...'}</strong>
                <div className="public-key-formula">
                  <PublicKeyEquation result={result} participant={participant} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="experiment-controls">
        <div className="buttons">
          <button type="button" className="btn primary" onClick={handleCalculate}>Calculate Key Exchange</button>
          <button type="button" className="btn secondary" onClick={handleLoadExample}>Load Example</button>
          <button type="button" className="btn" onClick={handleReset}>Reset</button>
        </div>
      </div>
      {errors.length > 0 && (
        <div className="errors" role="alert">
          <b>Please correct the following:</b>
          <ul>{errors.map((message) => <li key={message}>{message}</li>)}</ul>
        </div>
      )}

      <div className="step-section exchange-section">
        <div className="step-heading">
          <span className="step-number">STEP 03</span>
          <h3>Public Key Exchange</h3>
        </div>
        {result ? (
          <>
            <div className="exchange-flow">
              <div className="exchange-message"><b>Alice sends</b><span>A = {result.A.toString()}</span><small>to Bob</small></div>
              <svg className="exchange-arrows" viewBox="0 0 80 40" role="img" aria-label="Public keys are exchanged in both directions">
                <path d="M5 11h61l-8-7m8 7-8 7M75 29H14l8-7m-8 7 8 7" />
              </svg>
              <div className="exchange-message"><b>Bob sends</b><span>B = {result.B.toString()}</span><small>to Alice</small></div>
            </div>
          </>
        ) : (
          <p className="waiting-message">Waiting for calculation...</p>
        )}
        <p className="exchange-note">Only public keys are exchanged. Private keys remain with their respective owners.</p>
      </div>

      <div className="step-section verification-section">
        <div className="step-heading">
          <span className="step-number">STEP 04</span>
          <h3>Shared Secret Verification</h3>
        </div>
        <div className="secret-grid">
          {PARTICIPANTS.map((participant) => (
            <div className="secret-panel" key={participant.key}>
              <span className="result-label">{participant.name}&apos;s Shared Secret</span>
              <div className="secret-formula">
                <SharedSecretEquation result={result} participant={participant} />
              </div>
              <strong className="secret-value">
                {result ? result[participant.sharedKey].toString() : '—'}
              </strong>
            </div>
          ))}
        </div>
        {result ? (
          result.match ? (
            <div className="verification-status status ok" role="status">
              <strong>✓ SUCCESS — Shared secrets match!</strong>
              <span>Alice and Bob have independently calculated the same shared secret.</span>
            </div>
          ) : (
            <div className="verification-status status fail" role="alert">
              <strong>✕ ERROR — Shared secrets do not match.</strong>
              <span>Check the parameters and calculate the exchange again.</span>
            </div>
          )
        ) : (
          <div className="verification-status status waiting" role="status">Waiting for calculation...</div>
        )}
      </div>

      {result && (
        <>
          <div className="calculation-steps">
            <div className="step-heading">
              <span className="step-number">DETAIL</span>
              <h3>Calculation Steps</h3>
            </div>
            <div className="formula-steps-grid">
              <FormulaStep number="01" title="Alice Public Key" formula={<>A = g<sup>a</sup> mod p</>}>
                <PublicKeyEquation result={result} participant={PARTICIPANTS[0]} />
              </FormulaStep>
              <FormulaStep number="02" title="Bob Public Key" formula={<>B = g<sup>b</sup> mod p</>}>
                <PublicKeyEquation result={result} participant={PARTICIPANTS[1]} />
              </FormulaStep>
              <FormulaStep number="03" title="Alice Shared Secret" formula={<>S<sub>A</sub> = B<sup>a</sup> mod p</>}>
                <SharedSecretEquation result={result} participant={PARTICIPANTS[0]} />
              </FormulaStep>
              <FormulaStep number="04" title="Bob Shared Secret" formula={<>S<sub>B</sub> = A<sup>b</sup> mod p</>}>
                <SharedSecretEquation result={result} participant={PARTICIPANTS[1]} />
              </FormulaStep>
            </div>
          </div>
          <div className="note">
            <b>What does this mean?</b> Alice and Bob each combine their own private key with the
            other person&apos;s public key. Since both calculate g<sup>(ab)</sup> mod p, their shared
            secrets are equal.
          </div>
        </>
      )}
    </section>
  );
}
