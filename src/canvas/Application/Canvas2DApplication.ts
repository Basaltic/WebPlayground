import { Application } from './Application'

export class Canvas2DApplication extends Application {
  public context2D: CanvasRenderingContext2D | null
  public constructor(canvas: HTMLCanvasElement, contextAttributes?: CanvasRenderingContext2DSettings) {
    super(canvas)
    this.context2D = canvas.getContext('2d', contextAttributes)
  }
}
