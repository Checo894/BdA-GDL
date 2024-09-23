module.exports = {
    preset: 'jest-expo',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|@react-native|@react-native-community|@react-navigation|@react-native-firebase|@firebase|firebase|expo|expo-.*|@expo|@expo-google-fonts|expo-modules-core)/)',
    ],
    setupFiles: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
  };
  