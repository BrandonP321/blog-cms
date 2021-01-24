import React from 'react'
import Draggable from 'react-draggable'
import './index.css'

export default function CreatorToolBox(props) {
    const { addSection, addImage, previewSite, publish, showSitePreview } = props

    return (
        <Draggable>
            <div className='post-creator-tools'>
                <div className='tools-header'>
                    <p>Creation Tools</p>
                </div>
                <div className='tools'>
                    <button onClick={addSection}>Add Section</button>
                    <button onClick={addImage}>Add Image</button>
                    <button className={showSitePreview ? 'active' : ''} onClick={previewSite}>Priview Post</button>
                    <button className='bottom-button' onClick={publish}>Publish</button>
                </div>
            </div>
        </Draggable>
    )
}
