import { createClient } from '@prismicio/client';

const createPrismicClient = (accessToken) => {
    return createClient('https://cmct-web.cdn.prismic.io/api/v2', {
        accessToken,
    });
    };
    let one =null
const client = createPrismicClient('MC5YM1F4Z1JJQUFCR1IzazZl.77-9ZO-_ve-_ve-_ve-_ve-_ve-_vUXvv73vv73vv70fFe-_vV0UOglZIO-_ve-_ve-_ve-_vUFg77-977-977-977-9NA');
export {
    client
}