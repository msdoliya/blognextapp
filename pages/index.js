import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head';
import Categories from '@/components/Categories';
import Postwidget from '@/components/Postwidget';
import { getPosts } from '@/services';
import FeaturedPosts from '@/sections/FeaturedPosts';
 import PostCard from '@/components/PostCard';
import { useEffect, useRef , useState} from 'react';

const inter = Inter({ subsets: ['latin'] })

  
export default function Home({posts}) {


  return (
   <>
   <div className='container mx-auto px-10 mb-8'>
   <Head>
   <title>next appication</title>
   </Head>
   <FeaturedPosts/>
   <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
    <div  className='lg:col-span-8 col-span-1'>
    {posts.map((post, index)=>(
      
     <PostCard key={index} post = {post.node}/>
  
  ))}
    </div>
      <div  className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
          <Postwidget/>
           <Categories/>
          </div>
      </div>
   </div>
   </div>
   </>
  )
}


export async function getStaticProps() {
  const posts = await getPosts()|| [];

  return {
    props: {posts}
  }
}