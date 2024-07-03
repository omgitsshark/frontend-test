<template>
    <div class="comment">
        <p><strong>ID:</strong> {{ comment.id }}</p>
        <p><strong>Имя:</strong> {{ comment.name }}</p>
        <p><strong>Дата:</strong> {{ comment.date }}</p>
        <p><strong>Комментарий:</strong> {{ comment.text }}</p>

        <div class="comment__actions">
            <button class="button" @click="emitDelete" :disabled="isDeleting">
                Удалить
            </button>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
    components: {},
    props: {
        comment: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isDeleting: false,
        };
    },
    methods: {
        ...mapActions(["deleteComment"]),
        emitDelete() {
            this.isDeleting = true;
            this.deleteComment(this.comment.id);
        },
    },
};
</script>

<style scoped>
.comment {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.comment p {
    margin: 0 0 4px;
    text-align: left;
}

.comment p:last-of-type {
    margin: 0 0 12px;
    text-align: left;
}

.comment p strong {
    color: #35495e;
}
.button {
    background-color: #6c757d;
    padding: 10px 15px;
    border: none;
    color: white;
    cursor: pointer;
}
button:hover {
    opacity: 0.1;
}
</style>
