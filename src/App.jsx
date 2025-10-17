import './App.css'
import { createBrowserRouter,  RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/Login/Login';
import Sinup from './Components/Sinup/Sinup';
import UserPosts from './Components/UserPosts/UserPosts';
import ProtectedRouts from './Components/ProtectedRouts/ProtectedRouts';
import ProtectedAuth from './Components/ProtectedAuth/ProtectedAuth';
import PostDetails from './Components/PostDetails/PostDetails';


function App() {



    const router = createBrowserRouter([
    {
      path: "", element: <Layout/>, children: [
    
    {index: true, element:<ProtectedRouts><Home/></ProtectedRouts> },
    {path: "userposts", element:<ProtectedRouts> <UserPosts/> </ProtectedRouts>},
    {path: "postdetails/:id", element: <ProtectedRouts><PostDetails/></ProtectedRouts> },
    
    {path: "login", element: <ProtectedAuth><Login/></ProtectedAuth> },
    {path: "sinup", element: <ProtectedAuth><Sinup/></ProtectedAuth> },

    {path: "*", element: <NotFound/>},

      ]
    }
  ])


  return (
    <>

     <RouterProvider router={router}></RouterProvider>

    </>
  )
}

export default App
