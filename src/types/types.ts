import React, { ReactElement } from "react"
import { RootState, AppDispatch } from "../redux/store"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit"

export type IngredientType = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  _v: number,
  key?: string,
  key_1?: string,
  key_2?: string
}

export type IngredientProps = {
  ingredientData: IngredientType,
  type?: string
}

export type IngredientDetailsProps = {
  fullScrin: boolean
}

export type ModalPropsType = {
  onClose: () => void,
  children?: ReactElement
}

export type OrderPropsType = {
  order: WebSocketOrderType
}

export type ProtectedRoutePropsType = {
  onlyUnAuth?: boolean, 
  component: JSX.Element
}

export type OrderType = {
  name: string,
  success: boolean,
  order: {
    ingredients: IngredientType[],
    _id: string,
    owner: {
          name: string,
          email: string,
          createdAt: string,
          updatedAt: string
      },
      status: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      number: number,
      price: number
  }
}

export type OrderDataType = {
  name: string,
  order: {
    number: number | null
  },
  success: boolean,
  status: string,
  spinnerActive: boolean
}

export type ThunkApiConfig = {
  state?: RootState,
  dispatch?: AppDispatch,
  rejectValue?: Error
}

export type BurgerDataType = {
  bun: IngredientType[],
  ingredients: IngredientType[],
  smallBurgerConstructorMenu: boolean
}

export type sortIngredientsPayloadType = {
  dragIndex: number,
  dropIndex: number
}

// Websocket

export interface WSConfigType {
  onStart: string,
  onStop: string,
  onOpen: ActionCreatorWithPayload<string>,
  onMessage: ActionCreatorWithPayload<SetWebSocketPayloadType>,
  onClose: ActionCreatorWithPayload<string>,
  onError: ActionCreatorWithPayload<string>,
}

export type WebSocketOrderType = {
  _id: string,
  ingredients: string[],
  status: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  number: number,
  owner?: string,
  __v: number
}

export type WebSocketDataType = {
  success: boolean,
  orders: WebSocketOrderType[],
  total: number | null,
  totalToday: number | null,
  socketConnectionStatus: string | null
}

export type SetWebSocketPayloadType = {
  success: boolean,
  orders: WebSocketOrderType[],
  total: number,
  totalToday: number,
}

export type IngrediencesDataType = {
  ingrediences: IngredientType[] | null, 
  hasError: boolean, 
  errorMessage: string
}

export type IngrediencesSetErrorPayload = {
  hasError: boolean, 
  errorMessage: string
}

export type UserType = {
    login?: string,
    email: string,
    name: string
}

export type UserDataType = {
    user: UserType | null,
    isAuthChecked: boolean,
    isError: boolean,
    spinnerActive: boolean
}

export type ChangeUserDataType = {
  name: string, 
  login: string, 
  password: string
}

export type LoginRequestData = {
  email: string,
  password: string
}

// Api

export type RefreshTokenRequestType = {
  success: boolean,
  accessToken: string,
  refreshToken:string
}

export type GetIngredienceRequestType = {
  success: boolean,
  data: IngredientType[]
}

export type RequestWithUserType = {
    success: boolean,
    user: UserType,
    accessToken: string,
    refreshToken: string
}

export type RefreshUserInfoRequestType = {
  success: boolean,
  message: string
}

export type GetUserRequestType = {
  success: true,
  user: UserType
}

export type GetOrderRequestType = {
  success: true,
  orders: WebSocketOrderType[]
}
  