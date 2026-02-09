import "./ComplaintForm.css";
import { useState, useEffect } from "react";

function ComplaintForm() {
  /* ===================== STATE ===================== */

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    accused_names: "",
    incident_date: "",
    incident_time: "",
    incident_location: "",
    police_unit_type: "",
    police_unit_id: "",
    police_station_id: "",
    complaint_type_id: "",
    description: ""
  });

  const [unitTypes, setUnitTypes] = useState([]);
  const [units, setUnits] = useState([]);
  const [stations, setStations] = useState([]);
  const [complaintTypes, setComplaintTypes] = useState([]);
  const [evidence, setEvidence] = useState(null);

  /* ===================== LOAD DROPDOWN DATA ===================== */

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/police-unit-types")
      .then(res => res.json())
      .then(data => setUnitTypes(data));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/complaint-types")
      .then(res => res.json())
      .then(data => setComplaintTypes(data));
  }, []);

  /* ===================== HANDLERS ===================== */

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUnitTypeChange = (e) => {
    const type = e.target.value;

    setFormData({
      ...formData,
      police_unit_type: type,
      police_unit_id: "",
      police_station_id: ""
    });

    setUnits([]);
    setStations([]);

    if (!type) return;

    fetch(`http://127.0.0.1:8000/api/police-units/${type}`)
      .then(res => res.json())
      .then(data => setUnits(data));
  };

  const handleUnitChange = (e) => {
    const unitId = e.target.value;

    setFormData({
      ...formData,
      police_unit_id: unitId,
      police_station_id: ""
    });

    setStations([]);

    if (!unitId) return;

    fetch(`http://127.0.0.1:8000/api/police-stations/${unitId}`)
      .then(res => res.json())
      .then(data => setStations(data));
  };

  /* ===================== SUBMIT ===================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    if (evidence) {
      data.append("evidence", evidence);
    }

    const response = await fetch("http://127.0.0.1:8000/api/complaint", {
      method: "POST",
      body: data
    });

    const result = await response.json();

    if (response.ok) {
      alert("✅ Complaint submitted successfully");
    } else {
      alert("❌ Error submitting complaint");
      console.log(result);
    }
  };

  /* ===================== UI ===================== */

  return (
    <div className="complaint-container">
      <h2>Complaint Registration Form</h2>

      <form onSubmit={handleSubmit}>

        {/* ================= COMPLAINANT INFO ================= */}
        <div className="section-title">Complainant Information</div>

        <div className="form-group">
          <label>Full Name *</label>
          <input name="name" placeholder="Name *" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Phone Number *</label>
          <input name="phone" placeholder="Phone Number *" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Permanent Address *</label>
          <textarea name="address" placeholder="Address *" required onChange={handleChange} />
        </div>

        {/* FIXED ROW: City, State, ZIP */}
        <div className="form-row address-row">
          <div className="form-group">
            <label>City *</label>
            <input name="city" placeholder="City *" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>State *</label>
            <input name="state" placeholder="State *" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>ZIP Code *</label>
            <input name="zip" placeholder="ZIP Code *" required onChange={handleChange} />
          </div>
        </div>

        {/* ================= INCIDENT DETAILS ================= */}
        <div className="section-title">Incident Details</div>

        <div className="form-group">
          <label>Accused Names</label>
          <textarea
            name="accused_names"
            placeholder="Name(s) of Person(s) Complained Against (Optional)"
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date of Incident *</label>
            <input type="date" name="incident_date" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Time of Incident *</label>
            <input type="time" name="incident_time" required onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Location of Incident *</label>
          <input
            name="incident_location"
            placeholder="Location of Incident *"
            required
            onChange={handleChange}
          />
        </div>

        {/* ================= POLICE UNIT INFO ================= */}
        <div className="section-title">Police Unit Information</div>

        <div className="form-group">
          <label>Police Unit Type *</label>
          <select required onChange={handleUnitTypeChange}>
            <option value="">Select Police Unit Type *</option>
            {unitTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Police Unit Name *</label>
          <select required value={formData.police_unit_id} onChange={handleUnitChange}>
            <option value="">Select Police Unit Name *</option>
            {units.map(unit => (
              <option key={unit.id} value={unit.id}>{unit.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Police Station *</label>
          <select
            required
            name="police_station_id"
            value={formData.police_station_id}
            onChange={handleChange}
          >
            <option value="">Select Police Station *</option>
            {stations.map(station => (
              <option key={station.id} value={station.id}>
                {station.station_name}
              </option>
            ))}
          </select>
        </div>

        {/* ================= COMPLAINT DETAILS ================= */}
        <div className="section-title">Complaint Details</div>

        <div className="form-group">
          <label>Complaint Type *</label>
          <select name="complaint_type_id" required onChange={handleChange}>
            <option value="">Select Complaint Type *</option>
            {complaintTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Detailed Description *</label>
          <textarea
            name="description"
            placeholder="Detailed Description *"
            required
            onChange={handleChange}
          />
        </div>

        {/* ================= EVIDENCE ================= */}
        <div className="form-group">
          <label>Evidence Upload (Image / Video) (Optional)</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setEvidence(e.target.files[0])}
          />
        </div>

        {/* ================= BUTTONS ================= */}
        <div className="button-row">
          <button type="submit" className="submit-btn">
            Submit Complaint
          </button>

          <button
            type="button"
            className="reset-btn"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
        </div>

      </form>
    </div>
  );
}

export default ComplaintForm;