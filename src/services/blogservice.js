import httpService from "./httpservice";
async function getAllposts() {
    const { data } = await httpService.get("/posts/");
    return data;

}

async function getPostbyid(id) {
    try {
        const { data } = await httpService.get(`/posts/${id}/`)
        return data
    }
    catch (error) {
        throw error;
    }
}

async function addComment(postId, commentData) {
    const response = await httpService.post(`/posts/${postId}/comments/`, commentData)
    return response.data
}

async function getComments(postId) {
    const response = await httpService.get(`/posts/${postId}/comments/`)
    return response.data
}

async function apdateComment(commentId, commentdata) {
    try {
        const { data } = await httpService.patch(`/comments/${commentId}/`, commentdata)
        return data
    }
    catch (error) {
        throw error;
    }
}
function deleteComment(commentId) {
    return httpService.delete(`/comments/${commentId}/`)
}
const blogService = {
    getAllposts,
    getPostbyid,
    apdateComment,
    deleteComment,
    addComment,
    getComments,
}

export default blogService