import axios from '../utils/axios'
import React, { useState, useEffect, useCallback } from 'react'
import { PostItem } from '../components/PostItem'
import { memo } from 'react'
import { getMyPosts } from '../redux/features/post/postSlice'
import { useSelector,useDispatch } from 'react-redux'

export const PostsPage = memo(() => {

  const dispatch = useDispatch()
  const { loading, myPosts } = useSelector(state => state.post)


  useEffect(() => {
    dispatch(getMyPosts())
  }, [dispatch])

  if (loading) {
    return (
      <div className="text-xl text-white text-center py-10">
        Загрузка...
      </div>
    )
  }

  return (
    <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
      {myPosts?.length
        ? myPosts.map((post, idx) => (
          <PostItem key={idx} post={post} />
        ))
        : (
          <div className="text-xl text-white text-center">
            Пока нет постов.
          </div>
        )}
    </div>
  )
})
