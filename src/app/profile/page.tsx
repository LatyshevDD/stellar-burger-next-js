"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Input, Button, CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { changeUser } from "@/redux/userDataSlice"

export default function Profile() {

  const userData = useAppSelector(store => store.userData.user)
  const dispatch = useAppDispatch()

  const [name, setName] = useState({active: true, value: ''})
  const [login, setLogin] = useState({active: true, value:''})
  const [password, setPassword] = useState({active: true, value:''})
  const [buttonsState, setButtonsState] = useState(false)

  useEffect(
    () => {
      setName({active: true, value: userData != null ? userData.name : ''})
      setLogin({active: true, value: userData != null ? userData.email : ''})
    },
    [userData]
  )

  const nameRef = useRef<HTMLInputElement>(null)
  const loginRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleNameIconClick = useCallback(
    () => {
      setName({...name, active: false})
      if (nameRef.current !== document.activeElement) {
        setTimeout(() => nameRef.current && nameRef.current.focus(), 100)
      } 
    },
    [nameRef, name]
  )

  const handleNameCloseClick = useCallback(
    () => {
      setName({...name, active: true})
      setButtonsState(false) 
    },
    [name]
  )

  const handleLoginIconClick = useCallback(
    () => {
      setLogin({...login, active: false})
      if (loginRef.current !== document.activeElement) {
        setTimeout(() => loginRef.current && loginRef.current.focus(), 100)
      } 
    },
    [loginRef, login]
  )

  const handleLoginCloseClick = useCallback(
    () => {
      setLogin({...name, active: true})
      setButtonsState(false) 
    },
    [name]
  )

  const handlePasswordIconClick = useCallback(
    () => {
      setPassword({...password, active: false})
      if (passwordRef.current !== document.activeElement) {
        setTimeout(() => passwordRef.current && passwordRef.current.focus(), 100)
      } 
    },
    [passwordRef, password]
  )

  const handlePasswordCloseClick = useCallback(
    () => {
      setPassword({...name, active: true})
      setButtonsState(false) 
    },
    [name]
  )

  const handleCancelClick = useCallback(
    () => {
      setName({...name, value: ''})
      setLogin({...login, value: ''})
      setPassword({...password, value: ''})
      setButtonsState(false)
    },
    [login, name, password]
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch(changeUser({name: name.value, login: login.value, password: password.value }))
    },
    [dispatch, name, login, password]
  )

  return (
    <form 
      className="flex flex-col items-center lg:items-start pt-0 lg:pt-[80px] gap-5 lg:gap-6"
      onSubmit={handleSubmit}
    >
      <p className="font-jet pb-2 text-[28px] font-bold leading-8 lg:hidden">
        Профиль
      </p>
      <Input
        ref={nameRef} 
        type={'text'} 
        placeholder={'Имя'}  
        value={name.value}
        icon={name.active ? "EditIcon" : "CloseIcon"}
        name={"name"}
        disabled={name.active}
        onIconClick={name.active ? handleNameIconClick : handleNameCloseClick}
        onChange={(e) => {
            setButtonsState(true)
            setName({...name, value: e.target.value})
          }   
        }
        extraClass="!w-[304px] flex sm:block sm:!w-[480px]"
      />
      <Input
        ref={loginRef} 
        type={'text'} 
        placeholder={'Логин'}  
        value={login.value}
        icon={login.active ? "EditIcon" : "CloseIcon"}
        name={"login"}
        disabled={login.active}
        onIconClick={login.active ? handleLoginIconClick : handleLoginCloseClick}
        onChange={(e) => {
            setButtonsState(true)
            setLogin({...login, value: e.target.value})
          }
        }
        extraClass="!w-[304px] flex sm:block sm:!w-[480px]"
      />
      <Input
        ref={passwordRef} 
        type={'password'} 
        placeholder={'Пароль'}  
        value={password.value}
        icon={password.active ? "EditIcon" : "CloseIcon"}
        name={"password"}
        disabled={password.active}
        onIconClick={password.active ? handlePasswordIconClick : handlePasswordCloseClick}
        onChange={(e) => {
            setButtonsState(true)
            setPassword({...password, value: e.target.value})
          }
        }
        extraClass="!w-[304px] flex sm:block sm:!w-[480px]"
      />
      {
        buttonsState
        &&
        <div className="flex justify-end">
        <Button 
          htmlType="button" 
          type="secondary" 
          size="medium"
          onClick={handleCancelClick}
        >
          Отмена
        </Button>
        <Button 
          htmlType="submit" 
          type="primary" 
          size="medium"
        >
          Сохранить
        </Button>
      </div>
      }
    </form>
  )
}