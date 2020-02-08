import { Renderable } from '../../renderable'
import { config } from '../../../config'
import { BoundingBox } from '../../../lib/types'
import { Nullish } from '../../../lib/nullish'
import { selectKeysDown } from '../../input-handler/selectors'
import { Dungeon } from '../dungeon'
import { updateDimensions } from './store/actions'

let hasActivatedSinceKeyDown: boolean

interface MenuItem {
	text: string
	onSelect(): void
	hitbox: BoundingBox | undefined
	disabled?: true
}

export class MainMenu extends Renderable {
	public defaultFontSize = config.fontScale
	public titleFontSize = this.defaultFontSize * 3
	public activeItem: number | undefined
	public items: MenuItem[] | undefined
	public hasActivatedSinceMouseDown: boolean = false

	public onInit() {
		this.items = [
			{
				text: 'New Game',
				onSelect: () => {
					this.setActiveScene(
						new Dungeon((scene: Renderable) => this.setActiveScene(scene))
					)
				},
				hitbox: undefined
			},
			{
				text: 'Continue Game',
				onSelect: () => {},
				hitbox: undefined,
				disabled: true
			},
			{
				text: 'Import Save',
				onSelect: () => {},
				hitbox: undefined
			},
			{
				text: 'Export Save',
				onSelect: () => {},
				hitbox: undefined
			},
			{
				text: 'About',
				onSelect: () => {},
				hitbox: undefined
			}
		]

		const {
			width: clientWidth,
			height: clientHeight
		} = this.canvas.getBoundingClientRect()

		const { width: titleWidth, height: titleHeight } = this.getTitleDimensions()

		const margin = titleHeight / 2
		const itemHeight = titleHeight + margin
		const width = titleWidth + margin * 2
		const height = titleHeight + itemHeight * (this.items.length + 1)
		const x = (clientWidth - width) / 2
		const y = (clientHeight - height) / 2

		this.store.dispatch(
			updateDimensions({
				dimensions: {
					body: {
						width,
						height,
						margin,
						position: [x, y]
					},
					title: {
						height: titleHeight,
						width: titleWidth,
						position: [clientWidth / 2, y + titleHeight * 2]
					}
				}
			})
		)
	}

	public onChanges() {
		if (this.items && this.state) {
			const keysDown = selectKeysDown(this.state)
			if (keysDown && keysDown.length) {
				if (this.keyIsPressed('up')) {
					this.activeItem =
						this.activeItem !== undefined ? this.activeItem - 1 : 0
				} else if (this.keyIsPressed('down')) {
					this.activeItem =
						this.activeItem !== undefined ? this.activeItem + 1 : 0
				}
				if (Nullish.isNotNullish(this.activeItem)) {
					if (this.activeItem < 0) {
						this.activeItem = 0
					}
					if (this.activeItem > this.items.length - 1) {
						this.activeItem = this.items.length - 1
					}
					const activeItem = this.items[this.activeItem]
					if (!activeItem.disabled && this.keyIsPressed('select')) {
						if (!hasActivatedSinceKeyDown) {
							hasActivatedSinceKeyDown = true
							activeItem.onSelect()
						}
					}
				}
			} else {
				hasActivatedSinceKeyDown = false
			}
		}
	}

	public render() {
		// this.printState(
		// 	100,
		// 	100,
		// 	100,
		// 	state => state.scenes['main-menu'].dimensions.body
		// )

		const { dimensions } = this.state.scenes['main-menu']
		const { height, width, position, margin } = dimensions.body
		const [x, y] = position
		const [titleX, titleY] = dimensions.title.position
		const { height: titleHeight } = dimensions.title

		this.drawBackground(x, y, width, height)
		this.drawTitle(titleX, titleY)
		this.drawItems(
			x,
			y + titleHeight * 2.5,
			width,
			titleHeight,
			titleHeight + margin,
			margin
		)
	}

	public getTitleDimensions() {
		const { font } = this.ctx

		this.setFontSize(this.titleFontSize)
		const { width } = this.ctx.measureText(config.title)
		const fontSize = (this.ctx.font.match(/\d+/) || [0])[0]
		this.ctx.font = font

		return { height: Number(fontSize), width }
	}

	public drawBackground(x: number, y: number, width: number, height: number) {
		const color = config.menuColor
		this.fillRect({ x, y, width, height, color })

		if (this.cursorInArea(x, y, x + width, y + height)) {
			this.activeItem = undefined
		}
	}

	public drawTitle(x: number, y: number) {
		this.fillText({
			x,
			y,
			text: config.title,
			size: this.titleFontSize,
			color: config.menuTextColor,
			align: 'center',
			baseline: 'bottom',
			name: config.fontName
		})
	}

	public drawItems(
		x: number,
		y: number,
		width: number,
		titleHeight: number,
		itemHeight: number,
		margin: number
	) {
		this.items?.forEach((menuItem, i) => {
			const thisItemTopOffset = i * itemHeight

			this.drawMenuItem(
				menuItem.text,
				x,
				y + thisItemTopOffset,
				width,
				titleHeight,
				i,
				margin
			)
		})
	}

	public drawMenuItem(
		text: string,
		x: number,
		y: number,
		width: number,
		height: number,
		index: number,
		margin: number = 0
	) {
		if (!this.items) return

		const hitbox: [number, number, number, number] = [
			x + margin,
			y,
			x + width - margin,
			y + height
		]
		const thisItem = this.items[index]
		if (
			!thisItem.hitbox ||
			JSON.stringify(thisItem.hitbox) === JSON.stringify(hitbox)
		) {
			this.items[index].hitbox = hitbox
		}

		const checkForCursor = () => this.cursorInArea(...hitbox)

		const isDisabled = this.items[index].disabled

		if (!isDisabled && checkForCursor()) {
			this.activeItem = index

			if (this.state.input.mouseDown) {
				if (!this.hasActivatedSinceMouseDown) {
					this.hasActivatedSinceMouseDown = true
					this.items[index].onSelect()
				}
			} else {
				// this.hasActivatedSinceMouseDown = false
			}
		}

		const isActiveItem = this.activeItem === index

		const textColor = isActiveItem
			? config.menuTextHoverColor
			: config.menuTextColor

		this.drawMenuItemBackground(
			x,
			y,
			width,
			height,
			margin,
			isDisabled ? config.menuItemDisabledColor : config.menuItemColor
		)
		if (!isDisabled && isActiveItem) {
			this.drawMenuItemBackground(
				x,
				y,
				width,
				height,
				margin,
				config.selectedItemColor,
				0.4
			)
		}

		this.drawMenuItemText(
			x,
			y,
			width,
			height,
			margin,
			isDisabled ? config.menuTextDisabledColor : textColor,
			text
		)
	}

	public drawMenuItemBackground(
		x: number,
		y: number,
		width: number,
		height: number,
		margin: number,
		color: string,
		alpha: number = 1
	) {
		this.fillRect({
			x: x + margin,
			y: y,
			width: width - margin * 2,
			height,
			color,
			alpha
		})
	}

	public drawMenuItemText(
		x: number,
		y: number,
		width: number,
		height: number,
		margin: number,
		color: string,
		text: string
	) {
		this.fillText({
			color,
			text,
			x: x + (width + margin) / 2,
			y: y + height / 2,
			size: this.defaultFontSize,
			baseline: 'middle',
			align: 'center',
			name: config.fontName
		})
	}
}
