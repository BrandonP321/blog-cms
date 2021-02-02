import React, { useState, useEffect, useCallback } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import BlogPostBrief from '../../components/BlogPostBrief'
import API from '../../utils/API'
import './index.css'

export default function Home() {
    const [allPosts, setAllPosts] = useState([])
    const [sortedPosts, setSortedPosts] = useState([])
    const [displayPosts, setDisplayedPosts] = useState([])
    const [postsDisplayedPage, setPostsDisplayedPage] = useState(0)

    useEffect(() => {
        // on load, get all blog posts from server
        API.getAllBlogPosts()
            .then(({ data: posts }) => {
                // update state with array of posts
                setAllPosts(posts)
                // sorted posts state can also be set now since no sort option is set
                setSortedPosts(posts)
            })
    }, [])

    useEffect(() => {
        // when all posts state is updated, update posts to be displayed
        if (sortedPosts.length > 0) {
            console.log('updated sort')
            const endPostIndex = postsDisplayedPage * 5 + 4 < sortedPosts.length ? postsDisplayedPage * 5 + 4 : sortedPosts.length
            const postsArr = sortedPosts.slice(postsDisplayedPage * 5, endPostIndex + 1)
            setDisplayedPosts(postsArr)
        }
    }, [sortedPosts, postsDisplayedPage])

    const handleSort = useCallback((sort) => {
        console.log('sorting by ' + sort)
        // based on sort argument, sort the blog posts
        switch (sort) {
            case 'recent':
                var newSortedPosts = [...allPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                console.log(newSortedPosts)
                setSortedPosts(newSortedPosts)
                break;
            case 'oldest':
                var newSortedPosts = [...allPosts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                console.log(newSortedPosts)
                setSortedPosts(newSortedPosts)
                break;
            case 'none':
                // if no sort, set sorted posts state back to original array of posts
                setSortedPosts([...allPosts])
                break;
        }

        // set page back to 0
        setPostsDisplayedPage(0)
    }, [allPosts])

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
            <div className='hero'>
                <div className='text-wrapper'>
                    <h3>Welcome to</h3>
                    <h1>Instablog</h1>
                    <p></p>
                </div>
            </div>
            <div className='home-search-bar'>
                <DropdownButton id="dropdown-basic-button" title="Sort">
                    <Dropdown.Item as='button' onClick={() => handleSort('recent')}>Most Recent</Dropdown.Item>
                    <Dropdown.Item as='button' onClick={() => handleSort('oldest')}>Oldest</Dropdown.Item>
                    <Dropdown.Item as='button' onClick={() => handleSort('none')}>No Sort</Dropdown.Item>
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
