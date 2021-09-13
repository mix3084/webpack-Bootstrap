const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')

const paths = require('./paths')
const common = require('./webpack.common.js')

module.exports = merge(common, {
	mode: 'production',
	devtool: false,
	output: {
		path: paths.build,
		publicPath: '/',
		filename: 'assets/js/[name].js',
	},
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							// importLoaders: 2,
							sourceMap: false,
							// modules: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							// `postcssOptions` требуется для postcss 8.x;
							// если Вы используете postcss 7.x пропустите ключ
							postcssOptions: {
								// плагины postcss, можно экспортировать в postcss.config.js
								plugins: function () {
									return [
										require('autoprefixer')
									];
								}
							}
						}
					},
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		// Извлекает CSS в отдельные файлы
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name].css',
			chunkFilename: '[id].css',
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin(), '...'],
		runtimeChunk: {
			name: 'runtime',
		},
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
})
