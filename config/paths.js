const path = require('path')

module.exports = {
	// Исходные файлы
	src: path.resolve(__dirname, '../src'),

	// Файлы производственной сборки
	build: path.resolve(__dirname, '../dist'),

	// Статические файлы, которые копируются в папку сборки
	public: path.resolve(__dirname, '../public'),
}
