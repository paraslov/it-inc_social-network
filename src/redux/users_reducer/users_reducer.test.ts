import {usersActions, usersReducer, UserStateType, UserType} from './users_reducer'

let state: UserStateType

beforeEach(() => {
    state = {
        users: [
            {name: 'Tom', id: 1, followed: false, photos: {}, status: 'Hey ho!'},
            {name: 'Jerry', id: 2, followed: true, photos: {}, status: 'Hey yuy!'},
            {name: 'Dimych', id: 3, followed: false, photos: {}, status: 'Hey yo!'},
        ] as Array<UserType>,
        pageSize: 7,
        currentPage: 1,
        totalUsersCount: 0,
        isFetching: false,
        followUnfollowInProgress: [] as number[],
    }
})

test('follow user should be added', () => {
    const endState = usersReducer(state, usersActions.followSuccess(1))

    expect(endState.users[0].followed).toBeTruthy()
})