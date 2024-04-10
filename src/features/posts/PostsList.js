import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'
import { Spinner } from '../../components/Spinner'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { selectAllPosts } from './postsSlice'
import { fetchPosts } from './postsSlice'

const PostExcerpt = ({post}) => {
  return (
    <article className="post-excerpt">
      <h3>
        {post.title}
      </h3>
      <span>
        <PostAuthor userId={post.user} />
        &nbsp;
        <TimeAgo timestamp={post.date} />
      </span>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
      <ReactionButtons post={post} />
    </article>
  )
}

export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)

  
  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)
  
  useEffect(() => {
    if(postStatus === "idle") {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])
  
  let content
  
  switch(postStatus) {
    case 'loading':
      content = <Spinner text="Loading..." />
      break
    case 'succeeded':
      const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))
      content = orderedPosts.map(post => (
        <PostExcerpt post={post}  key={nanoid()} />
      ))
      break
    case 'failed':
    default:
      content = <div>{error}</div>
      break
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}