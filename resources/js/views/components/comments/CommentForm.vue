<template>
    <div>
        <h3>Форма</h3>
        <form @submit.prevent="submitForm">
            <ul class="errors">
                <li class="error-text" v-for="error in errors">
                    {{ errorsNames[error] }}
                </li>
            </ul>

            <div>
                <label for="name">Имя:</label>
                <input
                    type="text"
                    id="name"
                    v-model="name"
                    :class="{ error: errors.includes('name') }"
                />
            </div>
            <div>
                <label for="date">Дата:</label>
                <date-picker
                    v-model="date"
                    valueType="format"
                    :class="{ error: errors.includes('date') }"
                ></date-picker>
            </div>
            <div>
                <label for="text">Текст:</label>
                <textarea
                    rows="4"
                    type="text"
                    id="text"
                    v-model="text"
                    :class="{ error: errors.includes('text') }"
                />
            </div>

            <button type="submit">Отправить</button>
        </form>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
    components: {
        DatePicker,
    },
    computed: {
        ...mapState(["isCommentAddedSuccess"]),
    },
    watch: {
        isCommentAddedSuccess(newValue, oldValue) {
            if (newValue && !oldValue) {
                this.resetForm();
            }
        },
    },
    data() {
        return {
            name: "",
            date: "",
            text: "",
            errors: [],
            errorsNames: {
                name: "Заполните имя",
                date: "Заполните дату",
                text: "Заполните текст комментария",
            },
        };
    },
    methods: {
        ...mapActions(["addComment"]),
        submitForm() {
            this.validate();

            if (this.errors.length === 0) {
                this.addComment({
                    name: this.name,
                    text: this.text,
                    date: this.date,
                });
            }
        },
        validate() {
            const errors = [];

            if (!this.name) {
                errors.push("name");
            }
            if (!this.date) {
                errors.push("date");
            }
            if (!this.text) {
                errors.push("text");
            }

            this.errors = errors;
        },
        resetForm() {
            this.name = "";
            this.date = "";
            this.text = "";
        },
    },
};
</script>

<style scoped>
div {
    margin-bottom: 10px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input,
textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    font-family: Helvetica, Arial, sans-serif;
    border-radius: 4px;
    border: 1px solid black;
}

input:focus-visible,
textarea:focus-visible {
    outline: none;
}

button {
    padding: 10px 15px;
    background-color: #42b983;
    border: none;
    color: white;
    cursor: pointer;
}

button:hover {
    opacity: 0.9;
}

.mx-datepicker {
    width: 100%;
}

::v-deep .mx-input {
    border: 1px solid black !important;
}

.error ::v-deep .mx-input {
    border-color: #b01b34 !important;
}

.errors {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.error-text {
    margin: 0 0 4px;
}

.error {
    border-color: #b01b34;
}

.error-text:last-of-type {
    margin: 0 0 20px;
}
</style>
