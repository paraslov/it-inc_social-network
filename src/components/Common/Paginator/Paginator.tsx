import React from 'react'
import s from './Paginator.module.css'


//* Users functional component =======================================================================================>>
type TPaginatorProps = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageNumberClick: (pageNumber: number) => void
}

export function Paginator(props: TPaginatorProps) {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages: number[] = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
            <div>
                {pages.map(p => <span
                    className={props.currentPage === p ? s.page + ' ' + s.currentPage : s.page}
                    onClick={() => props.onPageNumberClick(p)}
                >{p}</span>)}
            </div>
    )
}

