import React from 'react'
import './index.css'

export default function BlogPostImage(props) {
    return (
        <img className='post-image' src={props.src} alt={props.alt} />
    )
}
