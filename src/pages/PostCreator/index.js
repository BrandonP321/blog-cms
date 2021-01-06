import React, { useState, useRef } from 'react'
import './index.css'

export default function PostCreator() {
    const [components, setComponentsState] = useState([])
    const componentsRef = useRef([])
    const setComponents = data => {
        componentsRef.current = data
        setComponentsState(data)
    }

    return (
        <div>
            
        </div>
    )
}
