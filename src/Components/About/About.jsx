import React from 'react'

function About() {
  return (
    <>
<div className='mt-[50px] container mx-auto '>

      <h1 className=' bg-pink-500 text-white text-2xl text-center w-1/2 mx-auto'> about commponents</h1>


    <div className="card mt-5 bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
</div>
    </>
  )
}

export default About