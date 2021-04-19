import {ActionsTypes, PostMessageType, ProfilePageType } from "./state"


const profileReducer = (state: ProfilePageType, action: ActionsTypes) => {
    switch (action.type) {
        case 'ADD_POST':
            const newPost: PostMessageType = {
                id: state.postsMessagesData.length + 1,
                message: state.newPostText,
                likesCounter: 0
            }
            state.postsMessagesData.push(newPost)
            state.newPostText = ''
            return state
        case 'NEW_POST_TEXT_CHANGE':
            state.newPostText = action.newPostText
            return state
        default:
            return state
    }
}

export type ProfileReducerActionsType = ReturnType<typeof addPostAC> | ReturnType<typeof newPostTextChangeAC>

export const addPostAC = () => ({type: 'ADD_POST'} as const)
export const newPostTextChangeAC= (text: string) =>
    ({type: 'NEW_POST_TEXT_CHANGE', newPostText: text} as const)

export default profileReducer
