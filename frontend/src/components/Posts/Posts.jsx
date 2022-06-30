import React from 'react'
import './Posts.css'
import Post from '../Post/Post'
import { posts } from '../../data/postsData'

const Posts = () => {
  return (
    <div className="posts">
      {posts.map((post, id) => (
        <Post key={id} data={post} id={id} />
      ))}
    </div>
  )
}

export default Posts
