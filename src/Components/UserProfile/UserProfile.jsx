import { useContext, useState } from 'react'
import { PostContext } from '../../Context/PostContext'
import moment from "moment/moment";
import { useForm } from 'react-hook-form';




function UserProfile() {

    const {register, handleSubmit} = useForm()
    const {currentUser, uploadPhotoProfile} = useContext(PostContext)
    const [isOpen, setIsOpen] = useState(false);

    
  
    async function uploadPhoto(Davalue){
        let imageFile = Davalue.photo[0]
        let formData = new FormData()
        formData.append("photo", imageFile)
        
        
         await uploadPhotoProfile(formData)
        setIsOpen(false)
}



  return (
    <>
    
        <div className=' container mx-auto p-2 '>
            <div className="p-4 min-h-50   max-w-2xl mx-auto my-6 bg-white rounded-xl flex flex-col items-center text-center gap-3">
                <div className='relative'>
                <img src={currentUser?.photo} alt={currentUser?.name}  className="w-20 h-20 rounded-full object-cover border"/>                    <button className="p-2 absolute -bottom-1 -right-1 rounded-full bg-gray-300 cursor-pointer hover:bg-gray-400" onClick={() => setIsOpen(true)}>
                    <i className="fa-solid fa-camera text-lg" /></button>
                </div>
                <div className='flex flex-col items-center text-center gap-2'>
                    <h1 className='font-bold text-2xl'>{currentUser.name}</h1>                    
                    <p className=" text-gray-600">
                        Joined {moment(currentUser?.createdAt).format("DD-MM-YYYY")}
                    </p>
                    <p> <a
                        href={`mailto:${currentUser?.email}`}
                        className=" text-blue-800 font-bold ">
                        Contact info
                    </a> </p>
                </div>
            </div>
        </div>


    <div>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
            {/* Close button */}
            <div className='mb-2 flex justify-end'><button onClick={() => setIsOpen(false)} className=" text-gray-500  hover:text-gray-700"> <i className="fa-solid fa-xmark text-xl" /></button></div>
            <div className='modal-content'>
        
            <form onSubmit={handleSubmit(uploadPhoto)}>
            <div className="col-span-full mb-3">
              <div className="mt-2 max-w-2xl mx-auto flex justify-center rounded-lg border border-dashed  border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm/6 text-gray-600 ">
                  
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500">
                     <span>Upload a file</span>
                      <input {...register("photo")} id="file-upload" type="file" className="sr-only" />
                    </label>
                    
                    <p className="p-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-3">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"> Cancel </button>
              <button type="submit"  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"> Confirm </button>
            </div>
            </div>
            </form>
            </div>

          </div>
        </div>
      )}
    </div>     

    </>
  )
}

export default UserProfile




