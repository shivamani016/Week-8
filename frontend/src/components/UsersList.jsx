import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, ChevronRight, Loader2 } from 'lucide-react';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <Loader2 className="animate-spin" size={48} color="var(--primary)" />
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>All Users</h2>
      {users.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          No users found. Start by adding some!
        </div>
      ) : (
        <div className="user-grid">
          {users.map((user) => (
            <div 
              key={user._id} 
              className="user-card" 
              onClick={() => navigate(`/user/${user._id}`)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={24} color="var(--primary)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.125rem' }}>{user.name}</h3>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Mail size={14} />
                      {user.email}
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} color="var(--text-muted)" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersList;
