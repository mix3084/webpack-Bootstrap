const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PrettierPlugin = require('prettier-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

// Нам нужен модуль Nodes fs для чтения содержимого каталога
const fs = require('fs')

const paths = require('./paths')

// Наша функция, которая генерирует наши html-плагины
function generateHtmlPlugins (templateDir) {
	// Читать файлы в каталоге шаблона
	const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
	return templateFiles.map(item => {
		// Разделить имена и расширения
		const parts = item.split('.')
		const name = parts[0]
		const extension = parts[1]
		// Создать новый HTMLWebpackPlugin с параметрами
		return new HtmlWebpackPlugin({
			// filename: `${name}.html`,
			// eslint-disable-next-line max-len
			template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
			minify: {
				collapseWhitespace: true,
				preserveLineBreaks: true,
			}
		})
	})
}
  
// Мы будем вызывать функцию так:
const htmlPlugins = generateHtmlPlugins('./../src/template/views')

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

		// Конфигурация ESLint
		new ESLintPlugin({
			files: ['.', 'src', 'config'],
			formatter: 'table',
		}),

		// Более красивая конфигурация
		new PrettierPlugin(),
	]
		// Присоединяем наш массив htmlPlugin до конца
		// нашего массива плагинов webpack.
		.concat(htmlPlugins),
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

			{
				test: /\.twig$/,
				use: [
				  'raw-loader',
				  'twig-html-loader'
				]
			  }
		]
	},

	resolve: {
		modules: [paths.src, 'node_modules'],
		extensions: ['.js', '.jsx', '.json'],
		alias: {
			'@': paths.src,
		},
	},
}
