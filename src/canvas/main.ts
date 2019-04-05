export class Canvas2DUtil {
  public context: CanvasRenderingContext2D | null
  public constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d')
    this.context = context
  }

  public drawText(text: string): void {
    if (this.context) {
      this.context.save()
      this.context.textBaseline = 'middle'
      this.context.textAlign = 'center'

      // 计算canvas中心点
      let centerX: number = this.context.canvas.width * 0.5
      let centerY: number = this.context.canvas.height * 0.5

      // 红色填充
      this.context.fillStyle = 'red'
      this.context.strokeStyle = 'green'
      this.context.strokeText(text, centerX, centerY)
      this.context.restore()
    }
  }
}
