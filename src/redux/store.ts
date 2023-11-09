import { configureStore, combineReducers } from '@reduxjs/toolkit'
import ingrediencesDataSlice from './ingrediencesDataSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
// import { socketMiddleware } from './socketMiddleware'

// import { setFeedSocketConnectionStatus, setFeed, feedWebSocketStart, feedWebSocketStop } from './feedDataSlice'
// import { setProfileOrdersSocketConnectionStatus, setProfileOrders, profileOrdersWebSocketStart, profileOrdersWebSocketStop } from './profileOrdersDataSlice'




const rootReducer = combineReducers({ 
  ingrediencesData: ingrediencesDataSlice,
  // burgerData: burgerDataSlice,
  // orderData: orderDataSlice,
  // userData: userDataSlice,
  // feedData: feedDataSlice,
  // profileOrdersData: profileOrdersDataSlice,
  })

export const store = configureStore({
  reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    //   .concat(
    //     socketMiddleware({
    //       onStart: feedWebSocketStart,
    //       onStop: feedWebSocketStop,
    //       onOpen: setFeedSocketConnectionStatus,
    //       onMessage: setFeed,
    //       onClose: setFeedSocketConnectionStatus,
    //       onError: setFeedSocketConnectionStatus,
    //     }), 
    //     socketMiddleware({
    //       onStart: profileOrdersWebSocketStart,
    //       onStop: profileOrdersWebSocketStop,
    //       onOpen: setProfileOrdersSocketConnectionStatus,
    //       onMessage: setProfileOrders,
    //       onClose: setProfileOrdersSocketConnectionStatus,
    //       onError: setProfileOrdersSocketConnectionStatus,
    //     })
    //   )

})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector