import React from 'react';
import { Check } from 'lucide-react';

const styles = `
.stepper-container {
  background-color: var(--color-surface);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  margin-bottom: 1.5rem;
}

.stepper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.step-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.step-circle {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: var(--font-size-sm);
  transition: all 0.3s;
}

.step-completed .step-circle {
  background-color: var(--color-success);
  color: white;
}

.step-current .step-circle {
  background-color: var(--color-primary);
  color: white;
}

.step-pending .step-circle {
  background-color: white;
  color: var(--color-text-secondary);
  border: 2px solid var(--color-border);
}

.step-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
}

.step-connector {
  width: 3rem;
  height: 2px;
  background-color: var(--color-border);
  transition: background-color 0.3s;
}

.connector-active {
  background-color: var(--color-success);
}
`;

const OperationStatusStepper = ({ currentStatus, steps = [] }) => {
  const defaultSteps = [
    { key: 'draft', label: 'Draft' },
    { key: 'ready', label: 'Ready' },
    { key: 'done', label: 'Done' }
  ];

  const displaySteps = steps.length > 0 ? steps : defaultSteps;
  const currentIndex = displaySteps.findIndex(s => s.key === currentStatus);

  const getStepStatus = (index) => {
    if (index < currentIndex) return 'step-completed';
    if (index === currentIndex) return 'step-current';
    return 'step-pending';
  };

  return (
    <>
      <style>{styles}</style>
      <div className="stepper-container">
        <div className="stepper">
          {displaySteps.map((step, index) => (
            <React.Fragment key={step.key}>
              <div className="step-wrapper">
                <div className={`step ${getStepStatus(index)}`}>
                  <div className="step-circle">
                    {index < currentIndex ? (
                      <Check size={16} />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="step-label">{step.label}</span>
                </div>
              </div>
              {index < displaySteps.length - 1 && (
                <div className={`step-connector ${
                  index < currentIndex ? 'connector-active' : ''
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default OperationStatusStepper;