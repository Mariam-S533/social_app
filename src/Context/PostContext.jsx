import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


export let PostContext = createContext(); //this is a context
export let SingelPostContext = createContext()


export default function PostContextProvider({ children }){

     const [currentUser, setCurrentUser] = useState(null)

    let headers = {
            token: localStorage.getItem("userToken") 
    }

async function getAllPosts(){
    try {
        let {data} = await axios.get("https://linked-posts.routemisr.com/posts?limit=50", {
            headers,
            params:{
                sort : "-createdAt",
                // page:"1"
            }
        });
        console.log(data)
        
        // return data.posts
        return data.posts || [];
        
    } 
    catch (error) {
console.log("Error fetching posts:", error);
    return [];        
    }
}

async function getSingelPost(id) {
        try {
        let {data} = await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
            headers,
        });        
        return data.post;
        
    } 
    catch (error) {
        console.log(error)
        
    }
}

async function getUserlDate() {
        try {
        let {data} = await axios.get("https://linked-posts.routemisr.com/users/profile-data", {
            headers,
        }); 
        setCurrentUser(data.user)
        return data.user
    } 
    catch (error) {
        console.log(error)
        
    }
}

async function getUserlPosts(id) {
        try {
        let {data} = await axios.get(`https://linked-posts.routemisr.com/users/${id}/posts?limit=50`, {
            headers,
        });        
        return data.posts;
        
    } 
    catch (error) {
        console.log(error)
        
    }
}

async function addComment(body) {
        try {
        let {data} = await axios.post("https://linked-posts.routemisr.com/comments", body ,{
            headers,
        });  
        toast.success('Comment successfully added!')
        return data.comments
    } 
    catch (error) {
        toast.error(error)
        
    }
}

async function addPosts(formData) {
        try {
        let {data} = await axios.post("https://linked-posts.routemisr.com/posts", formData ,{
            headers,
        });  
        toast.success('Post successfully added!')
        // return data.comments
        console.log(data)
    } 
    catch (error) {
        toast.error(error)
    }
}

async function deletePost(id) {
        try {
        let {data} = await axios.delete(`https://linked-posts.routemisr.com/posts/${id}`, {
            headers,
        }); 
        toast.success('Post successfully deleted!')
        // return data.user
        console.log(data)
    } 
    catch (error) {
        toast.error("Delete post failed!")
        
    }
}

async function uploadPhotoProfile(formData) {
  try {
    let { data } = await axios.put(
      "https://linked-posts.routemisr.com/users/upload-photo",
      formData,
      { headers }
    );

    if (data.message === "success") {
      toast.success("Photo profile added!");
      const updatedUser = await getUserlDate();
      setCurrentUser(updatedUser);
      return updatedUser;
     
    }
  } catch (error) {
    toast.error("Add photo failed!");
  }
}

async function deleteComment(id) {
        try {
        let {data} = await axios.delete(`https://linked-posts.routemisr.com/comments/${id}`, {
            headers,
        }); 
        
        toast.success('Comment successfully deleted!')
        return data
        
    } 
    catch (error) {
        toast.error("Delete Comment failed!")
        console.log(error)
        
    }
}

async function getPostComments(id) {
        try {
        let {data} = await axios.get(`https://linked-posts.routemisr.com/posts/${id}/comments`, {
            headers,
        }); 
        
        // toast.success('Post successfully deleted!')
        return data
        
    } 
    catch (error) {
        toast.error("Delete post failed!")
        
    }
}

async function updatePost(id, formData) {
        try {
        let {data} = await axios.put(`https://linked-posts.routemisr.com/posts/${id}`, formData,{
            headers,
        }); 
        
        return data
        
    } 
    catch (error) {
        toast.error("Upate post failed!")
        console.error('Error updating post:', error);
    }
}

async function updateComment(updatedText, id) {
        try {
        let {data} = await axios.put(`https://linked-posts.routemisr.com/comments/${id}`, {content: updatedText},{
            headers:{
                token: localStorage.getItem("userToken")
            }
        }); 
        
        return data
        
    } 
    catch (error) {
        toast.error("Upate comment failed!")
        console.error('Error updating comment:', error);
    }
}

// async function changePassword() {
//            try {
//         let {data} = await axios.patch("https://linked-posts.routemisr.com/users/change-password",{
//             headers,
//         }); 
        
//         // toast.success('Post successfully updated')
//         return data
        
//     } 
//     catch (error) {
//         toast.error("Upate post failed!")
//         console.error('Error updating post:', error);
//     }
    
// }

// async function updateComment() {
//            try {
//         let {data} = await axios.put(`https://linked-posts.routemisr.com/posts/${id}`, formData,{
//             headers,
//         }); 
        
//         toast.success('Post successfully updated')
//         return data
        
//     } 
//     catch (error) {
//         toast.error("Upate post failed!")
//         console.error('Error updating post:', error);
//     }
// }



useEffect(()=>{
    getUserlDate()
},[])

    return <PostContext.Provider value={{getAllPosts, 
        getSingelPost,getUserlDate ,getUserlPosts, addComment, 
        currentUser, addPosts, deletePost, uploadPhotoProfile, 
        deleteComment, getPostComments, updatePost, updateComment}}>{children}</PostContext.Provider>
}


