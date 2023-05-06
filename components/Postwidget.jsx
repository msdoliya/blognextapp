import React, { useEffect, useState } from 'react'
import { getRecentPosts } from '@/services'
import { getSimilarPosts } from '@/services'
import moment from 'moment'
import Link from 'next/link'


const Postwidget = ({categories, slug}) => {
  
  const [relatedPosts, setrelatedPosts] = useState([])

  useEffect(()=>{
   if(slug){
    getSimilarPosts(categories, slug)
    .then((result)=>setrelatedPosts(result))
   } else{
    getRecentPosts()
    .then((result)=>setrelatedPosts(result))
   }
  } ,[slug])

  return (
 
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
       {relatedPosts.map((post, index)=>(
        <div key={post.title} className='flex item-center w-full'>
          <div className='w-16 flex-none'>
            <img src={post.featuredImage.url} alt={post.title} width='60px' height='60px' className='align-middle rounded-full' />
          </div>
          <div className="flex-grow ml-4">
            <p className='text-grey-500 font-xs'>
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} className="text-md" key={index}>
              {post.title}
              </Link>
          </div>
        </div>
       ))}
      </div>
  )
}
export default Postwidget