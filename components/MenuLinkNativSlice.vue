<template>
    <prismic-link v-if="linkType == 'submenu'" :field="item.sub_nav_link" :key="'header-item-' + index" @click="closeMenu()" :class="className">
        {{ $prismic.asText(item.sub_nav_link_label) }}
    </prismic-link>
    <prismic-link v-else :field="item.primary.link" :class="className" @click.native="closeMenu()" :key="'nav-link-' + index">
        {{ $prismic.asText(item.primary.label) }}
    </prismic-link>
</template>

<script>
const anotherHtmlSerializer = function (type, element, content, children) {} // Keep this line for link https://prnt.sc/v9tq4e
export default {
    props: ['index', 'item', 'className', 'linkType'],
    name: 'link-native-slice',
    data() {
        return {
            anotherHtmlSerializer,
        }
    },
    methods:{
    closeMenu() {
        $('#navbarmenuContent').collapse('hide');
    },
}
}
</script>