import {InferActionsTypes} from './store';
import {Dispatch} from 'redux';
import {profileAPI} from '../api/api';

//* ================== Profile reducer types ===============================================================>
export type PostMessageType = {
    id: number
    message: string
    likesCounter: number
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string
    large: string
}
export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
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
    profile: null as null | ProfileType
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
        case 'kty112/profile_reducer/SET_USER_PROFILE':
            return {...state, profile: action.profile}
        default:
            return state
    }
}

//* ====== Action Creators ============================================================================================>
export type ProfileActionsTypes = InferActionsTypes<typeof profileActions>

export const profileActions = {
    addPost: () => ({type: 'kty112/profile_reducer/ADD_POST'} as const),
    newPostTextChange: (text: string) =>
        ({type: 'kty112/profile_reducer/NEW_POST_TEXT_CHANGE', newPostText: text} as const),
    setUserProfileState: (profile: ProfileType) => ({type: 'kty112/profile_reducer/SET_USER_PROFILE', profile} as const)
}

//* ====== Thunk Creators ==============================================================================================>

export const setUserProfileOnPage = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getUserProfile(userId)
        .then(data => {
            dispatch(profileActions.setUserProfileState(data))
        })
}

export default profileReducer
