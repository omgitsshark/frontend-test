import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { getComments, addComment, deleteComment } from "./api/comments";

const sortFns = {
    idAsc: (comments) =>
        comments.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0)),
    idDesc: (comments) =>
        comments.sort((a, b) => (a.id > b.id ? -1 : b.id > a.id ? 1 : 0)),
    DateAsc: (comments) =>
        comments.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0)),
    DateDesc: (comments) =>
        comments.sort((a, b) => (a.date > b.date ? -1 : b.date > a.date ? 1 : 0)),
};

const store = new Vuex.Store({
    state: {
        comments: [],
        isCommentsLoading: true,
        isCommentsLoadingError: false,
        isCommentAddedSuccess: false,
        commentsPerPage: 3,
        page: 1,
        sort: "idAsc",
    },
    mutations: {
        SET_COMMENTS: (state, comments) => {
            state.comments = comments;
        },
        SET_IS_LOADING_COMMENTS: (state, isLoading) => {
            state.isCommentsLoading = isLoading;
        },
        SET_IS_COMMENTS_LOADING_ERROR: (state, isError) => {
            state.isCommentsLoadingError = isError;
        },
        ADD_COMMENT: (state, comment) => {
            state.comments = [...state.comments, comment];
        },
        COMMENT_ADDED_SUCCESS: (state, value) => {
            state.isCommentAddedSuccess = value;
        },
        DELETE_COMMENT: (state, commentId) => {
            state.comments = state.comments.filter(
                (comment) => comment.id !== commentId
            );
        },
        SET_PAGE: (state, page) => {
            state.page = page;
        },
        RESET_PAGE: (state) => {
            state.page = 1;
        },
        SET_SORT: (state, sort) => {
            state.sort = sort;
        },
    },
    actions: {
        loadComments: (context) => {
            getComments()
                .then((res) => {
                    context.commit("SET_COMMENTS", res.data);
                    context.commit("SET_IS_LOADING_COMMENTS", false);
                    context.commit("SET_IS_COMMENTS_LOADING_ERROR", false);
                    context.commit("RESET_PAGE");
                })
                .catch((err) => {
                    context.commit("SET_IS_COMMENTS_LOADING_ERROR", true);
                });
        },
        addComment: (context, comment) => {
            context.commit("COMMENT_ADDED_SUCCESS", false);

            addComment(comment)
                .then((res) => {
                    context.commit("ADD_COMMENT", res.data);
                    context.commit("RESET_PAGE");
                    context.commit("COMMENT_ADDED_SUCCESS", true);
                })
                .catch((err) => {
                    console.log("error", err);
                });
        },
        deleteComment: (context, commentId) => {
            deleteComment(commentId)
                .then(() => {
                    context.commit("DELETE_COMMENT", commentId);
                    context.commit("RESET_PAGE");
                })
                .catch((err) => {
                    console.log("error", err);
                });
        },
        changePage: (context, page) => {
            context.commit("SET_PAGE", page);
        },
        changeSort: (context, sort) => {
            context.commit("SET_SORT", sort);
            context.commit("RESET_PAGE");
        },
    },
    getters: {
        commentsByPageWithSort(state) {
            const page = state.page - 1;
            const startIndex = page === 0 ? 0 : page * state.commentsPerPage;
            const sortFn = sortFns[state.sort];
            const sortedComments = sortFn([...state.comments]);

            const data = sortedComments.splice(
                startIndex,
                state.commentsPerPage
            );

            return data;
        },
        totalPages(state) {
            return Math.ceil(state.comments.length / state.commentsPerPage);
        },
    },
});

export { store };
