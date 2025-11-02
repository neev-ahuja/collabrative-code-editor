import { configureStore } from '@reduxjs/toolkit'
import codeReducer from './slices/code'
import dataReducer from './slices/data'
export default configureStore({
  reducer: {
    code : codeReducer,
    data : dataReducer
  }
})