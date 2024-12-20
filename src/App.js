import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';
import JobsPage from './pages/JobPage';
import NewsPage from './pages/NewsPage';
import CreateJobs from './pages/CreateJobs';
import UpdateJobs from './pages/UpdateJobs';
import CreateEvent from './pages/CreateEvent';
import UpdateEvent from './pages/UpdateEvent';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        <Route path='/jobs' element={<PrivateRoute element={<JobsPage />} />} />
        <Route path='/createJob' element={<PrivateRoute element={<CreateJobs />} />} />
        <Route path='/updateJob/:id' element={<PrivateRoute element={<UpdateJobs />} />} />
        <Route path='/news' element={<PrivateRoute element={<NewsPage />} />} />
        <Route path='/createEvent' element={<PrivateRoute element={<CreateEvent />} />} />
        <Route path='/editEvent/:id' element={<PrivateRoute element={<UpdateEvent />} />} />
        
      </Routes>
    </div>
  );
}

export default App;