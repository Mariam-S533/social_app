import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'
import { useContext } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import * as z from "zod";
import { TokenContext } from '../../Context/TokenContext';
import { BeatLoader, ClipLoader } from 'react-spinners';

function Login() {

      //i take token from here becouse BE send token when success login
      let {setToken} = useContext(TokenContext)

            const schema = z.object({
                  email: z.string().nonempty("Email is required").email("Not valid email"),
                  password: z.string().regex(/^[A-Z][a-z0-9]{3,9}/, "Password not valid").nonempty("Password is required"),
            })
            let Navigate = useNavigate()
              let {register, handleSubmit, setError ,formState:{errors, isSubmitting}} = useForm({
                resolver:zodResolver(schema)
              });


          async function onSubmit (values){
          console.log(values)
          try {
                      let {data} = await axios.post("https://linked-posts.routemisr.com/users/signin", values);
                      console.log(data)
                      if(data.message == "success"){
                        //save token in browser storage 
                          localStorage.setItem("userToken", data.token)
                          setToken(data.token)
                          Navigate("/")
                          //save token to local storag 
                          //save token to tokenContext
                          //use it inside the entire application
                      }
          } 
  
          catch (error) {
            console.log(error.response.data.error)
            setError("root", {message: error.response.data.error})
          }
      }


  return (
    <>
          <div className='w-1/2  shadow mx-auto my-5 p-4'>
          <h1 className='text-center text-[#640D5F] text-2xl font-bold my-4'>Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>


            {errors.root && <p className='text-red-600'>{errors.root.message}</p>}

            
            <input 
            {...register("email")}
            type="email" placeholder="Type Your email" className="input input-neutral w-full focus:outline-0 border-gray-400 rounded-sm my-3 bg-gray-100" />
                {errors.email && <p className='text-red-600'>{errors.email.message}</p>}

            <input 
            {...register("password")}
            type="password" placeholder="Type Your Password" className="input input-neutral w-full focus:outline-0 border-gray-400 rounded-sm my-3 bg-gray-100" />
            {errors.password && <p className='text-red-600'>{errors.password.message}</p>}


            <button 
            disabled= {isSubmitting}
            type='submit' className='px-3 py-2 bg-[#640D5F] text-white rounded-sm my-3 cursor-pointer'>
               { isSubmitting ? <ClipLoader color="#fff" size={20}/> : "sign in"}
            </button> 
        </form>
        
        </div>
    </>
  )
}

export default Login