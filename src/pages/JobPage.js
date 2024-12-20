import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './JobsPage.css'; // Import the updated styles

import logo from "../assets/logo.png"; // Logo

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6); // Show 6 jobs per page
  const navigate = useNavigate();

  // Fetch all jobs when the component mounts
  useEffect(() => {
    fetch("http://localhost:8080/jobs")
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  // Reset pagination when the job list changes
  useEffect(() => {
    setCurrentPage(1);
  }, [jobs]);

  // Delete a job by ID
  const deleteJob = (id) => {
    fetch(`http://localhost:8080/jobs/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setJobs(jobs.filter((job) => job._id !== id));
        } else {
          alert("Failed to delete job.");
        }
      })
      .catch((error) => console.error("Error deleting job:", error));
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  // Pagination Logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const showPagination = jobs.length > jobsPerPage;

  return (
    <div className="jobs-page-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img"/>
        </div>
        <div className="menu">
          <Link to="/" className="menu-item">Home</Link>
          <Link to="/jobs" className="menu-item">Jobs</Link>
          <Link to="/news" className="menu-item">News & Events</Link>
        </div>
        <div className="logout">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Job Listings</h1>
          <Link to="/createJob">
            <button className="create-job-btn">Create Job</button>
          </Link>
        </div>

        {/* Job List Display */}
        <div className="wrapper">
        <div className="job-list">
          {currentJobs.length === 0 ? (
            <p>No jobs available</p>
          ) : (
            currentJobs.map((job) => (
              <div key={job._id} className="job-item">
                <h3>Role: {job.roleName}</h3>
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Qualifications:</strong> {job.qualifications.join(', ')}</p>
                <p><strong>Responsibilities:</strong> {job.keyResponsibilities.join(', ')}</p>
                <div className="job-actions">
                  <Link to={`/updateJob/${job._id}`}>
                    <button className="update-btn">Update</button>
                  </Link>
                  <button className="delete-btn" onClick={() => deleteJob(job._id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
        </div>

        {/* Pagination */}
        {showPagination && (
          <div className="pagination">
            {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, index) => (
              <button 
                key={index + 1} 
                onClick={() => paginate(index + 1)} 
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobsPage;
