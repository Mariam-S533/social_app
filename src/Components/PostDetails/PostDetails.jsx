import { useParams } from "react-router-dom"
import { PostContext } from "../../Context/PostContext"
import { useEffect, useState } from "react"
import { useContext } from "react"
import PostCard from "../PostCard/PostCard"
import Looder from "../Looder/Looder"

function PostDetails() {

    const {id} = useParams()
    console.log(id)
    let {getSingelPost} = useContext(PostContext)
    const [singelPost, setSingelPost] = useState({})
    const [lodding, setLodding] = useState(true)

    async function getPostDetails(id) {
        let response = await getSingelPost(id)
        setSingelPost(response)
        setLodding(false)
    }

    useEffect(()=>{
        getPostDetails(id);
    },[])

  return (
    <>
            <div className=' container mx-auto'>
            {lodding?<Looder/> :
            <div className='flex justify-center items-center'>
                <div className="w-full">
                    <PostCard post={singelPost}/>
                </div>
            </div>
            }
            </div>
    </>
  )
}

export default PostDetails