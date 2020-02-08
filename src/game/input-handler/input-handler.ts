import { map } from 'rxjs/operators'

import { config } from '../../config'
import { ofType } from '../../lib/store/ofType'
import { Coordinates } from '../../lib/types'
import { store } from '../store'

import * as fromActions from './actions'
import { userInputReducer } from './reducer'

let lastCursorUpdate: number

export class InputHandler {
	public static storeNodeName = 'input' as 'input'

	public static onInit() {
		store.addReducer(this.storeNodeName, userInputReducer)

		document.addEventListener('mousemove', (event: MouseEvent) => {
			const now = new Date().valueOf()
			if (!lastCursorUpdate || now - lastCursorUpdate > config.cursorPollRate) {
				store.dispatch(fromActions.mouseMove({ event }))
				lastCursorUpdate = now
			}
		})
		document.addEventListener('mousedown', (event: MouseEvent) =>
			store.dispatch(fromActions.mouseDown({ event }))
		)
		document.addEventListener('mouseup', (event: MouseEvent) =>
			store.dispatch(fromActions.mouseUp({ event }))
		)
		document.addEventListener('mouseover', (event: MouseEvent) =>
			store.dispatch(fromActions.mouseOver({ event }))
		)
		document.addEventListener('mouseout', (event: MouseEvent) =>
			store.dispatch(fromActions.mouseOut({ event }))
		)
		document.addEventListener('keydown', (event: KeyboardEvent) =>
			store.dispatch(fromActions.keyDown({ event }))
		)
		document.addEventListener('keyup', (event: KeyboardEvent) =>
			store.dispatch(fromActions.keyUp({ event }))
		)
		document.addEventListener('keypress', (event: KeyboardEvent) =>
			store.dispatch(fromActions.keyPress({ event }))
		)
	}

	public static keyboardEvents$() {
		return store.actions$.pipe(
			ofType(fromActions.keyDown, fromActions.keyUp, fromActions.keyPress)
		)
	}

	public static mouseEvents$() {
		return store.actions$.pipe(
			ofType(
				fromActions.mouseMove,
				fromActions.mouseDown,
				fromActions.mouseUp,
				fromActions.mouseOver,
				fromActions.mouseOut
			)
		)
	}

	public static cursorPosition$() {
		return this.mouseEvents$().pipe(
			ofType(fromActions.mouseMove),
			map(({ event }) => event),
			map(({ clientX, clientY }) => [clientX, clientY] as Coordinates)
		)
	}
}
