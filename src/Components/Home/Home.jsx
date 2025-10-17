import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../Context/PostContext';
import Looder from '../Looder/Looder';
import PostCard from '../PostCard/PostCard';
import AddPost from '../AddPost/AddPost';
function Home() {
        
          const [allPosts, setAllPosts] = useState([])
          const [lodding, setLodding] = useState(true)
          let {getAllPosts} = useContext(PostContext);

          async function fetchPosts() {
            let data = await getAllPosts()
            setAllPosts(data)
            setLodding(false)
          }
          useEffect(() => {
            fetchPosts()
          }, []);
    
  return  <>
        

        
        <div className='bg-[#FFF5F2]'>
            <div className=' container mx-auto'>
            {lodding?<Looder/> :
              <>
                <AddPost/>
                <div className='flex justify-center items-center'>
                <div className="w-full">
                  {allPosts.map((post=><PostCard key={post._id} post={post}/>))}
                </div>
            </div>
              </>
            }
          </div>
        </div>

  </>
}

export default Home
