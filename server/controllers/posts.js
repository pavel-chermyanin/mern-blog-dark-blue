import PostModel from '../models/Post.js'
import UserModel from '../models/User.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

//Create post
export const createPost = async (req, res) => {
    try {
        const { title, text } = req.body
        const user = await UserModel.findById(req.userId)
        if (req.files) {
            // создаем уникальное имя
            let fileName = Date.now().toString() + req.files.image.name
            // путь к текущей папке
            const __dirname = dirname(fileURLToPath(import.meta.url))
            // переносим file в uploads
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            // создаем post
            const newPostWithImage = new PostModel({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId,
            })

            // сохраняем в базу
            await newPostWithImage.save()

            // и сохраняем этот пост в массив постов текущего user
            await UserModel.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithImage }
            })

            return res.json(newPostWithImage)
        }

        const newPostWithoutImage = new PostModel({
            username: user.username,
            title,
            text,
            imgUrl: '',
            author: req.userId
        })
        await newPostWithoutImage.save()
        await UserModel.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithoutImage }
        })
        return res.json(newPostWithoutImage)
    } catch (error) {
        res.json({
            message: 'Что-то пошло не так!'
        })
    }
}

// get All posts
export const getAll = async (req, res) => {
    try {
        // найти все посты и отсортировать по дате создания
        const posts = await PostModel.find().sort('-createdAt')
        // найти первые 5 постов сортированных по views
        const popularPosts = await PostModel.find().limit(5).sort('-views')

        if (!posts) {
            return res.json({
                message: 'Постов нет'
            })
        }
        res.json({ posts, popularPosts })
    } catch (error) {
        res.json({
            message: 'Что-то пошло не так'
        })
    }
}
// get By Id
export const getById = async (req, res) => {
    try {
        // находим пост по id и обновляем поле views
        // id берем из динамических параметров 
        const post = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                // инкриментим поле views на один
                // при каждом открытии поста
                $inc: { views: 1 }
            }
        )

        res.json(post)
    } catch (error) {
        res.json({
            message: 'Что-то пошло не так'
        })
    }
}
// get my posts
export const getMyPosts = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
        const list = await Promise.all(
            user.posts.map(post => {
                return PostModel.findById(post._id)
            })
        )
        list.sort((a, b) => {
            return Date.parse(b.createdAt) - Date.parse(a.createdAt)
        })
        res.json(list)
    } catch (error) {
        res.json({
            message: 'Что-то пошло не так'
        })
    }
}
// remove post
export const removePost = async (req, res) => {
    try {
        const post = await PostModel.findByIdAndDelete(
            req.params.id
        )

        if (!post) {
            return res.json({
                message: 'Такого поста не существует'
            })
        }

        // найдем user по Id из middleware checkAuth
        // и удалим у него пост по id из params
        await UserModel.findByIdAndUpdate(req.userId, {
            $pull: { posts: req.params.id }
        })
        res.json({
            message: 'Пост был удален'
        })
    } catch (error) {
        res.json({
            message: 'Что-то пошло не так'
        })
    }
}
// update post
export const updatePost = async (req, res) => {
    try {
        const { title, text, id } = req.body
        const post = await PostModel.findById(id)

        if (req.files) {
            // создаем уникальное имя
            let fileName = Date.now().toString() + req.files.image.name
            // путь к текущей папке
            const __dirname = dirname(fileURLToPath(import.meta.url))
            // переносим file в uploads
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            // переименовываем поле imgUrl
            post.imgUrl = fileName || ''
        }
        // переименуем остальные поля тоже
        post.title = title
        post.text = text

        await post.save()

        res.json(post)
    } catch (error) {
        res.json({
            message: 'Что-то пошло не так'
        })
    }
}