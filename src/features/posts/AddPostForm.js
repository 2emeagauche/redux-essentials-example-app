import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from './postsSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  const onTitleChanged = (e) => {setTitle(e.target.value)}
  const onContentChanged = (e) => {setContent(e.target.value)}
  const handleSubmit = (e) => {
    e.preventDefault()
    if(title && content){
      dispatch(postAdded(title, content, userId))
    }
    setTitle('')
    setContent('')
  }

  const handleUser = (e) => {setUserId(e.target.value)}

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const usersOptions = users.map(user => (
    <option value={user.id} key={user.id}>{user.name}</option>
  ))

  return (
    <section>
      <h2>Add a new post</h2>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postUser">User</label>
        <select id="postUser" value={userId} onChange={handleUser}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Post Content:</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type='submit' disabled={!canSave}>Save Post</button>
      </form>
    </section>
  )
}