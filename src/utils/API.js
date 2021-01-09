import axios from 'axios'

export default {
    getBlogPost: function(id) {
        return axios.get('http://localhost:8000/api/post/' + id)
    },
    createBlogPost: function(postObj) {
        return axios.post('http://localhost:8000/api/post/create', postObj)
    },
    updateBlogPost: function(id, postObj) {
        return axios.put('http://localhost:8000/api/post/update/' + id, postObj)
    }
}