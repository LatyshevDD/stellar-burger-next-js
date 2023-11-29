import { configureStore, combineReducers } from '@reduxjs/toolkit'
import ingrediencesDataSlice from './ingrediencesDataSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { socketMiddleware } from './socketMiddleware'
import burgerDataSlice from './burgerDataSlice'
import orderDataSlice from './orderDataSlice'
import userDataSlice from './userDataSlice'
import feedDataSlice from './feedDataSlice'
import profileOrdersDataSlice from './profileOrdersDataSlice'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

import { setFeedSocketConnectionStatus, setFeed, feedWebSocketStart, feedWebSocketStop } from './feedDataSlice'
import { setProfileOrdersSocketConnectionStatus, setProfileOrders, profileOrdersWebSocketStart, profileOrdersWebSocketStop } from './profileOrdersDataSlice'

const rootReducer = combineReducers({ 
  ingrediencesData: ingrediencesDataSlice,
  burgerData: burgerDataSlice,
  orderData: orderDataSlice,
  userData: userDataSlice,
  feedData: feedDataSlice,
  profileOrdersData: profileOrdersDataSlice,
  })

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(
        socketMiddleware({
          onStart: feedWebSocketStart,
          onStop: feedWebSocketStop,
          onOpen: setFeedSocketConnectionStatus,
          onMessage: setFeed,
          onClose: setFeedSocketConnectionStatus,
          onError: setFeedSocketConnectionStatus,
        }), 
        socketMiddleware({
          onStart: profileOrdersWebSocketStart,
          onStop: profileOrdersWebSocketStop,
          onOpen: setProfileOrdersSocketConnectionStatus,
          onMessage: setProfileOrders,
          onClose: setProfileOrdersSocketConnectionStatus,
          onError: setProfileOrdersSocketConnectionStatus,
        }),
        sagaMiddleware
      )

})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector