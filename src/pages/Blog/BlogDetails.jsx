import React, { useEffect, useState } from 'react';

import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
    const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axiosPublic.get(`/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
        setError('Failed to load blog details.');
      }
    };
  
    fetchBlogDetails();
  }, [id]);
  
  if (error) {
    return <p>{error}</p>;
  }
  
  if (!blog) {
    return <p>Sorry, the blog you're looking for doesn't exist.</p>;
  }
  

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto p-6 bg-white">
      <p className="text-gray-500">
          Published on: {new Date(blog.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </p>
        <h2 className="text-4xl font-bold mb-4">{blog.title}</h2>
        <img src={blog.image || ''} alt={blog.title} className="w-full h-96 object-cover mb-4" />
        <p className="text-gray-700 mb-4">{blog.content}</p>
        
      </div>
    </div>
  );
};

export default BlogDetails;
