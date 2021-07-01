import profileReducer, {PostMessageType, profileActions, ProfilePageStateType, ProfileType} from './profile_reducer'


let startState: ProfilePageStateType

beforeEach(() => {
    startState = {
        postsMessagesData: [
            {id: 1, message: 'It\'s my first post', likesCounter: 66},
            {id: 2, message: 'It\'s my second post', likesCounter: 22},
            {id: 3, message: 'How are you doing?', likesCounter: 11},
            {id: 4, message: 'I\'m absolutely fine!', likesCounter: 6},
        ] as PostMessageType[],
        profile: null as null | ProfileType,
        status: ''
    }
})

test('post should be added', () => {

    let newPostText = 'new post added'

    let endState = profileReducer(startState, profileActions.addPost(newPostText))

    expect(endState.postsMessagesData.length).toBe(5)
    expect(endState.postsMessagesData[0].message).toBe(newPostText)
    expect(endState.postsMessagesData[0].likesCounter).toBe(0)
})

test('post should be deleted', () => {
    let endState = profileReducer(startState, profileActions.deletePost(1))

    expect(endState.postsMessagesData.length).toBe(3)
})