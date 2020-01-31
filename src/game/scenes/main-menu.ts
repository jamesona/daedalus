import { Renderable } from '../renderable'
import { config } from '../../config'

export class MainMenu extends Renderable {
	private fontMultiplier = 10
	private defaultFontSize = config.fontScale * 100
	private titleFontSize = this.defaultFontSize * 3
	private boxColor = '#666'
	private itemColor = '#555'
	private textColor = '#ccc'
	private itemHighlightColor = '#644'
	private items = [
		'New Game',
		'Continue Game',
		'Import Save',
		'Export Save',
		'About'
	]

	public cursorInArea(x1: number, y1: number, x2: number, y2: number) {
		const [mx, my] = this.state.cursorPosition
		const isInArea = mx >= x1 && mx <= x2 && my >= y1 && my <= y2
		return isInArea
	}

	public setFontSize(ctx: CanvasRenderingContext2D, size: number) {
		ctx.font = `${size * this.fontMultiplier}% "${config.fontName}"`
	}

	public render(ctx: CanvasRenderingContext2D) {
		const { width, height } = ctx.canvas.getBoundingClientRect()

		// draw box
		const { width: titleWidth, height: titleHeight } = this.getTitleDimensions(
			ctx
		)

		const margin = titleHeight / 2
		const itemHeight = titleHeight + margin
		const boxWidth = titleWidth + margin
		const boxHeight = titleHeight + itemHeight * (this.items.length + 1)
		ctx.fillStyle = this.boxColor
		const boxLeftEdge = (width - boxWidth) / 2
		const boxTopEdge = (height - boxHeight) / 2

		ctx.fillRect(boxLeftEdge, boxTopEdge, boxWidth, boxHeight)

		// print title
		this.drawTitle(ctx, width / 2, boxTopEdge + titleHeight * 2)

		// print menu items
		const firstItemTopEdge = boxTopEdge + titleHeight * 2.5
		this.items.forEach((menuItem, i) => {
			this.drawMenuItem(
				ctx,
				menuItem,
				boxLeftEdge,
				firstItemTopEdge + i * itemHeight,
				boxWidth,
				titleHeight,
				margin
			)
		})
	}

	private getTitleDimensions(ctx: CanvasRenderingContext2D) {
		this.setFontSize(ctx, this.titleFontSize)
		const { width } = ctx.measureText(config.title)
		const fontSize = (ctx.font.match(/\d+/) || [0])[0]
		return { height: Number(fontSize), width }
	}

	private drawTitle(ctx: CanvasRenderingContext2D, x: number, y: number) {
		this.setFontSize(ctx, this.titleFontSize)
		ctx.fillStyle = this.textColor
		ctx.textAlign = 'center'
		ctx.textBaseline = 'bottom'
		ctx.fillText(config.title, x, y)
	}

	private drawMenuItem(
		ctx: CanvasRenderingContext2D,
		text: string,
		x: number,
		y: number,
		width: number,
		height: number,
		margin: number = 0
	) {
		this.setFontSize(ctx, this.defaultFontSize)
		const cursorOverItem = this.cursorInArea(
			x + margin,
			y,
			x + width - margin,
			y + height
		)
		ctx.fillStyle = cursorOverItem ? this.itemHighlightColor : this.itemColor

		ctx.fillRect(x + margin, y, width - margin * 2, height)
		ctx.fillStyle = cursorOverItem ? 'white' : this.textColor
		ctx.textBaseline = 'middle'
		ctx.fillText(text, x + (width + margin) / 2, y + height / 2)
	}
}
