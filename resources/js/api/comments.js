import axios from "axios";

const url = "/api/comments/";

const getComments = () => {
    return axios.get(url);
};

const getComment = (id) => {
    return axios.get(`${url}${id}`);
};

const addComment = (comment) => {
    return axios.post(`${url}`, comment);
};

const editComment = (id, comment) => {
    return axios.patch(`${url}${id}`, comment);
};

const deleteComment = (id) => {
    return axios.delete(`${url}${id}`);
};

export { getComments, getComment, deleteComment, addComment, editComment };
