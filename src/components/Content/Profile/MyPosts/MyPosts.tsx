import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import {PostMessageType} from '../../../../index';

type MyPostsPropsType = {
    postsMessagesData: Array<PostMessageType>
}

function MyPosts(props: MyPostsPropsType) {

    const postsElements = props.postsMessagesData
        .map((post: PostMessageType) => <Post message={post.message} likesCounter={post.likesCounter}/>)

    return (
        <div>
            <header className={s.header}>My Posts</header>
            <div className={s.newPost}>
                <div>New Post:</div>
                <div><textarea/></div>
                <div>
                    <button>Add Post</button>
                </div>
            </div>
            <div>
                {postsElements}
            </div>
        </div>)
}

export default MyPosts