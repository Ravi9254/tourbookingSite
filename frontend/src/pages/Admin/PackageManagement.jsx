import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import PackageTable from '../../components/Admin/PackageTable';
import PackageForm from '../../components/Admin/PackageForm';
import { adminAPI, showToast } from '../../utils/adminAPI';

const PackageManagement = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getProducts();
      setPackages(response.products || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
      showToast('Error loading packages', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingPackage(null);
    setShowForm(true);
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this package?')) {
      return;
    }

    try {
      await adminAPI.deleteProduct(id);
      showToast('Package deleted successfully', 'success');
      fetchPackages();
    } catch (error) {
      console.error('Error deleting package:', error);
      showToast('Error deleting package', 'error');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingPackage) {
        await adminAPI.updateProduct(editingPackage._id, formData);
        showToast('Package updated successfully', 'success');
      } else {
        await adminAPI.addProduct(formData);
        showToast('Package added successfully', 'success');
      }
      
      setShowForm(false);
      setEditingPackage(null);
      fetchPackages();
    } catch (error) {
      console.error('Error saving package:', error);
      showToast('Error saving package', 'error');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPackage(null);
  };

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.package_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading Packages...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="dashboard">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
          <h1>Package Management</h1>
          <button className="btn btn-primary" onClick={handleAddNew}>
            <i className="fas fa-plus"></i> Add New Package
          </button>
        </div>

        {showForm && (
          <PackageForm
            package={editingPackage}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}

        <div className="search-filter">
          <div className="search-box">
            <input
              type="text"
              className="form-control"
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="records-per-page">
            <span>Total: {filteredPackages.length} packages</span>
          </div>
        </div>

        <PackageTable
          packages={filteredPackages}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </AdminLayout>
  );
};

export default PackageManagement;
