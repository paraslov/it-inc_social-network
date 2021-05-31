import React from 'react'
import s from './ProfileInfo.module.css'


type PropsType = {
    status: string
}
type StateType = {
    editMode: boolean
}

export class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false
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
    }

    render() {
        return (
            <div>
                {!this.state.editMode ?
                    <div>
                        <span onDoubleClick={this.activateEditMode} className={s.status}>{this.props.status}</span>
                    </div>
                    :
                    <div>
                        <input onBlur={this.deactivateEditMode} value={this.props.status} autoFocus/>
                    </div>
                }
            </div>
        )
    }
}