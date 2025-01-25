import { Skeleton } from 'antd'
import React from 'react'

const Loading = () => {
    return (
        <div className='h-screen'>
            <Skeleton active />
        </div>
    )
}

export default Loading