import React, { useEffect, useState } from 'react'
import BlogPostSection from '../../components/BlogPostSection'
import BlogPostImage from '../../components/BlogPostImage'
import BlogPostTitle from '../../components/BlogPostTitle'
import './index.css'
import { useParams } from 'react-router-dom'
import API from '../../utils/API'

export default function BlogPost() {
    const { id } = useParams();

    const [sections, setSections] = useState([])

    useEffect(() => {
        // get blog post data from server
        API.getBlogPost(id).then(response => {
            setSections(response.data.postSections)
        })
    }, [])

    return (
        <div>
            <div className='content-responsive'>
                {sections.map((section, index) => {
                    switch (section.sectionType) {
                        case 'title':
                            return <BlogPostTitle
                                title={section.title}
                                subtitle={section.subtitle}
                                index={index}
                            />
                        case 'subSection':
                            return <BlogPostSection
                                heading={section.heading}
                                text={section.text}
                                index={index}
                            />
                        case 'image':
                            return <BlogPostImage
                                url={section.url}
                                alt={section.alt}
                                index={index}
                            />
                    }
                })}
            </div>
        </div>
    )
}
