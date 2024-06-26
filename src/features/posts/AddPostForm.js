import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from './postsSlice'
import { postAdded } from './postsSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  const onTitleChanged = (e) => {setTitle(e.target.value)}
  const onContentChanged = (e) => {setContent(e.target.value)}
  
  const handleUser = (e) => {setUserId(e.target.value)}
  
  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

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
        <label htmlFor="postContent">Post Content:</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <label htmlFor="postUser">User</label>
        <select id="postUser" value={userId} onChange={handleUser}>
          <option value=""></option>
          {usersOptions}
        </select>
        <button type='submit' disabled={!canSave}>Save Post</button>
      </form>
    </section>
  )
}