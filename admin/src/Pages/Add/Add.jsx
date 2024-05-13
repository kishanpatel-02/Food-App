import React, { useEffect } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
const Add = () => {


  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name:"",
    description:"",
    category:"Salad",
    price:""
  })

  const onChangeHandler =(event) => {
      const name = event.target.name
      const value = event.target.value
      setData(data=>({...data,[name]:value}))
  }

  useEffect(() => {
    console.log(data);
  },[data])
  return (
    <div className='add'>
      <form className='flex-col'>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" cols="30" rows="10" placeholder='write content here'></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select value={data.category} onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" placeholder='20' name='price' />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form >
    </div >
  )
}

export default Add