import React from 'react'
import SectionOrderArrows from '../SectionOrderArrows'
import './index.css'

export default function BlogPostImage(props) {
    return (
        <div className='post-creator-section'>
            <SectionOrderArrows index={props.index} handleSectionMove={props.handleSectionMove} />
            <img className='post-image' src={props.url || 'https://via.placeholder.com/1920x1080'} alt={props.alt} />
        </div>
    )
}
