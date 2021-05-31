import React, {ChangeEvent} from 'react'
import s from './ProfileInfo.module.css'


type PropsType = {
    status: string
    updateUserStatus: (status: string) => void
}
type StateType = {
    editMode: boolean
    status: string
}

export class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateUserStatus(this.state.status)
    }
    onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render() {
        return (
            <div>
                {!this.state.editMode ?
                    <div>
                        <span onDoubleClick={this.activateEditMode} className={s.status}>
                            {this.props.status || 'enter your status'}
                        </span>
                    </div>
                    :
                    <div>
                        <input onChange={this.onInputChange}
                               onBlur={this.deactivateEditMode}
                               value={this.state.status}
                               autoFocus/>
                    </div>
                }
            </div>
        )
    }
}