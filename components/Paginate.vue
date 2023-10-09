<template>
    <ul class="pagination">
        <li class="pagination-item" @click="onClickPreviousPage" :disabled="isInFirstPage">&laquo;</li>
        <li v-for="(page, index) in pages" class="pagination-item" :key="index" @click="onClickPage(page.name)"
                :disabled="page.isDisabled"
                :class="{ active: isPageActive(page.name) }">
            {{ page.name }}
        </li>
        <li class="pagination-item" @click="onClickNextPage" :disabled="isInLastPage">&raquo;</li>
    </ul>
</template>
<script>
export default {
    props: {
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 3
        },
        totalPages: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    },
    computed: {
        startPage() {
            // When on the first page
            if (this.currentPage === 1) {
                return 1;
            }
            // When on the last page
            if (this.currentPage === this.totalPages) {
                return (this.totalPages+1) - this.maxVisibleButtons;
            }
            // When in between
            return this.currentPage - 1;
            },
        pages() {
            const range = [];

            for (let i = this.startPage;
                i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
                i+= 1 ) {
                range.push({
                name: i,
                isDisabled: i === this.currentPage
                });
            }

            return range;
        },
        isInFirstPage() {
            return this.currentPage === 1;
        },
        isInLastPage() {
            return this.currentPage === this.totalPages;
        },
    },
    methods: {
        isPageActive(page) {
            return this.currentPage === page;
        },
        onClickFirstPage() {
            this.$emit('pagechanged', 1);
        },
        onClickPreviousPage() {
            this.$emit('pagechanged', (this.currentPage == 1) ? 1 : this.currentPage - 1);
        },
        onClickPage(page) {
            this.$emit('pagechanged', page);
        },
        onClickNextPage() {
            this.$emit('pagechanged',  (this.currentPage == this.totalPages) ? this.totalPages : this.currentPage + 1);
        },
        onClickLastPage() {
            this.$emit('pagechanged', this.totalPages);
        }
    }
}
</script>
<style scoped>
    .pagination { 
        width: fit-content;
        margin: 0 auto;
    }
    .pagination li {
        color: black;
        float: left;
        padding: 8px 16px;
        text-decoration: none;
        border: 1px solid #ddd;
        cursor: pointer;
    }
    .pagination li.active {
        background-color: #00aeef;
        color: white;
        border: 1px solid #00aeef;
    }
    .pagination li:hover:not(.active) {background-color: #ddd;}

    .pagination li:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    .pagination li:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
</style>