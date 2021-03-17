import React from "react";
import s from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts";

function Profile() {
    return (
        <main className={s.main_content}>
            <div>
                <img
                    src={'https://about.canva.com/wp-content/uploads/sites/3/2020/03/Rainbow-Gradient-Pink-and-Purple-Zoom-Virtual-Background.jpg'}/>
            </div>
            <div>
                ava + description
            </div>
            <MyPosts/>

        </main>)
}

export default Profile