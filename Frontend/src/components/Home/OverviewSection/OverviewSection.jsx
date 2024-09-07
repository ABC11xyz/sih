import React from 'react';
import './OverviewSection.css';

const OverviewSection = () => (
  <section className="overview-section">
    <h2>About PMSSS</h2>
    <p>The Prime Minister's Special Scholarship Scheme is designed to support students in pursuing higher education...</p>
    <div className="features">
      <div className="feature">
        <h3>Financial Assistance</h3>
        <p>Covering tuition fees, living expenses, and more.</p>
      </div>
      <div className="feature">
        <h3>Wide Eligibility</h3>
        <p>Open to students across various disciplines.</p>
      </div>
    </div>
  </section>
);

export default OverviewSection;
