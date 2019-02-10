module.exports = ({ file, options, env }) => ({
	syntax: 'postcss-scss',
	sourceMap: true,
	plugins: {
		'postcss-import': {},
		'postcss-preset-env': {
			importFrom: './src/vars.css',
			preserve: false
		},
		'postcss-short': {},
		'postcss-color-function': {},
		'postcss-focus': {},
		'postcss-mixins': {},
		'postcss-nested': {},
		'postcss-flexbugs-fixes': {},
		'css-mqpacker': {},
		'postcss-discard-comments': {}
	}
})