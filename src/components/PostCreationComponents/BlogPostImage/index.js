import React from 'react'
import SectionOptions from '../SectionOptions'
import './index.css'

export default function BlogPostImage(props) {
    return (
        <div className='post-creator-section'>
            <SectionOptions 
                isForImage={true}
                index={props.index} 
                handleSectionMove={props.handleSectionMove} 
                handleSectionDelete={props.handleSectionDelete}
            />
            <img className='post-image' src={props.url || 'https://via.placeholder.com/1920x1080'} alt={props.alt} />
        </div>
    )
}
