import React from 'react'
import {PostMessageType, profileActions} from '../../../../redux/profile_reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from '../../../../redux/store';
import {Dispatch} from 'redux';

type MapStateType = {
    postsMessagesData: Array<PostMessageType>
    newPostText: string
}
type MapDispatchType = {
    addPost: (newPostText: string) => void
    newPostTextChange: (text: string) => void
}
export type MyPostsPropsType = MapStateType & MapDispatchType

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        postsMessagesData: state.profilePage.postsMessagesData,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchType => {
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
