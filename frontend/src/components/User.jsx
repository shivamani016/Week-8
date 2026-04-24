import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, User as UserIcon, Mail, Calendar, Phone, Trash2, Loader2 } from 'lucide-react';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${id}`);
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      navigate('/users');
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <Loader2 className="animate-spin" size={48} color="var(--primary)" />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <p>User not found</p>
        <Link to="/users" className="back-btn">Back to list</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/users" className="back-btn">
        <ArrowLeft size={20} />
        Back to Users List
      </Link>

      <div className="user-detail-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--primary)' }}>
              <UserIcon size={40} color="var(--primary)" />
            </div>
            <div>
              <h2 style={{ fontSize: '2rem' }}>{user.name}</h2>
              <p style={{ color: 'var(--text-muted)' }}>User ID: {user._id}</p>
            </div>
          </div>
          <button 
            onClick={handleDelete} 
            className="btn" 
            style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)', border: '1px solid rgba(244, 63, 94, 0.2)' }}
            disabled={deleting}
          >
            {deleting ? <Loader2 className="animate-spin" size={20} /> : <Trash2 size={20} />}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="detail-item">
            <label><Mail size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Email Address</label>
            <div>{user.email}</div>
          </div>
          <div className="detail-item">
            <label><Calendar size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Date of Birth</label>
            <div>{new Date(user.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
          <div className="detail-item">
            <label><Phone size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Mobile Number</label>
            <div>{user.mobileNumber}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
