import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { selectpostById } from './postsSlice'

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params
  const post = useSelector(state => selectpostById(state, postId))

  if(!post) return (
    <section>
      <h2>Post not found</h2>
    </section>
  )

  return (
    <section>
      <h2>{post.title}</h2>
      <span>
        <PostAuthor userId={post.user} />
        &nbsp;
        <TimeAgo timestamp={post.date} />
      </span>
      <p className="post-content">{post.content}</p>
      <Link to={`/editPost/${post.id}`} className="button">Edit Post</Link>
      <ReactionButtons post={post} />
    </section>
  )
}