import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const { title, thumbnail, content } = data;
    
    try {
      // Image upload to ImageBB
      const formData = new FormData();
      formData.append("image", thumbnail[0]);

      const imageRes = await axiosSecure.post(image_hosting_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Check if image upload is successful
      if (imageRes.data.success) {
        const imageUrl = imageRes.data.data.display_url;

        // Create blog data
        const blogData = {
          title,
          thumbnail: imageUrl,
          content,
        };

        // Post blog data to the server
        const blogRes = await axiosSecure.post('/blogs', blogData);

        if (blogRes.data && blogRes.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Blog created successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/dashboard/content-management');
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Failed to create blog",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to create blog",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="my-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 space-x-2">
          <label>Title</label>
          <input
            type="text"
            placeholder="Blog Title"
            {...register("title", { required: true })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="mb-3 space-x-2">
          <label>Thumbnail</label>
          <input
            type="file"
            {...register("thumbnail", { required: true })}
            className="file-input w-full max-w-xs"
          />
        </div>

        <div className="mb-3">
          <label>Content</label>
          <JoditEditor
            value={content}
            onChange={(newContent) => {
              setContent(newContent);
              setValue("content", newContent); // Set the content value in react-hook-form
            }}
          />
        </div>

        <button className="btn bg-blue-300 text-white" type="submit">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
