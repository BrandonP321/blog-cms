import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import BlogPostBrief from '../../components/BlogPostBrief'
import API from '../../utils/API'
import './index.css'

export default function Home() {
    const [allPosts, setAllPosts] = useState([])
    const [displayPosts, setDisplayedPosts] = useState([])
    const [postsDisplayedPage, setPostsDisplayedPage] = useState(0)

    useEffect(() => {
        // on load, get all blog posts from server
        API.getAllBlogPosts()
            .then(({ data: posts }) => {
                // update state with array of posts
                setAllPosts(posts)
            })
    }, [])

    useEffect(() => {
        // when all posts state is updated, update posts to be displayed
        if (allPosts.length > 0) {
            const endPostIndex = postsDisplayedPage * 5 + 4 < allPosts.length ? postsDisplayedPage * 5 + 4 : allPosts.length
            const postsArr = allPosts.slice(postsDisplayedPage * 5, endPostIndex + 1)
            console.log(postsArr)
            setDisplayedPosts(postsArr)
        }
    }, [allPosts, postsDisplayedPage])

    const blogListPageUp = () => {
        // increase current page by 1
        setPostsDisplayedPage(postsDisplayedPage + 1)
    }

    const blogListPageDown = () => {
        // decrease current page by 1
        setPostsDisplayedPage(postsDisplayedPage - 1)
    }

    return (
        <>
            <div className='home-search-bar'>
                <form>
                    <input className='search-input form-control' placeholder='Search' />
                    <button className='btn btn-primary'>Search</button>
                </form>
                <DropdownButton id="dropdown-basic-button" title="Sort">
                    <Dropdown.Item as='button'>Most Recent</Dropdown.Item>
                    <Dropdown.Item as='button'>None</Dropdown.Item>
                    <Dropdown.Item as='button'>Something else</Dropdown.Item>
                </DropdownButton>
            </div>
            <div className='home-blog-posts'>
                {displayPosts.map(post => {
                    return <BlogPostBrief
                        title={post.title}
                        description={post.description}
                        id={post._id}
                    />
                })}
            </div>
            <div className='home-posts-pages-btns'>
                {postsDisplayedPage !== 0 ?
                    <button className='btn btn-light' onClick={blogListPageDown}>Prev</button> :
                    <button className='btn btn-light' disabled>Prev</button>
                }
                {postsDisplayedPage * 5 + 4 < allPosts.length ?
                    <button className='btn btn-light' onClick={blogListPageUp}>Next</button> :
                    <button className='btn btn-light' disabled>Next</button>
                }
            </div>
        </>
    )
}
