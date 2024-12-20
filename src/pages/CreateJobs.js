import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css'; // Use the same CSS for consistent styling
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const CreateJobs = () => {
  const [jobData, setJobData] = useState({
    roleName: '',
    description: '',
    qualifications: '',
    keyResponsibilities: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for API call
    const dataToSend = {
      ...jobData,
      qualifications: jobData.qualifications.split(',').map((q) => q.trim()),
      keyResponsibilities: jobData.keyResponsibilities.split(',').map((r) => r.trim()),
    };

    try {
      await axios.post('https://alfarah-full-stack.vercel.app/jobs/create', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Job created successfully');
      navigate('/jobs'); // Redirect to the jobs page after successful job creation
    } catch (error) {
      alert('Error creating job');
    }
  };

  const handleCancel = () => {
    navigate('/jobs'); // Redirect to the jobs page if cancel is clicked
  };

  return (
    <div className="create-event-page">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <div className="menu">
          <Link to="/" className="menu-item">Home</Link>
          <Link to="/jobs" className="menu-item">Jobs</Link>
          <Link to="/news" className="menu-item">News & Events</Link>
        </div>
        <div className="logout">
          <button className="logout-btn" onClick={handleCancel}>Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h2>Create New Job</h2>
        </div>

        {/* Job Creation Form */}
        <form onSubmit={handleFormSubmit} className="create-event-form">
          <div className="form-group">
            <label htmlFor="roleName">Role Name</label>
            <input
              type="text"
              name="roleName"
              value={jobData.roleName}
              onChange={handleInputChange}
              placeholder="Enter job role"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Job Description</label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleInputChange}
              placeholder="Enter job description"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="qualifications">Qualifications (comma-separated)</label>
            <input
              type="text"
              name="qualifications"
              value={jobData.qualifications}
              onChange={handleInputChange}
              placeholder="Enter qualifications, separated by commas"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="keyResponsibilities">Key Responsibilities (comma-separated)</label>
            <input
              type="text"
              name="keyResponsibilities"
              value={jobData.keyResponsibilities}
              onChange={handleInputChange}
              placeholder="Enter responsibilities, separated by commas"
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-create">Create Job</button>
            <button type="button" className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobs;
