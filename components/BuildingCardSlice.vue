<template>
    <div>
        <p>
           {{ flag2 }} 
        </p>
    </div>
</template>
<script>
import { createClient } from '@prismicio/client';
// import { useRuntimeConfig } from 'nuxt'
// import linkResolver: '@/plugins/link-resolver',
export default {
    data(){
        return {
            flag: 5,
            prismicData:null,
            flag2: process.env.MODE
        }
    },
    async asyncData({ app }) {
    const { data } = await app.$prismic.api.getSingle('menu'); // Replace 'menu' with your document type

    return {
      menu: data,
    };
  },
    methods:{
        help(){
            
        }
    },
    mounted(){
        const createPrismicClient = (accessToken) => {
        return createClient('https://cmct-web.cdn.prismic.io/api/v2', {
            accessToken,
        });
        };
        let one =null
        const client = createPrismicClient('MC5YM1F4Z1JJQUFCR1IzazZl.77-9ZO-_ve-_ve-_ve-_ve-_ve-_vUXvv73vv73vv70fFe-_vV0UOglZIO-_ve-_ve-_ve-_vUFg77-977-977-977-9NA');
                console.log(client)
                client.getSingle('menu').then((result) => {
                    this.prismicData=result
                    console.log(one);
                console.log(result);
                }).catch((error) => {
                console.error(error);
                });
                console.log(this.prismicData);
    }

}
</script>