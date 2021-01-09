import React from 'react'
import './index.css'

export default function CreatorToolBox(props) {
    const { addSection, addImage, previewSite, publish } = props

    return (
        <div className='post-creator-tools'>
            <div className='tools-header'>
                <p>Creation Tools</p>
            </div>
            <div className='tools'>
                <button onClick={addSection}>Add Section</button>
                <button onClick={addImage}>Add Image</button>
                <button onClick={previewSite}>Priview Post</button>
                <button className='bottom-button' onClick={publish}>Publish</button>
            </div>
        </div>
    )
}
