import { Routes, Route, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'

import { Layout } from './components/Layout'
import { MainPage } from './pages/MainPage'
import { PostsPage } from './pages/PostsPage'
import { PostPage } from './pages/PostPage'
import { AddPostPage } from './pages/AddPostPage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { EditPostPage } from './pages/EditPostPage'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkIsAuth, getMe } from './redux/features/auth/authSlice'


function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(checkIsAuth)

  useEffect(() => {
    dispatch(getMe())

    // if (!token) {
    //   navigate('/login')
    // }
  },[dispatch])


  return (
    <Layout>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='posts' element={<PostsPage />} />
        <Route path=':id' element={<PostPage />} />
        <Route path=':id/edit' element={<EditPostPage />} />
        <Route path='new' element={<AddPostPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='login' element={<LoginPage />} />
      </Routes>


      <ToastContainer position='bottom-right'/>
    </Layout>
  )
}

export default App;
