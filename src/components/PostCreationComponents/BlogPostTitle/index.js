import React from 'react'
import SectionOrderArrows from '../SectionOrderArrows'
import './index.css'

export default function BlogPostTitle(props) {
    return (
        <div className='post-creator-section'>
            <SectionOrderArrows index={props.index} handleSectionMove={props.handleSectionMove} />
            <h1 
                className='post-title' 
                onBlur={props.handleTextInputChange}
                data-index={props.index}
                data-name='title'
                contentEditable
            >
                {props.title}
            </h1>
            <h3 
                className='post-sub-title' 
                onBlur={props.handleTextInputChange}
                data-index={props.index}
                data-name='subtitle'
                contentEditable
            >
                {props.subtitle}
            </h3>           
        </div>
    )
}
