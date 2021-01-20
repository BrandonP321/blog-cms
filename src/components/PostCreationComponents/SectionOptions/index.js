import React, { useRef } from 'react'
import './index.css'

export default function SectionOptions(props) {
    const fileBtn = useRef()

    const handleImageChange = (e) => {
        // get location of image on user's computer
        const selectedFile = e.target.files[0]
        const reader = new FileReader();

        reader.onload = (event) => props.updateSectionImage(event.target.result, props.index)
        
        reader.readAsDataURL(selectedFile)
    }

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
            {props.isForImage ?
                <div className='section-image-change-wrapper' onClick={() => fileBtn.current.click()}>
                    <i className='far fa-image'></i>
                    <input ref={fileBtn} type='file' accept='.jpg,.png,.jpeg' onChange={handleImageChange} />
                </div> :
                ''
            }
            <div className='section-delete-wrapper' onClick={() => props.handleSectionDelete(props.index)}>
                <i class="fas fa-trash-alt"></i>
            </div>
        </div>
    )
}
