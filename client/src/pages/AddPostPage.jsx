import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../redux/features/post/postSlice'

export const AddPostPage = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = async () => {
    try {
      // собираем введеные данные формы в объект
      const data = new FormData()
      data.append('title', title)
      data.append('text', text)
      data.append('image', image)
      //ждем когда будет создан пост, потом navigate на главную и там произойдет новый запрос getAll
      await dispatch(createPost(data))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const clearFormHandler = () => {
      setTitle('')
      setText('')
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="max-w-sm mx-auto py-10">
      <label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
        Прикрепить изображение
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          className='hidden'
        />
      </label>
      <div
        className='flex object-cover py-2'>
          {image && (
            <img 
            src={URL.createObjectURL(image)} alt={image.name} />
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
          Добавить
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
