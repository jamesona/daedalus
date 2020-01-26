const path = require('path')

const commonConfig = {
	node: {
		__dirname: false
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				enforce: 'pre',
				loader: 'source-map-loader',
				options: {
					typeCheck: true,
					emitErrors: true
				}
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			}
		]
	},
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".json"]
	},
	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	externals: {},
	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",
}

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
	Object.assign(
		{
			target: 'electron-main',
			entry: { main: './src/main.ts' }
		},
		commonConfig),
	Object.assign(
		{
			target: 'electron-renderer',
			entry: { gui: './src/gui.ts' },
			plugins: [new HtmlWebpackPlugin()]
		},
		commonConfig)
]
