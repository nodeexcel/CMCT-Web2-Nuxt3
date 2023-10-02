<template>
    <section class="container-background-wrapper">
        <div class="container-background-sub-wrapper" :style="{ 'background-color': slice.primary.background_color }">
            <div class="inner-content-wrapper text-image-slice" >
                <div class="cms-main-wrap text-image-slice-padding text-img">
                    <div class="section-main-title content-h2-heading col-md-12 text-md-left mb-5 mb-xl-4 pb-xl-4">
                        <prismic-rich-text :field="slice.primary.title" class="cms-title"/>
                    </div>
                    <!-- For desktop version: START -->
                    <div class="desktop">
                        <div class="row logo-img" >
                            <template v-for="(item, index) in slice.items" :key="index">
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-3" >
                                    <prismic-link v-if="item.link.link_type == 'Web'" target="_blank" :field="item.link"><prismic-image :field="item.image" /></prismic-link>
                                    <prismic-image v-else :field="item.image" />
                                </div> 
                            </template>   
                        </div>
                    </div>
                    <!-- For desktop version: END -->
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  props: ['slice'],
  name: 'logos-image',
}
</script>
<style scoped>
.logo-img {
    justify-content: center;
}
.logo-img img {
    border-radius: 10px;
}
.text-image-slice-padding {
    padding: 50px 50px;
}
</style>