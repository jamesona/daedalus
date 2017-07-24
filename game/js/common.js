'use strict'

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMidpoint(n) {
	return Math.floor(n / 2)
}

function tasker(data, tasks, callback) {
	(function(data) {
		let task = tasks.shift()
		if (tasks.length > 0) task(data, () => {tasker(data, tasks, callback)})
		else task(data, callback)
	})(data)
}
