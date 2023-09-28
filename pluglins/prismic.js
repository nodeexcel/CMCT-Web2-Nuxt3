import { createClient } from '@prismicio/client';

export default ({ app }) => {
  const prismicClient = createClient({
    endpoint: 'https://cmct-web.cdn.prismic.io/api/v2',
    // Optionally, you can include an access token here if required.
    accessToken: 'MC5YM1F4Z1JJQUFCR1IzazZl.77-9ZO-_ve-_ve-_ve-_ve-_ve-_vUXvv73vv73vv70fFe-_vV0UOglZIO-_ve-_ve-_ve-_vUFg77-977-977-977-9NA',
  });

  app.prismic = prismicClient;
};