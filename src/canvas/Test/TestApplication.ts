import { Canvas2DApplication } from '../Application/Canvas2DApplication'

export class TestApplication extends Canvas2DApplication {
  private _lineDashOffset: number = 0

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)

    this.addTimer(this.timerCallback.bind(this), 0.033)
  }

  public render(): void {
    if (this.context2D !== null) {
      this.context2D.clearRect(0, 0, this.context2D.canvas.width, this.context2D.canvas.height)
      this._drawRect(20, 20, 100, 100)
    }
  }

  public timerCallback(id: number, data: any): void {
    this._updateLineDashOffse()
    this._drawRect(10, 10, 100, 100)
  }

  private _drawRect(x: number, y: number, w: number, h: number) {
    if (this.context2D) {
      this.context2D.save()

      this.context2D.fillStyle = 'grey'
      this.context2D.strokeStyle = 'blue'
      this.context2D.lineWidth = 2
      // this.context2D.lineCap = 'square'
      // this.context2D.lineJoin = 'miter'
      // this.context2D.miterLimit = 0.1
      this.context2D.setLineDash([10, 5])
      this.context2D.lineDashOffset = this._lineDashOffset

      this.context2D.beginPath()

      this.context2D.moveTo(x, y)
      this.context2D.lineTo(x + w, y)
      this.context2D.lineTo(x + w, y + h)
      this.context2D.lineTo(x, y + h)

      this.context2D.closePath()

      this.context2D.fill()

      this.context2D.stroke()

      this.context2D.restore()
    }
  }

  private _updateLineDashOffse(): void {
    this._lineDashOffset++
    if (this._lineDashOffset > 10000) {
      this._lineDashOffset = 0
    }
  }

  /**
   * 绘制圆
   */
  public fillCircle(): void {
    
  }
}
