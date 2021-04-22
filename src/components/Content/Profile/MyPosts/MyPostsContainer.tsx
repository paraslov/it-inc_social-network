import React from 'react'
import {profileActions} from '../../../../redux/profile_reducer';
import MyPosts from './MyPosts';
import {StoreType} from '../../../../redux/store';


type MyPostsContainerPropsType = {
    store: StoreType
}

export function MyPostsContainer(props: MyPostsContainerPropsType) {

    const state = props.store.getState()

    const addPost = () => {
        if (state.profilePage.newPostText.trim() !== '') {
            props.store.dispatch(profileActions.addPost())
        } // else TODO: error message
    }
    const onPostTextChange = (text: string) => {
        props.store.dispatch(profileActions.newPostTextChange(text))
    }

    return (
        <MyPosts postsMessagesData={state.profilePage.postsMessagesData}
        newPostText={state.profilePage.newPostText}
        addPost={addPost}
        newPostTextChange={onPostTextChange}/>
        )
}