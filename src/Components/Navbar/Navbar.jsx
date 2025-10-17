import { useContext } from "react"
import { Link,  NavLink, useNavigate } from "react-router-dom"
import { TokenContext } from "../../Context/TokenContext"
import { CircleUserRound, House, LogOut } from "lucide-react"
import { PostContext } from "../../Context/PostContext"
import unKnowenImage from "../../assets/unKnowen.png"



function Navbar() {

let {token, setToken} = useContext(TokenContext)
console.log(token)
const navigate =  useNavigate()
const {currentUser} = useContext(PostContext)


  function logOut(){

    //remove token from local storage 
    localStorage.removeItem("userToken")
    //remove token from tokenContext state so ui update
    setToken(null);
    navigate("/login")

  }

  return (
    <>
<div className="  bg-[#640D5F]">

    <div className="navbar p-4  w-[80%] mx-auto bg-[#640D5F] flex justify-between  ">

      <div className="">
        <Link className=" text-[#fff] font-bold text-2xl">Vibely</Link>
      </div>


      <ul
        className=" flex justify-around  gap-8 text-white p-2 ">

         {token &&
          <>
            <li><NavLink to="/">  <House size={30}/> </NavLink></li>
            <li><NavLink to="/userposts"><CircleUserRound size={30}/> </NavLink></li>
          </>
          }

          {token ?
          <>
            <li><a onClick={()=>logOut()}><LogOut size={30}/> </a></li>
          </>
          :
           
          <>
            <li className="font-bold cursor-pointer"><NavLink to="/sinup">Sign Up</NavLink></li>
            <li className="font-bold cursor-pointer"><NavLink to="/login">Log in</NavLink></li>
          </>
          }


      </ul>

    {token &&
    <div className="dropdown dropdown-end  ">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={currentUser?.photo || unKnowenImage} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

         {token &&
          <>
            <li><NavLink to="/">Home</NavLink></li>
          </>
          }
          


      </ul>
    </div>
    }

</div>

</div>

    </>
  )
}

export default Navbar