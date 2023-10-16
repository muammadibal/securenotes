import '@testing-library/jest-native/extend-expect';

declare namespace jest {
  interface Matchers<R, T> {
    toBeEmpty: () => R;
  }
}