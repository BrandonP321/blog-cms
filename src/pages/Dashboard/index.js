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
    const [postsToDisplay, setPostsToDisplay] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showPostDeleteModal, setShowPostDeleteModal] = useState(false)
    const [postToBeDeleted, setPostToBeDeleted] = useState(null)
    const [modalPostId, setModalPostId] = useState(null)
    const [modalInput, setModalInput] = useState({
        title: '',
        description: ''
    })
    const [userIsMakingNewPost, setUserIsMakingNewPost] = useState(true)
    // current page of list of blog posts starts counting at 0
    const [currentBlogsListPage, setCurrentBlogsListPage] = useState(0)

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
            API.updateBlogPost(modalPostId, modalInput).then(() => {
                handleModalToggle()
            })
        }
    }, [userIsMakingNewPost, modalInput, modalPostId])

    useEffect(() => {
        // make call to server to get all posts by the user
        API.getPostsByUser(userId)
            .then(({ data: posts }) => {
                // add posts to state
                setMyPosts(posts)
            })
    }, [])

    useEffect(() => {
        // when my posts are loaded in, select 5 posts based on currently display page to display to user
        if (myPosts.length > 0) {
            const endPostIndex = currentBlogsListPage * 5 + 4 < myPosts.length ? currentBlogsListPage * 5 + 4 : myPosts.length
            console.log(currentBlogsListPage * 5 + 4, myPosts.length)
            const postsArr = myPosts.slice(currentBlogsListPage * 5, endPostIndex + 1)
            console.log('posts on page', postsArr)
            setPostsToDisplay(postsArr)
        }
    }, [myPosts, currentBlogsListPage])

    const handleModalToggle = () => {
        setShowModal(!showModal)
    }

    const hideDeletePostModal = () => {
        setShowPostDeleteModal(false)

        setPostToBeDeleted(null)
    }

    const showNewPostModal = () => {
        // update values to be shown in modal
        setUserIsMakingNewPost(true)
        setModalInput({ title: '', description: '' })

        handleModalToggle()
    }

    const showPostUpdateModal = (title, description, postId) => {
        // update values to be shown in modal
        setUserIsMakingNewPost(false)
        setModalInput({ title: title, description: description })
        setModalPostId(postId)

        setShowModal(!showModal)
    }

    const handleModalInputChange = (event) => {
        // get name and value of input changed
        const name = event.target.name
        const value = event.target.value

        // update state with new value
        setModalInput({ ...modalInput, [name]: value })
    }

    const handlePostDeleteAttempt = postId => {
        // update state with id of post to be deleted
        setPostToBeDeleted(postId)

        // pop up modal to confirm user wants to delete blog post
        setShowPostDeleteModal(true)
    }

    const handlePostDelete = () => {
        console.log(postToBeDeleted)
        API.deleteBlogPost(postToBeDeleted).then(() => {
            hideDeletePostModal()
        })
    }

    const handlePrevBtnClick = () => {
        // decrease current page by 1
        setCurrentBlogsListPage(currentBlogsListPage - 1)
    }

    const handleNextBtnClick = () => {
        // increase current page by 1
        setCurrentBlogsListPage(currentBlogsListPage + 1)
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
                                <button className='btn btn-primary'>Sort</button>
                            </div>
                        </div>
                        <div className='posts'>
                            {postsToDisplay.map(post => {
                                return <BlogPostBrief
                                    title={post.title}
                                    description={post.description}
                                    id={post._id}
                                    userId={userId}
                                    showPostUpdateModal={showPostUpdateModal}
                                    handlePostDeleteAttempt={handlePostDeleteAttempt}
                                />
                            })}
                        </div>
                        <div className='my-posts-page-btns'>
                            {currentBlogsListPage !== 0 ?
                                <button className='btn btn-light' onClick={handlePrevBtnClick}>Previous</button> :
                                <button className='btn btn-light' disabled>Previous</button>
                            }
                            {currentBlogsListPage * 5 + 4 < myPosts.length ?
                                <button className='btn btn-light' onClick={handleNextBtnClick}>Next</button> :
                                <button className='btn btn-light' disabled>Next</button>
                            }
                        </div>
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

            <Modal show={showPostDeleteModal} onHide={hideDeletePostModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Blog Post Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this blog post?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handlePostDelete}>
                        Delete
                    </Button>
                    <Button variant="primary" onClick={hideDeletePostModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
