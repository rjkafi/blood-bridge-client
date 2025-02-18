import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { MdPublishedWithChanges } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [blogsPerPage] = useState(5); 
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Fetch blogs with pagination parameters
        const response = await axiosPublic.get('/blogs', {
          params: {
            page: currentPage,
            limit: blogsPerPage
          }
        });
        setBlogs(response.data.data);
        setTotalPages(response.data.totalPages); 
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to load blogs.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, blogsPerPage]); 

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <div className='flex text-center justify-center min-h-screen'>Loading blogs...</div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='py-12 container mx-auto'>
      <div className='md:flex md:justify-between my-7 px-3'>
        <h2 className="text-3xl font-bold">Blog</h2>
        <h4 className='text-xl font-semibold md:w-1/2 py-4'>
          "Stay Updated with the Latest in Blood Donation and Healthcare Innovations. Empowering Lives, One Drop at a Time."
        </h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 p-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Link to={`/blogs/${blog._id}`} key={blog._id} className="block bg-white overflow-hidden"> 
              <img
                src={blog.image || ''} 
                alt={blog.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4 bg-base-100 base-content">
                <h3 className="text-2xl font-semibold mb-2 ">{blog.title}</h3>
                <p className="text-xl  flex items-center space-x-2">
                  <MdPublishedWithChanges className='mr-2' />
                  Published on: <span className='text-lg base-content'>
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>

    </div>
  );
};

export default Blog;
