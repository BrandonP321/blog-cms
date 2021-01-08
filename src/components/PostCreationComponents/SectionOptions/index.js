import React from 'react'
import './index.css'

export default function SectionOptions(props) {
    return (
        <div className='section-options-container'>
            <div className='section-arrows'>
                <div className='up-arrow' onClick={() => props.handleSectionMove(props.index, 'up')}>
                    <i class="fas fa-sort-up"></i>
                </div>
                <div className='down-arrow' onClick={() => props.handleSectionMove(props.index, 'down')}>
                    <i class="fas fa-sort-down"></i>
                </div>
            </div>
            <div className='section-delete-wrapper' onClick={() => props.handleSectionDelete(props.index)}>
                <i class="fas fa-trash-alt"></i>
            </div>
        </div>
    )
}
