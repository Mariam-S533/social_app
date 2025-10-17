import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import unKnowenImage from "../../assets/unKnowen.png"
import { PostContext } from "../../Context/PostContext";
import moment from "moment/moment";
import toast from "react-hot-toast";

export default function PostCard({post, callback}) {

  const [showComments, setShowComments] = useState(false);
  const [loadMoreComent, setLoadMoreComent] = useState(1)
  const [commentContent, setCommentContent] = useState("")
  const [commments, setCommments] = useState([])
  const {addComment,  currentUser, deletePost,  deleteComment, getPostComments, updatePost, updateComment} = useContext(PostContext)
  const [isEditOpen, setIsEditOpen] = useState(false); 
  const [editBody, setEditBody] = useState(post.body);
  const [editImage, setEditImage] = useState(post.image || null);
  const fileInputRef = useRef(null);
  const [editingCommentId, seteditingCommentId] = useState(null)
  const [newComment, setnewComment] = useState("")



  useEffect(()=>{
    setCommments(post.comments);
  },[])

  async function handelAddComment(e){
    e.preventDefault();
    let response = await addComment({content:commentContent, post:post._id})
    setCommments(response)
    setCommentContent("")
  }

  async function DeletePost(id) {
     await deletePost(id)
     await callback()
  }

  async function EditPost(e) {
    e.preventDefault();
    let res =await updatePost(post._id)
    let formData = new FormData();
    formData.append("body", editBody);

     if (editImage) {
    formData.append("image", editImage)
  }

    await updatePost(post._id, formData);
    await callback();
    setIsEditOpen(false);
    toast.success('Post successfully updated')

    console.log(res)
  }

    function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setEditImage(file);
    }
  }

  async function DeletteComment(id) {
    const data = await deleteComment(id)
    if(data.message === 'success'){
      const res = await getPostComments(post?._id)
      setCommments(res.comments)
    }
  }

  async function handelUpdateComment(e, id) {
    e.preventDefault()
    console.log(newComment)
    const data = await updateComment(newComment, id)
    console.log(data)
    if(data.message === 'success'){
      seteditingCommentId(null)
      toast.success('Comment successfully updated')
      const res = await getPostComments(post?._id)
      setCommments(res.comments)
    }
  }



  return (
    <div className="card bg-base-100 shadow-md p-4 max-w-xl mx-auto my-6">
      
      <div className="flex justify-between ">
        <Link to={`/postdetails/${post?._id}`}>
        <div className="flex items-center gap-3 mb-3 ">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={post?.user?.photo} alt="User" />
          </div>
        </div>
        <div>
          <p className="font-bold">{post?.user?.name}</p>
          <p className="text-sm text-gray-400">{moment(post?.createdAt).calendar()}</p>
        </div>
      </div>
      </Link>
      {post?.user?._id == currentUser._id ? <>
           
                 <div className=" mb-3">
                  <div className="dropdown dropdown-end hover:bg-gray-100 rounded-2xl">
                  <div tabIndex={0} role="button" className=" m-1"><i className="fa-solid fa-ellipsis-vertical cursor-pointer text-gray-600" /> </div>
                  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-3 shadow-sm">
                    <li className="mb-1 text-[15px] font-semibold"><button onClick={()=>DeletePost(post._id)}><i className="fa-solid fa-trash text-gray-900 " /> Delete post</button></li>
                    <li className="mb-1 text-[15px] font-semibold"><button  onClick={() => setIsEditOpen(true)}><i className="fa-solid fa-pen-to-square text-gray-900" />Edit post</button></li>
                  </ul>
                </div>
              </div>
              </>
              :
               <>
               <div className=" mb-3">
                  <div className="dropdown dropdown-end hover:bg-gray-100 rounded-2xl">
                  <div tabIndex={0} role="button" className=" m-1"><i className="fa-solid fa-ellipsis-vertical cursor-pointer text-gray-600" /> </div>
                  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-3 shadow-sm">
                    <li className="mb-1 text-[15px] font-semibold"><button><i className="fa-solid fa-pen-to-square text-gray-900" />Hide post</button></li>
                  </ul>
                </div>
              </div>
               </>
      }

        
      </div>
     <Link to={`/postdetails/${post?._id}`}>
      <p className="mb-3">
        {post.body}
      </p>
      </Link>
          {post.image &&  <img src={post.image} className="rounded-lg mb-4 max-h-80 object-cover" alt="Post" />}

      <div className="m-3 mb-0 border-b-1 flex relative justify-between text-gray-500 border-gray-300">
        <p className="text-center"><i className="fa-solid fa-thumbs-up absolute left-1 z-3" style={{color: '#3065c0'}} />
                                    <i className="fa-solid fa-heart absolute left-4 z-2" style={{color: '#ca1c1c'}} />
                                    <i className="fa-solid fa-face-grin-squint absolute left-7" style={{color: '#FFD43B'}} /></p>
        <p>{commments.length} comments</p>
      </div>

      <div className="flex justify-between gap-3 text-sm text-gray-500">
        <button className="btn btn-ghost text-gray-500 btn-sm"> <i className="fa-solid fa-thumbs-up text-lg text-gray-500 " />Like</button>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setShowComments(!showComments)}>
          <i className="fa-regular fa-comment-dots text-gray-500 text-lg" />Comment
        </button>
        <button className="btn btn-ghost btn-sm text-gray-500"> <i className="fa-solid fa-share text-lg text-gray-500 " />Share</button>
      </div>

      {/* Toggle Comments Section */}
      {showComments && (
        <div className="mt-4">
          {/* Existing Comments */}
          {commments.slice(0, loadMoreComent) .map((comment)=>(

          <div key={comment._id}>
                  <div className="mb-2 flex justify-between gap-3 items-center">
                    <div className="">
                      <div className=" avatar">
                        <div className="w-8 h-8 rounded-full ">
                          <img
                            src={comment.commentCreator.photo.includes("undefined")?
                              unKnowenImage
                              :
                              comment.commentCreator.photo
                            }
                            alt={comment.commentCreator.name}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full group relative">
                      <p className=" font-semibold">{comment.commentCreator.name} </p>
                      <div className="flex ">
                        { editingCommentId === comment._id? 
                          <div className="w-full ">
                              <input value={newComment} onChange={(e)=> setnewComment(e.target.value)} type="text"  className=" input w-full" />
                              <div className="flex justify-end gap-1 my-2">
                              <button onClick={(e)=> handelUpdateComment(e, comment._id)} type="button" className="px-3 py-2 bg-[#640D5F] text-white rounded-full cursor-pointer">Save</button>
                              <button onClick={()=> seteditingCommentId(null)} type="button"  className="p-2 bg-gray-400 text-white rounded-full cursor-pointer mr-2">Cancel</button>
                              </div>
                          </div>
                          :
                          <div className="chat-bubble w-full">{comment.content}</div>
                        }

                            { comment.commentCreator._id == currentUser._id && editingCommentId === null && <>
                             <div className=" absolute top-1/4 right-3  invisible  group-hover:visible">
                                <div className="dropdown dropdown-end hover:bg-gray-100 rounded-2xl">
                                <div tabIndex={0} role="button" className=" m-1"><i className="fa-solid fa-ellipsis cursor-pointer text-gray-600" /> </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-3 shadow-sm">
                                  <li className="mb-1 text-[15px] font-semibold"><button onClick={()=>DeletteComment(comment._id)}><i className="fa-solid fa-trash text-gray-900 " /> Delete comment</button></li>
                                  <li className="mb-1 text-[15px] font-semibold"><button onClick={()=> { seteditingCommentId(comment._id); setnewComment(comment.content)}} ><i className="fa-solid fa-pen-to-square text-gray-900" />Edit comment</button></li>
                                </ul>
                              </div>
                            </div>
                            </>
                      }
                      </div>
                    </div>
                  </div>

                </div>
          ))}

          {/* New Comment Input */}
            <form onSubmit={(e)=>handelAddComment(e)} className="flex  gap-2 content-between items-center">

              <div className="avatar">
              <div className="w-8 rounded-full">
                {/* ubdate here */}
                <img src={currentUser?.photo} alt="User" />
              </div>
            </div>

            <input
              type="text"
              name="content"
              value={commentContent}
              onChange={(e)=>setCommentContent(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 input input-bordered w-full rounded-full focus:border-none"
            />
            <button type="submit" className="p-2 bg-[#640D5F] text-white rounded-full cursor-pointer">
              <i className="fa-solid fa-location-arrow text-lg" />
            </button>
            
          </form>
          {commments.length > loadMoreComent ?
                  <div className="mt-3">
                  <button onClick={()=>setLoadMoreComent(loadMoreComent+2)} className=" btn bg-transparent outline-0 border-0 hover:text-gray-800 shadow-none text-gray-500">
                  <i className="fa-solid fa-up-right-and-down-left-from-center text-gray-600 me-1 " />Load more comments</button>
                </div>  
                :
                <p className="text-semibold text-center font-semibold">No more comments to show</p>
        }
        </div>
      )}

{isEditOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
      <div className="mb-2 flex justify-end">
        <button onClick={() => setIsEditOpen(false)} className=" text-gray-500 hover:text-gray-700">
          <i className="fa-solid fa-xmark text-xl" />
        </button>
      </div>
      <form onSubmit={EditPost}>
        {/* Textarea */}
        <textarea
          className="w-full border rounded-lg p-2 mb-3"
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}
        />

      {/* Image preview */}
      {editImage && (
      <div className="relative w-full mb-3">
        <img
          src={typeof editImage === "string" ? editImage : URL.createObjectURL(editImage)}
          alt="preview"
          className="w-full h-40 object-cover rounded-md"
        />
        <button
          type="button"
          onClick={() => {setEditImage(null); if (fileInputRef.current){fileInputRef.current.value = ""} }}
          className="absolute top-2 right-2 bg-gray-400 text-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer"
        >
          <i className="fa-solid fa-xmark" />
        </button>
      </div>
      )}


        {/* File input */}
        <input
          type="file"
          name="image"
          accept="image/*"
          className="mb-3"
          onChange={handleImageChange}
          ref={fileInputRef}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Save Updates
          </button>
        </div>
      </form>
    </div>
  </div>
)}



    </div>

  );
}
