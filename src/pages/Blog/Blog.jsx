import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { MdPublishedWithChanges } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const [blogsPerPage] = useState(5); // Number of blogs per page
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
        setBlogs(response.data.data); // Assuming response.data.data contains blogs
        setTotalPages(response.data.totalPages); // Assuming response.data.totalPages contains the total number of pages
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to load blogs.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, blogsPerPage]); // Re-fetch blogs when currentPage changes

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <p>Loading blogs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='py-20'>
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
              <div className="p-4 bg-gray-100">
                <h3 className="text-2xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-xl text-gray-700 flex items-center space-x-2">
                  <MdPublishedWithChanges className='mr-2' />
                  Published on: <span className='text-lg text-gray-500'>
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

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 space-x-4">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1} 
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <span className="self-center text-lg">Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages} 
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blog;
