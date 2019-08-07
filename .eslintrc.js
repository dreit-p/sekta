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
		'no-console': ['warn', { allow: ['warn', 'error', 'info'] } ],
		'no-debugger': 'error',
		'no-irregular-whitespace': ['error', { 'skipTemplates': true, 'skipStrings': true }],
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
