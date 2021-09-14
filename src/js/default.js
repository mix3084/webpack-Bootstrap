class DefaultClass {
	constructor(name) {
		this.name = name
	}

	sayHi() {
		const str = `Hello, ${this.name}!`
		// eslint-disable-next-line no-console
		console.log(str)
	}
}

export default DefaultClass
