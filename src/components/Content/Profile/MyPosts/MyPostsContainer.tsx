import {PostMessageType, profileActions} from '../../../../redux/profile_reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from '../../../../redux/store';

type MapStateType = {
    postsMessagesData: Array<PostMessageType>
}
type MapDispatchType = {
    addPost: (newPostText: string) => void
}
export type MyPostsPropsType = MapStateType & MapDispatchType

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        postsMessagesData: state.profilePage.postsMessagesData,
    }
}

export const MyPostsContainer = connect<MapStateType, MapDispatchType, {}, AppStateType>
(mapStateToProps, {addPost: profileActions.addPost})(MyPosts)
