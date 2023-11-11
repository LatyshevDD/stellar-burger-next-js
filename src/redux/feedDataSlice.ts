import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WebSocketDataType, SetWebSocketPayloadType } from '../types/types'

export const feedWebSocketStart = 'FEED_WS_CONNECTION_START'
export const feedWebSocketStop = 'FEED_WS_CONNECTION_STOP'

const initialState: WebSocketDataType = {
  success: false,
  orders: [],
  total: null,
  totalToday: null,
  socketConnectionStatus: null
}

export const feedDataSlice = createSlice({
  name: 'feedData',
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<SetWebSocketPayloadType>) => {
      return {
        ...state,
        success: action.payload.success,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      }
    },
    setFeedSocketConnectionStatus: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        socketConnectionStatus: action.payload
      }
    },
  },
})

export const { setFeed, setFeedSocketConnectionStatus } = feedDataSlice.actions

export default feedDataSlice.reducer