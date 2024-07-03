<template>
    <div>
        <Comment
            v-for="comment in commentsByPageWithSort"
            :key="comment.id"
            :comment="comment"
        />
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import Comment from "./Comment.vue";

export default {
    components: {
        Comment,
    },
    computed: {
        ...mapGetters(["commentsByPageWithSort"]),
    },
};
</script>
