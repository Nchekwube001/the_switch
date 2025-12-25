const {getDefaultConfig} = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const {transformer, resolver} = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    minifierConfig: {
      compress: {
        // The option below removes all console logs statements in production.
        drop_console: true,
      },
    },
  };

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter(ext => ext !== 'svg'), // keep your SVG transformer
    sourceExts: [...resolver.sourceExts, 'svg'],
  };

  return config;
})();
