<template>
    <NuxtLink v-if="linkType == 'submenu'" :to="`/page/${item.sub_nav_link.uid}`" :key="'header-item-' + index" @click="closeMenu()" :class="className">
        {{ $prismic.asText(item.sub_nav_link_label) }}
    </NuxtLink >
    <NuxtLink  v-else :to="`/page/${item.primary.link.uid}`"   :class="className" @click="closeMenu()" :key="'nav-link-' + index">
        {{ $prismic.asText(item.primary.label) }}
    </NuxtLink >
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