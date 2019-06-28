module.exports = {
	root: true,
	env: {
		node: true
	},
	'extends': [
		'plugin:vue/strongly-recommended',
		'eslint:recommended'
	],
	rules: {
		'vue/html-indent': 'off',
		indent: ['error', 'tab'],
		'no-console': ['error', { allow: ['warn', 'error'] } ],
		'no-debugger': 'error',
		'vue/no-confusing-v-for-v-if': 'warning',
		"vue/max-attributes-per-line": [4,
			{
				"singleline": 4,
				"multiline": {
					"max": 1,
					"allowFirstLine": true
				}
			}
		],
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
}
