
<template>
    <div class="content-page page-not-found">
      <!-- data: {{ data }} <br /> -->
    pending: {{ pending }}

   <!-- <div class="container">
     <h1>Page not found</h1>
     <p>Sorry we were unable to find the page you are looking for.</p>
     <p><nuxt-link to="/" style="text-decoration: underline;">Back to home</nuxt-link></p>
   </div> -->
       <div class="container">
           <h1>Not found <span>:(</span></h1>
               <p  @click="handleError">Sorry, but the page you were trying to view does not exist.</p>
               <i>{{ error.statusCode }}</i>
               <div>
                   <button @click="handleError()">Go to the home page</button>
               </div>
               
           </div>
 </div>
 <!-- <div>{{ error.statusCode }}</div>
 <div><button @click="handleError">Go to the home page</button></div> -->
</template>

<script setup>
const props = defineProps({
 error: Object,
 required: true,
});
// const {data} = useAsyncTest()
// const { data, pending } = useAsyncData(async () => {
//   await new Promise((resolve) => setTimeout(resolve, 2000))
//   return 42
// })

const handleError = () => clearError({ redirect: '/' });
</script>

<style  scoped>
.page-not-found .container {
   text-align: center;
 margin: 10% auto;
}
.page-not-found i {
   font-style: normal;
   font-size:200px;
 color: #72bf44;
}
.page-not-found p {
   margin-bottom: 4rem;
}
</style>