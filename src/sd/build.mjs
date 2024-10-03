import StyleDictionary from 'style-dictionary';

function sdCon(brand, platform) {
  return {
    source: [
      `tokens/brands/${brand}/*.json`,
      'tokens/globals/**/*.json',
      `tokens/platforms/${platform}/*.json`,
    ],
    platforms: {
      web: {
        transformGroup: 'web',
        buildPath: `build/${brand}/`,
        files: [
          {
            destination: `${platform}.css`,
            format: 'css/variables',
          },
        ],
      },
      android: {
        transformGroup: 'android',
        buildPath: `build/${brand}/`,
        files: [
          {
            destination: `${platform}.xml`,
            format: 'android/resources',
          }
        ],
      }
    }
  };
}

['sas', 'bfil'].map(function (brand) {
  ['web', 'android'].map(async function (platform) {
    const sd = new StyleDictionary(sdCon(brand, platform));
    sd.buildPlatform(platform);
  });
}); 