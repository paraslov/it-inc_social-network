import React, {useEffect, useState} from 'react'
import {TSetGetRequest, UserType} from '../../../../redux/users_reducer/users_reducer'
import {User} from './User'
import {Paginator} from '../../../Common/Paginator/Paginator'
import {debounce} from "lodash";
import s from '../Users.module.css'

//* Users functional component =======================================================================================>>
type UsersPropsType = {
  users: UserType[]
  totalUsersCount: number
  pageSize: number
  currentPage: number
  term: string
  showFriends: null | true
  followUnfollowInProgress: number[]
  onPageNumberClick: (pageNumber: number) => void
  follow: (userId: number) => Function
  unfollow: (userId: number) => Function
  setRequestParams: (payload: TSetGetRequest) => void
}

const debouncedFunction = debounce((currentPage: any, pageSize: any, value: any, showFriends: any, func: any) => {
    func({
    pageNumber: currentPage,
    pageSize: pageSize,
    term: value,
    showFriends: showFriends})
}, 500)

export function Users(props: UsersPropsType) {
  const [query, setQuery] = useState(props.term)

  useEffect(() => {
      debouncedFunction(props.currentPage, props.pageSize, query, props.showFriends, props.setRequestParams)
    }
  , [props.currentPage, props.pageSize, query, props.showFriends, props.setRequestParams])

  const onBtnClick = () => {
    props.setRequestParams({
      pageNumber: props.currentPage,
      pageSize: props.pageSize,
      term: props.term,
      showFriends: props.showFriends ? null : true})
  }

  return (
    <div>
      <div className={s.controls}>
        <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
                   currentPage={props.currentPage} onPageNumberClick={props.onPageNumberClick}/>
        <div>
          <span>Search: </span>
          <input type="text" value={query} onChange={(e) => setQuery(e.currentTarget.value)} />
          <button onClick={onBtnClick} className={s.friendsBtn}>
            {props.showFriends ? 'Show All' : 'Show Friends'}
          </button>
        </div>
        {/*<Formik*/}
        {/*  initialValues={{term: '', showFriends: false}}*/}
        {/*  onSubmit={(values, {setSubmitting}) => {*/}
        {/*    props.setRequestParams({pageNumber: props.currentPage, pageSize: props.pageSize, ...values})*/}
        {/*    setSubmitting(false)*/}
        {/*  }}*/}
        {/*>*/}
        {/*  {({isSubmitting}) => (*/}
        {/*    <Form>*/}
        {/*      <span>Search: </span>*/}
        {/*      <Field name="term" type={'text'}/>*/}
        {/*      <Field type="checkbox" name="showFriends"/>*/}
        {/*      <button type="submit" disabled={isSubmitting}>*/}
        {/*        Submit*/}
        {/*      </button>*/}
        {/*    </Form>*/}
        {/*  )}*/}
        {/*</Formik>*/}

      </div>
      <div>
        {props.users.map((u) => <User key={u.id}
                                      user={u}
                                      followUnfollowInProgress={props.followUnfollowInProgress}
                                      follow={props.follow}
                                      unfollow={props.unfollow}/>)}
      </div>
    </div>
  )
}

