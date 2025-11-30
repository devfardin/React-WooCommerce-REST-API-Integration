import ReactPixel from 'react-facebook-pixel';

const pixelId = "836698955854410"; // replace with your real Pixel ID

export const initFacebookPixel = () => {
  const options = {
    autoConfig: true,
    debug: false, // Set to true only if you want console logs
  };

  ReactPixel.init(pixelId, {}, options);
  ReactPixel.pageView();  // Track initial page load
};

export default ReactPixel;
