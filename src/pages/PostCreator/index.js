import React, { useState, useRef, useEffect } from 'react'
import CreatorToolBox from '../../components/PostCreationComponents/CreatorToolBox'
import BlogPostTitle from '../../components/PostCreationComponents/BlogPostTitle'
import BlogPostImage from '../../components/PostCreationComponents/BlogPostImage'
import BlogPostSection from '../../components/PostCreationComponents/BlogPostSection'
import './index.css'

export default function PostCreator() {
    const [components, setComponentsState] = useState([])
    const componentsRef = useRef([])
    const setComponents = data => {
        componentsRef.current = data
        setComponentsState(data)
    }

    useEffect(() => {
        // on load, add a default title section to state
        const titleObj = {
            sectionType: 'title',
            title: 'Blog Post Title',
            subtitle: 'Insert subtitle here'
        }

        setComponents([...componentsRef.current, titleObj])
    }, [])

    const addSection = () => {
        // add object to state with properties for a section with a heading and text
        const sectionObj = {
            sectionType: 'subSection',
            heading: 'Heading',
            text: 'This is the body text for this section'
        }

        setComponents([...componentsRef.current, sectionObj])
    }

    const addImage = () => {
        // add object to state with info for image section
        const imgObj = {
            sectionType: 'image',
            url: '',
            alt: '',
        }

        setComponents([...componentsRef.current, imgObj])
    }

    const handleSectionMove = (index, direction) => {
        const newSections = [...componentsRef.current]

        // set integer value to direction to indicate index increase/decrease in state array
        const moveAmount = direction === 'up' ? -1 : 1
        // remove section from array of sections
        const section = newSections.splice(index, 1)[0]
        // add section back in at new index locations
        newSections.splice(index + moveAmount, 0, section)
        // set value in state and ref hooks to new array of sections
        setComponents(newSections)
    }

    const handleTextInputChange = (event) => {
        // get value and name of input field and index of section in state
        const name = event.target.getAttribute('data-name')
        const text = event.target.innerText
        const index = event.target.getAttribute('data-index')
        
        // create new array to with updated value of input field
        const updatedArr = [...componentsRef.current]
        updatedArr[index][name] = text

        // only update ref since value doesn't change rendered components
        componentsRef.current = updatedArr
    }

    const handleImageChange = (event) => {

    }

    return (
        <div>
            <CreatorToolBox
                addSection={addSection}
                addImage={addImage}
            />
            <div className='content-responsive'>
                {components.map((section, index) => {
                    switch (section.sectionType) {
                        case 'title':
                            return <BlogPostTitle 
                                title={section.title}
                                subtitle={section.subtitle}
                                index={index}
                                handleTextInputChange={handleTextInputChange}
                                handleSectionMove={handleSectionMove}
                                />
                        case 'subSection':
                            return <BlogPostSection
                                heading={section.heading}
                                text={section.text}
                                index={index}
                                handleTextInputChange={handleTextInputChange}
                                handleSectionMove={handleSectionMove}
                            />
                        case 'image':
                            return <BlogPostImage
                                url={section.url}
                                alt={section.alt}
                                index={index}
                                handleSectionMove={handleSectionMove}
                            />
                    }
                })}
            </div>
            <button onClick={() => console.log(componentsRef.current)} >comps</button>
        </div>
    )
}
