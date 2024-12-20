import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CreateEvent.css"; // Use the same CSS as CreateEvent for consistent styling
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function UpdateJob() {
  const { id } = useParams(); // Extracting the job ID from the URL params
  const navigate = useNavigate();

  // Setting initial state for form data
  const [formData, setFormData] = useState({
    roleName: "",
    description: "",
    qualifications: "",
    keyResponsibilities: "",
  });

  // Fetching the job data for updating
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(`https://alfarah-full-stack.vercel.app/jobs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch job data");
        }
        const data = await response.json();
        setFormData({
          roleName: data.roleName,
          description: data.description,
          qualifications: data.qualifications.join(", "),
          keyResponsibilities: data.keyResponsibilities.join(", "),
        });
      } catch (error) {
        console.error("Error fetching job data:", error);
        alert("Failed to load job details. Please try again.");
      }
    };
    fetchJobData();
  }, [id]);

  // Handling form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handling form submission to update the job
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the backend (convert qualifications and responsibilities to arrays)
    const dataToSend = {
      ...formData,
      qualifications: formData.qualifications.split(",").map((item) => item.trim()),
      keyResponsibilities: formData.keyResponsibilities.split(",").map((item) => item.trim()),
    };

    try {
      const response = await fetch(`https://alfarah-full-stack.vercel.app/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("Job updated successfully!");
        navigate("/jobs"); // Redirect to jobs page after successful update
      } else {
        throw new Error("Failed to update job");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Error updating job. Please try again.");
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate("/jobs"); // Navigate back to jobs page
  };

  return (
    <div className="update-event-page">
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
          <h2>Update Job</h2>
        </div>

        {/* Job Update Form */}
        <form onSubmit={handleSubmit} className="create-event-form">
          <div className="form-group">
            <label htmlFor="roleName">Role Name</label>
            <input
              type="text"
              name="roleName"
              value={formData.roleName}
              onChange={handleChange}
              placeholder="Enter job role"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Job Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter job description"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="qualifications">Qualifications (comma-separated)</label>
            <input
              type="text"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              placeholder="Enter qualifications, separated by commas"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="keyResponsibilities">Key Responsibilities (comma-separated)</label>
            <input
              type="text"
              name="keyResponsibilities"
              value={formData.keyResponsibilities}
              onChange={handleChange}
              placeholder="Enter responsibilities, separated by commas"
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-update">Update Job</button>
            <button type="button" className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateJob;
