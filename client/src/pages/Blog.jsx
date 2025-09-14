import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader';

const Blog = () => {

  const {id} = useParams();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const fetchBlogData = async () => {
    const data = blog_data.find(item => item._id === id)
    setData(data);
  }

  const fetchComments = async () => {
    setComments(comments_data)
  }

  const addComment = async (e) => {
    e.preventDefault();

  }

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [])

  return data ? (
    <div className='relative'>
      <img className='absolute -top-50 -z-1 opacity-50' src={assets.gradientBackground} alt="" />

      <Navbar/>
      
      <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>Michael Brown</p>
      </div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img className='rounded-3xl mb-5' src={data.image} alt="" />

        <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{__html: data.description}}></div>

        {/* { Comment Section } */}
        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Comments ({comments.length})</p>
          <div className='flex flex-col gap-4'>
            {comments.map((item, index) => (
              <div className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600' key={index}>
                <div className='flex items-center gap-2 mb-2'>
                  <img className='w-6' src={assets.user_icon} alt="" />
                  <p className='font-medium'>{item.name}</p>
                </div>
                <p className='text-sm max-w-md ml-8'>{item.content}</p>
                <div className='absolute right-4 bottem-3 flex items-center gap-2 text-xs'>{Moment(item.createdAt).fromNow()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* { Add Comment Section } */}
        <div className='max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Add your comment</p>
          <form className='flex flex-col items-start gap-4 max-w-lg' onSubmit={addComment}>
            <input onChange={(e) => setName(e.target.value)} value={name} className='w-full p-2 border border-gray-300 rounded outline-none' type="text" placeholder='Name' required />

            <textarea onChange={(e) => setContent(e.target.value)} value={content} className='w-full p-2 border border-gray-300 rounded outline-none h-48' required placeholder='Comment'></textarea>
            
            <button className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer' type='submit'>Submit</button>           
          </form>
        </div>

        {/* { Share Buttons } */}
        <div className='my-24 max-w-3xl mx-auto'>
          <p className='font-semibold my-4'>Share this article on Social Media</p>
          <div className='flex'>
            <img src={assets.facebook_icon} width={50} alt="" />
            <img src={assets.twitter_icon} width={50} alt="" />
            <img src={assets.googleplus_icon_icon} width={50} alt="" />
          </div>
        </div>
      </div>

      <Footer/>

    </div>
  ) : <Loader/>  
}

export default Blog
