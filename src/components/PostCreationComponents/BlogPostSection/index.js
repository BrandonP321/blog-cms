import React from 'react'
import SectionOptions from '../../PostCreationComponents/SectionOptions'
import './index.css'

export default function BlogPostSection(props) {
    return (
        <div className='post-creator-section'>
            <SectionOptions
                index={props.index}
                handleSectionMove={props.handleSectionMove}
                handleSectionDelete={props.handleSectionDelete}
            />
            <h2
                onBlur={props.handleTextInputChange}
                data-index={props.index}
                data-name='heading'
                contentEditable
            >{props.heading}</h2>
            <p
                onBlur={props.handleTextInputChange}
                data-index={props.index}
                data-name='text'
                contentEditable
            >{props.text}</p>
        </div>
    )
}
