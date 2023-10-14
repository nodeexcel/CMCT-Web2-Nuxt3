<template>
    <div class="content-page page-not-found">
      <!-- <div class="container">
        <h1>Page not found</h1>
        <p>Sorry we were unable to find the page you are looking for.</p>
        <p><nuxt-link to="/" style="text-decoration: underline;">Back to home</nuxt-link></p>
      </div> -->
      <div class="container">
          <h1>Not found <span>:(</span></h1>
              <p>Sorry, but the page you were trying to view does not exist.</p>
              <i>404</i>
          </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
  }
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
  