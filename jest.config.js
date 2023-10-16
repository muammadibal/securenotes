module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  // setupFiles: [
  //   "<rootDir>/jest.setup.js"
  // ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [],
  moduleNameMapper: {
    "^react($|/.+)": "<rootDir>/node_modules/react$1", // makes sure all React imports are running off of the one in this package.
  },
};
