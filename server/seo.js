
const redirects = require('../301.json');
const compression = require('compression');

// export default function (req, res, next) {
//   // Apply compression only to text-based resources
//   if (/\.(js|css|json|txt|html|ico|svg)(\?.*)?$/.test(req.url)) {
//     compression()(req, res, () => {
//       handleRequest(req, res, next);
//     });
//   } else {
//     handleRequest(req, res, next);
//   }
// };

// function handleRequest(req, res, next) {
//   const redirect = redirects.find((r) => r.from === req.url);

//   if (redirect) {
//     res.writeHead(301, { Location: redirect.to });
//     res.end();
//   } else {
//     next();
//   }
// }



export default function (req, res, next) {
  // Apply compression only to text-based resources
  if (/\.(js|css|json|txt|html|ico|svg)(\?.*)?$/.test(req.url)) {
    compression()(req, res, () => {
      handleRequest(req, res, next);
    });
  } else {
    handleRequest(req, res, next);
  }
}

function handleRequest(req, res, next) {
  const host = req.headers.host;
  const url = req.url;
  const isWWW = /^www\./i.test(host);
  const redirect = redirects.find(r => r.from === req.url)

  if(redirect && !isWWW && host === 'localhost:4500') {
    const newURL = `https://www.${host}${redirect.to }`
    res.writeHead(301, { Location: newURL });
    res.end()
  }
  else if (!isWWW && host === 'localhost:4500') {
    const newURL = `https://www.${host}${url}`
    res.writeHead(301, { Location: newURL });
    res.end();
  }
  else if(redirect) {
    res.writeHead(301, { Location: redirect.to })
    res.end()
  }
   else {
    next();
  }
  
}
