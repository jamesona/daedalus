import './css/index.scss'
import * as FontFaceObserver from 'fontfaceobserver'
import { config } from './config'
import { Game } from './game/game'

new FontFaceObserver(config.fontName)
	.load()
	.then(() => new Game(document.body, 'Press Start 2P'))
