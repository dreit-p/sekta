module.exports = {
	configureWebpack: {
		devServer: {
			port: 4444,
			host: '0.0.0.0',
			overlay: true,
			compress: true,
			public: "home.dreit.ru", //for autorefresh
			allowedHosts: [".dreit.ru"]
		}
	},

	css: {
		sourceMap: true,
	},

	publicPath: undefined,
	outputDir: undefined,
	assetsDir: undefined,
	runtimeCompiler: true,
	productionSourceMap: false,
	parallel: undefined,

	chainWebpack: config => {
		config.module
			.rule('svg-sprite')
			.use('svgo-loader')
			.loader('svgo-loader')
	},
	pluginOptions: {
		svgSprite: {
			/*
			 * The directory containing your SVG files.
			 */
			dir: 'src/assets/images/svg',
			/*
			 * The reqex that will be used for the Webpack rule.
			 */
			test: /\.(svg)(\?.*)?$/,
			/*
			 * @see https://github.com/kisenka/svg-sprite-loader#configuration
			 */
			loaderOptions: {
				extract: true,
				spriteFilename: 'img/icons.[hash:8].svg' // or 'img/icons.svg' if filenameHashing == false
			},
			/*
			 * @see https://github.com/kisenka/svg-sprite-loader#configuration
			 */
			pluginOptions: {
				plainSprite: true
			}
		}
	}
}
