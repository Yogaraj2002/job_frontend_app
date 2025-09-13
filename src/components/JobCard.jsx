import React from 'react';
import './JobCard.css';
import { FaDollarSign } from 'react-icons/fa';

function apply() {
  alert("Your Application Submitted Successfully.");
}

const JobCard = ({ job }) => (
  <div className="job-card">
    <div className="card-header">
      <div className="company-logo"></div>
      <span className="posted-ago">24h Ago</span>
    </div>
    <h3 className="job-title">{job.jobTitle}</h3>
    <div className="job-meta">
      <span>{job.experience}</span>
      <span>{job.location}</span>
      <span>{job.jobType}</span>
     <span>
  <FaDollarSign className="meta-icon" /> {job.salaryMin} - {job.salaryMax}
</span>

    </div>
    <p className="job-description">{job.description}</p>
    <button onClick={apply} className="apply-btn">Apply Now</button>
  </div>
);

export default JobCard;
