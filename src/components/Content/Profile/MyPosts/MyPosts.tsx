import React, {ChangeEvent} from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import {PostMessageType, ProfilePageType} from '../../../../redux/state';


type MyPostsPropsType = {
    profilePage: ProfilePageType
    addPost: () => void
    newPostTextChange: (newPostText: string) => void
}

function MyPosts(props: MyPostsPropsType) {

    const postsElements = props.profilePage.postsMessagesData
        .map((post: PostMessageType) => <Post message={post.message} likesCounter={post.likesCounter}/>)

    const addPost = () => {
        if (props.profilePage.newPostText.trim() !== '') {
            props.addPost()
        } // else TODO: error message
    }
    const onPostTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.newPostTextChange(e.currentTarget.value)
    }

    return (
        <div>
            <header className={s.header}>My Posts</header>
            <div className={s.newPost}>
                <div>New Post:</div>
                <div><textarea value={props.profilePage.newPostText}
                               onChange={onPostTextChange}/></div>
                <div>
                    <button onClick={addPost}>Add Post</button>
                </div>
            </div>
            <div>
                {postsElements}
            </div>
        </div>)
}

export default MyPosts