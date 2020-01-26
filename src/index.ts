import './css/index.scss'
import * as FontFaceObserver from 'fontfaceobserver'
import { Game } from './game/game'

new FontFaceObserver('Press Start 2P').load().then(() => new Game(document.body))
