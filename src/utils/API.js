import axios from 'axios'

export default {
    getBlogPost: function(id) {
        return axios.get('http://localhost:8000/api/post/' + id)
    },
    getAllBlogPosts: function() {
        return axios.get('http://localhost:8000/api/post/all')
    },
    getPostsByUser: function(userId) {
        return axios.get('http://localhost:8000/api/user/' + userId + '/post/all')
    },
    createBlogPost: function(postObj) {
        return axios.post('http://localhost:8000/api/post/create', postObj)
    },
    updateBlogPost: function(id, postObj) {
        return axios.put('http://localhost:8000/api/post/update/' + id, postObj)
    },
    deleteBlogPost: function(id) {
        return axios.delete('http://localhost:8000/api/post/delete/' + id)
    },
    login: function(userObj) {
        return axios.post('http://localhost:8000/api/user/login', userObj)
    },
    createNewAccount: function(userObj) {
        return axios.post('http://localhost:8000/api/user/create', userObj)
    },
    validateToken: function(token) {
        return axios.get('http://localhost:8000/api/auth/token', { 'headers': { 'auth-token': `${token}`}})
    },
    updateCloudinaryImage: function(img) {
        return axios.post('https://api.cloudinary.com/v1_1/brandonp321/image/upload', img)
    }
}