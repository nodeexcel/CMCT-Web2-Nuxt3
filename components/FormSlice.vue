<template>
    <div>
        <template v-if="slice.slice_label == 'findyourhome'">
            <FindaHomeForm />
        </template>
        
        <template v-else-if="slice.slice_label == 'homedetails'">
            <FindaHomeSideForm :slice="slice" />
        </template>
        <template v-else-if="slice.slice_label == 'adjustForm'">
            <AdjustRoomForm :slice="slice" />
        </template>
        <template v-else-if="slice.slice_label == 'newcity'">
            <NewCityForm :banner="banner" :slice="slice" />
        </template>
        <template v-else-if="slice.slice_label == 'getintouch'">
            <GetInTouch :banner="banner" :slice="slice" />
        </template>
        <template v-else-if="slice.slice_label == 'corporate'">
            <Corporate :banner="banner" :slice="slice" />
        </template>
        <template v-else-if="slice.slice_label == 'landlords'">
            <Landlords :banner="banner" :slice="slice" />
        </template>
    </div>
</template>

<script>
// import { GetInTouch, NewCityForm } from '#build/components';

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
    // components: { NewCityForm, GetInTouch }
}
</script>

<style>
</style>
