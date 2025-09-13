import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import './JobList.css';
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [salaryRange, setSalaryRange] = useState(50);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [jobType, setJobType] = useState('Job type');
  const API_URL = import.meta.env.VITE_API_URL;

useEffect(() => {
  fetch(`${API_URL}/api/jobs`)
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) {
        console.error("Backend did not return an array:", data);
        setJobs([]); // prevent filter error
      } else {
        setJobs(data);
      }
    })
    .catch(err => console.error("Error fetching jobs:", err));
}, [API_URL]);

  const handleSalaryChange = (e) => setSalaryRange(e.target.value);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = job.location.toLowerCase().includes(locationQuery.toLowerCase());

    const matchesJobType =
      jobType === 'Job type' || job.jobType.toLowerCase() === jobType.toLowerCase();

    const salaryMin = parseInt(job.salaryMin, 10) || 0;
    const salaryMax = parseInt(job.salaryMax, 10) || Infinity;
    const selectedMin = salaryRange * 1000; 
    const selectedMax = (parseInt(salaryRange) + 20) * 1000;

    const matchesSalary = salaryMin <= selectedMax && salaryMax >= selectedMin;

    return matchesSearch && matchesLocation && matchesJobType && matchesSalary;
  });

  return (
    <div className="job-list-page">
      <div className="filters-bar">
        <div className="filter-group">
          <FaSearch className="filter-icon" />
          <input 
            type="text" 
            placeholder="Search By Job Title, Role" 
            className="filter-input" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <FaMapMarkerAlt className="filter-icon" />
          <input 
            type="text" 
            placeholder="Preferred Location" 
            className="filter-input" 
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <FaBriefcase className="filter-icon" />
          <select 
            className="filter-dropdown"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="Job type">Job type</option>
            <option value="FullTime">Full-time</option>
            <option value="PartTime">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div className="salary-range-container">
          <div className="salary-range-label">
            Salary Per Month &emsp; ₹{salaryRange}k - ₹{parseInt(salaryRange) + 20}k
          </div>
          <input 
            type="range"
            min="10" 
            max="150" 
            value={salaryRange}
            onChange={handleSalaryChange}
            className="salary-range-slider"
          />
        </div>
      </div>

      <div className="job-cards-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => <JobCard key={job.id} job={job} />)
        ) : (
          <p>No jobs found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default JobList;
