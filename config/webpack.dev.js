const webpack = require('webpack')
const {
	merge
} = require('webpack-merge')

const common = require('./webpack.common.js')
const paths = require('./paths')

module.exports = merge(common, {
	// Установите режим разработки или производства
	mode: 'development',

	// Управляйте генерацией исходных карт
	devtool: 'inline-source-map',

	// Разверните сервер для быстрой разработки
	devServer: {
		historyApiFallback: true,
		contentBase: paths.build,
		open: true,
		compress: true,
		hot: true,
		port: 8080,
		watchOptions: {
			poll: true
		}
	},

	module: {
		rules: [
			// Стили: вставьте CSS в голову с исходными картами
			{
				test: /\.(scss|css)$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							// importLoaders: 1,
							// modules: true
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
							},
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					},
				],
			},
		],
	},

	plugins: [
		// Обновлять только то, что изменилось при горячей перезагрузке
		new webpack.HotModuleReplacementPlugin(),
	],
})