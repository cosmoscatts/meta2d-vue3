import antfu from '@antfu/eslint-config';

export default antfu(
  {
    rules: {
      'style/semi': ['error', 'always'],
      'style/brace-style': 'off',
      'antfu/top-level-function': 'off',
      'ts/no-unsafe-function-type': 'off',
      'ts/no-use-before-define': 'off',
      'no-undef': 'off',
      'no-use-before-define': 'off',
      'node/prefer-global/process': 'off',
      'vue/custom-event-name-casing': 'off',
      'symbol-description': 'off',
      'no-cond-assign': 'off',
      'unicorn/prefer-dom-node-text-content': 'off',
      'vue/no-reserved-component-names': 'off',
      'no-throw-literal': 'off',
      'prefer-promise-reject-errors': 'off',
    },
  },
);
