import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import './NewsPage.css'; // Add any custom styling here
import './Sidebar.css'; // Add any custom styling here
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const NewsPage = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(6); // Show 6 events per page (adjusted to 6)
  const navigate = useNavigate(); // Hook to navigate to another page

  // Fetch events from the backend when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle delete request
  const handleDelete = (id) => {
    setEventToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/events/${eventToDelete}`);
      setEvents(events.filter(event => event._id !== eventToDelete)); // Remove deleted event from the state
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting event:", error);
      setIsModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  // Handle navigation to the Create Event page
  const handleAddEvent = () => {
    navigate("/createEvent"); // Navigates to the CreateEventPage
  };

  // Handle navigation to the Edit Event page
  const handleEditEvent = (id) => {
    navigate(`/editEvent/${id}`); // Navigates to the EditEventPage
  };

  // Handle logout
  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    // Optionally, display a success message or alert
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  // Pagination Logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Check if pagination should be visible
  const showPagination = events.length > eventsPerPage;

  return (
    <div className="news-container">
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
          <h2>News & Events</h2>
          <button className="add-event-btn" onClick={handleAddEvent}>Add Event</button>
        </div>

        {/* Event List Display */}
        <div className="event-list">
          {currentEvents.length === 0 ? (
            <p>No events available</p>
          ) : (
            currentEvents.map((event) => (
              <div key={event._id} className="event-item">
                <img src={`http://localhost:8080${event.image}`} alt={event.heading} className="event-image" />
                <div className="event-details">
                  <h3>{event.heading}</h3>
                  <p>{event.location}</p>
                  <p>{event.description}</p>
                  <div className="event-actions">
                    <button className="edit-btn" onClick={() => handleEditEvent(event._id)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(event._id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Conditional Pagination */}
        {showPagination && (
          <div className="pagination">
            {Array.from({ length: Math.ceil(events.length / eventsPerPage) }, (_, index) => (
              <button key={index + 1} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
                {index + 1}
              </button>
            ))}
          </div>
        )}

        {/* Modal for Delete Confirmation */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <p>Are you sure you want to delete this event?</p>
              <div className="button-container">
                <button onClick={confirmDelete} className="confirm-btn">Yes</button>
                <button onClick={cancelDelete} className="cancel-btn">No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
