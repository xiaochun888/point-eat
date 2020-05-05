// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  globals: {
    "$": true,
    "jQuery": true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    // 'generator-star-spacing': 'off',
    // allow debugger during development
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'curly': 0,
    'eol-last': ['error', 'always'],
    'indent': ['error', 2],
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    'max-len': ['error', { 'code': 400 }],
    // allow paren-less arrow functions
    //'arrow-parens': 0,
    // allow async-await
    //'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-tabs': 0,
    'no-caller': 'error',
    'no-console': 0,
    'no-new-wrappers': 'error',
    'no-redeclare': 'error',
    'no-eval': 'error',
    'no-trailing-spaces': 'error',
    'no-unused-expressions': 'error',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'eqeqeq': 0,
    'camelcase': 0,
    'vue/no-side-effects-in-computed-properties': 'off',
    'spaced-comment': 'off',
    'key-spacing': 'off',
    'space-before-function-paren': 'off',
    'keyword-spacing': 'off',
    'one-var': 'off',
    'no-self-compare': 'off',
    'no-undef': 'off',
    'no-mixed-operators': 'off'
  }
}
