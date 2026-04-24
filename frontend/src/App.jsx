import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './components/Home';
import AddUser from './components/AddUser';
import UsersList from './components/UsersList';
import User from './components/User';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <div className="logo">UserHub</div>
          <div className="nav-links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/add">Add User</NavLink>
            <NavLink to="/users">Users List</NavLink>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/user/:id" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
