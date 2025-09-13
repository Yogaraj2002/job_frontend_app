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
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/jobs`);
        const data = await response.json();

        // Safety: make sure we always have an array
        if (!Array.isArray(data)) {
          console.error("Backend did not return an array:", data);
          setJobs([]);
        } else {
          setJobs(data);
        }
