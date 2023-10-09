<template>
    <section class="">
        
            <!-- <div class="section-main-title" v-if="slice.primary != undefined && slice.primary.map_title != undefined">
            <prismic-rich-text :field="slice.primary.map_title" class="cms-title"/>
            </div> -->
            <div class="google-map" :id="mapName"></div>
        
    </section>
</template>

<script setup>
const envVars = useRuntimeConfig();
useHead({
    script: [
                { src: `https://maps.googleapis.com/maps/api/js?key=${envVars.public.env.GOOGLE_MAP_KEY}&map_ids=4df64ef1b112569a`}
            ]
    })     
    
</script>

<script>
    export default {
    name: 'google-map',
    props: ['slice'],
    head () {
        return {
            script: [
                { src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_KEY}&map_ids=4df64ef1b112569a`}
            ]
        }
    },
    data: function () {
        return {
            mapName: "location-map",
            markerCoordinates: [{
                latitude: this.slice.primary != undefined ? this.slice.primary.home.latitude : '',
                longitude: this.slice.primary != undefined ? this.slice.primary.home.longitude : ''
                //latitude: 51.501527,
                //longitude: -0.1921837
            }],
            map: null,
            bounds: null,
            markers: [],
            markerIcon: this.slice.primary != undefined ? this.slice.primary.marker.url : ''
            //mapStyleJson: mapJson
        }
    },
    mounted: function () {
        this.bounds = new google.maps.LatLngBounds();
        const element = document.getElementById(this.mapName)
        const mapCentre = this.markerCoordinates[0]
        const options = {
            center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude),
            fullscreenControl: false,
            mapId: '4df64ef1b112569a',
        }
        var map1 = new google.maps.Map(element, options);
        this.map = map1;
        this.markerCoordinates.forEach((coord) => {
            const position = new google.maps.LatLng(coord.latitude, coord.longitude);
            const marker = new google.maps.Marker({ 
                position,
                map: this.map,
                icon: this.markerIcon
            });
            this.markers.push(marker)
            this.map.fitBounds(this.bounds.extend(position))
        });
        //this.map.setOptions({ maxZoom: 14 });
        /* For Zoom Out: START */
        google.maps.event.addListener(map1, 'zoom_changed', function() {
            var zoomChangeBoundsListener = 
                google.maps.event.addListener(map1, 'bounds_changed', function(event) {
                    if (this.getZoom() > 15 && this.initialZoom == true) {
                        // Change max/min zoom here
                        this.setZoom(15);
                        this.initialZoom = false;
                    }
                google.maps.event.removeListener(zoomChangeBoundsListener);
            });
        });
        map1.initialZoom = true;
        /* For Zoom Out: END */
    }
};
</script>
<style scoped>
    .google-map {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        background: gray;
        border-radius: 20px;
    }
    .section-main-title .cms-title ::v-deep(:first-child) {
        color: #222222;
        margin-bottom: 40px;
        text-align: left;
    }   
    @media (max-width:767px){
         .google-map,.location-section {
             width: 100%;
             max-height: 300px;
             height: 300px !important;
         }
    }
    @media (min-width:768px) and (max-width:1400px){
         .google-map{
             height: calc(100% + 12px);
         }
    }
</style>