import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import * as z from "zod";

function Sinup() {

          //coerce.date()
      const schema = z.object({
            name: z.string().nonempty("Name is required").min(3, "Not less than 3 characters"),
            email: z.string().nonempty("Email is required").email("Not valid email"),
            password: z.string().nonempty("Password is required").regex(/^[A-Z][a-z0-9]{3,9}/, "Password not valid"),
            rePassword: z.string().nonempty("Confirm Password").regex(/^[A-Z][a-z0-9]{3,9}/, "rePassword not valid"),
            dateOfBirth: z.string().nonempty("Select your date"),
            gender: z.enum(["male", "female"]) 
      }).refine((data) => data.password == data.rePassword, {message: "Passowerd not match", path:["rePassword"]})

      const  Navigate = useNavigate()
      const {register, handleSubmit, setError ,formState:{errors, isSubmitting}} = useForm({
        resolver:zodResolver(schema)
      });
      
    
      async function onSubmit (values){
          console.log(values)

          try {
                      let {data} = await axios.post("https://linked-posts.routemisr.com/users/signup", values);
                      console.log(data)
                      if(data.message == "success"){
                          Navigate("/login")
                      }
          } 
  
          catch (error) {
            console.log(error.response.data.error)  //user arlready exists3

            setError("root", {message: error.response.data.error})
          }
      }

  return (
    <>
        <div className='w-1/2  shadow mx-auto my-5 p-4'>
          <h1 className='text-center text-[#640D5F] text-2xl font-bold my-4'>Register Now</h1>

        <form onSubmit={handleSubmit(onSubmit)}>

            {errors.root && <p className='text-red-600 text-center font-bold'>{errors.root.message}</p>}


            <input 
            {...register("name")}
            type="text" placeholder="Type Your Name" className="input input-neutral w-full focus:outline-0 border-gray-400 rounded-sm my-3 bg-gray-100" />
            {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
            
            <input 
            {...register("email")}
            type="email" placeholder="Type Your email" className="input input-neutral w-full focus:outline-0 border-gray-400 rounded-sm my-3 bg-gray-100" />
                {errors.email && <p className='text-red-600'>{errors.email.message}</p>}

            <input 
            {...register("password")}
            type="password" placeholder="Type Your Password" className="input input-neutral w-full focus:outline-0 border-gray-400 rounded-sm my-3 bg-gray-100" />
            {errors.password && <p className='text-red-600'>{errors.password.message}</p>}

            <input 
            {...register("rePassword")}
            type="password" placeholder="Confirm Your Password" className="input input-neutral w-full focus:outline-0 border-gray-400 rounded-sm my-3 bg-gray-100" />
            {errors.rePassword && <p className='text-red-600'>{errors.rePassword.message}</p>}

            <input 
            {...register("dateOfBirth")}
            type="date" placeholder="Select date" className="input input-neutral w-full focus:outline-0 border-gray-400 rounded-sm my-3 bg-gray-100" />
             {errors.dateOfBirth && <p className='text-red-600'>{errors.dateOfBirth.message}</p>}

            <div className='my-1'>
              <input
              {...register("gender")}
              id='male' value="male" type="radio" name="gender" className="radio radio-sm radio-primary me-1" />

              <label htmlFor="male" className='me-3 font-semibold'>Male</label>

              <input 
              {...register("gender")}
              id='female' value="female" type="radio" name="gender" className="radio radio-sm radio-primary me-1" />

              <label htmlFor="female" className='font-semibold'>Female</label>
            </div>
              {errors.gender && <p className='text-red-600'>{errors.gender.message}</p>}

            <button 
            disabled= {isSubmitting}
            type='submit' className='px-3 py-2 bg-[#640D5F] text-white rounded-sm my-3 cursor-pointer'>
               { isSubmitting ? "Loding..." : "sign Up"}
            </button>
        </form>

        </div>
    </>
  )
}

export default Sinup
