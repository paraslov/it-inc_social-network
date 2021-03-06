import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import {PostMessageType} from '../../../../redux/profile_reducer';
import {MyPostsPropsType} from './MyPostsContainer';
import {SubmitHandler, useForm} from "react-hook-form";
import Joi from "@hapi/joi";
import {joiResolver} from "@hookform/resolvers/joi";

const schema = Joi.object({
  newPostText: Joi.string()
    .trim()
    .min(3)
    .max(200)
    .required()
    .messages({
      'string.min': 'Post must have at least 3 symbols',
      'string.max': 'Post must be less than 200 symbols',
      'string.empty': 'Type your post than submit',
    })
})


const MyPosts = React.memo((props: MyPostsPropsType) => {
  const postsElements = props.postsMessagesData
    .map((post: PostMessageType) => <Post key={post.id} message={post.message} likesCounter={post.likesCounter}/>)

  return (
    <div>
      <header className={s.header}>My Posts</header>
      <AddPostForm addPost={props.addPost}/>
      <div className={s.postsArea}>
        {postsElements}
      </div>
    </div>)
})

//* AddPostForm component ========================================================================================>>
type TAddPostFormProps = {
  addPost: (newPostText: string) => void
}

type TFormFields = {
  newPostText: string
}

const AddPostForm: React.FC<TAddPostFormProps> = (({addPost}) => {
  const {register, handleSubmit, watch, reset, formState: {errors}} = useForm<TFormFields>({
    defaultValues: {newPostText: ''},
    resolver: joiResolver<any>(schema),
  });

  const onSubmit: SubmitHandler<TFormFields> = (formData) => {
    addPost(formData.newPostText)
    reset({newPostText: ''})
  }

  return (
    <form className={s.newPost} onSubmit={handleSubmit(onSubmit)}>
      <textarea placeholder={'new post'} autoComplete={'off'} {...register('newPostText')} />
      {errors.newPostText && <p className={s.errors}>{errors.newPostText?.message}</p>}
      <div>
        <button type={'submit'}>Add Post</button>
      </div>
    </form>
  )
})

export default MyPosts
