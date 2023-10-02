<template>
    <div>
        <template v-if="slice.slice_label == 'findyourhome'">
            <finda-home-form :banner="banner"/>
        </template>
        
        <template v-else-if="slice.slice_label == 'homedetails'">
            <finda-home-side-form :slice="slice" />
        </template>
        <template v-else-if="slice.slice_label == 'adjustForm'">
            <adjust-room-form :slice="slice" />
        </template>
        <template v-else-if="slice.slice_label == 'newcity'">
            <new-city-form :banner="banner" :slice="slice" />
        </template>
        <template v-else-if="slice.slice_label == 'getintouch'">
            <get-in-touch-form :banner="banner" :slice="slice" />
        </template>
        <template v-else-if="slice.slice_label == 'corporate'">
            <corporate-form :banner="banner" :slice="slice" />
        </template>
        <template v-else-if="slice.slice_label == 'landlords'">
            <landlords-form :banner="banner" :slice="slice" />
        </template>
    </div>
</template>

<script>
// const FindaHomeForm = () => import("../forms/FindaHomeForm.vue");
// const FindaHomeSideForm = () => import("../forms/FindaHomeSideForm.vue");
// const AdjustRoomForm = () => import("../forms/AdjustRoomForm.vue");
// const NewCityForm = () => import("../forms/NewCityForm.vue");
// const GetInTouchForm = () => import("../forms/GetInTouch.vue");
// const CorporateForm = () => import("../forms/Corporate.vue");
// const LandlordsForm = () => import("../forms/Landlords.vue");
export default {
	props: ['slice', 'banner'],
	name: 'form-slice',
	// components: {
	// 	FindaHomeForm,
    //     FindaHomeSideForm,
    //     NewCityForm,
    //     GetInTouchForm,
    //     CorporateForm,
    //     LandlordsForm,
    //     AdjustRoomForm
    // },
}
</script>

<style>
</style>
