import axios from '../utils/axios'
import React, { useState, useEffect, useCallback } from 'react'
import { PostItem } from '../components/PostItem'
import { memo } from 'react'

export const PostsPage = memo(() => {

  const [posts, setPosts] = useState([])

  const fetchMyPosts = useCallback(async () => {
    try {
      const { data } = await axios.get('/posts/user/me')
      setPosts(data)
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    fetchMyPosts()
  }, [])

  return (
    <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
      {posts.length
        ? posts.map((post, idx) => (
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
