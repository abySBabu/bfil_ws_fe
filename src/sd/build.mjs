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

/*
maroon: #8d272b
saffron: #e46f20 #f7b38d
green: #67a03f
blue1 - #3ea6e5
blue2 - #3b77b9
blue3 - #3a3a8b
Porange - #f58e1d
Pgreen - #96c22f
*/