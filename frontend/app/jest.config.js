module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  globals: {},
  testEnvironment: 'jsdom',
  testMatch: [
    "<rootDir>/src/tests/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\js$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node']
}