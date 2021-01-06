import React from 'react'

export default function BlogPostTitle(props) {
    return (
        <div>
            <h1 className='post-title'>{props.title}</h1>
            <h3 className='post-sub-title'>{props.subtitle}</h3>
        </div>
    )
}
