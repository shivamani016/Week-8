import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Users, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="hero">
      <h1>Manage Your Users with Ease</h1>
      <p>A simple and powerful interface to create, view, and manage your user database. Built with the MERN stack for performance and reliability.</p>
      
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
        <Link to="/add" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UserPlus size={20} />
          Add New User
        </Link>
        <Link to="/users" className="btn" style={{ border: '1px solid var(--glass-border)', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={20} />
          View Users List
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
