import { createAction, props } from '../../lib/store'

export const mouseMove = createAction(
	'[User Input] mousemove',
	props<{ event: MouseEvent }>()
)

export const mouseDown = createAction(
	'[User Input] mousedown',
	props<{ event: MouseEvent }>()
)

export const mouseUp = createAction(
	'[User Input] mouseup',
	props<{ event: MouseEvent }>()
)

export const mouseOver = createAction(
	'[User Input] mouseover',
	props<{ event: MouseEvent }>()
)

export const mouseOut = createAction(
	'[User Input] mouseout',
	props<{ event: MouseEvent }>()
)

export const keyDown = createAction(
	'[User Input] keydown',
	props<{ event: KeyboardEvent }>()
)

export const keyUp = createAction(
	'[User Input] keyup',
	props<{ event: KeyboardEvent }>()
)

export const keyPress = createAction(
	'[User Input] keypress',
	props<{ event: KeyboardEvent }>()
)
