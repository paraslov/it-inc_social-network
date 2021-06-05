import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import {PostMessageType} from '../../../../redux/profile_reducer';
import {MyPostsPropsType} from './MyPostsContainer';
import {Field, reduxForm} from 'redux-form';
import {Textarea} from '../../../Common/FormControls/FormControls';
import {required, textAreaMaxLengthValidate} from '../../../../utils/validators/validators';


function MyPosts(props: MyPostsPropsType) {

    const postsElements = props.postsMessagesData
        .map((post: PostMessageType) => <Post message={post.message} likesCounter={post.likesCounter}/>)

    const onAddPost = (formData: FormData) => {
        props.addPost(formData.newPostText)
        formData.newPostText = ''
    }

    return (
        <div>
            <header className={s.header}>My Posts</header>
            <AddPostForm onSubmit={onAddPost}/>
            <div className={s.postsArea}>
                {postsElements}
            </div>
        </div>)
}

//* AddPostForm component ========================================================================================>>
type FormData = {
    newPostText: string
}
const AddPostForm = reduxForm<FormData>({form: 'myPostsAddPost'})
((props) => {
    return (
        <form className={s.newPost} onSubmit={props.handleSubmit}>
            <Field component={Textarea}
                   name={'newPostText'}
                   placeholder={'type your thoughts'}
                   validate={[required, textAreaMaxLengthValidate]}/>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
})

export default MyPosts