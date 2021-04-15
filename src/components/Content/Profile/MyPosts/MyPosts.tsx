import React, {ChangeEvent} from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import {ActionsTypes, addPostAC, newPostTextChangeAC, PostMessageType, ProfilePageType} from '../../../../redux/state';


type MyPostsPropsType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsTypes) => void
}

function MyPosts(props: MyPostsPropsType) {

    const postsElements = props.profilePage.postsMessagesData
        .map((post: PostMessageType) => <Post message={post.message} likesCounter={post.likesCounter}/>)

    const addPost = () => {
        if (props.profilePage.newPostText.trim() !== '') {
            props.dispatch(addPostAC())
        } // else TODO: error message
    }
    const onPostTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(newPostTextChangeAC(e.currentTarget.value))
    }

    return (
        <div>
            <header className={s.header}>My Posts</header>
            <div className={s.newPost}>
                <textarea value={props.profilePage.newPostText}
                          onChange={onPostTextChange}/>
                <div>
                    <button onClick={addPost}>Add Post</button>
                </div>
            </div>
            <div className={s.postsArea}>
                {postsElements}
            </div>
        </div>)
}

export default MyPosts