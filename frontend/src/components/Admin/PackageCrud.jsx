import React, { useEffect, useState } from 'react';

const PackageCRUD = () => {
  const [packages, setPackages] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editPackage, setEditPackage] = useState(null);
  const token = localStorage.getItem('token');

  const fetchPackages = async () => {
    const res = await fetch('http://localhost:5050/product/products', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setPackages(data.products || []);
    setLoading(false);
  };

  useEffect(() => { fetchPackages() }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5050/product/delete/${id}`, {
      method: 'DELETE', headers: { Authorization: `Bearer ${token}` }
    });
    fetchPackages();
  };

  const handleEdit = (p) => {
    setEditPackage(p);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditPackage(null);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    fetchPackages();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <button className="btn btn-primary mb-3" onClick={handleAdd}>Add New Package</button>
      {showForm && <PackageForm package={editPackage} onSuccess={handleSuccess} onCancel={() => setShowForm(false)} />}
      
      <table className="table table-bordered">
        <thead><tr>
          <th>Name</th><th>Price</th><th>Seats</th><th>Type</th><th>Actions</th>
        </tr></thead>
        <tbody>
        {packages.map(p => (
          <tr key={p._id}>
            <td>{p.name}</td>
            <td>{p.price}</td>
            <td>{p.avlb_seats}</td>
            <td>{p.package_type}</td>
            <td>
              <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(p)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}>Delete</button>
            </td>
          </tr>
        ))}
        {packages.length===0 && <tr><td colSpan="5">No packages</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default PackageCRUD;
