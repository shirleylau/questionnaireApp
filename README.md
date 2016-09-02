create-react-app questionnaireApp
npm install --save-dev babel-cli babel-preset-react
npm install --save-dev babel-preset-react
npm install --save-dev jest-cli
npm install --save-dev babel-jest babel-polyfill
npm install --save-dev jest
npm install --save-dev jest babel-jest babel-preset-es2015 babel-preset-react react-test-renderer
npm install babel-plugin-transform-class-properties

.babelrc

in package.json
"jest": {
  "moduleNameMapper": {
    "^.+\\.(css|less)$": "<rootDir>/test/styleMock.js",
    "^.+\\.(gif|ttf|eot|svg)$": "<rootDir>/test/fileMock.js"
  }
}

<!-- ,
"plugins": [
  "transform-class-properties"
] -->
