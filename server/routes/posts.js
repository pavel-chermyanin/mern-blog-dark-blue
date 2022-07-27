import { Router } from 'express'
import { createPost, getAll, getById, getMyPosts, removePost, updatePost, getPostComments } from '../controllers/posts.js'
import { checkAuth } from '../utils/checkAuth.js'


const router = new Router()

// Create post
// http://localhost:3002/api/posts
router.post('/', checkAuth , createPost)
// Get all
// http://localhost:3002/api/posts
router.get('/', getAll)
// Get By Id
// http://localhost:3002/api/posts/:id
router.get('/:id', getById)
// Get My Posts
// http://localhost:3002/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts)
// remove Post
// http://localhost:3002/api/posts/:id
router.delete('/:id', checkAuth, removePost)
// update Post
// http://localhost:3002/api/posts/:id
router.put('/', checkAuth, updatePost)

// Get Post Comments
// http://localhost:3002/api/posts/comments/:id
router.get('/comments/:id', getPostComments)



export default router