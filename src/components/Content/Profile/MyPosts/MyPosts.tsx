import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'

function MyPosts() {
    const postsMessagesData = [
        {id: 1, message: 'I\'m absolutely fine!', likesCount: 7},
        {id: 2, message: 'How are you doing?', likesCount: 10},
        {id: 3, message: 'It\'s my first post', likesCount: 22},
    ]

    const postsElements = postsMessagesData
        .map(post => <Post message={post.message} likesCounter={post.likesCount}/>)

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