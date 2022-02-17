import {follow, getUsers, unfollow, usersActions} from './users_reducer'
import {GetUserRequestType, usersAPI} from '../../api/usersAPI'
import {APIResponseType, ResultCodesEnum} from '../../api/api'

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    data: {},
    messages: [],
}
const getUsersResult: GetUserRequestType = {
    items: [
        {name: 'Tom', id: 1, followed: false, photos: {small: '', large: ''}, status: 'Hey ho!'},
        {name: 'Jerry', id: 2, followed: true, photos: {small: '', large: ''}, status: 'Hey yuy!'},
        {name: 'Dimych', id: 3, followed: false, photos: {small: '', large: ''}, status: 'Hey yo!'},
    ],
    error: 'some error occurred',
    totalCount: 3
}

jest.mock('../../api/usersAPI')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    usersAPIMock.follow.mockReturnValue(Promise.resolve(result)).mockClear()
    usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result)).mockClear()
    usersAPIMock.getUsers.mockReturnValue(Promise.resolve(getUsersResult)).mockClear()
    dispatchMock.mockClear()
    getStateMock.mockClear()
})

test('follow success thunk test', async () => {
    const thunk = follow(1)

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.setFollowUnfollowInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.setFollowUnfollowInProgress(false, 1))
})

test('unfollow success thunk test', async () => {
    const thunk = unfollow(1)

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.setFollowUnfollowInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.setFollowUnfollowInProgress(false, 1))
})

// test('getUsers success thunk test', async () => {
//     const thunk = getUsers(1, 10)
//
//     await thunk(dispatchMock, getStateMock, {})
//     expect(dispatchMock).toBeCalledTimes(4)
//     expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.setIsFetching(true))
//     expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.setUsers(getUsersResult.items))
//     expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.setTotalUsersCount(getUsersResult.totalCount))
//     expect(dispatchMock).toHaveBeenNthCalledWith(4, usersActions.setIsFetching(false))
// })
