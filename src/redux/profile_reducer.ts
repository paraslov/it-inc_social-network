import {BaseThunkType, InferActionsTypes} from './store'
import {profileAPI} from '../api/profileAPI'
import {ResultCodesEnum} from '../api/api'
import {TEditProfileFormFields} from "../components/Content/Profile/ProfileInfo/EditProfileForm/EditProfileForm";

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
    postsMessagesData: [
        {id: 1, message: 'It\'s my first post', likesCounter: 66},
        {id: 2, message: 'It\'s my second post', likesCounter: 22},
        {id: 3, message: 'How are you doing?', likesCounter: 11},
        {id: 4, message: 'I\'m absolutely fine!', likesCounter: 6},
    ] as PostMessageType[],
    profile: null as null | ProfileType,
    status: ''
}

export type ProfilePageStateType = typeof initState

const profileReducer = (state: ProfilePageStateType = initState, action: ProfileActionsTypes):
    ProfilePageStateType => {
    switch (action.type) {
        case 'kty112/profile_reducer/ADD_POST':
            return {
                ...state,
                postsMessagesData: [
                    {id: state.postsMessagesData.length + 1, message: action.newPostText.trim(), likesCounter: 0},
                    ...state.postsMessagesData
                ],
            }
        case 'kty112/profile_reducer/SET_USER_PROFILE':
            return {...state, profile: action.profile}
        case 'kty112/profile_reducer/SET_USER_STATUS':
            return {...state, status: action.status}
        case 'kty112/profile_reducer/DELETE_POST':
            return {...state, postsMessagesData: state.postsMessagesData.filter(post => post.id !== action.postId)}
        case 'kty112/profile_reducer/SAVE_AVATAR':
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state
    }
}

//* ====== Action Creators ============================================================================================>
export type ProfileActionsTypes = InferActionsTypes<typeof profileActions>

export const profileActions = {
    addPost: (newPostText: string) => ({type: 'kty112/profile_reducer/ADD_POST', newPostText} as const),
    setUserProfileState: (profile: ProfileType) => ({
        type: 'kty112/profile_reducer/SET_USER_PROFILE',
        profile
    } as const),
    setUserStatus: (status: string) => ({type: 'kty112/profile_reducer/SET_USER_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'kty112/profile_reducer/DELETE_POST', postId} as const),
    saveAvatar: (photos: PhotosType) => ({type: 'kty112/profile_reducer/SAVE_AVATAR', photos} as const),
}

//* ====== Thunk Creators ==============================================================================================>
type ThunkType = BaseThunkType<ProfileActionsTypes>

export const setUserProfileOnPage = (userId: number): ThunkType => dispatch => {
    profileAPI.getUserProfile(userId)
        .then(data => {
            dispatch(profileActions.setUserProfileState(data))
        })
}
export const getUserStatus = (userId: number): ThunkType => dispatch => {
    profileAPI.getUserStatus(userId)
        .then(data => {
            if (data) {
                dispatch(profileActions.setUserStatus(data))
            }
        })
}
export const updateUserStatus = (status: string): ThunkType => dispatch => {
    profileAPI.updateUserStatus(status)
        .then(data => {
            if (data.resultCode === ResultCodesEnum.Success) {
                dispatch(profileActions.setUserStatus(status))
            }
        })
}
export const saveAvatar = (file: File): ThunkType => dispatch => {
    profileAPI.saveAvatar(file)
        .then(data => {
            if(data.resultCode === ResultCodesEnum.Success) {
                dispatch(profileActions.saveAvatar(data.data.photos))
            }
        })
}
export const updateProfile = (formData: TEditProfileFormFields): ThunkType => (dispatch, getState) => {
    const userId = getState().auth.userId
    profileAPI.updateProfile(formData)
        .then(data => {
            if(data.resultCode === ResultCodesEnum.Success) {
                if(userId) dispatch(setUserProfileOnPage(userId))
            }
        })
}

export default profileReducer
