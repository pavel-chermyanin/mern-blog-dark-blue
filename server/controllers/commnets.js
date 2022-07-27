import CommentModel from '../models/Comment.js'
import PostModel from '../models/Post.js'


export const createComment = async (req, res) => {
    try {
        const {postId, comment} = req.body

        if (!comment) {
            return res.json({
                message: 'Комментарий не может быть пустым'
            })
        }
        // создаем коммент в бд
        const newComment = new CommentModel({comment})
        // сохраняем
        await newComment.save()


        try {
            // находим Пост по id
            // и пушим в ее массив комментов новый
            await PostModel.findByIdAndUpdate(postId, {
                $push: {comments: newComment._id}
            })
        } catch (error) {
            res.json({
                message: 'Что то пошло не так'
            })
        }
        res.json(newComment)

    } catch (error) {
        res.json({
            message: 'Что то пошло не так'
        })
    }
}