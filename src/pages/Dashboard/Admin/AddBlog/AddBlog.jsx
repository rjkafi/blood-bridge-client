import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosPublic=useAxiosPublic();

  const onSubmit = async (data) => {
    try {
      // Prepare image file for upload
      const imageFile={image: data.image[0]};

      // Image upload to imgbb
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        // Create blog data with image URL
        const blogData = {
          title: data.title,
          image: res.data.data.display_url,
          content,
        };

        // Post blog data to the server
        const blogRes = await axiosSecure.post('/blogs', blogData);
        if (blogRes.data.insertedId) {
          // Show success popup
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.title} Added Successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/dashboard/content-management');
        }
      }
      reset();
    } catch (error) {
      console.error("Error submitting the form:", error);
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
          <input
            type="file"
            {...register('image', { required: true })}
            className="mt-1 block px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>

        <div className="mb-3">
          <label>Content</label>
          <JoditEditor
            value={content}
            onChange={(newContent) => {
              setContent(newContent);
              setValue("content", newContent); // Sync Jodit content with react-hook-form
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
