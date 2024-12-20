import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css'; // Import the CSS for styling
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';


const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    heading: '',
    location: '',
    description: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e) => {
    setEventData({ ...eventData, image: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!eventData.image) {
      alert('Please select an image for the event');
      return;
    }

    const formData = new FormData();
    formData.append('heading', eventData.heading);
    formData.append('location', eventData.location);
    formData.append('description', eventData.description);
    formData.append('image', eventData.image);

    try {
      await axios.post('http://localhost:8080/api/events/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Event added successfully');
      navigate('/news'); // Redirect to the news page after successful event creation
    } catch (error) {
      alert('Error adding event');
    }
  };

  const handleCancel = () => {
    navigate('/news'); // Redirect to the news page if cancel is clicked
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
          <h2>Create New Event</h2>
        </div>

        {/* Event Creation Form */}
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
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-create">Create Event</button>
            <button type="button" className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
