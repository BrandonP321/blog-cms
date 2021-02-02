import axios from 'axios'

const APIENDPOINT = process.env.REACT_APP_APIENDPOINT

export default {
    getBlogPost: function(id) {
        return axios.get(`${APIENDPOINT}/api/post/` + id)
    },
    getAllBlogPosts: function() {
        return axios.get(`${APIENDPOINT}/api/post/all`)
    },
    getPostsByUser: function(userId) {
        return axios.get(`${APIENDPOINT}/api/user/` + userId + '/post/all')
    },
    createBlogPost: function(postObj) {
        return axios.post(`${APIENDPOINT}/api/post/create`, postObj)
    },
    updateBlogPost: function(id, postObj) {
        return axios.put(`${APIENDPOINT}/api/post/update/` + id, postObj)
    },
    deleteBlogPost: function(id) {
        return axios.delete(`${APIENDPOINT}/api/post/delete/` + id)
    },
    login: function(userObj) {
        return axios.post(`${APIENDPOINT}/api/user/login`, userObj)
    },
    createNewAccount: function(userObj) {
        return axios.post(`${APIENDPOINT}/api/user/create`, userObj)
    },
    validateToken: function(token) {
        return axios.get(`${APIENDPOINT}/api/auth/token`, { 'headers': { 'auth-token': `${token}`}})
    },
    updateCloudinaryImage: function(img) {
        return axios.post('https://api.cloudinary.com/v1_1/brandonp321/image/upload', img)
    }
}