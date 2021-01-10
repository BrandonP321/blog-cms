import React from 'react'
import './index.css'

export default function BlogPostBrief(props) {
    return (
        <div className='my-post-brief'>
            <div className='my-post-details'>
                <a className='my-post-title' href={`/post/${props.id}`} target='_blank'>{props.title}</a>
                <p className='my-post-description'>{props.description}</p>
            </div>
            <div className='my-post-options'>
                <button className='btn btn-primary' onClick={() => props.showPostUpdateModal(props.title, props.description, props.id)}>Details</button>
                <button className='btn btn-primary'>Edit</button>
                <button className='btn btn-danger'>Delete</button>
            </div>
        </div>
    )
}
