import React from 'react'
import {profileActions} from '../../../../redux/profile_reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from '../../../../redux/store';
import {PostMessageType} from '../../../../redux/state';

type MapStateType = {
    postsMessagesData: Array<PostMessageType>
    newPostText: string
}

const mapStateToProps = (state: AppStateType) => {
    return {
        postsMessagesData: state.profilePage.postsMessagesData,
        newPostText: state.profilePage.newPostText
    }
}

type MapDispatchType = {
    addPost: (newPostText: string) => void
    newPostTextChange: (text: string) => void
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: (newPostText: string) => {
            if (newPostText.trim() !== '') {
                dispatch(profileActions.addPost())
            }
        },
        newPostTextChange: (text: string) => {
            dispatch(profileActions.newPostTextChange(text))
        },
    }
}

export const MyPostsContainer = connect<MapStateType, MapDispatchType, {}, AppStateType>
(mapStateToProps, mapDispatchToProps)(MyPosts)
