import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ContentManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchBlogs = async () => {
        const response = await fetch(`/blogs?filter=${filter}`);
        const data = await response.json();
        setBlogs(data.data);
      };
      fetchBlogs();
    }, [filter]);
  
    const handlePublish = async (id) => {
      await fetch(`/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'published' }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setBlogs(blogs.map(blog => blog._id === id ? { ...blog, status: 'published' } : blog));
    };
  
    const handleDelete = async (id) => {
      await fetch(`/blogs/${id}`, {
        method: 'DELETE',
      });
      setBlogs(blogs.filter(blog => blog._id !== id));
    };
  
    return (
      <div>
        <div className="flex justify-between items-center">
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button className="bg-blue-300 text-white btn" onClick={() => navigate('/dashboard/content-management/add-blog')}>
            Add Blog
          </button>
        </div>
        <div>
          {blogs.map(blog => (
            <div key={blog._id}>
              <h3>{blog.title}</h3>
              <p>Status: {blog.status}</p>
              {blog.status === 'draft' && <button onClick={() => handlePublish(blog._id)}>Publish</button>}
              {blog.status === 'published' && <button onClick={() => handleUnpublish(blog._id)}>Unpublish</button>}
              <button onClick={() => handleDelete(blog._id)}>Delete</button>
            </div>
          ))}
        </div>
        <Outlet />
      </div>
    );
};

export default ContentManagement;
