import React from 'react'
import Skeleton from 'react-loading-skeleton'

const CardSkeleton = () => {
    return (
        Array(6).fill(0).map((item, idx) => (
            <div key={idx} className='card-skeleton'>
                <Skeleton height={180} />
            </div>
        ))
    )
}

export default CardSkeleton
