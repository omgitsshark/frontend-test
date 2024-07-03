<template>
    <div v-if="totalPages > 1">
        <component
            :is="isDisabledBack ? 'span' : 'button'"
            :class="{
                disabled: isDisabledBack,
            }"
            class="page"
            @click="goBack"
            :disabled="isDisabledBack"
            >назад</component
        >

        <button
            class="page"
            :class="{
                active: page === currentPage,
            }"
            v-for="page in pages"
            :key="page"
            @click="changePage(page)"
        >
            {{ page }}
        </button>

        <component
            :is="isDisabledNext ? 'span' : 'button'"
            :class="{
                disabled: isDisabledNext,
            }"
            class="page"
            @click="goForward"
            :disabled="isDisabledNext"
            >вперед</component
        >
    </div>
</template>
<script>
export default {
    props: {
        totalPages: Number,
        currentPage: Number,
    },
    methods: {
        goBack() {
            if (this.currentPage - 1 === 0) {
                return;
            }

            this.changePage(this.currentPage - 1);
        },
        goForward() {
            if (this.currentPage + 1 > this.totalPages) {
                return;
            }

            this.changePage(this.currentPage + 1);
        },
        changePage(page) {
            this.$emit("changePage", page);
        },
    },
    computed: {
        isDisabledBack() {
            return this.currentPage === 1;
        },
        isDisabledNext() {
            return this.currentPage === this.totalPages;
        },
        pages() {
            const currentPage = this.currentPage;
            const pages = Array(this.totalPages)
                .fill("")
                .map((i, index) => index + 1);
            return pages;
        },
    },
};
</script>

<style scoped>
.page {
    padding: 5px;
    margin-right: 5px;
    cursor: pointer;
    opacity: 0.5;
    font-size: 14px;
}

.active {
    opacity: 1;
}

.disabled {
    opacity: 0.5;
    cursor: default;
}
</style>
