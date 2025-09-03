import React from 'react';

const UserTable = ({ users }) => {
  return (
    <div className="content-section">
      <div className="section-content">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Registration Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {/* <span className={`badge ${user.role === 'admin' ? 'badge-danger' : 'badge-primary'}`}> */}
                    {user.role}
                  {/* </span> */}
                </td>
                <td>{new Date(user.createdAt || Date.now()).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="text-center mt-20">
            <p>No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;