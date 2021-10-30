import {follow, unfollow, usersActions} from './users_reducer'
import {usersAPI} from '../../api/usersAPI'
import {APIResponseType, ResultCodesEnum} from '../../api/api'

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    data: {},
    messages: [],
}

jest.mock('../../api/usersAPI')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    usersAPIMock.follow.mockReturnValue(Promise.resolve(result)).mockClear()
    usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result)).mockClear()
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