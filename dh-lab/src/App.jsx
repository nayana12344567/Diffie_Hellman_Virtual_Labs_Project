import { useState } from 'react';
import Header from './components/Header.jsx';
import Sidebar, { SECTIONS } from './components/Sidebar.jsx';
import Introduction from './components/Introduction.jsx';
import Objective from './components/Objective.jsx';
import Theory from './components/Theory.jsx';
import Algorithm from './components/Algorithm.jsx';
import Experiment from './components/Experiment.jsx';
import Result from './components/Result.jsx';
import References from './components/References.jsx';

export default function App() {
  const [section, setSection] = useState(SECTIONS[0]);
  // Latest successful experiment result, shared with the Result section.
  const [result, setResult] = useState(null);

  const renderSection = () => {
    switch (section) {
      case 'Introduction':
        return <Introduction />;
      case 'Objective':
        return <Objective />;
      case 'Theory':
        return <Theory />;
      case 'Algorithm':
        return <Algorithm />;
      case 'Experiment':
        return <Experiment result={result} onResult={setResult} />;
      case 'Result':
        return <Result result={result} onGoToExperiment={() => setSection('Experiment')} />;
      case 'References':
        return <References />;
      default:
        return null;
    }
  };

  return (
    <div className="page">
      <Header />
      <section className="title-area">
        <div className="title-content">
          <span className="eyebrow">Secure key agreement · Modular arithmetic</span>
          <h1 className="page-title">Diffie-Hellman Key Exchange with Large Prime Groups</h1>
          <p className="page-subtitle">
            Explore how Alice and Bob securely establish a common secret using mathematical key exchange.
          </p>
          <span className="title-accent" aria-hidden="true" />
        </div>
      </section>
      <div className="main">
        <Sidebar active={section} onSelect={setSection} />
        <main className="content">{renderSection()}</main>
      </div>
    </div>
  );
}
