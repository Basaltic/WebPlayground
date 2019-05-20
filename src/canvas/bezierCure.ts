import { vec2, Math2D } from './math2D'
import { TestApplication } from './Test/TestApplication'

/**
 * 二次贝塞尔曲线
 */
export class QuadraticBezierCurve {
  // 起点
  protected _startAnchorPoint: vec2
  // 终点
  protected _endAnchorPoint: vec2
  // 控制曲率的点
  protected _controlPoint0: vec2

  // 是否要绘制连线，方块表示的锚点和原点表示的控制点
  protected _drawLine: boolean
  // 线条颜色
  protected _lineColor: string
  protected _lineWidth: number
  // 方块表示的锚点和原点表示的控制点的大小
  protected _radiusOrLen: number

  // 如下成员变量，用来插值点相关操作

  protected _drawSteps: number = 30
  protected _points: Array<vec2> = []
  // 是否显示所有插值点
  protected _showCurvePt: boolean = true
  // 标记变量，用来指明是否需要重新计算所有插值点
  protected _dirty: boolean = true

  public constructor(start: vec2, control: vec2, end: vec2) {
    this._startAnchorPoint = start
    this._controlPoint0 = control
    this._endAnchorPoint = end

    this._drawLine = true
    this._lineColor = 'black'
    this._lineWidth = 1
    this._radiusOrLen = 5
  }

  //
  protected getPosition(t: number): vec2 {
    return Math2D.getQuadraticBezierVector(this._startAnchorPoint, this._controlPoint0, this._endAnchorPoint, t)
  }

  private _calcDrawPoints(): void {
    if (this._dirty) {
      this._points = []
      this._points.push(this._startAnchorPoint)
      const s: number = 1 / this._drawSteps
      for (let i = 1; i < this._drawSteps - 1; i++) {
        const pt: vec2 = this.getPosition(s * i)
        this._points.push(pt)
      }
      this._points.push(this._endAnchorPoint)
      this._dirty = false
    }
  }

  public update(intervalSec: number): void {
    this._calcDrawPoints()
  }

  // useMyCurveDrawFunc：是否使用自己的方法绘制贝塞尔曲线
  public draw(app: TestApplication, useMyCurveDrawFunc: boolean = true) {
    if (app.context2D !== null) {
      app.context2D.save()

      // 设置线段的渲染属性
      app.context2D.lineWidth = this._lineWidth
      app.context2D.strokeStyle = this._lineColor

      // 二次贝塞尔曲线绘制代码
      app.context2D.beginPath()
      app.context2D.moveTo(this._startAnchorPoint.x, this._startAnchorPoint.y)
      if (useMyCurveDrawFunc === false) {
        app.context2D.quadraticCurveTo(this._controlPoint0.x, this._controlPoint0.y, this._endAnchorPoint.x, this._endAnchorPoint.y)
      } else {
        for (let i = 0; i < this._points.length; i++) {
          app.context2D.lineTo(this._points[i].x, this._points[i].y)
          app.context2D.stroke()
        }

        if (this._showCurvePt) {
          for (let i = 0; i < this._points.length; i++) {
            app.fillCircle(this._points[i].x, this._points[i].y, 2)
          }
        }
      }
      app.context2D.stroke()

      // 绘制辅助信息

      app.context2D.restore()
    }
  }
}

export class CubeBezierCurve extends QuadraticBezierCurve {
  protected _controlPoint1: vec2
  public constructor(start: vec2, control0: vec2, control1: vec2, end: vec2) {
    super(start, control0, end)
    this._controlPoint1 = control1
  }

  public draw(app: TestApplication) {
    if (app.context2D !== null) {
      app.context2D.save()

      // 设置线段的渲染属性
      app.context2D.lineWidth = this._lineWidth
      app.context2D.strokeStyle = this._lineColor

      // 二次贝塞尔曲线绘制代码
      app.context2D.beginPath()
      app.context2D.moveTo(this._startAnchorPoint.x, this._startAnchorPoint.y)
      app.context2D.bezierCurveTo(
        this._controlPoint0.x,
        this._controlPoint0.y,
        this._controlPoint1.x,
        this._controlPoint1.y,
        this._endAnchorPoint.x,
        this._endAnchorPoint.y,
      )
      app.context2D.stroke()

      // 绘制辅助信息

      app.context2D.restore()
    }
  }
}
