import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { checkIsAuth, registerUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'


export const RegisterPage = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { status } = useSelector(state => state.auth)
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    if (status) {
      toast(status)
    }
    if(isAuth) navigate('/')
  }, [status, isAuth, navigate])

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ username, password }))
      setPassword('')
      setUsername('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      className='max-w-sm h-60 mx-auto mt-40'
      onSubmit={(e) => e.preventDefault()}
    >
      <h1 className="text-lg text-white text-center">
        Регистрация
      </h1>
      <label className="text-xs text-gray-400">
        Username:
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder='Username'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border px-2 py-1 text-xs outline-none
        placeholder:text-gray-700'
        />
      </label>
      <label className="text-xs text-gray-400">
        Password:
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder='Password'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border px-2 py-1 text-xs outline-none
        placeholder:text-gray-700'
        />
      </label>

      <div className="flex gap-8 justify-center mt-4">
        <button
          onClick={handleSubmit}
          type='submit'
          className='flex justify-center items-center text-white rounded-sm py-2 px-4 bg-gray-600'
        >
          Потвердить
        </button>
        <Link
          to='/login'
          className='flex justify-center items-center text-xs text-white'
        >
          уже зарегистрированы ?
        </Link>
      </div>
    </form>
  )
}
