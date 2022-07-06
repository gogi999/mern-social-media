import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './Posts.css'
import Post from '../Post/Post'
import { getTimelinePosts } from '../../actions/postAction'

const Posts = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  let { posts, loading } = useSelector((state) => state.postReducer)
  const params = useParams()

  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!posts) return 'No posts!'

  if (params.id) posts = posts.filter((post) => post.userId === params.id)

  return (
    <div className="posts">
      {loading
        ? 'Fetching posts...'
        : posts.map((post, id) => <Post key={id} data={post} id={id} />)}
    </div>
  )
}

export default Posts
