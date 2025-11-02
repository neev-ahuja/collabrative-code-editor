import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'data',
  initialState: {
    users : [] as any[],
    data : "" as string
  },
  reducers: {
    update : (state, action) => action.payload
  }
})

// Action creators are generated for each case reducer function
export const { update } = counterSlice.actions

export default counterSlice.reducer