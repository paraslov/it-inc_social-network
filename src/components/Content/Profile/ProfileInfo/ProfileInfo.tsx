import React from 'react'
import s from './ProfileInfo.module.css'

function ProfileInfo() {
    return (
<div>
    <div className={s.infoContent}>
        <img src="https://image.api.playstation.com/vulcan/img/cfn/11307KQHsstLn-g1O4kWXV8eZEQ0fZKW-5f2IFt_-P09T7z0Xde9T-A4wBzl0v649JIB-DEAFB9mTOC0_FRkX_se124iNOSl.png" alt="user ava"/>
        <div>Samurai is always going forward and ain't going back.</div>
    </div>
</div>
)
}

export default ProfileInfo