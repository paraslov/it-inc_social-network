import {InferActionsTypes} from './store';

//* ================== Profile reducer types ===============================================================>
export type PostMessageType = {
    id: number
    message: string
    likesCounter: number
}

//* ================== Initial State =======================================================================>
const initState = {
    newPostText: '',
    postsMessagesData: [
        {id: 1, message: 'It\'s my first post', likesCounter: 66},
        {id: 2, message: 'It\'s my second post', likesCounter: 22},
        {id: 3, message: 'How are you doing?', likesCounter: 11},
        {id: 4, message: 'I\'m absolutely fine!', likesCounter: 6},
    ] as PostMessageType[],
}

export type ProfilePageStateType = typeof initState

const profileReducer = (state: ProfilePageStateType = initState, action: ProfileActionsTypes):
    ProfilePageStateType=> {
    switch (action.type) {
        case 'kty112/profile_reducer/ADD_POST':
            return {
                ...state,
                postsMessagesData: [
                    {
                        id: state.postsMessagesData.length + 1,
                        message: state.newPostText,
                        likesCounter: 0
                    },
                    ...state.postsMessagesData
                ],
                newPostText: ''
            }
        case 'kty112/profile_reducer/NEW_POST_TEXT_CHANGE':
            return {...state, newPostText: action.newPostText}
        default:
            return state
    }
}

//* ====== Action Creators =================================================================>
export type ProfileActionsTypes = InferActionsTypes<typeof profileActions>

export const profileActions = {
    addPost: () => ({type: 'kty112/profile_reducer/ADD_POST'} as const),
    newPostTextChange: (text: string) =>
        ({type: 'kty112/profile_reducer/NEW_POST_TEXT_CHANGE', newPostText: text} as const),
}


export default profileReducer
