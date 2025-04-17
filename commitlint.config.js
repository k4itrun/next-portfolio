// @ts-check
/** @type {import('@commitlint/types').UserConfig} */
const commitlintConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'body-max-line-length': [2, 'always', 1000]
  },
};

export default {
  ...commitlintConfig,
};
