import { useContext, useEffect, useState } from "react"
import { PostContext } from "../../Context/PostContext"
import Looder from './../Looder/Looder';
import AddPost from "../AddPost/AddPost";
import PostCard from "../PostCard/PostCard";
import UserProfile from "../UserProfile/UserProfile";


function UserPosts() {

  let {getUserlDate, getUserlPosts} = useContext(PostContext)
  const [lodding, setLodding] = useState(true)
  const [userPosts, setUserPosts] = useState([])

      async function getUserPostData() {
          let response = await getUserlDate()
          let data = await getUserlPosts(response._id)
          setUserPosts(data)
          console.log(data)
          setLodding(false)
      }

      useEffect(()=>{
          getUserPostData()
      },[])

  return (
    <>

          <div className='bg-[#FFF5F2]'>
            <div className=' container mx-auto'>
            {lodding?<Looder/> :
              <>
                <UserProfile />
                <AddPost callback = {getUserPostData} />
                <div className='flex justify-center items-center'>
                <div className="w-full">
                  {userPosts.map((post=><PostCard callback={getUserPostData} key={post._id} post={post}/>))}
                </div>
                </div>
              </>
            }
          </div>
        </div>

    </>
  )
}

export default UserPosts