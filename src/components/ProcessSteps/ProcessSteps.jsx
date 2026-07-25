import { processStages } from '../../data/siteContent';
import './ProcessSteps.css';

function ProcessSteps() {
  return (
    <ol className="process-steps">
      {processStages.map((stage, i) => (
        <li key={stage.step} className="process-steps__item">
          <div className="process-steps__marker">
            <span className="mono">{stage.step}</span>
          </div>
          {i < processStages.length - 1 && <span className="process-steps__line" aria-hidden="true" />}
          <h3 className="process-steps__title">{stage.title}</h3>
          <p className="process-steps__desc">{stage.description}</p>
        </li>
      ))}
    </ol>
  );
}

export default ProcessSteps;
