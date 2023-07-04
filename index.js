const readPkg = require('read-pkg-up');
const packageResult = readPkg.sync({ normalize: false });
const path = require('path');

const hasPackage = Boolean(packageResult);
const packageJson = hasPackage ? packageResult.packageJson : {};

const pkgPath = packageResult.path;

const pkgDependencies = {
	...packageJson.dependencies,
	...packageJson.devDependencies,
};

const config = {
	parser: '@typescript-eslint/parser',
	extends: [
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	parserOptions: {
		project: path.join(path.dirname(pkgPath), 'tsconfig.json'),
	},
	plugins: ['eslint-plugin-simple-import-sort', 'import'],
	rules: {
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
};

if (pkgDependencies['react']) {
	config.extends = [
		...config.extends,
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
	];

	config.rules = {
		...config.rules,
		// we use jsx-runtime automatic
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/no-unknown-property': ['error', { ignore: ['css'] }],
	};

	config.settings = {
		...config.settings,
		react: {
			version: 'detect',
		},
	}
}

module.exports = config;
