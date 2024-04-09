import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    id: '0',
    name: 'Tony Bobo'
  },
  {
    id: '1',
    name: 'Pascal Goula'
  },
  {
    id: '2',
    name: 'Frank Epstein'
  }
]

const usersSlice= createSlice({
  name: 'users',
  initialState,
  reducers:{}
})

export default usersSlice.reducer