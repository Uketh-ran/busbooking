// src/components/Topbar.jsx
const Topbar = () => {
    return (
      <div className="d-flex justify-content-between align-items-center px-4 py-2 border-bottom bg-light">
        <div>
          <h5 className="mb-0">Dashboard</h5>
        </div>
        <div className="d-flex align-items-center">
          <span className="me-3">Admin</span>
          <button className="btn btn-link text-danger ms-3">
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>
    );
  };
  
  export default Topbar;
  