import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateEvent.css'; // Import the CSS for styling
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';

const UpdateEvent = () => {
  const { id } = useParams(); // Get event ID from URL params
  const navigate = useNavigate(); // Hook for navigation
  const [eventData, setEventData] = useState({
    heading: '',
    location: '',
    description: '',
    image: null,
  });

  // Fetch the existing event data when the component is loaded
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/events/${id}`);
        setEventData({
          heading: response.data.heading,
          location: response.data.location,
          description: response.data.description,
          image: response.data.image, // Set the current image URL
        });
      } catch (error) {
        alert('Error fetching event data');
      }
    };
    fetchEventData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e) => {
    setEventData({ ...eventData, image: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('heading', eventData.heading);
    formData.append('location', eventData.location);
    formData.append('description', eventData.description);
    if (eventData.image) {
      formData.append('image', eventData.image);
    }

    try {
      await axios.put(`http://localhost:8080/api/events/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Event updated successfully');
      navigate('/news'); // Redirect to the news page after successful event update
    } catch (error) {
      alert('Error updating event');
    }
  };

  const handleCancel = () => {
    navigate('/news'); // Redirect to the news page if cancel is clicked
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
          <h2>Update Event</h2>
        </div>

        {/* Event Update Form */}
        <form onSubmit={handleFormSubmit} className="create-event-form">
          <div className="form-group">
            <label htmlFor="heading">Event Heading</label>
            <input
              type="text"
              name="heading"
              value={eventData.heading}
              onChange={handleInputChange}
              placeholder="Enter event heading"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Event Location</label>
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleInputChange}
              placeholder="Enter event location"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Event Description</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
              placeholder="Enter event description"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Event Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
            />
          </div>

          {/* Display current image preview */}
          {eventData.image && eventData.image instanceof File && (
            <div className="image-preview">
              <img src={URL.createObjectURL(eventData.image)} alt="Preview" width="100" />
            </div>
          )}

          <div className="form-buttons">
            <button type="submit" className="btn btn-update">Update Event</button>
            <button type="button" className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
