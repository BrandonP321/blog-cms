import React, { useState, useEffect, useCallback } from 'react'
import { Button, Modal } from 'react-bootstrap'
import ProfileOverview from '../../components/dashboardComponents/ProfileOverview'
import { useParams } from 'react-router-dom'
import BlogPostBrief from '../../components/dashboardComponents/BlogPostBrief'
import API from '../../utils/API'
import './index.css'

export default function Dashboard() {
    const { userId } = useParams()

    const [myPosts, setMyPosts] = useState([])
    const [showModal, setShowModal] = useState(true)
    const [modalPostId, setModalPostId] = useState()
    const [modalInput, setModalInput] = useState({
        title: '',
        description: ''
    })
    const [userIsMakingNewPost, setUserIsMakingNewPost] = useState(true)

    const modalSaveBtnCallback = useCallback(() => {
        if (userIsMakingNewPost) {
            // if user is making a new post, have save btn make an api request to add post to db
            const postObj = {
                title: modalInput.title,
                description: modalInput.description,
                creatorId: userId,
                postSections: [
                    {
                        sectionType: 'title',
                        title: 'Blog Post Title',
                        subtitle: 'Insert subtitle here'
                    }
                ]
            }
            
            // send post object to server
            API.createBlogPost(postObj).then(post => {
                console.log(post.data)
                // open blog editor in new tab
                window.open(`/user/${userId}/post/update/${post.data._id}`)

                handleModalToggle()
            })
        } else {
            // else make request to update existing server
        }
    }, [userIsMakingNewPost, modalInput, modalPostId])

    useEffect(() => {
        // make call to server to get all posts by the user
        API.getPostsByUser(userId)
            .then(({ data: posts }) => {
                console.log(posts)
                // add posts to state
                setMyPosts(posts)
            })
    }, [])

    const handleModalToggle = () => {
        setShowModal(!showModal)
    }

    const showNewPostModal = () => {
        // update values to be shown in modal
        setUserIsMakingNewPost(true)
        setModalInput({ title: '', description: '' })
    }

    const showPostUpdateModal = () => {
        // update values to be shown in modal
        setUserIsMakingNewPost(false)
        // setModalInput({ title: })
    }

    const handleModalInputChange = (event) => {
        // get name and value of input changed
        const name = event.target.name
        const value = event.target.value

        // update state with new value
        setModalInput({ ...modalInput, [name]: value })
    }

    return (
        <>
            <div className='dashboard-wrapper'>
                <h1>My Dashboard</h1>
                <div className='dashboard-content-wrapper'>
                    <ProfileOverview />
                    <div className='my-posts-container'>
                        <h2>My Posts</h2>
                        <div className='search-bar'>
                            <div className='flex-items-left'>
                                <button className='new-post-btn btn btn-primary' onClick={showNewPostModal}>Create New Post</button>
                            </div>
                            <div className='flex-items-right'>
                                <form>
                                    <input className='search-input form-control' type='text' placeholder='Search' />
                                    <button type='submit' className='btn btn-primary'>Search</button>
                                </form>
                            </div>
                        </div>
                        {/* iterate over posts here */}
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleModalToggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Blog Post Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-group'>
                        <label for='blog-title-input'>Title</label>
                        <input id='blog-title-input' className='modal-post-title form-control' placeholder='Blog Post Title' name='title' value={modalInput.title} onChange={handleModalInputChange} />
                    </div>
                    <div className='form-group'>
                        <label for='blog-desc-input'>Description</label>
                        <textarea id='blog-desc-input' className='modal-post-description form-control' placeholder='Description' name='description' value={modalInput.description} onChange={handleModalInputChange}>
                        </textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalToggle}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={modalSaveBtnCallback}>
                        {userIsMakingNewPost ? 'Create Post' : 'Save Changes'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
