import React from 'react'
import {UserType} from '../../../../redux/users_reducer/users_reducer'
import {User} from './User'
import {Paginator} from '../../../Common/Paginator/Paginator'
import {ErrorMessage, Form, Formik, Field} from "formik";
import {IGetUsersRequest} from "../../../../api/usersAPI";

//* Users functional component =======================================================================================>>
type UsersPropsType = {
    users: UserType[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
    followUnfollowInProgress: number[]
    onPageNumberClick: (pageNumber: number) => void
    follow: (userId: number) => Function
    unfollow: (userId: number) => Function
    setRequestParams: (payload: IGetUsersRequest) => void
}

export function Users(props: UsersPropsType) {
    return (
        <div>
            <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
                       currentPage={props.currentPage} onPageNumberClick={props.onPageNumberClick} />
          <Formik
            initialValues={{ term: '', showFriends: false }}
            // validate={values => {
            //   const errors: {term?: string} = {};
            //   if (!values.term) {
            //     errors.term = 'Required';
            //   } else if (
            //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            //   ) {
            //     errors.term = 'Invalid email address';
            //   }
            //   return errors;
            // }}
            onSubmit={(values, { setSubmitting }) => {
              props.setRequestParams({pageNumber: props.currentPage, pageSize: props.pageSize, ...values})
              setSubmitting(false)
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field name="term" />
                <ErrorMessage name="term" component="div" />
                <Field type="checkbox" name="showFriends" />
                <ErrorMessage name="showFriends" component="div" />
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
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

