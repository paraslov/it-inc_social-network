import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getUsers} from '../../../redux/users_reducer/users_reducer';
import {Users} from './Users/Users';
import {Preloader} from '../../Common/Preloader/Preloader';
import {
    selectCurrentPage,
    selectIsFetching,
    selectPageSize,
    selectShowFriends,
    selectTerm
} from '../../../utils/selectors/users_selectors';
import s from './Users.module.css'

type TUsersPageProps = {

}

export const UsersPage: React.FC<TUsersPageProps> = () => {
    const dispatch = useDispatch()

    const isFetching = useSelector(selectIsFetching)
    const pageSize = useSelector(selectPageSize)
    const currentPage = useSelector(selectCurrentPage)
    const term = useSelector(selectTerm)
    const showFriends = useSelector(selectShowFriends)

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize))
    }, [])

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize))
    }, [term, showFriends, currentPage, pageSize])

    return (
      <div className={s.wrapper}>
          {isFetching ? <Preloader left={'40%'} top={'40%'} size={'200px'} /> : null}
          <Users />
      </div>
    )
}
