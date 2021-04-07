import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import {PostMessageType} from '../../../../redux/state';


type MyPostsPropsType = {
    postsMessagesData: Array<PostMessageType>
    addPost: (newPostText: string) => void
}

function MyPosts(props: MyPostsPropsType) {
    const textareaRef = React.createRef<HTMLTextAreaElement>()

    const postsElements = props.postsMessagesData
        .map((post: PostMessageType) => <Post message={post.message} likesCounter={post.likesCounter}/>)

    const addPost = () => {
        if(textareaRef.current?.value) {
            props.addPost(textareaRef.current.value)
        }
    }

    return (
        <div>
            <header className={s.header}>My Posts</header>
            <div className={s.newPost}>
                <div>New Post:</div>
                <div><textarea ref={textareaRef}/></div>
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