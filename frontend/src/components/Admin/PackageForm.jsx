import React, { useState, useEffect } from "react";

const PackageForm = ({ package: editPackage, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    avlb_seats: "",
    package_type: "",
    tour_itinerary: "",
    tour_duration: "",
    tour_dates: [{ start_date: "", end_date: "" }],
  });

  useEffect(() => {
    if (editPackage) {
      setFormData({
        name: editPackage.name || "",
        image: editPackage.image || "",
        price: editPackage.price || "",
        description: editPackage.description || "",
        avlb_seats: editPackage.avlb_seats || "",
        package_type: editPackage.package_type || "",
        tour_itinerary: editPackage.tour_itinerary || "",
        tour_duration: editPackage.tour_duration || "",
        tour_dates: editPackage.tour_dates || [
          { start_date: "", end_date: "" },
        ],
      });
    }
  }, [editPackage]);

  const handleDateChange = (index, dateType, value) => {
    const newDates = [...formData.tour_dates];

    // Extract only yyyy-MM-dd if value is a full ISO date string
    const formattedValue =
      value.includes("T") || value.includes(",")
        ? value.split(/[T,]/)[0]
        : value;

    newDates[index][dateType] = formattedValue;

    setFormData({
      ...formData,
      tour_dates: newDates,
    });
  };

  // 🆕 NEW: Add more date ranges
  const addDateRange = () => {
    setFormData({
      ...formData,
      tour_dates: [...formData.tour_dates, { start_date: "", end_date: "" }],
    });
  };

  // 🆕 NEW: Remove date ranges
  const removeDateRange = (index) => {
    if (formData.tour_dates.length > 1) {
      const newDates = formData.tour_dates.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        tour_dates: newDates,
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="admin-form">
      <h3>{editPackage ? "Edit Package" : "Add New Package"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Package Name *</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Price *</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="url"
            name="image"
            className="form-control"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Tour Duration *</label>
          <input
            type="text"
            name="tour_duration"
            className="form-control"
            value={formData.tour_duration}
            onChange={handleChange}
            placeholder="e.g., 5 days 4 nights"
            required
          />
        </div>

        {/* 🆕 NEW FIELD: Tour Itinerary */}
        <div className="form-group">
          <label>Tour Itinerary *</label>
          <textarea
            name="tour_itinerary"
            className="form-control"
            rows="6"
            value={formData.tour_itinerary}
            onChange={handleChange}
            placeholder="Day 1: Arrival at destination...&#10;Day 2: City tour and sightseeing...&#10;Day 3: Adventure activities..."
            required
          />
          <small className="form-text text-muted">
            Use line breaks to separate different days or activities
          </small>
        </div>

        {/* 🆕 NEW FIELD: Tour Dates */}
        <div className="form-group">
          <label>Tour Dates *</label>
          {formData.tour_dates.map((dateRange, index) => (
            <div
              key={index}
              className="date-range-group"
              style={{
                marginBottom: "15px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            >
              <div className="form-row">
                <div
                  className="form-group"
                  style={{ flex: 1, marginRight: "10px" }}
                >
                  <label>Start Date</label>
                  {/* <input
                    type="date"
                    className="form-control"
                    value={dateRange.start_date ? new Date(dateRange.start_date).toISOString().split('T')[0] : ''}
                    onChange={(e) => handleDateChange(index, 'start_date', e.target.value)}
                    required
                  /> */}
                  <input
  type="date"
  className="form-control"
  value={
    dateRange.start_date
      ? new Date(dateRange.start_date).toISOString().split("T")[0]
      : ""
  }
  onChange={(e) => handleDateChange(index, "start_date", e.target.value)}
  required
/>
                </div>
                <div
                  className="form-group"
                  style={{ flex: 1, marginRight: "10px" }}
                >
                  <label>End Date</label>
                  {/* <input
                    type="date"
                    className="form-control"
                    value={dateRange.end_date ? new Date(dateRange.end_date).toISOString().split('T') : ''}
                    onChange={(e) => handleDateChange(index, 'end_date', e.target.value)}
                    required
                  /> */}

                 <input
  type="date"
  className="form-control"
  value={
    dateRange.end_date
      ? new Date(dateRange.end_date).toISOString().split("T")[0]
      : ""
  }
  onChange={(e) => handleDateChange(index, "end_date", e.target.value)}
  required
/>
                </div>
                {formData.tour_dates.length > 1 && (
                  <div
                    className="form-group"
                    style={{ display: "flex", alignItems: "end" }}
                  >
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeDateRange(index)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={addDateRange}
            style={{ marginTop: "10px" }}
          >
            <i className="fas fa-plus"></i> Add Another Date Range
          </button>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Available Seats *</label>
            <input
              type="number"
              name="avlb_seats"
              className="form-control"
              value={formData.avlb_seats}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Package Type *</label>
            <select
              name="package_type"
              className="form-control"
              value={formData.package_type}
              onChange={handleChange}
              required
            >
              <option value="">Select Package Type</option>
              <option value="Domestic">Domestic</option>
              <option value="International">International</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-success">
            <i className="fas fa-save"></i> {editPackage ? "Update" : "Add"}{" "}
            Package
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            style={{ marginLeft: "10px" }}
          >
            <i className="fas fa-times"></i> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PackageForm;
