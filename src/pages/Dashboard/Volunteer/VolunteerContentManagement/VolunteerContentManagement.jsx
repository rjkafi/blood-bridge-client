

const VolunteerContentManagement = () => {
    return (
        <div>
          <h2>Content Management</h2>
          <NavLink to="/dashboard/content-management/add-blog" className="btn">
            Add Blog
          </NavLink>
          <div>
            {/* Blog list with draft/publish filtering */}
            {/* Blog delete and publish button will be disabled for volunteers */}
          </div>
        </div>
      );
};

export default VolunteerContentManagement;