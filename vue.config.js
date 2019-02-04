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
	}
}