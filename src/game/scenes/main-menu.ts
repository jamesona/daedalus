import { Renderable } from '../renderable'
import { config } from '../../config'

type CTX = CanvasRenderingContext2D

export class MainMenu extends Renderable {
	private defaultFontSize = config.fontScale * 100
	private titleFontSize = this.defaultFontSize * 3
	private items = [
		'New Game',
		'Continue Game',
		'Import Save',
		'Export Save',
		'About'
	]
	private activeItem: number | undefined

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
				this.activeItem =
					this.activeItem !== undefined ? this.activeItem - 1 : 0
			} else if (this.keyIsPressed('down')) {
				this.activeItem =
					this.activeItem !== undefined ? this.activeItem + 1 : 0
			}

			if (this.activeItem && this.activeItem < 0) this.activeItem = 0
			if (this.activeItem && this.activeItem > this.items.length - 1)
				this.activeItem = this.items.length - 1
		}

		this.drawBackground(ctx, x, y, width, height)
		this.drawTitle(ctx, clientWidth / 2, y + titleHeight * 2)
		this.drawItems(ctx, x, y, width, titleHeight, itemHeight, margin)
	}

	private getTitleDimensions(ctx: CTX) {
		this.setFontSize(ctx, this.titleFontSize)

		const { width } = ctx.measureText(config.title)
		const fontSize = (ctx.font.match(/\d+/) || [0])[0]

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
			// this.activeItem = undefined
		}
	}

	private drawTitle(ctx: CTX, x: number, y: number) {
		this.setFontSize(ctx, this.titleFontSize)

		ctx.fillStyle = config.menuTextColor
		ctx.textAlign = 'center'
		ctx.textBaseline = 'bottom'
		ctx.fillText(config.title, x, y)
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
				menuItem,
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
		this.setFontSize(ctx, this.defaultFontSize)

		if (this.cursorInArea(x + margin, y, x + width - margin, y + height)) {
			this.activeItem = index
		}

		const isActiveItem = this.activeItem === index

		const bgColor = isActiveItem
			? config.menuItemHoverColor
			: config.menuItemColor

		const textColor = isActiveItem
			? config.menuTextHoverColor
			: config.menuTextColor

		this.drawMenuItemBackground(ctx, x, y, width, height, margin, bgColor)
		this.drawMenuItemText(ctx, x, y, width, height, margin, textColor, text)
	}

	private drawMenuItemBackground(
		ctx: CTX,
		x: number,
		y: number,
		width: number,
		height: number,
		margin: number,
		color: string
	) {
		ctx.fillStyle = color
		ctx.fillRect(x + margin, y, width - margin * 2, height)
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
		ctx.fillStyle = color
		ctx.textBaseline = 'middle'
		ctx.fillText(text, x + (width + margin) / 2, y + height / 2)
	}
}
