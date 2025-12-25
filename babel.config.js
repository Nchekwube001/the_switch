const unistylesPluginOptions = {
  root: "app",
  debug: true,
};

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["react-native-unistyles/plugin", unistylesPluginOptions],
      "react-compiler",
    ],
  };
};
