module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-transform-flow-strip-types', { "loose": true } ],
    ['@babel/plugin-proposal-private-methods', { "loose": true } ],
    ["@babel/plugin-transform-private-methods", { "loose": true }]
  ],
};
