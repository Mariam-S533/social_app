import { useContext, useState } from "react";
import { PostContext } from "../../Context/PostContext";

function AddPost({ callback }) {
  const { addPosts, currentUser } = useContext(PostContext);
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);

  async function handelAddPost(e) {
    e.preventDefault();
    let formData = new FormData();

    body && formData.append("body", body);
    image && formData.append("image", image);

    await addPosts(formData);
    callback();

    setBody("");
    setImage(null);
  }

  return (
    <div className="container max-w-xl mx-auto p-2">
      <div className="bg-white w-full rounded-md shadow-md">
        <form onSubmit={handelAddPost}>
          <div className="w-full h-16 items-center flex justify-between px-5">
            <img
              className="rounded-full w-10 h-10 mr-3"
              src={currentUser.photo}
              alt={currentUser.name}
            />
            <input
              type="text"
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full rounded-full h-10 bg-gray-200 px-5 outline-none"
              placeholder="What's on your mind?"
            />
          </div>
          
              {/* image preview */}
              {image && (
              <div className="px-5 py-3">
                <div className="relative w-full">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className="rounded-md max-h-60 object-cover w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 bg-gray-400 text-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer"
                  >
                    <i className="fa-solid fa-xmark" />
                  </button>
                </div>
              </div>
            )}

          <div className="w-full h-16 flex justify-between items-center px-5">
            <label className="flex h-full items-center cursor-pointer">
              <svg
                className="h-6 text-green-500 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                width={27}
                height={27}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#b0b0b0"
                strokeWidth={2}
                strokeLinecap="square"
                strokeLinejoin="round"
              >
                <rect x={3} y={3} width={18} height={18} rx={2} />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M20.4 14.5L16 10 4 20" />
              </svg>
              <span className="text-sm mx-2 font-semibold text-gray-500">
                Photo/Video
              </span>
              <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
              />
            </label>

            <button
              type="submit"
              className="bg-[#640D5F] text-white py-2 px-4 rounded-full"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPost;




