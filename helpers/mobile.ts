import { getNumberFrom, parsePhoneNumber } from 'awesome-phonenumber';

export const validateMobile = (value?: string, country?: string, onlyMobile?: boolean) => {
  // if (!value || !country) {
  //   console.log("its")
  //   return false;
  // }

  const valueParsed = String(value).replace(/ /g, '');
  const countryParsed = country ? String(country).toUpperCase() : 'SA';
  const onlyMobileParsed = typeof onlyMobile === 'undefined' ? false : onlyMobile;
  console.log("ok",valueParsed,countryParsed ,typeof valueParsed ,typeof countryParsed )

  // const mobile = parsePhoneNumber( '0999999999', { regionCode: 'AF'} );
  const mobile = parsePhoneNumber( valueParsed, { regionCode: countryParsed } );
  console.log("itsojjjjj")
  // const mobile = parsePhoneNumber(valueParsed, {
  //   regionCode: countryParsed,
  // });
  // if (!pn.valid) {
  //   console.log("itsojj")
  //   return false;
    
  // }
  // if (!mobile.valid) {
  //   console.log("itsojj")
  //   return false;
    
  // }

  // if (onlyMobileParsed && !mobile.typeIsMobile) {
  //   console.log("itsojj5656")
  //   return false;
    
  // }
  console.log("itsojj9262 ",mobile)
  return mobile;
  // return getNumberFrom(mobile, 'e164');
};
