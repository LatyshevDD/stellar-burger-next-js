import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WebSocketDataType, SetWebSocketPayloadType } from '../types/types'

export const profileOrdersWebSocketStart = 'PROFILE_ORDERS_WS_CONNECTION_START'
export const profileOrdersWebSocketStop = 'PROFILE_ORDERS_WS_CONNECTION_STOP'

const initialState: WebSocketDataType = {
  success: false,
  orders: [],
  total: null,
  totalToday: null,
  socketConnectionStatus: null
}

export const profileOrdersDataSlice = createSlice({
  name: 'profileOrdersData',
  initialState,
  reducers: {
    setProfileOrders: (state, action: PayloadAction<SetWebSocketPayloadType>) => {
      return {
        ...state,
        success: action.payload.success,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      }
    },
    setProfileOrdersSocketConnectionStatus: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        socketConnectionStatus: action.payload
      }
    },
  },
})

export const { setProfileOrders, setProfileOrdersSocketConnectionStatus } = profileOrdersDataSlice.actions

export default profileOrdersDataSlice.reducer