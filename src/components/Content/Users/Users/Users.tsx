import React, {useEffect, useState} from 'react'
import {
  follow,
  getUsers,
  unfollow,
  usersActions,
} from '../../../../redux/users_reducer/users_reducer'
import {User} from './User'
import {Paginator} from '../../../Common/Paginator/Paginator'
import {debounce} from "lodash";
import s from '../Users.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
  selectCurrentPage, selectFollowUnfollowInProgress,
  selectPageSize,
  selectSavedUsers, selectShowFriends, selectTerm,
  selectTotalUsersCount
} from "../../../../utils/selectors/users_selectors";
import {Dispatch} from "redux";

//* Users functional component =======================================================================================>>

const debouncedFunction = debounce((currentPage: number, pageSize: number, value: string, showFriends: true | null, dispatch: Dispatch) => {
    dispatch(usersActions.setGetUsersRequestParams({
    pageNumber: 1,
    pageSize: pageSize,
    term: value,
    showFriends: showFriends}))
}, 500)

export const Users = () => {
  const dispatch = useDispatch()

  const pageSize = useSelector(selectPageSize)
  const users = useSelector(selectSavedUsers)
  const currentPage = useSelector(selectCurrentPage)
  const totalUsersCount = useSelector(selectTotalUsersCount)
  const term = useSelector(selectTerm)
  const showFriends = useSelector(selectShowFriends)
  const followUnfollowInProgress = useSelector(selectFollowUnfollowInProgress)

  const [query, setQuery] = useState(term)

  useEffect(() => {
      debouncedFunction(currentPage, pageSize, query, showFriends, dispatch)
    }
  , [currentPage, pageSize, query, showFriends, dispatch])

  const onPageNumberClick = (pageNumber: number) => {
    dispatch(getUsers(pageNumber, pageSize))
  }

  const followUser = (userId: number) => {
    dispatch(follow(userId))
  }

  const unFollowUser = (userId: number) => {
    dispatch(unfollow(userId))
  }

  const onBtnClick = () => {
    dispatch(usersActions.setGetUsersRequestParams({
      pageNumber: 1,
      pageSize: pageSize,
      term: term,
      showFriends: showFriends ? null : true}))
  }

  return (
    <div>
      <div className={s.controls}>
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                   currentPage={currentPage} onPageNumberClick={onPageNumberClick}/>
        <div>
          <span>Search: </span>
          <input type="text" value={query} onChange={(e) => setQuery(e.currentTarget.value)} />
          <button onClick={onBtnClick} className={s.friendsBtn}>
            {showFriends ? 'Show All' : 'Show Friends'}
          </button>
        </div>
      </div>

      <div>
        {users.map((u) => <User key={u.id}
                                      user={u}
                                      followUnfollowInProgress={followUnfollowInProgress}
                                      followUser={followUser}
                                      unFollowUser={unFollowUser}/>)}
      </div>
    </div>
  )
}

