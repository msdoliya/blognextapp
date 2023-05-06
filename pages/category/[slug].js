import React from 'react';
import { useRouter } from 'next/router';

import { getCategories, getCategoryPost } from '@/services'; 
import Postcard from '@/components/Postcard';
import Categories from '@/components/Postcard';
import Loader from '@/components/Loader';

const CategoryPost = ({ posts }) => {
  const router = useRouter();

     const gsggs =  async()=>{
      const data = await getCategoryPost("react");
      console.log(data.data)
     }
     gsggs()

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <Postcard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const data = await getCategoryPost(params.slug);
  return {
    props: {
      posts: data,
    },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}