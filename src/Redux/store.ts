
import {configureStore} from '@reduxjs/toolkit'
import uiReducer from "./slices/UiSlice";
import ConversationReducer from "./slices/ConversationSlice";
export const store =configureStore({
     reducer:{
        conversation:ConversationReducer,
      ui:uiReducer
     }
})


export type RootState= ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch