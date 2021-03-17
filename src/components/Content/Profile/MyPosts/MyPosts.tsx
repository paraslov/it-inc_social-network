import React from "react"
import s from "./MyPosts.module.css"
import Post from "./Post/Post"

function MyPosts() {
    return (
        <div>
            <header className={s.header}>My Posts</header>
            <div className={s.newPost}>
                <div>New Post:</div>
                <div><textarea></textarea></div>
                <div><button>Add Post</button></div>
            </div>
            <div>
                <Post message={"I'm absolutely fine!"} likesCounter={7}/>
                <Post message={'How are you doing?'} likesCounter={7}/>
                <Post message={"It's my first post"} likesCounter={13}/>
            </div>
        </div>)
}

export default MyPosts