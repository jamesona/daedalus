import { Renderable } from '../renderable'
import { config } from '../../config'
import { Dungeon } from './dungeon'

type CTX = CanvasRenderingContext2D

export class MainMenu extends Renderable {
	private defaultFontSize = config.fontScale
	private titleFontSize = this.defaultFontSize * 3
	private activeItem: number | undefined
	private hasActivatedSinceMouseDown: boolean | undefined
	private hasActivatedSinceKeyDown: boolean | undefined
	private items = [
		{
			text: 'New Game',
			onSelect: () => {
				this.setActiveScene(
					new Dungeon(
						() => this.state,
						newState => {
							this.state = { ...newState }
						},
						(scene: Renderable) => this.setActiveScene(scene)
					)
				)
			}
		},
		{
			text: 'Continue Game',
			onSelect: () => {},
			disabled: true
		},
		{
			text: 'Import Save',
			onSelect: () => {}
		},
		{
			text: 'Export Save',
			onSelect: () => {}
		},
		{
			text: 'About',
			onSelect: () => {}
		}
	]

	public render(ctx: CTX) {
		const {
			width: clientWidth,
			height: clientHeight
		} = ctx.canvas.getBoundingClientRect()
		const { width: titleWidth, height: titleHeight } = this.getTitleDimensions(
			ctx
		)
		const margin = titleHeight / 2
		const itemHeight = titleHeight + margin
		const width = titleWidth + margin * 2
		const height = titleHeight + itemHeight * (this.items.length + 1)
		const x = (clientWidth - width) / 2
		const y = (clientHeight - height) / 2

		const { keys } = this.state

		if (keys && keys.length) {
			if (this.keyIsPressed('up')) {
				this.state.cursorPosition = undefined
				this.activeItem =
					this.activeItem !== undefined ? this.activeItem - 1 : 0
			} else if (this.keyIsPressed('down')) {
				this.state.cursorPosition = undefined
				this.activeItem =
					this.activeItem !== undefined ? this.activeItem + 1 : 0
			}

			if (this.isNotNullish(this.activeItem)) {
				if (this.activeItem < 0) {
					this.activeItem = 0
				}
				if (this.activeItem > this.items.length - 1) {
					this.activeItem = this.items.length - 1
				}

				const activeItem = this.items[this.activeItem]

				if (!activeItem.disabled && this.keyIsPressed('select')) {
					if (!this.hasActivatedSinceKeyDown) {
						this.hasActivatedSinceKeyDown = true
						activeItem.onSelect()
					}
				}
			}
		} else {
			this.hasActivatedSinceKeyDown = false
		}

		this.drawBackground(ctx, x, y, width, height)
		this.drawTitle(ctx, clientWidth / 2, y + titleHeight * 2)
		this.drawItems(ctx, x, y, width, titleHeight, itemHeight, margin)
	}

	private getTitleDimensions(ctx: CTX) {
		const { font } = ctx

		this.setFontSize(ctx, this.titleFontSize)
		const { width } = ctx.measureText(config.title)
		const fontSize = (ctx.font.match(/\d+/) || [0])[0]
		ctx.font = font

		return { height: Number(fontSize), width }
	}

	private drawBackground(
		ctx: CTX,
		x: number,
		y: number,
		width: number,
		height: number
	) {
		ctx.fillStyle = config.menuColor
		ctx.fillRect(x, y, width, height)

		if (this.cursorInArea(x, y, x + width, y + height)) {
			this.activeItem = undefined
		}
	}

	private drawTitle(ctx: CTX, x: number, y: number) {
		this.fillText({
			ctx,
			x,
			y,
			text: config.title,
			size: this.titleFontSize,
			color: config.menuTextColor,
			align: 'center',
			baseline: 'bottom'
		})
	}

	private drawItems(
		ctx: CTX,
		x: number,
		y: number,
		width: number,
		titleHeight: number,
		itemHeight: number,
		margin: number
	) {
		const firstItemTopEdge = y + titleHeight * 2.5

		this.items.forEach((menuItem, i) => {
			const thisItemTopOffset = i * itemHeight

			this.drawMenuItem(
				ctx,
				menuItem.text,
				x,
				firstItemTopEdge + thisItemTopOffset,
				width,
				titleHeight,
				i,
				margin
			)
		})
	}

	private drawMenuItem(
		ctx: CTX,
		text: string,
		x: number,
		y: number,
		width: number,
		height: number,
		index: number,
		margin: number = 0
	) {
		const isDisabled = this.items[index].disabled

		if (
			!isDisabled &&
			this.cursorInArea(x + margin, y, x + width - margin, y + height)
		) {
			this.activeItem = index

			if (this.state.mouseDown) {
				if (!this.hasActivatedSinceMouseDown) {
					this.hasActivatedSinceMouseDown = true
					this.items[index].onSelect()
				}
			} else {
				this.hasActivatedSinceMouseDown = false
			}
		}

		const isActiveItem = this.activeItem === index

		const textColor = isActiveItem
			? config.menuTextHoverColor
			: config.menuTextColor

		this.drawMenuItemBackground(
			ctx,
			x,
			y,
			width,
			height,
			margin,
			isDisabled ? config.menuItemDisabledColor : config.menuItemColor
		)
		if (!isDisabled && isActiveItem) {
			this.drawMenuItemBackground(
				ctx,
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
			ctx,
			x,
			y,
			width,
			height,
			margin,
			isDisabled ? config.menuTextDisabledColor : textColor,
			text
		)
	}

	private drawMenuItemBackground(
		ctx: CTX,
		x: number,
		y: number,
		width: number,
		height: number,
		margin: number,
		color: string,
		alpha: number = 1
	) {
		this.fillRect({
			ctx,
			x: x + margin,
			y: y,
			width: width - margin * 2,
			height,
			color,
			alpha
		})
	}

	private drawMenuItemText(
		ctx: CTX,
		x: number,
		y: number,
		width: number,
		height: number,
		margin: number,
		color: string,
		text: string
	) {
		this.fillText({
			ctx,
			color,
			text,
			x: x + (width + margin) / 2,
			y: y + height / 2,
			size: this.defaultFontSize,
			baseline: 'middle',
			align: 'center'
		})
	}
}
