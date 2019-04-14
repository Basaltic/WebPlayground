import { Canvas2DApplication } from '../Application/Canvas2DApplication'
import { Size, Rectangle, vec2, Math2D } from '../math2D'
import { CanvasMouseEvent, CanvasKeyboardEvent } from '../Application/Application'

// 文字左右如何对齐
type TextAlign = 'start' | 'left' | 'center' | 'right' | 'end'
// 可以认为是设置文字的如何对齐的
type TextBaseline = 'alphabetic' | 'hanging' | 'top' | 'middle' | 'bottom'

type FontType = '10px sans-serif' | '15px sans-serif' | '20px sans-serif' | '25px sans-serif'

export class TestApplication extends Canvas2DApplication {
  private _lineDashOffset: number = 0

  private _tank: Tank

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    // this.addTimer(this.timerCallback.bind(this), 0.033)

    this._tank = new Tank()
    this._tank.pos.x = canvas.width * 0.5
    this._tank.pos.y = canvas.height * 0.5

    // 让坦克按比例整体扩大2倍
    // this._tank.scaleX = 2
    // this._tank.scaleY = 2
    // 分别旋转坦克和炮管
    this._tank.tankRotation = Math2D.toRadian(30)
    this._tank.turrentRotation = Math2D.toRadian(-30)
  }

  public drawTank(): void {
    this._tank.draw(this)
  }

  public render(): void {
    if (this.context2D !== null) {
      this.context2D.clearRect(0, 0, this.context2D.canvas.width, this.context2D.canvas.height)

      this.strokeGrid()
      this.drawCanvasCoordCenter()

      this.draw4Quadrant()
      this.drawTank()

      // 坐标信息总是在最后绘制
      // 1.显示鼠标当前位置（相对坦克坐标系的表示，而不是全局表示！！）
      // 2.显示当前坦克方位角度，使用Number.toFix(2)方法，将浮点数保留两位小数
      this.drawCoordInfo(
        `[${(this._mouseX - this._tank.pos.x).toFixed(2)}, ${(this._mouseY - this._tank.pos.y).toFixed(2)}]
        角度： ${Math2D.toDegree(this._tank.tankRotation).toFixed(2)}
        `,
        this._mouseX,
        this._mouseY,
      )
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
    this.fillText('left - top', drawX, drawY, 'black', 'left', 'top', '20px sans-serif')
    this.fillCircle(drawX, drawY, radius, 'black')

    // 3.右上
    drawX = x + width
    drawY = y
    this.fillText('right - top', drawX, drawY, 'black', 'right', 'top', '20px sans-serif')
    this.fillCircle(drawX, drawY, radius, 'black')

    // 4.右下
    drawX = x + width
    drawY = y + height
    this.fillText('right - bottom', drawX, drawY, 'black', 'right', 'bottom', '20px sans-serif')
    this.fillCircle(drawX, drawY, radius, 'black')

    // 5.左下
    drawX = x
    drawY = y + height
    this.fillText('left - bottom', drawX, drawY, 'black', 'left', 'bottom', '20px sans-serif')
    this.fillCircle(drawX, drawY, radius, 'black')

    // 6.中心
    drawX = x + width * 0.5
    drawY = y + height * 0.5
    this.fillText('center - middle', drawX, drawY, 'black', 'center', 'middle', '20px sans-serif')
    this.fillCircle(drawX, drawY, radius, 'black')

    // 7.中上
    drawX = x + width * 0.5
    drawY = y
    this.fillText('center - top', drawX, drawY, 'black', 'center', 'top', '20px sans-serif')
    this.fillCircle(drawX, drawY, radius, 'black')

    // 8.右中
    drawX = x + width
    drawY = y + height * 0.5
    this.fillText('right - middle', drawX, drawY, 'black', 'right', 'middle', '20px sans-serif')
    this.fillCircle(drawX, drawY, radius, 'black')

    // 9.中下
    drawX = x + width * 0.5
    drawY = y + height
    this.fillText('center - bottom', drawX, drawY, 'black', 'center', 'bottom', '20px sans-serif')
    this.fillCircle(drawX, drawY, radius, 'black')

    // 10.左中
    drawX = x
    drawY = y + height * 0.5
    this.fillText('left - middle', drawX, drawY, 'black', 'left', 'middle', '20px sans-serif')
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
    this._tank.onMouseMove(evt)
  }

  protected dispatchKeyPress(evt: CanvasKeyboardEvent): void {
    this._tank.onKeyPress(evt)
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
    title: string = '',
    referencePt: ELayout = ELayout.LEFT_TOP,
    layout: ELayout = ELayout.CENTER_MIDDLE,
    color: string = 'grey',
    showCoord: boolean = false,
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

  /**
   * 彻底弄懂坐标转换
   */
  public doLocalTransform(): void {
    if (this.context2D === null) return
    const width: number = 100
    const height: number = 60
    const coordWidth: number = width * 1.2
    const coordHeight: number = height * 1.2

    const radius: number = 5

    this.context2D.save()

    this.strokeCoord(0, 0, coordWidth, coordHeight)
    this.fillCircle(0, 0, radius)
    this.fillLocalRectWithTitle(width, height, '1. 初始状态')

    // 将坐标系向右移动到画布的中心，向下移动10个单位，再绘制局部坐标系
    this.context2D.translate(this.canvas.width * 0.5, 10)
    this.strokeCoord(0, 0, coordWidth, coordHeight)
    this.fillCircle(0, 0, radius)
    this.fillLocalRectWithTitle(width, height, '2. 平移')

    // 继续平移，将局部坐标系变换到全局坐标系的中心
    this.context2D.translate(0, this.canvas.height * 0.5 - 10)
    this.strokeCoord(0, 0, coordWidth, coordHeight)
    this.fillCircle(0, 0, radius)
    this.fillLocalRectWithTitle(width, height, '3. 平移到画布中心')

    // 将坐标系继续旋转 -120度
    this.context2D.rotate(Math2D.toRadian(-120))
    this.fillLocalRectWithTitle(width, height, '4. 旋转-120度')
    this.strokeCoord(0, 0, coordWidth, coordHeight)
    this.fillCircle(0, 0, radius)

    // 再旋转 -130度
    this.context2D.rotate(Math2D.toRadian(-130))
    this.fillLocalRectWithTitle(width, height, '5. 再旋转-130度')
    this.strokeCoord(0, 0, coordWidth, coordHeight)
    this.fillCircle(0, 0, radius)

    // 沿着局部坐标的x轴和y轴正方向各自平移100个单位
    this.context2D.translate(100, 100)
    this.fillLocalRectWithTitle(width, height, '6. 局部x,y轴各平移100单位')
    this.strokeCoord(0, 0, coordWidth, coordHeight)
    this.fillCircle(0, 0, radius)

    // 将局部坐标系x轴放大1.5倍，y轴放大2.0倍
    this.context2D.scale(1.5, 2.0)
    this.fillLocalRectWithTitle(width, height, '7. x轴局部放大1.5倍，y轴局部放大2倍', ELayout.LEFT_MIDDLE)
    // this.fillLocalRectWithTitle(width * 1.5, height * 2, '8. 放大物体尺寸')
    this.strokeCoord(0, 0, coordWidth, coordHeight)
    this.fillCircle(0, 0, radius)

    this.context2D.restore()
  }

  public fillLocalRectWithTitleUV(
    width: number,
    height: number,
    title: string = '',
    u: number = 0,
    v: number = 0,
    layout: ELayout = ELayout.CENTER_MIDDLE,
    color: string = 'grey',
    showCoord: boolean = true,
  ) {
    const x: number = -width * u
    const y: number = -height * v

    if (this.context2D !== null) {
      this.context2D.save()

      // 1.绘制矩形
      this.context2D.fillStyle = color
      this.context2D.beginPath()
      this.context2D.rect(x, y, width, height)
      this.context2D.fill()

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

  public translateRotateTranslateDrawRect(
    degree: number,
    u: number = 0,
    v: number = 0,
    radius = 200,
    width: number = 40,
    height: number = 20,
  ): void {
    if (this.context2D === null) return
    const radians: number = Math2D.toRadian(degree)
    this.context2D.save()

    this.context2D.translate(this.canvasMiddleX, this.canvasMiddleY)
    this.context2D.rotate(radians)
    this.context2D.translate(radius, 0)

    this.fillLocalRectWithTitleUV(width, height, '', u, v)

    this.context2D.restore()
  }

  public get canvasMiddleX() {
    return this.canvas.width * 0.5
  }

  public get canvasMiddleY() {
    return this.canvas.height * 0.5
  }

  public testFillLocalRectWithTilteUV() {
    if (this.context2D === null) return

    const radius: number = 200
    const steps: number = 18 // 将圆分成上下各18各等分，-180度 ~ 180度，每等分10度

    // [0, 180]度绘制，u系数从0 ~ 1，v系数不变。顺时针旋转
    // 导致结果是x轴原点一直从左到右变动，y轴原点一直在上面（top）
    for (let i = 0; i <= steps; i++) {
      const n: number = i / steps
      this.translateRotateTranslateDrawRect(i * 10, n, 0, radius)
    }

    // [0, -180]度绘制，逆时针旋转
    // x轴原点不同，原点沿着y轴上下移动
    for (let i = 0; i <= steps; i++) {
      const v: number = i / steps
      this.translateRotateTranslateDrawRect(-i * 10, 0, v, radius)
    }

    // 在画布中心四个象限绘制不同的u，v的矩形，来感受下u、v不同产生的效果
    this.testUVRect(-radius * 0.4, -radius * 0.4, 'u=0.5/v=0.5', 0.5, 0.5)
    this.testUVRect(radius * 0.2, -radius * 0.2, 'u=0/v=1', 0, 1)
    this.testUVRect(radius * 0.3, radius * 0.4, 'u=0.3/v=0.6', 0.3, 0.6)
    this.testUVRect(-radius * 0.1, radius * 0.25, 'u=1/v=0.2', 1, 0.2)

    this.strokeCircle(this.canvasMiddleX, this.canvasMiddleY, radius, 'rgba(0, 255, 255, 0.5)')
  }

  public testUVRect(offsetX: number, offsetY: number, text: string = '', u: number, v: number) {
    if (this.context2D === null) return
    this.context2D.save()

    this.context2D.translate(this.canvasMiddleX + offsetX, this.canvasMiddleY + offsetY)
    this.fillLocalRectWithTitleUV(100, 60, text, u, v)

    this.context2D.restore()
  }

  //////// 公转和自转的demo
  // 太阳自转、月亮自转、公转 的速度，每一秒转动的度数
  private _rotationSunSpeed: number = 150
  private _rotationMoonSpeed: number = 200
  private _revolutionSpeed: number = 160

  // 当前公转和自转的距离(度数)
  private _rotationSun: number = 0
  private _rotationMoon: number = 0
  private _revolution: number = 0

  public update(elapsedMsec: number, intervalSec: number): void {
    // 角位移公式： v = s * t
    this._rotationMoon += this._rotationMoonSpeed * intervalSec
    this._rotationSun += this._rotationSunSpeed * intervalSec
    this._revolution += this._revolutionSpeed * intervalSec

    // this.rotationAndRevolutionSimulation()
    this._tank.update(intervalSec)
  }

  public rotationAndRevolutionSimulation(radius: number = 150): void {
    if (this.context2D === null) return
    this.context2D.clearRect(0, 0, this.context2D.canvas.width, this.context2D.canvas.height)

    // 将自转rotation转换为弧度表示
    const rotationMoon: number = Math2D.toRadian(this._rotationMoon)
    const rotationSun: number = Math2D.toRadian(this._rotationSun)
    const revolution: number = Math2D.toRadian(this._revolution)

    this.context2D.save()

    this.context2D.translate(this.canvasMiddleX, this.canvasMiddleY)
    this.context2D.save()
    // 绘制矩形画布中心自转
    // this.context2D.rotate(rotationSun)
    // this.fillLocalRectWithTitleUV(100, 100, '自转', 0.5, 0.5)
    // 另一种变换方式，假设局部坐标系只能是在右上角不变
    // 因为绘制 的矩形是100单位，而原点在矩形左上角
    // 为了将自转的原点位于矩形的中心，同时要让矩形的中心与画布原点重合
    // 因此再次沿着局部坐标系的负x轴和负y轴，各自平移50个单位
    // 这样旋转的参考点位于矩形的中心，并且在全局坐标中也和画布原点重合
    this.context2D.rotate(rotationSun)
    this.context2D.translate(-50, -50)
    this.fillLocalRectWithTitleUV(100, 100, '自转', 0.0, 0.0)
    this.context2D.restore()

    // 公转 + 自转
    this.context2D.save()
    // 先公转
    this.context2D.rotate(revolution)
    this.context2D.translate(radius, 0)
    this.context2D.rotate(rotationMoon)
    this.fillLocalRectWithTitleUV(80, 80, '自转 + 公转', 0.5, 0.5)
    this.context2D.restore()

    this.context2D.restore()
  }

  ////// 坦克 Demo
  // 绘制四个象限
  public draw4Quadrant(): void {
    if (this.context2D === null) return
    this.context2D.save()

    this.fillText('第一象限', this.canvas.width - 80, this.canvas.height, 'black', 'right', 'bottom', '20px sans-serif')
    this.fillText('第二象限', 0, this.canvas.height, 'black', 'left', 'bottom', '20px sans-serif')
    this.fillText('第三象限', 0, 0, 'black', 'left', 'top', '20px sans-serif')
    this.fillText('第四象限', this.canvas.width - 80, 0, 'black', 'right', 'top', '20px sans-serif')

    this.context2D.restore()
  }

  ///////// 向量 Demo
  // 沿着局部坐标系x轴的方向，绘制长度为len的向量
  // 参数arrowLen：要绘制的向量的箭头长度
  // 参数beginText/endText： 表示向量尾部和头部的信息，例如[150,150]和[400, 300]
  // lineWidth: 用来加粗显示向量
  // isLineDash: 是否显示向量长度
  // showInfo: 是否显示向量的长度
  // alpha: 是否以半透明方式显示向量
  public drawVec(
    len: number,
    arrowLen: number = 10,
    beginText: string = '',
    endText: string = '',
    lineWidth: number = 1,
    isLineDash: boolean = false,
    showInfo: boolean = true,
    alpha: boolean = false,
  ): void {
    if (this.context2D === null) return
    // 当绘制向量的负向量时，len是负数
    // 此时如果不做如下处理，会导致向量的箭头绘制错误
    if (len < 0) {
      arrowLen = -arrowLen
    }
    this.context2D.save()

    // 设置线宽
    this.context2D.lineWidth = lineWidth

    if (isLineDash) {
      this.context2D.setLineDash([2, 2])
    }

    // 绘制向量的起点圆圈，如果加粗显示，那么向量的起点也要加大
    if (lineWidth > 1) {
      this.fillCircle(0, 0, 5)
    } else {
      this.fillCircle(0, 0, 3)
    }

    // 绘制向量和箭头
    this.context2D.save()
    // 设置是否半透明显示向量
    if (alpha === true) {
      this.context2D.strokeStyle = 'rgba(0,0,0,0.3)'
    }

    // 绘制长度为len的线段表示向量
    this.strokeLine(0, 0, len, 0)

    // 绘制箭头的上半部分
    this.context2D.save()
    this.strokeLine(len, 0, len - arrowLen, arrowLen)
    this.context2D.restore()
    // 绘制箭头的下半部分
    this.context2D.save()
    this.strokeLine(len, 0, len - arrowLen, -arrowLen)
    this.context2D.restore()

    this.context2D.restore()

    // 绘制线段的起点，终点信息
    const font: FontType = '15px sans-serif'
    if (beginText !== undefined && beginText.length !== 0) {
      if (len > 0) {
        this.fillText(beginText, 0, 0, 'black', 'right', 'bottom', font)
      } else {
        this.fillText(beginText, 0, 0, 'black', 'left', 'bottom', font)
      }
    }

    len = parseFloat(len.toFixed(2))
    if (beginText !== undefined && beginText.length !== 0) {
      if (len > 0) {
        this.fillText(beginText, len, 0, 'black', 'right', 'bottom', font)
      } else {
        this.fillText(beginText, len, 0, 'black', 'left', 'bottom', font)
      }
    }

    // 绘制向量长度
    if (showInfo) {
      this.fillText(Math.abs(len).toString(), len * 0.5, 0, 'black', 'center', 'bottom', font)
    }

    this.context2D.restore()
  }

  public drawVecFromLine(
    start: vec2,
    end: vec2,
    arrowLen: number = 10,
    beginText: string = '',
    endText: string = '',
    lineWidth: number = 1,
    isLineDash: boolean = false,
    showInfo: boolean = true,
    alpha: boolean = false,
  ): number {
    // 获取start-end形成的向量与x轴正方向[0,1]之间以弧度表示的夹角
    let angle: number = vec2.getOrientation(start, end, true)
    if (this.context2D !== null) {
      const diff: vec2 = vec2.difference(end, start, null)
      const len: number = diff.length
      this.context2D.save()

      this.context2D.translate(start.x, start.y)
      this.context2D.rotate(angle)
      this.drawVec(len, arrowLen, beginText, endText, lineWidth, isLineDash, showInfo, alpha)

      this.context2D.restore()
    }

    return angle
  }
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

class Tank {
  // 坦克的大小尺寸
  public width: number = 80
  public height: number = 50

  // Tank current position
  // default [100, 100]
  // public x: number = 100
  // public y: number = 100
  public pos: vec2 = new vec2(100, 100)

  // 坦克当前dex和y方向上的缩放系数
  public scaleX: number = 1.0
  public scaleY: number = 1.0

  // 朝向某个点
  // public targetX: number = 0
  // public targetY: number = 0
  public target: vec2 = new vec2()

  public linearSpeed: number = 100

  // 坦克当前的旋转角度
  public tankRotation: number = 0 // 整个坦克的旋转角度，弧度表示
  public turrentRotation: number = 0 // 炮塔的旋转角度，弧度表示

  public initYAxis: boolean = false
  public showLine: boolean = false //是否显示坦克原点和画布中心点和目标点之间的连线

  public showCoord: boolean = false // 是否显示坦克自身的局部坐标系
  public gunLength: number = Math.max(this.width, this.height) // 炮管的长度

  public gunMuzzleRadius: number = 5 // 炮筒半径

  // 绘制坦克
  public draw(app: TestApplication): void {
    if (app.context2D === null) return

    // 整个坦克绘制
    app.context2D.save()

    // 整个坦克移动旋转，注意局部变换的经典结合顺序（trs: tranlate -> rotat -> scale)
    app.context2D.translate(this.pos.x, this.pos.y)
    app.context2D.rotate(this.initYAxis ? this.tankRotation - Math.PI * 0.5 : this.tankRotation)
    app.context2D.scale(this.scaleX, this.scaleY)

    // 绘制坦克底座
    app.context2D.save()

    app.context2D.fillStyle = 'grey'
    app.context2D.beginPath
    app.context2D.rect(-this.width * 0.5, -this.height * 0.5, this.width, this.height)
    app.context2D.fill()

    app.context2D.restore()

    // 绘制炮塔
    app.context2D.save()
    app.context2D.rotate(this.turrentRotation)
    app.context2D.fillStyle = 'red'
    app.context2D.beginPath()
    app.context2D.ellipse(0, 0, 15, 10, 0, 0, Math.PI * 2)
    app.context2D.fill()

    // 炮管
    app.context2D.strokeStyle = 'blue'
    app.context2D.lineWidth = 5
    app.context2D.lineCap = 'round'
    app.context2D.beginPath()
    app.context2D.moveTo(0, 0)
    app.context2D.lineTo(this.gunLength, 0)
    app.context2D.stroke()
    // 炮口， 先将局部坐标系从当前的方向，向x轴的正方向平移gunLength个像素，此时局部坐标系在炮管的最右侧
    app.context2D.translate(this.gunLength, 0)
    // 然后再从当前的坐标系向x轴的正方向平移gunMuzzleRadius个像素， 这样炮口的外切圆正好和炮管相接触
    app.context2D.translate(this.gunMuzzleRadius, 0)
    // 调用自己实现的fillCircle方法， 内部使用Canvas2D arc绘制圆弧方法
    app.fillCircle(0, 0, 5, 'black')

    app.context2D.restore()

    // 绘制一个圆球，标记坦克正方向，一旦炮管旋转后，可以知道正前方在哪里
    app.context2D.save()

    app.context2D.translate(this.width * 0.5, 0)
    app.fillCircle(0, 0, 10, 'green')

    app.context2D.restore()

    // 坐标系是跟随整个坦克的
    if (this.showCoord) {
      app.context2D.save()

      app.context2D.lineWidth = 1
      app.context2D.lineCap = 'round'
      app.strokeCoord(0, 0, this.width * 1.2, this.height * 1.2)

      app.context2D.restore()
    }

    app.context2D.restore()

    app.context2D.save()

    app.strokeLine(this.pos.x, this.pos.y, app.canvas.width * 0.5, app.canvas.height * 0.5)
    app.strokeLine(this.pos.x, this.pos.y, this.target.x, this.target.y)

    app.context2D.restore()
  }

  public onMouseMove(evt: CanvasMouseEvent): void {
    // this.targetX = evt.canvasPosition.x
    // this.targetY = evt.canvasPosition.y
    this.target = evt.canvasPosition

    this._lookAt()
  }

  public update(intervalSec: number): void {
    this._moveTowardTo(intervalSec)
  }

  public turretRotateSpeed: number = Math2D.toRadian(2)
  public onKeyPress(evt: CanvasKeyboardEvent): void {
    if (evt.key === 'r') {
      this.turrentRotation += this.turretRotateSpeed
    } else if (evt.key === 't') {
      this.turrentRotation = 0
    } else if (evt.key === 'e') {
      this.turrentRotation -= this.turretRotateSpeed
    }
  }

  // 朝向targe点
  private _lookAt(): void {
    const diffX: number = this.target.x - this.pos.x
    const diffY: number = this.target.y - this.pos.y
    const radian = Math.atan2(diffY, diffX)

    this.tankRotation = radian
  }

  private _moveTowardTo(intervalSec: number) {
    // const diffX: number = this.targetX - this.x
    // const diffY: number = this.targetY - this.y

    // const currSpeed = this.linearSpeed * intervalSec
    // // 1.判断坦克是否要停止运动
    // // 需要移动的距离 大于 当前的速度，那么可以继续
    // if (diffX * diffX + diffY * diffY > currSpeed * currSpeed) {
    //   // 2.使用sin和cos函数计算斜向运动时x，y分量
    //   this.x = this.x + Math.cos(this.tankRotation) * currSpeed
    //   this.y = this.y + Math.sin(this.tankRotation) * currSpeed
    // }

    // 改用向量实现

    // 首先计算坦克当前的位置到鼠标点之间的向量
    const dir: vec2 = vec2.difference(this.target, this.pos, null)
    dir.normalize() // 只保留方向

    // 调用vec2.scaleAdd方法，表示将当前坦克位置沿着单位方向移动 x 个单位

    this.pos = vec2.scaleAdd(this.pos, dir, this.linearSpeed * intervalSec)
  }
}
