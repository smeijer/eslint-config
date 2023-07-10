const readPkg = require('read-pkg-up');
const packageResult = readPkg.sync({ normalize: false });
const path = require('path');
const prettier = require('@smeijer/prettier-config');

const pkgPath = packageResult.path;

module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	ignorePatterns: ["node_modules/**", "dist/**"],
	plugins: ['eslint-plugin-simple-import-sort', 'import'],
	rules: {
		'prettier/prettier': ['error', prettier],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'prefer-const': ['error', { destructuring: 'all' }],
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'import/newline-after-import': 'error',
		'import/first': 'error',
		'import/no-duplicates': 'error',
		curly: ['error', 'multi-line', 'consistent'],
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ ignoreRestSiblings: true, varsIgnorePattern: 'jsx|^_', argsIgnorePattern: '^_' },
		],
		'no-console': ['error', { allow: ['warn', 'error'] }],
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			extends: [
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
			],
			parserOptions: {
				project: path.join(path.dirname(pkgPath), 'tsconfig.json'),
			},
		},
		{
			files: ['*.tsx', '*.jsx'],
			extends: [
				'plugin:react/recommended',
				'plugin:react-hooks/recommended',
			],
			rules: {
				// we use jsx-runtime automatic
				'react/jsx-uses-react': 'off',
				'react/react-in-jsx-scope': 'off',
				'react/no-unknown-property': ['error', {ignore: ['css']}],
			},
			settings: {
				react: {
					version: 'detect',
				}
			}
		}
	],
};
