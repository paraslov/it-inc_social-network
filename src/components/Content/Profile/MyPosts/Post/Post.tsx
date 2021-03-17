import React from "react"
import s from "./Post.module.css"

type PostPropsType = {
    message: string
    likesCounter: number
}

function Post(props: PostPropsType) {
    return (
        <div className={s.item}>
            <img src={'https://image.freepik.com/free-vector/samurai-warrior_157713-74.jpg'}/>
            <div>
                {props.message}
            </div>
            <div>
                likes: {props.likesCounter}
            </div>
        </div>
    )
}


export default Post