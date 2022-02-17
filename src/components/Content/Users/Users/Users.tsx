import React, {useEffect, useState} from 'react'
import {follow, getUsers, unfollow, usersActions,} from '../../../../redux/users_reducer/users_reducer'
import {User} from './User'
import {Paginator} from '../../../Common/Paginator/Paginator'
import {debounce} from "lodash";
import s from '../Users.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
  selectCurrentPage,
  selectFollowUnfollowInProgress,
  selectPageSize,
  selectSavedUsers,
  selectShowFriends,
  selectTerm,
  selectTotalUsersCount
} from "../../../../utils/selectors/users_selectors";
import {Dispatch} from "redux";
import {BooleanParam, NumberParam, StringParam, useQueryParams} from 'use-query-params'

//* Users functional component =======================================================================================>>

const debouncedFunction = debounce((currentPage: number, pageSize: number, value: string, showFriends: true | null, dispatch: Dispatch) => {
  dispatch(usersActions.setGetUsersRequestParams({
    currentPage: currentPage,
    pageSize: pageSize,
    term: value,
    showFriends: showFriends
  }))
}, 500)

export const Users = () => {
  const dispatch = useDispatch()
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    term: StringParam,
    showFriends: BooleanParam,
  });

  const pageSize = useSelector(selectPageSize)
  const users = useSelector(selectSavedUsers)
  const currentPage = useSelector(selectCurrentPage)
  const totalUsersCount = useSelector(selectTotalUsersCount)
  const term = useSelector(selectTerm)
  const showFriends = useSelector(selectShowFriends)
  const followUnfollowInProgress = useSelector(selectFollowUnfollowInProgress)

  const [filter, setFilter] = useState(term || query.term || '')

  useEffect(() => {
    dispatch(usersActions.setGetUsersRequestParams({
      currentPage: query.page || 1,
      pageSize: pageSize,
      term: query.term || undefined,
      showFriends: query.showFriends || showFriends || undefined,
    }))
  }, [])

  useEffect(() => {
    const actualPage = currentPage === 1 ? query.page === 1 ? undefined : query.page : currentPage
      setQuery({
        page: actualPage,
        term: filter || undefined,
        showFriends: showFriends || undefined
      })
      debouncedFunction(actualPage || 1, pageSize, filter, showFriends, dispatch)
    }
    , [currentPage, pageSize, filter, showFriends, dispatch])

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
      currentPage: 1,
      pageSize: pageSize,
      term: term,
      showFriends: showFriends ? null : true
    }))
  }

  return (
    <div>
      <div className={s.controls}>
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                   currentPage={currentPage} onPageNumberClick={onPageNumberClick}/>
        <div>
          <span>Search: </span>
          <input type="text" value={filter} onChange={(e) => setFilter(e.currentTarget.value)}/>
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

