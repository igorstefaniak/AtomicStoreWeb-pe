export default {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'mjs', 'cjs', 'ts', 'tsx'],
    setupFilesAfterEnv: ['./src/setupTests.js'], // Point to your setup file
    reporters: [
      'default',
      [
        'jest-html-reporters',
        {
          publicPath: './html-report',
          filename: 'report.html',
          expand: true,
        },
      ],
    ],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/__mocks__/fileMock.js', // Mock static assets
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
  };
  