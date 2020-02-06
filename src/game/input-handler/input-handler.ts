import { map } from 'rxjs/operators'

import { Store } from '../../lib/store'
import { ofType } from '../../lib/store/ofType'

import * as fromActions from './actions'
import { userInputReducer, InputState } from './reducer'
import { Coordinates } from '../../lib/types'

export class InputHandler {
	public constructor(private store: Store<{ input: InputState }>) {
		this.store.addReducer('input', userInputReducer)

		document.addEventListener('mousemove', (event: MouseEvent) => {
			this.store.dispatch(fromActions.mouseMove({ event }))
		})
		document.addEventListener('mousedown', (event: MouseEvent) =>
			this.store.dispatch(fromActions.mouseDown({ event }))
		)
		document.addEventListener('mouseup', (event: MouseEvent) =>
			this.store.dispatch(fromActions.mouseUp({ event }))
		)
		document.addEventListener('mouseover', (event: MouseEvent) =>
			this.store.dispatch(fromActions.mouseOver({ event }))
		)
		document.addEventListener('mouseout', (event: MouseEvent) =>
			this.store.dispatch(fromActions.mouseOut({ event }))
		)
		document.addEventListener('keydown', (event: KeyboardEvent) =>
			this.store.dispatch(fromActions.keyDown({ event }))
		)
		document.addEventListener('keyup', (event: KeyboardEvent) =>
			this.store.dispatch(fromActions.keyUp({ event }))
		)
		document.addEventListener('keypress', (event: KeyboardEvent) =>
			this.store.dispatch(fromActions.keyPress({ event }))
		)
	}

	public keyboardEvents$() {
		return this.store.actions$.pipe(
			ofType(fromActions.keyDown, fromActions.keyUp, fromActions.keyPress)
		)
	}

	public mouseEvents$() {
		return this.store.actions$.pipe(
			ofType(
				fromActions.mouseMove,
				fromActions.mouseDown,
				fromActions.mouseUp,
				fromActions.mouseOver,
				fromActions.mouseOut
			)
		)
	}

	public cursorPosition$() {
		return this.mouseEvents$().pipe(
			ofType(fromActions.mouseMove),
			map(({ event }) => event),
			map(({ clientX, clientY }) => [clientX, clientY] as Coordinates)
		)
	}
}
