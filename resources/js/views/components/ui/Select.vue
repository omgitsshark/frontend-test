<template>
    <select v-model="selectValue" v-on:change="changeValue">
        <option v-for="option in options" :value="option.value">
            {{ option.label }}
        </option>
    </select>
</template>
<script>
export default {
    props: {
        options: { type: Array, required: true },
        currentSort: { type: String },
    },
    methods: {
        changeValue() {
            this.$emit("selected", this.selectValue);
        },
    },
    data() {
        return {
            selectValue: "",
        };
    },
    mounted() {
        this.selectValue = this.currentSort || "";
    },
};
</script>
