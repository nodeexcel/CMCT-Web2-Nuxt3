<template>
    <!-- <div class="section-spacer" :style="{ 'background-color': slice.primary.background_color ,'padding-top': slice.primary.pixels + 'px' }"></div> -->
     <div class="" :style="{ 'background-color': slice.primary.background_color  }"></div>
  </template>
  
  <script>
  export default {
    props: ['slice'],
    name: 'spacer-slice'
  }
  </script>
  
  <style>
  </style>