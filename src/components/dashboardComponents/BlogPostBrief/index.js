import React, { useState } from 'react'
import './index.css'

export default function BlogPostBrief(props) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className={isExpanded ? 'my-post-brief expanded' : 'my-post-brief'}>
            <div className='my-post-details'>
                <a className='my-post-title' href={`/post/${props.id}`} target='_blank'><strong>{props.title}</strong></a>
                <p className='my-post-description'>{props.description}</p>
            </div>
            <div className='my-post-options'>
                <button className='btn btn-primary' onClick={() => props.showPostUpdateModal(props.title, props.description, props.id)}>Details</button>
                <button className='btn btn-primary' onClick={() => window.open('/user/' + props.userId + '/post/update/' + props.id)}>Edit</button>
                <button className='btn btn-danger' onClick={() => props.handlePostDeleteAttempt(props.id)}>Delete</button>
                <a href='#' onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'Read Less' : 'Read More'}</a>
            </div>
        </div>
    )
}
