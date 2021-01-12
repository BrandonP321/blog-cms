import React, { useState, useRef } from 'react'
import './index.css'

export default function BlogPostBrief(props) {
    const [isExpanded, setIsExpanded] = useState(false)

    const briefEle = useRef()
    const descEle = useRef()

    const handleExpandToggle = () => {
        if (isExpanded) {
            // if div is expanded, set height back to 110px and update state
            briefEle.current.style.height = '110px'
        } else {
            // if div not expanded, get height of description ele to find amount of ele hidden
            const descHeight = descEle.current.clientHeight
            const heightDiff = descHeight - 58

            if (heightDiff > 0) {
                // increase height of brief div by height diff
                briefEle.current.style.height = `${briefEle.current.clientHeight + heightDiff}px`
            }
        }

        // toggle isExpanded value
        setIsExpanded(!isExpanded)
    }

    return (
        <div ref={briefEle} className='home-post-brief'>
            <h3 onClick={() => window.location.href='/post/' + props.id}>{props.title} <span className='creation-date'></span></h3>
            <p ref={descEle} className='description'>{props.description}</p>
            <a href='#' onClick={handleExpandToggle}>{isExpanded ? 'Less' : "More"}</a>
        </div>
    )
}
