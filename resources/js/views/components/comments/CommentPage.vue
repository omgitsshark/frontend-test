<template>
    <div>
        <header>
            <h1>Комментарии</h1>
            <CommentSort />
        </header>
        <main class="main">
            <div v-if="isCommentsLoading">Загрузка данных</div>

            <div v-else-if="isCommentsLoadingError">Что-то пошло не так...</div>

            <div
                v-else-if="
                    !isCommentsLoading &&
                    !isCommentsLoadingError &&
                    comments.length === 0
                "
            >
                Комментариев еще нет, добавьте новый
            </div>

            <div v-else>
                <CommentList />
                <Pagination
                    :currentPage="page"
                    :totalPages="totalPages"
                    @changePage="changePage"
                />
            </div>
        </main>

        <footer>
            <CommentForm />
        </footer>
    </div>
</template>
<script>
import CommentSort from "./CommentSort.vue";
import CommentList from "./CommentList.vue";
import CommentForm from "./CommentForm.vue";
import Pagination from "../ui/Pagination.vue";

import { mapState, mapActions, mapGetters } from "vuex";

export default {
    components: {
        CommentSort,
        CommentList,
        CommentForm,
        Pagination,
    },
    methods: {
        ...mapActions(["loadComments", "changePage"]),
    },
    computed: {
        ...mapGetters(["totalPages"]),
        ...mapState([
            "comments",
            "isCommentsLoading",
            "isCommentsLoadingError",
            "page",
        ]),
    },
    mounted() {
        this.loadComments();
    },
};
</script>

<style scoped>
.main {
    padding: 20px 0;
}
</style>
