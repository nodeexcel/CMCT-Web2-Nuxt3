
import redirects from './301.json';
// import { fromNodeMiddleware } from 'nuxt3';

export default fromNodeMiddleware((req, res, next) => {
    console.log('Legacy middleware')
  // Apply compression only to text-based resources
  if (/\.(js|css|json|txt|html|ico|svg)(\?.*)?$/.test(req.url)) {
    // Handle compression as needed
  }

  const host = req.headers.host;
  const url = req.url;
  const isWWW = /^www\./i.test(host);
  const redirectData = redirects.find((r) => r.from === req.url);

  if (redirectData && !isWWW && host === 'casamia.co') {
    const newURL = `https://www.${host}${redirectData.to}`;
    res.writeHead(301, { Location: newURL });
    res.end();
  } else if (!isWWW && host === 'casamia.co') {
    const newURL = `https://www.${host}${url}`;
    res.writeHead(301, { Location: newURL });
    res.end();
  } else if (redirectData) {
    res.writeHead(301, { Location: redirectData.to });
    res.end();
  } else {
    next();
  }
});


  