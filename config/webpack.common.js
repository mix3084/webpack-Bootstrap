const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PrettierPlugin = require('prettier-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const paths = require('./paths')

module.exports = {
	// Где webpack хочет начать сборку пакета
	entry: [`${paths.src  }/index.js`],

	// Где webpack выводит активы и пакеты
	output: {
		path: paths.build,
		filename: '[name].js',
		publicPath: '/',
	},

	// Настройте процесс сборки веб-пакета
	plugins: [
		// eslint-disable-next-line max-len
		// Удаляет / очищает папки сборки и неиспользуемые ресурсы при восстановлении
		new CleanWebpackPlugin(),

		// Копирует файлы из целевой в целевую папку
		new CopyWebpackPlugin({
			patterns: [
				{
					from: paths.public,
					to: 'assets',
					globOptions: {
						ignore: ['*.DS_Store'],
					},
					noErrorOnMissing: true,
				},
			],
		}),

		// Создает HTML-файл из шаблона
		// Создает предупреждение об устаревании: https://github.com/jantimon/html-webpack-plugin/issues/1501
		new HtmlWebpackPlugin({
			title: 'webpack Boilerplate',
			favicon: `${paths.src  }/images/favicon.png`,
			template: `${paths.src  }/template.html`, // файл шаблона
			filename: 'index.html', // выходной файл
		}),

		// Конфигурация ESLint
		new ESLintPlugin({
			files: ['.', 'src', 'config'],
			formatter: 'table',
		}),

		// Более красивая конфигурация
		new PrettierPlugin(),
	],

	// Определите, как обрабатываются модули в рамках проекта
	module: {
		rules: [
			// eslint-disable-next-line max-len
			// JavaScript: Используйте Babel для преобразования файлов JavaScript
			{ test: /\.js$/, use: ['babel-loader'] },

			// Images: Скопируйте файлы изображений в папку сборки
			{ test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

			// Fonts and SVGs: Встроенные файлы
			{ test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
		],
	},

	resolve: {
		modules: [paths.src, 'node_modules'],
		extensions: ['.js', '.jsx', '.json'],
		alias: {
			'@': paths.src,
		},
	},
}
