import React from 'react'
import SectionOrderArrows from '../SectionOrderArrows'
import './index.css'

export default function BlogPostTitle(props) {
    return (
        <div className='post-creator-section'>
            <SectionOrderArrows index={props.index} handleSectionMove={props.handleSectionMove} />
            <h1 className='post-title'>{props.title}</h1>
            <h3 className='post-sub-title'>{props.subtitle}</h3>
        </div>
    )
}
