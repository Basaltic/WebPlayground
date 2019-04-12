import { Canvas2DApplication } from '../Application/Canvas2DApplication'
import { Size, Rectangle, vec2, Math2D } from '../math2D'
import { CanvasMouseEvent } from '../Application/Application'

// 文字左右如何对齐
type TextAlign = 'start' | 'left' | 'center' | 'right' | 'end'
// 可以认为是设置文字的如何对齐的
type TextBaseline = 'alphabetic' | 'hanging' | 'top' | 'middle' | 'bottom'

type FontType = '10px sans-serif' | '15px sans-serif' | '20px sans-serif' | '25px sans-serif'

export class TestApplication extends Canvas2DApplication {
  private _lineDashOffset: number = 0

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)

    this.addTimer(this.timerCallback.bind(this), 0.033)
  }

  public render(): void {
    if (this.context2D !== null) {
      this.context2D.clearRect(0, 0, this.context2D.canvas.width, this.context2D.canvas.height)
      // this._drawRect(20, 20, 100, 100)
      // this.testCanvas2DTextLayout()
      this.strokeGrid()
      this.drawCanvasCoordCenter()
      this.drawCoordInfo(`[${this._mouseX}, ${this._mouseY}]`, this._mouseX, this._mouseY)

      // this.doTransform(10, true)

      // this.doTransform(20, false)

      this.testFillLocalRectWithTitle()
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
  public fillCircle(x: number, y: number, radius: number, fillStyle?: string | CanvasGradient | CanvasPattern): void {
    if (this.context2D !== null) {
      this.context2D.save()

      if (fillStyle) {
        this.context2D.fillStyle = fillStyle
      }
      this.context2D.beginPath()

      this.context2D.arc(x, y, radius, 0, Math.PI * 2)
      this.context2D.fill()

      this.context2D.restore()
    }
  }

  /**
   * 绘制圆
   */
  public strokeCircle(x: number, y: number, radius: number, fillStyle?: string | CanvasGradient | CanvasPattern): void {
    if (this.context2D !== null) {
      this.context2D.save()

      if (fillStyle) {
        // this.context2D.fillStyle = fillStyle
        this.context2D.strokeStyle = fillStyle
      }
      this.context2D.beginPath()

      this.context2D.arc(x, y, radius, 0, Math.PI * 2)
      this.context2D.stroke()

      this.context2D.restore()
    }
  }

  /**
   * 线段绘制
   */
  public strokeLine(x0: number, y0: number, x1: number, y1: number): void {
    if (this.context2D !== null) {
      this.context2D.beginPath()
      this.context2D.moveTo(x0, y0)
      this.context2D.lineTo(x1, y1)
      this.context2D.stroke()
    }
  }

  /**
   * 绘制坐标系
   */
  public strokeCoord(originX: number, originY: number, width: number, height: number): void {
    if (this.context2D !== null) {
      this.context2D.save()

      this.context2D.strokeStyle = 'red'
      this.strokeLine(originX, originY, originX + width, originY)

      this.context2D.strokeStyle = 'blue'
      this.strokeLine(originX, originY, originX, originY + height)

      this.context2D.restore()
    }
  }

  /**
   * 网格背景绘制
   */
  public strokeGrid(color: string = 'grey', interval: number = 10): void {
    if (this.context2D !== null) {
      this.context2D.save()

      this.context2D.strokeStyle = color
      this.context2D.lineWidth = 0.5

      // 从左至右每隔interval个像素画一条垂直线
      for (let i: number = interval + 0.5; i < this.canvas.width; i += interval) {
        this.strokeLine(i, 0, i, this.canvas.height)
      }

      // 从上至下每隔interval个像素画一条水平线
      for (let i: number = interval + 0.5; i < this.canvas.height; i += interval) {
        this.strokeLine(0, i, this.canvas.width, i)
      }
      this.context2D.restore()

      // 绘制网格背景坐标系的原点
      this.fillCircle(0, 0, 5, 'green')

      // 为网格背景绘制全局坐标系
      // Cavnas中全局坐标系的原点在左上角，并且x轴总是指向右侧，y轴指向下方
      // 全局坐标系永远不会变换，总是固定的
      this.strokeCoord(0, 0, this.canvas.width, this.canvas.height)
    }
  }

  /**
   * 绘制文本
   */
  public fillText(
    text: string,
    x: number,
    y: number,
    color: string = 'white',
    align: TextAlign = 'left',
    baseline: TextBaseline = 'top',
    font: FontType = '10px sans-serif',
  ) {
    if (this.context2D !== null) {
      this.context2D.save()

      this.context2D.textBaseline = baseline
      this.context2D.font = font
      this.context2D.fillStyle = color
      this.context2D.fillText(text, x, y)

      this.context2D.restore()
    }
  }

  /**
   * 测试 文本 布局
   */
  public testCanvas2DTextLayout(): void {
    // 要绘制的矩形离canvas的margin（外边距）分别是【20，20，20，20】
    let x: number = 20
    let y: number = 20
    let width: number = this.canvas.width - x * 2
    let height: number = this.canvas.height - y * 2
    let drawX: number = x
    let drawY: number = y
    // 原点半径为3像素
    let radius: number = 3
    // 1.画背景rect
    // this.fillRectWithTitle(x, y, width, height)

    // 每个位置，先绘制drawX和drawY的坐标原点，然后绘制文本

    // 2.左上
    this.fillText('left - top', drawX, drawY, 'white', 'left', 'top', '20px sans-serif')
    this.fillCircle(drawX, drawY, radius, 'black')

    // 3.右上
    drawX = x + width
    drawY = y
    this.fillText('right - top', drawX, drawY, 'white', 'right', 'top', '20px sans-serif')
    this.fillCircle(drawX, drawY, radius, 'black')

    // 4.右下
    drawX = x + width
    drawY = y + height
    this.fillText('right - bottom', drawX, drawY, 'white', 'right', 'bottom', '20px sans-serif')
    this.fillCircle(drawX, drawY, radius, 'black')

    // 5.左下
    drawX = x
    drawY = y + height
    this.fillText('left - bottom', drawX, drawY, 'white', 'left', 'bottom', '20px sans-serif')
    this.fillCircle(drawX, drawY, radius, 'black')

    // 6.中心
    drawX = x + width * 0.5
    drawY = y + height * 0.5
    this.fillText('center - middle', drawX, drawY, 'white', 'center', 'middle', '20px sans-serif')
    this.fillCircle(drawX, drawY, radius, 'black')

    // 7.中上
    drawX = x + width * 0.5
    drawY = y
    this.fillText('center - top', drawX, drawY, 'white', 'center', 'top', '20px sans-serif')
    this.fillCircle(drawX, drawY, radius, 'black')

    // 8.右中
    drawX = x + width
    drawY = y + height * 0.5
    this.fillText('right - middle', drawX, drawY, 'white', 'right', 'middle', '20px sans-serif')
    this.fillCircle(drawX, drawY, radius, 'black')

    // 9.中下
    drawX = x + width * 0.5
    drawY = y + height
    this.fillText('center - bottom', drawX, drawY, 'white', 'center', 'bottom', '20px sans-serif')
    this.fillCircle(drawX, drawY, radius, 'black')

    // 10.左中
    drawX = x
    drawY = y + height * 0.5
    this.fillText('left - middle', drawX, drawY, 'white', 'left', 'middle', '20px sans-serif')
    this.fillCircle(drawX, drawY, radius, 'black')
  }

  /**
   * 测试，计算字体大小
   * 以W的宽度乘以 一定的缩放比例，作为衡量的高度
   */
  public calcTextSize(text: string, char: string = 'W', scale: number = 0.5): Size {
    if (this.context2D !== null) {
      const width: number = this.context2D.measureText(text).width
      const w: number = this.context2D.measureText(char).width
      const height = w + w * scale

      return Size.create(width, height)
    }

    throw new Error('Context2D is null!')
  }

  /**
   * parentWidth / parentHeight 是父矩形的尺寸
   * 这些子矩形是相对于父矩形坐标系的表示
   * 这意味着父矩形的原点为[0,0],所以参数是父矩形的width和height, 而没有x和y坐标
   */
  public calcLocalTextRectangle(layout: ELayout, text: string, parentWidth: number, parentHeight: number): Rectangle {
    // 首先计算出要绘制文本的尺寸（width/height)
    const s: Size = this.calcTextSize(text)
    // 创建一个二维向量
    let o: vec2 = vec2.create()
    // 计算出当前文本子矩形左上角相对父矩形空间中的3个关键点（左上，中心，右下）坐标
    // 1.当前文本子矩形左上角相对于父矩形左上角坐标，由于局部表示，所以为[0,0]
    let left: number = 0
    let top: number = 0
    // 2.当前文本子矩形左上角相对于父矩形右下角坐标
    let right: number = parentWidth - s.width
    let bottom: number = parentHeight - s.height
    // 3.当前文本子矩形左上角相对于父矩形中心点坐标
    let center: number = right * 0.5
    let middle: number = bottom * 0.5
    // 根据ETextLayout的值来匹配这3个点的分量
    // 计算子矩形相对父矩形原点[0,0]偏移量
    switch (layout) {
      case ELayout.LEFT_TOP:
        o.x = left
        o.y = top
        break
      case ELayout.RIGHT_TOP:
        o.x = right
        o.y = top
        break
      case ELayout.RIGHT_BOTTOM:
        o.x = right
        o.y = bottom
        break
      case ELayout.LEFT_BOTTOM:
        o.x = left
        o.y = bottom
        break
      case ELayout.CENTER_MIDDLE:
        o.x = center
        o.y = middle
        break
      case ELayout.CENTER_TOP:
        o.x = center
        o.y = 0
        break
      case ELayout.RIGHT_MIDDLE:
        o.x = right
        o.y = middle
        break
      case ELayout.CENTER_BOTTOM:
        o.x = center
        o.y = bottom
        break
      case ELayout.LEFT_MIDDLE:
        o.x = left
        o.y = middle
        break
    }
    // 返回子矩形
    return new Rectangle(o, s)
  }

  public fillRectWithTitle(
    x: number,
    y: number,
    width: number,
    height: number,
    title: string = '',
    layout: ELayout = ELayout.CENTER_MIDDLE,
    color: string = 'grey',
    showCoord: boolean = true,
  ): void {
    if (this.context2D !== null) {
      this.context2D.save()

      // 1.绘制矩形
      this.context2D.fillStyle = color
      this.context2D.beginPath()
      this.context2D.rect(x, y, width, height)
      this.context2D.fill()

      // 如果有文字的话，先根据枚举值计算x，y坐标
      if (title.length !== 0) {
        // 2.绘制文字信息
        // 在矩形的左上角绘制出文字信息，使用的是10px大小的文字
        const rect: Rectangle = this.calcLocalTextRectangle(layout, title, width, height)
        // 绘制文本
        this.fillText(title, x + rect.origin.x, y + rect.origin.y, 'white', 'left', 'top', '10px sans-serif')
        // 绘制文本框
        // this.strokeRect(x + rect.origin.x, y + rect.origin.y, rect.size.width, rect.size.height, 'rgb(0,0,0,0.5)')
        this.fillCircle(x + rect.origin.x, y + rect.origin.y, 2)
      }
      // 3.绘制变换的局部坐标系
      if (showCoord) {
        this.strokeCoord(x, y, width + 20, height + 20)
        this.fillCircle(x, y, 3)
      }

      this.context2D.restore()
    }
  }

  // //// 坐标系转换相关测试代码
  public drawCanvasCoordCenter(): void {
    if (this.context2D === null) return
    // 计算出canvas的中心点
    const halfWidth: number = this.canvas.width * 0.5
    const halfHeight: number = this.canvas.height * 0.5
    this.context2D.save()
    this.context2D.lineWidth = 2
    this.context2D.strokeStyle = 'rgb(255, 0, 0, 0.5)'
    // 使用alpha为0.5的红色来绘制x轴
    // 调用
    this.strokeLine(0, halfHeight, this.canvas.width, halfHeight)
    this.context2D.strokeStyle = 'rgba(0,0,255,0.5)'
    // 使用alpha为0.5的蓝色来绘制y轴
    this.strokeLine(halfWidth, 0, halfWidth, this.canvas.height)
    this.context2D.restore()

    this.fillCircle(halfWidth, halfHeight, 5, 'rgba(0,0,0,0.5)')
  }

  // 绘制点的坐标信息
  public drawCoordInfo(info: string, x: number, y: number) {
    this.fillText(info, x, y, 'black', 'center', 'bottom')
  }

  // 两点间距离
  public distance(x0: number, y0: number, x1: number, y1: number) {
    const diffX: number = x1 - x0
    const diffY: number = y1 - y0
    return Math.sqrt(diffX * diffX + diffY * diffY)
  }

  private _mouseX: number = 0
  private _mouseY: number = 0
  public isSupportMouseMove = true

  protected dispatchMouseMove(evt: CanvasMouseEvent): void {
    this._mouseX = evt.canvasPosition.x
    this._mouseY = evt.canvasPosition.y
  }

  // 使用translate方法绘制一个左上角位于画布中心的矩形
  public doTransform(degree: number, rotateFirst: boolean = true): void {
    if (this.context2D !== null) {
      // 将角度转换为弧度
      const radians: number = Math2D.toRadian(degree)
      // 顺时针旋转
      this.context2D.save()
      if (rotateFirst) {
        this.context2D.rotate(radians)
        // this.context2D.translate(20, 20)
        this.context2D.translate(this.canvas.width * 0.5, this.canvas.height * 0.5)
      } else {
        this.context2D.translate(this.canvas.width * 0.5, this.canvas.height * 0.5)
        this.context2D.rotate(radians)
      }

      this.fillRectWithTitle(0, 0, 100, 60, degree + '度旋转')
      this.context2D.restore()

      this.context2D.save()

      if (rotateFirst) {
        this.context2D.rotate(-radians)
        this.context2D.translate(this.canvas.width * 0.5, this.canvas.height * 0.5)
      } else {
        this.context2D.translate(this.canvas.width * 0.5, this.canvas.height * 0.5)
        this.context2D.rotate(-radians)
      }

      this.fillRectWithTitle(0, 0, 100, 60, degree + '度旋转')

      this.context2D.restore()

      this.context2D.save()

      this.context2D.translate(this.canvas.width * 0.5, this.canvas.height * 0.5)
      this.fillRectWithTitle(0, 0, 100, 60, degree + '度旋转')

      this.context2D.restore()
      const radius: number = this.distance(0, 0, this.canvas.width * 0.5, this.canvas.height * 0.5)
      this.strokeCircle(0, 0, radius, 'black')
    }
  }

  // 绘制可以变换局部坐标原点的矩形
  public fillLocalRectWithTitle(
    width: number,
    height: number,
    title: string,
    referencePt: ELayout = ELayout.CENTER_MIDDLE,
    layout: ELayout = ELayout.CENTER_MIDDLE,
    color: string = 'grey',
    showCoord: boolean = true,
  ) {
    let x: number = 0
    let y: number = 0
    // 根据referencePt的值计算原点相对左上角的偏移量
    // Canvas2D中，左上角是默认的坐标系原点，所有原点变换都是相对左上角的偏移
    switch (referencePt) {
      case ELayout.LEFT_TOP:
        x = 0
        y = 0
        break
      case ELayout.LEFT_MIDDLE:
        x = 0
        y = -height * 0.5
        break
      case ELayout.LEFT_BOTTOM:
        x = 0
        y = -height
        break
      case ELayout.RIGHT_TOP:
        x = -width
        y = 0
        break
      case ELayout.RIGHT_MIDDLE:
        x = -width
        y = -height * 0.5
        break
      case ELayout.RIGHT_BOTTOM:
        x = -width
        y = -height
        break
      case ELayout.CENTER_TOP:
        x = -width * 0.5
        y = 0
        break
      case ELayout.CENTER_MIDDLE:
        x = -width * 0.5
        y = -height * 0.5
        break
      case ELayout.CENTER_BOTTOM:
        x = -width * 0.5
        y = -height
        break
    }
    if (this.context2D !== null) {
      this.context2D.save()

      // 1.绘制矩形
      this.context2D.fillStyle = color
      this.context2D.beginPath()
      this.context2D.rect(x, y, width, height)
      this.context2D.fill()

      // 如果有文字的话，先根据枚举值计算x，y坐标
      if (title.length !== 0) {
        // 2.绘制文字信息
        // 在矩形的左上角绘制出文字信息，使用的是10px大小的文字
        const rect: Rectangle = this.calcLocalTextRectangle(layout, title, width, height)
        // 绘制文本
        this.fillText(title, x + rect.origin.x, y + rect.origin.y, 'white', 'left', 'top', '10px sans-serif')
        // 绘制文本框
        // this.strokeRect(x + rect.origin.x, y + rect.origin.y, rect.size.width, rect.size.height, 'rgb(0,0,0,0.5)')
        this.fillCircle(x + rect.origin.x, y + rect.origin.y, 2)
      }
      // 3.绘制变换的局部坐标系
      if (showCoord) {
        this.strokeCoord(0, 0, width + 20, height + 20)
        this.fillCircle(0, 0, 3)
      }

      this.context2D.restore()
    }
  }

  /**
   * 先旋转 再平移
   * @param degree
   * @param layout
   * @param width
   * @param height
   */
  public rotateTranslate(degree: number, layout: ELayout = ELayout.LEFT_TOP, width: number = 40, height: number = 20): void {
    if (this.context2D === null) return

    const radians: number = Math2D.toRadian(degree)
    this.context2D.save()

    this.context2D.rotate(radians)
    this.context2D.translate(this.canvas.width * 0.5, this.canvas.height * 0.5)

    this.fillLocalRectWithTitle(width, height, '', layout)
    this.context2D.restore()
  }

  public testFillLocalRectWithTitle(): void {
    if (this.context2D !== null) {
      // 旋转 0‘，坐标原点位于左上角（默认）
      this.rotateTranslate(0, ELayout.LEFT_TOP)

      // 顺时针旋转
      this.rotateTranslate(10, ELayout.LEFT_MIDDLE)
      this.rotateTranslate(20, ELayout.LEFT_BOTTOM)
      this.rotateTranslate(30, ELayout.CENTER_TOP)
      this.rotateTranslate(40, ELayout.CENTER_MIDDLE)

      // 逆时针旋转
      this.rotateTranslate(-10, ELayout.CENTER_BOTTOM)
      this.rotateTranslate(-20, ELayout.RIGHT_TOP)
      this.rotateTranslate(-30, ELayout.RIGHT_MIDDLE)
      this.rotateTranslate(-40, ELayout.RIGHT_BOTTOM)

      const radius: number = this.distance(0, 0, this.canvas.width * 0.5, this.canvas.height * 0.5)
      this.strokeCircle(0, 0, radius, 'black')
    }
  }

  public doLocalTransform(): void {}
}

export enum ELayout {
  LEFT_TOP,
  RIGHT_TOP,
  RIGHT_BOTTOM,
  LEFT_BOTTOM,
  CENTER_MIDDLE,
  CENTER_TOP,
  RIGHT_MIDDLE,
  CENTER_BOTTOM,
  LEFT_MIDDLE,
}
