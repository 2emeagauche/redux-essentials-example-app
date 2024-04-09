import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postUpdated } from './postsSlice'
import { useHistory } from 'react-router-dom'

export const EditPostForm = ({match}) => {
  const { postId } = match.params
  const dispatch = useDispatch()
  const post = useSelector(state => state.posts.find(post => post.id === postId))

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const history = useHistory()

  const onTitleChanged = (e) => {setTitle(e.target.value)}
  const onContentChanged = (e) => {setContent(e.target.value)}
  const handleSubmit = (e) => {
    e.preventDefault()
    if(title && content){
      dispatch(postUpdated(
        {
          id: postId,
          title: title,
          content: content
        }
      ))
      history.push(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit the post</h2>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Post Content:</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type='submit'>Save Post</button>
      </form>
    </section>
  )

}