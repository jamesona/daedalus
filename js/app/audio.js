'use strict'
module('app/element', (Element) => {
	class AudioController {
		constructor() {
			this.events = []
			this.menu = new Element('audio', {
				preload: 'auto',
				loop: true,
				autoplay: true,
				src: 'audio/underground.mp3'
			})
			this.ambience = new Element('audio', {
				preload: 'auto',
				loop: true,
				src: 'audio/dungeon_ambient.mp3'
			})
			this.main = new Element('audio', {
				preload: 'auto',
				loop: true,
				src: 'audio/jungle.mp3',
				maxvol: 0.8
			})
			console.log(this)
		}

		handleEvent(event) {
			switch(event.text) {
				case 'new game':
					fadeOut(this.menu, 500)
					fadeIn(this.ambience, 500)
					fadeIn(this.main, 5000, 500)
					break
			}
		}
	}
	let fadeOut = function(element, time, delay, step) {
		delay = delay ? delay : 0
		if (delay > 0)
			return setTimeout(() => {
				fadeOut(element, time)
			}, delay)
		time = time ? time : 1000
		step = step ? step : 1 / time
		if (step > element.volume)
			element.volume = 0
		else
			element.volume -= step
		if (element.volume > 0)
			setTimeout(() => {
				fadeOut(element, time, 0, step)
			}, 1)
		else
			element.pause()
	}
	let fadeIn = function(element, time, delay, step) {
		let max = element.maxvol || 1
		if (element.volume >= max) element.volume = 0
		if (element.paused) element.play()
		delay = delay ? delay : 0
		if (delay > 0)
			return setTimeout(() => {
				fadeIn(element, time)
			}, delay)
		time = time ? time : 1000
		step = step ? step : max / time
		if (step + element.volume > max)
			element.volume = max
		else
			element.volume += step
		if (element.volume < max)
			setTimeout(() => {
				fadeIn(element, time, 0, step)
			}, 1)
	}
	exports(AudioController)
})
