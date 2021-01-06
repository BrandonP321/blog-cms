import React from 'react'
import './index.css'

export default function BlogPostSection(props) {
    return (
        <div className='post-section'>
            <h2>{props.heading}</h2>
            <p>{props.text}</p>
        </div>
    )
}
