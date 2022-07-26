import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePost } from '../redux/features/post/postSlice'
import axios from '../utils/axios'


export const EditPostPage = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [oldImage, setOldImage] = useState('')
  const [newImage, setNewImage] = useState('')

  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    
    setTitle(data.title)
    setText(data.text)
    setOldImage(data.imgUrl)
  }, [params.id])
  
  const submitHandler = async () => {
    try {
      const updatedPost = new FormData()
      updatedPost.append('title', title)
      updatedPost.append('text', text)
      updatedPost.append('id', params.id)
      updatedPost.append('image', newImage)
      await dispatch(updatePost(updatedPost))
      navigate('/posts')
    } catch (error) {
      console.log(error)
    }
  }

  const clearFormHandler =() => {
      setTitle('')
      setText('')
  }

  useEffect(() => {
    fetchPost()
  }, [fetchPost])
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="max-w-sm mx-auto py-10">
      <label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
        Прикрепить изображение
        <input
          onChange={(e) => {
            setNewImage(e.target.files[0])
            setOldImage('')
          }}
          type="file"
          className='hidden'
        />
      </label>
      <div
        className='flex object-cover py-2'>
        {oldImage && (
          <img
            src={`http://localhost:3002/${oldImage}`} alt={oldImage.name} />
        )}
        {newImage && (
          <img
            src={URL.createObjectURL(newImage)} alt={newImage.name} />
        )}
      </div>

      <label
        className='text-xs text-white opacity-70'
      >
        Заголовок поста:
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
          type="text"
          placeholder='Заголовок'
        />
      </label>
      <label
        className='text-xs text-white opacity-70'
      >
        Текст поста:
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 resize-none h-40'
          placeholder='Текст поста'
        />
      </label>

      <div
        className="flex gap-8 items-center justify-center mt-4">
        <button
          onClick={submitHandler}
          className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 hover:bg-gray-700'
        >
          Изменить
        </button>
        <button
          onClick={clearFormHandler}
          className='flex justify-center items-center bg-red-700 text-xs text-white rounded-sm py-2 px-4 hover:bg-red-900'
        >
          Отменить
        </button>
      </div>
    </form>
  )
}
