import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ContentManagement = ({ role }) => {
    const [blogs, setBlogs] = useState([]);
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const blogsPerPage = 5;
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axiosSecure.get('/blogs', {
                    params: { page: currentPage, filter }
                });
                setBlogs(res.data.data);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlogs();
    }, [currentPage, filter, axiosSecure]);

    const handlePublish = async (id) => {
        try {
            await axiosSecure.put(`/blogs/${id}`, { status: 'published' });
            setBlogs(prevBlogs =>
                prevBlogs.map(blog => blog._id === id ? { ...blog, status: 'published' } : blog)
            );
        } catch (error) {
            console.error('Error publishing blog:', error);
        }
    };

    const handleUnpublish = async (id) => {
        try {
            await axiosSecure.put(`/blogs/${id}`, { status: 'draft' });
            setBlogs(prevBlogs =>
                prevBlogs.map(blog => blog._id === id ? { ...blog, status: 'draft' } : blog)
            );
        } catch (error) {
            console.error('Error unpublishing blog:', error);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
    
        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/blogs/${id}`);
                setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
                Swal.fire('Deleted!', 'Your blog has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting blog:', error);
                Swal.fire('Error!', 'There was an error deleting the blog.', 'error');
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <select
                    className="rounded-md p-2"
                    onChange={(e) => setFilter(e.target.value)}
                    value={filter}
                >
                    <option value="all">All</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
                <button
                    className="bg-blue-300 text-white btn"
                    onClick={() => navigate('/dashboard/add-blog')}
                >
                    Add Blog
                </button>
            </div>

            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Title</th>
                        <th className="px-4 py-2 border-b">Status</th>
                        <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map(blog => (
                        <tr key={blog._id}>
                            <td className="px-4 py-2 border-b">{blog.title}</td>
                            <td className="px-4 py-2 border-b">{blog.status}</td>
                            <td className="px-4 py-2 border-b">
                                {role === 'Admin' && blog.status === 'draft' && (
                                    <button
                                        className="bg-green-500 text-white btn mr-2"
                                        onClick={() => handlePublish(blog._id)}
                                    >
                                        Publish
                                    </button>
                                )}
                                {role == 'Admin' && blog.status === 'published' && (
                                    <button
                                        className="bg-yellow-500 text-white btn mr-2"
                                        onClick={() => handleUnpublish(blog._id)}
                                    >
                                        Unpublish
                                    </button>
                                )}
                                {role == 'Admin' && (
                                    <button
                                        className="bg-red-500 text-white btn mr-2"
                                        onClick={() => handleDelete(blog._id)}
                                    >
                                        Delete
                                    </button>
                                )}
                              
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div className="pagination mt-4 flex justify-center">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="btn bg-blue-300 text-white mr-2"
                    >
                        Previous
                    </button>
                    <span className="mx-2">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="btn bg-blue-300 text-white ml-2"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ContentManagement;
