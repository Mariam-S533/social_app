import { Navigate } from "react-router-dom"

function ProtectedAuth(props) {

  if(localStorage.getItem("userToken")){
    return <Navigate to="/"></Navigate>
  }
  else{
    return  props.children
  }
  
}

export default ProtectedAuth
