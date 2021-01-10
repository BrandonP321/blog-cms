import React from 'react'
import './index.css'

export default function BlogPostBrief() {
    return (
        <div className='my-posts-container'>
            <h2>My Posts</h2>
            <div className='search-bar'>
                <form>
                    <input className='search-input form-control' type='text' placeholder='Search' />
                    <button type='submit' className='btn btn-primary'>Search</button>
                </form>
                
            </div>
        </div>
    )
}
