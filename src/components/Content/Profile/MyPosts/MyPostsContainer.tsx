import React from 'react'
import {profileActions} from '../../../../redux/profile_reducer';
import MyPosts from './MyPosts';
import {StoreContext} from '../../../../StoreContext';


export function MyPostsContainer() {

    return <StoreContext.Consumer>
        {
            store => {
                const state = store.getState()

                const addPost = () => {
                    if (state.profilePage.newPostText.trim() !== '') {
                        store.dispatch(profileActions.addPost())
                    } // else TODO: error message
                }
                const onPostTextChange = (text: string) => {
                    store.dispatch(profileActions.newPostTextChange(text))
                }
                return <MyPosts postsMessagesData={state.profilePage.postsMessagesData}
                                newPostText={state.profilePage.newPostText}
                                addPost={addPost}
                                newPostTextChange={onPostTextChange}/>
            }
        }
    </StoreContext.Consumer>
}