module.exports = () => ({
	syntax: 'postcss-scss',
	sourceMap: true,
	plugins: {
		'postcss-discard-comments': {},
		'postcss-short': {},
		'postcss-import': {},
		'postcss-preset-env': {
			importFrom: ['./src/assets/vars.css'],
			preserve: false
		},
		'postcss-color-function': {},
		'postcss-focus': {},
		'postcss-mixins': {},
		'postcss-nested': {},
		'postcss-flexbugs-fixes': {},
		'css-mqpacker': {},
	}
})
