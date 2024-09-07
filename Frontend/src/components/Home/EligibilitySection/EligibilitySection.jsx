import React from 'react';
import './EligibilitySection.css';

const EligibilitySection = () => (
  <section className="eligibility-section">
    <h2>Eligibility Criteria</h2>
    <ul>
      <li>Indian citizen</li>
      <li>Passed Class XII or equivalent</li>
      <li>Family income below a certain threshold</li>
      <li>More criteria...</li>
    </ul>
    <button className="btn details-button">View Detailed Criteria</button>
  </section>
);

export default EligibilitySection;
