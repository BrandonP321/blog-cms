import React from 'react'
import BlogPostSection from '../../components/BlogPostSection'
import BlogPostImage from '../../components/BlogPostImage'
import BlogPostTitle from '../../components/BlogPostTitle'
import './index.css'

export default function BlogPost() {
    return (
        <div>
            <div className='content-responsive'>
                <BlogPostTitle 
                    title='This is some title'
                    subtitle='This is an optional subtitle for this post'
                />
                <BlogPostImage src='https://via.placeholder.com/1920x1080' alt='hero' />
                <BlogPostSection
                    heading='This is something'
                    text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis augue vitae magna placerat,
                    sit amet efficitur purus consequat. Etiam nisi urna, varius vehicula felis vel, lobortis pretium orci.
                    Aliquam et dui sagittis mauris fermentum placerat. Nunc pulvinar nisl vitae ornare ultrices. Quisque
                    tristique, sem quis convallis dictum, orci diam vulputate ipsum, sed scelerisque leo est vel ex. Fusce
                    euismod dui nisi, a imperdiet justo eleifend commodo. Nunc convallis felis eu metus mollis pellentesque.
                    Vivamus gravida convallis odio, a tincidunt eros accumsan eu.'
                />
                <BlogPostSection
                    heading='This is something'
                    text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis augue vitae magna placerat,
                    sit amet efficitur purus consequat. Etiam nisi urna, varius vehicula felis vel, lobortis pretium orci.
                    Aliquam et dui sagittis mauris fermentum placerat. Nunc pulvinar nisl vitae ornare ultrices. Quisque
                    tristique, sem quis convallis dictum, orci diam vulputate ipsum, sed scelerisque leo est vel ex. Fusce
                    euismod dui nisi, a imperdiet justo eleifend commodo. Nunc convallis felis eu metus mollis pellentesque.
                    Vivamus gravida convallis odio, a tincidunt eros accumsan eu.'
                />
                <BlogPostImage src='https://via.placeholder.com/1920x1080' alt='hello there' />
                <BlogPostSection
                    heading='This is something'
                    text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis augue vitae magna placerat,
                    sit amet efficitur purus consequat. Etiam nisi urna, varius vehicula felis vel, lobortis pretium orci.
                    Aliquam et dui sagittis mauris fermentum placerat. Nunc pulvinar nisl vitae ornare ultrices. Quisque
                    tristique, sem quis convallis dictum, orci diam vulputate ipsum, sed scelerisque leo est vel ex. Fusce
                    euismod dui nisi, a imperdiet justo eleifend commodo. Nunc convallis felis eu metus mollis pellentesque.
                    Vivamus gravida convallis odio, a tincidunt eros accumsan eu.'
                />
            </div>
        </div>
    )
}
