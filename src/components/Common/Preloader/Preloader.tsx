import React from 'react';
import preloader from '../../../assets/img/preloader/preloader1.gif'

type PreloaderPropsType = {
    /**
     * css position left of preloader
     */
    left?: string
    /**
     * css position top of preloader
     */
    top?: string
    /**
     * css width of preloader
     */
    width?: string
}

export function Preloader(props: PreloaderPropsType) {
    const preloaderStyle: {} = {
        width: props.width ? props.width : '100px',
        position: 'absolute',
        left: props.left ? props.left : '40px',
        top: props.top ? props.top : '40px'
    }

    return (
        <div>
            <img style={preloaderStyle} src={preloader} alt=""/>
        </div>
    )
}