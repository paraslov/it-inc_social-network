import React, {ChangeEvent, useEffect, useState} from 'react'
import s from './ProfileInfo.module.css'


type PropsType = {
    status: string
    isOwner: boolean
    updateUserStatus: (status: string) => void
}


export const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        if(props.isOwner) setEditMode(true)
    }
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    const deactivateEditMode = () => {
        props.updateUserStatus(status)
        setEditMode(false)
    }

    return (
        <div>
            {!editMode ?
                <div>
                        <span onDoubleClick={activateEditMode} className={s.status}>
                            {props.status || 'enter your status'}
                        </span>
                </div>
                :
                <div>
                    <input onChange={onInputChange}
                           onBlur={deactivateEditMode}
                           value={status}
                           autoFocus/>
                </div>
            }
        </div>
    )
}