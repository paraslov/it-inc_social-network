import {PostMessageType} from './state'
import {InferActionsTypes} from './store';

//* ================== Initial State =================================================>
const initState = {
    newPostText: '',
    postsMessagesData: [
        {id: 1, message: 'It\'s my first post', likesCounter: 66},
        {id: 2, message: 'It\'s my second post', likesCounter: 22},
        {id: 3, message: 'How are you doing?', likesCounter: 11},
        {id: 4, message: 'I\'m absolutely fine!', likesCounter: 6},
    ],
}

export type ProfilePageStateType = typeof initState

const profileReducer = (state: ProfilePageStateType = initState, action: ProfileReducerActionsTypes):
    ProfilePageStateType=> {
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

//* ====== Action Creators =================================================================>
export type ProfileReducerActionsTypes = InferActionsTypes<typeof profileActions>

export const profileActions = {
    addPost: () => ({type: 'ADD_POST'} as const),
    newPostTextChange: (text: string) =>
        ({type: 'NEW_POST_TEXT_CHANGE', newPostText: text} as const),
}


export default profileReducer
