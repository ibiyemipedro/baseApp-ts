module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
    },
    rules: {
        '@typescript-eslint/no-unused-vars': [
            2,
            { args: 'after-used', argsIgnorePattern: '_' },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'prefer-const': 'error',
        'no-var': 'error',
    },
};
