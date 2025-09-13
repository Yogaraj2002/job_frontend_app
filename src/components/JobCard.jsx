import React from 'react';
import './JobCard.css';
import { FaDollarSign } from 'react-icons/fa';

function apply() {
  alert("Your Application Submitted Successfully.");
}

const JobCard = ({ job }) => {
  // Format salary display
  const formatSalary = (min, max) => {
    if (!min && !max) return 'Salary not specified';
    if (!min) return `Up to ₹${max}`;
    if (!max) return `From ₹${min}`;
    return `₹${min} - ₹${max}`;
  };

  return (
    <div className="job-card">
      <div className="card-header">
        <div className="company-logo"></div>
        <span className="posted-ago">24h Ago</span>
      </div>
      <h3 className="job-title">{job.jobTitle || 'Untitled Position'}</h3>
      <div className="job-meta">
        <span>{job.experience || 'Experience not specified'}</span>
        <span>{job.location || 'Location not specified'}</span>
        <span>{job.jobType || 'Type not specified'}</span>
        <span>
          <FaDollarSign className="meta-icon" /> {formatSalary(job.salaryMin, job.salaryMax)}
        </span>
      </div>
      <p className="job-description">{job.description || 'No description available'}</p>
      <button onClick={apply} className="apply-btn">Apply Now</button>
    </div>
  );
};

export default JobCard;
