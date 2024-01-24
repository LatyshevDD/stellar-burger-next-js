import {OrderType, RefreshTokenRequestType, GetIngredienceRequestType, RequestWithUserType, RefreshUserInfoRequestType, GetUserRequestType, ChangeUserDataType, GetOrderRequestType } from "../types/types";

const config = {
  ingredienceUrl: 'https://norma.nomoreparties.space/api/ingredients',
  orderUrl: 'https://norma.nomoreparties.space/api/orders'
};


let authorization = localStorage.getItem('accessToken') ?? "Error"
let authorizationRequestHeaders: HeadersInit = new Headers()
authorizationRequestHeaders.append('Content-Type', 'application/json')
authorizationRequestHeaders.append( 'authorization', authorization)


function requestApi<T>(url: string, options: RequestInit): Promise<T> {
  return fetch(url, options)
    .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка`);
        }
        return res.json() as Promise<T>
      }
    )
}

export function getIngredience() {
  return requestApi<GetIngredienceRequestType>(config.ingredienceUrl, {method: 'GET'})
}

export function getOrderDetails(data: String[]) {
  return requestApi<OrderType>(config.orderUrl, {
    method: 'POST',
    body: JSON.stringify({
      ingredients: data
    }),
    headers: authorizationRequestHeaders
  })
}

export function getOrderWithRefreshRequest(data: String[]) {
  return getOrderDetails(data)
          .catch((err: string) => {
            if (err === 'jwt expired') {
              refreshTokenRequest()
                .then((res) => {
                  localStorage.setItem("refreshToken", res.refreshToken);
                  localStorage.setItem("accessToken", res.accessToken);
                })
                .then(() => {
                  return getOrderDetails(data)
                    .catch((err) =>{
                      return Promise.reject(err)
                    })
                })
                .catch((err) => {
                  return Promise.reject(err)
                })
            }
            return Promise.reject("Неизвестная ошибка")
          })
}

export function registerRequest(data: {email: string, password: string, name: string}) {
  return requestApi<RequestWithUserType>('https://norma.nomoreparties.space/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function loginRequest(data: {email: string, password: string}) {
  return requestApi<RequestWithUserType>('https://norma.nomoreparties.space/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function logoutRequest() {
  return requestApi<RefreshUserInfoRequestType>('https://norma.nomoreparties.space/api/auth/logout', {
    method: 'POST',
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getUserRequest() {

  authorization = localStorage.getItem('accessToken') ?? "Error"
  authorizationRequestHeaders = new Headers()
  authorizationRequestHeaders.append('Content-Type', 'application/json')
  authorizationRequestHeaders.append( 'authorization', authorization)

  return requestApi<GetUserRequestType>('https://norma.nomoreparties.space/api/auth/user', {
    method: 'GET',
    headers: authorizationRequestHeaders
  })
}

export function getUserWithRefreshRequest() {
  return getUserRequest()
          .catch((err:string) => {
            if (err === 'jwt expired') {
              refreshTokenRequest()
                .then((res) => {
                  localStorage.setItem("refreshToken", res.refreshToken);
                  localStorage.setItem("accessToken", res.accessToken);
                })
                .then(() => {
                  return getUserRequest()
                    .catch((err) =>{
                      return Promise.reject(err)
                    })
                })
                .catch((err) =>{
                  return Promise.reject(err)
                })
            }
            return Promise.reject("Неизвестная ошибка")
          })
}

export function refreshTokenRequest() {
  return requestApi<RefreshTokenRequestType>('https://norma.nomoreparties.space/api/auth/token', {
    method: 'POST',
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function forgotPasswordRequest(data: string) {
  return requestApi<RefreshUserInfoRequestType>('https://norma.nomoreparties.space/api/password-reset', {
    method: 'POST',
    body: JSON.stringify({
      email: data
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function resetPasswordRequest(data:{password: string, token: string}) {
  return requestApi<RefreshUserInfoRequestType>('https://norma.nomoreparties.space/api/password-reset/reset', {
    method: 'POST',
    body: JSON.stringify({
      password: data.password,
      token: data.token
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function changeUserRequest(data: ChangeUserDataType) {
  return requestApi<RequestWithUserType>('https://norma.nomoreparties.space/api/auth/user', {
    method: 'PATCH',
    body: JSON.stringify({
      name: data.name,
      email: data.login,
      password: data.password
    }),
    headers: authorizationRequestHeaders
  })
}

export function ChangeUserWithRefreshRequest(data: {name: string, login: string, password: string}) {
  return changeUserRequest(data)
          .catch((err:string) => {
            if (err === 'jwt expired') {
              refreshTokenRequest()
                .then((res) => {
                  localStorage.setItem("refreshToken", res.refreshToken);
                  localStorage.setItem("accessToken", res.accessToken);
                })
                .then(() => {
                  return changeUserRequest(data)
                    .catch((err) =>{
                      return Promise.reject(err)
                    })
                })
                .catch((err) => {
                  return Promise.reject(err)
                })
            }
            return Promise.reject("Неизвестная ошибка")
          })
}


export function getOrder(number: string) {
  return requestApi<GetOrderRequestType>(`${config.orderUrl}/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true',
    }
  })
}