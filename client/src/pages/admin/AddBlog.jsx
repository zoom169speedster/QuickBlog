/*
 * Copyright (c) 2025 Yash Kushwaha
 * Licensed under the MIT License. See LICENSE file for details.
 */

import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddBlog = () => {

  const {axios} = useAppContext()
  const [isAdding, setIsAdding] = useState(false)

  const editorRef = useRef(null)
  const quillRef = useRef(null)


  const [image, setImage] = useState(false)
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [category, setCategory] = useState('Startup')
  const [isPublished, setIsPublished] = useState(false)
  
  const generateContent = async () => {

  }
  
  
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true)

      const blog = {
        title, subTitle, description: quillRef.current.root.innerHTML, category, isPublished
      }

      const formData = new FormData()
      formData.append('blog', JSON.stringify(blog))
      formData.append('image', image)

      const {data} = await axios.post('/api/blog/add', formData)
      if(data.success) {
        toast.success(data.message)
        setImage(false)
        setTitle('')
        quillRef.current.root.innerHTML = ''
        setCategory('Startup')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsAdding(false)
    }
  }
  
  useEffect(() => {
    //Initiate quill only once
    if(!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
    }
  }, []);
  
  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img className='mt-2 h-16 rounded cursor-pointer' src={!image ? assets.upload_area : URL.createObjectURL(image) } alt="" />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </label>

        <p className='mt-4'>Blog Title</p>
        <input onChange={ e=> setTitle(e.target.value) } value={title} className='w-full max-w-lg mt-2 p-2 border-gray-300 outline-none rounded' type="text" placeholder='Type here' required/>

        <p className='mt-4'>Sub Title</p>
        <input onChange={ e=> setSubTitle(e.target.value) } value={subTitle} className='w-full max-w-lg mt-2 p-2 border-gray-300 outline-none rounded' type="text" placeholder='Type here' required/>

        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef}></div>
          <button className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer' type='button' onClick={generateContent}>Generate with AI</button>
        </div>

        <p className='mt-4'>Blog category</p>
        <select onChange={(e) => setCategory(e.target.value)} value={category} className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 ouline-none rounded' name="category">
          <option value="">Select Category</option>
          {blogCategories.map((item, index)=>{
            return <option key={index} value={item}>{item}</option>
          })}
        </select>

        <div className='flex gap-2 mt-4'>
          <p>Publish Now</p>
          <input onChange={e => setIsPublished(e.target.checked)} className='scale-125 cursor-pointer' type="checkbox" checked={isPublished} />
        </div>

        <button disabled={isAdding} className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm' type='submit'>{isAdding ? 'Adding...' : 'Add Blog'}</button>

      </div>
    </form>
  )
}

export default AddBlog
