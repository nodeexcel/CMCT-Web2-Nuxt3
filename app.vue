
<template>
 <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script>
export default {
  mounted(){
    console.log("jjj",process.env.PRISMIC_ENDPOINT)
  }
}
</script>
