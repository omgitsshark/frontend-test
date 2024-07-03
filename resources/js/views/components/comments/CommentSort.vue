<template>
    <div>
        <span>Сортировать по:</span>
        <Select
            :options="options"
            :currentSort="sort"
            @selected="changeSort"
        />
    </div>
</template>
<script>
import Select from "../ui/Select";
import { mapState, mapActions } from "vuex";

const sortOptions = [
    {
        value: "idAsc",
        label: "id по возрастанию",
    },
    {
        value: "idDesc",
        label: "Id по убыванию",
    },
    {
        value: "DateAsc",
        label: "Дате по возрастанию",
    },
    {
        value: "DateDesc",
        label: "Дате по убыванию",
    },
];

export default {
    components: {
        Select,
    },
    data() {
        return {
            options: sortOptions,
        };
    },
    computed: {
        ...mapState(['sort'])
    },
    methods: {
        ...mapActions(["changeSort"]),
    },
};
</script>
