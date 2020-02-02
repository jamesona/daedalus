import { map } from 'rxjs/operators'
import { Store, createAction, props } from './store'
import { ofType } from './store/ofType'

export class InputHandler {
	public constructor(private store: Store<any>) {
		document.addEventListener('mousemove', (event: MouseEvent) =>
			this.store.dispatch(mouseMove({ event }))
		)
		document.addEventListener('mousedown', (event: MouseEvent) =>
			this.store.dispatch(mouseDown({ event }))
		)
		document.addEventListener('mouseup', (event: MouseEvent) =>
			this.store.dispatch(mouseUp({ event }))
		)
		document.addEventListener('mouseover', (event: MouseEvent) =>
			this.store.dispatch(mouseOver({ event }))
		)
		document.addEventListener('mouseout', (event: MouseEvent) =>
			this.store.dispatch(mouseOut({ event }))
		)
		document.addEventListener('keydown', (event: KeyboardEvent) =>
			this.store.dispatch(keyDown({ event }))
		)
		document.addEventListener('keyup', (event: KeyboardEvent) =>
			this.store.dispatch(keyUp({ event }))
		)
		document.addEventListener('keypress', (event: KeyboardEvent) =>
			this.store.dispatch(keyPress({ event }))
		)
	}

	public keyboardEvents$() {
		return this.store.actions$.pipe(ofType(keyDown, keyUp, keyPress))
	}

	public mouseEvents$() {
		return this.store.actions$.pipe(
			ofType(mouseMove, mouseDown, mouseUp, mouseOver, mouseOut)
		)
	}

	public cursorPosition$() {
		return this.mouseEvents$().pipe(
			ofType(mouseMove),
			map(({ event }) => event),
			map(({ clientX, clientY }) => [clientX, clientY])
		)
	}
}

const mouseMove = createAction(
	'[User Input] mousemove',
	props<{ event: MouseEvent }>()
)

const mouseDown = createAction(
	'[User Input] mousedown',
	props<{ event: MouseEvent }>()
)

const mouseUp = createAction(
	'[User Input] mouseup',
	props<{ event: MouseEvent }>()
)

const mouseOver = createAction(
	'[User Input] mouseover',
	props<{ event: MouseEvent }>()
)

const mouseOut = createAction(
	'[User Input] mouseout',
	props<{ event: MouseEvent }>()
)

const keyDown = createAction(
	'[User Input] keydown',
	props<{ event: KeyboardEvent }>()
)

const keyUp = createAction(
	'[User Input] keyup',
	props<{ event: KeyboardEvent }>()
)

const keyPress = createAction(
	'[User Input] keypress',
	props<{ event: KeyboardEvent }>()
)
