    import React from 'react';

const PackageTable = ({ packages, onEdit, onDelete }) => {
  return (
    <div className="content-section">
      <div className="section-content">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Available Seats</th>
              <th>Package Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map(pkg => (
              <tr key={pkg._id}>
                <td>
                  {pkg.image ? (
                    <img src={pkg.image} alt={pkg.name} />
                  ) : (
                    <div style={{width: '50px', height: '50px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px'}}>
                      <i className="fas fa-image"></i>
                    </div>
                  )}
                </td>
                <td>{pkg.name}</td>
                <td>₹{pkg.price}</td>
                <td>{pkg.avlb_seats}</td>
                <td>{pkg.package_type}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn btn-warning btn-sm"
                      onClick={() => onEdit(pkg)}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(pkg._id)}
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {packages.length === 0 && (
          <div className="text-center mt-20">
            <p>No packages found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageTable;
