import { Navigate } from "react-router-dom"

function ProtectedRouts(props) {

  if(localStorage.getItem("userToken")){
    return props.children         //authN user
  }
  else{
    return  <Navigate to="/login"></Navigate>
  }

}

export default ProtectedRouts