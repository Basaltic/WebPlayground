export class Application {
  // 是否处于不间断循环状态
  protected _start: boolean = false

  // 由Window对象的requestAnimationFrame返回的大于0的id号
  // 可以使用cancelAnimationFrame(this._requestId)来取消动画循环
  protected _requestId: number = -1
  // 用于基于时间的物理更新。可以进行延迟赋值操作
  protected _lastTime!: number
  protected _startTime!: number

  public canvas: any

  public start(): void {
    if (!this._start) {
      this._start = true
      this._requestId = -1

      this._lastTime = -1
      this._startTime = -1

      // 启动更新循环
      this._requestId = requestAnimationFrame(
        (elapsedMsec: number): void => {
          this.step(elapsedMsec)
        },
      )
    }
  }

  public stop(): void {
    if (this._start) {
      cancelAnimationFrame(this._requestId)
      this._requestId = -1
      this._lastTime = -1
      this._startTime = -1
      this._start = false
    }
  }

  public isRunning(): boolean {
    return this._start
  }

  public step(timestamp: number) {
    if (this._startTime === -1) this._startTime = timestamp
    if (this._lastTime === -1) this._lastTime = timestamp

    let elapsedMsec: number = timestamp - this._startTime
    let intervalSec: number = (timestamp - this._lastTime) / 1000
    this._lastTime = timestamp

    this.update(elapsedMsec, intervalSec)
    this.render()

    requestAnimationFrame(
      (elapsedMsec: number): void => {
        this.step(elapsedMsec)
      },
    )
  }

  /**
   *
   * @param elapsedMsec 毫秒
   * @param intervalSec 秒
   */
  public update(elapsedMsec: number, intervalSec: number): void {}

  public render(): void {}

  private _viewportToCanvasCoordinate(evt: MouseEvent): vec2 {
    if (this.canvas) {
      let rect: ClientRect = this.canvas.getBoundingClientRect()
      if (evt.type === 'mousedown') {
        console.log(`boundingClientRect: ${JSON.stringify(rect)}`)
        console.log(`clientX: ${evt.clientX}, clientY: ${evt.clientY}`)
      }
      let x: number = evt.clientX - rect.left
      let y: number = evt.clientY - rect.top
      return vec2.create(x, y)
    }
  }
}

enum EInputEventType {
  MOUSEEVENT,
  MOUSEDOWN,
  MOUSEUP,
  MOUSEMOVE,
  MOUSEDRAG,
  KEYBOARDEVENT,
  KEYUP,
  KEYDOWN,
  KEYPRESS,
}

class vec2 {
  public static create(x?: number, y?: number): vec2 {
    return new vec2()
  }
}

export class CanvasInputEvent {
  public altKey: boolean
  public ctrlKey: boolean
  public shiftKey: boolean

  public type: EInputEventType

  public constructor(
    altkey: boolean = false,
    ctrlKey: boolean = false,
    shiftKey: boolean = false,
    type: EInputEventType = EInputEventType.MOUSEEVENT,
  ) {
    this.altKey = altkey
    this.ctrlKey = ctrlKey
    this.shiftKey = shiftKey
    this.type = type
  }
}

export class CanvasMouseEvent extends CanvasInputEvent {
  // 表示当前鼠标按下时哪个键
  // 0: 左键，1：中键，2：右键
  public button: number
  // 基于canvas坐标系的空间位置（x，y）
  public canvasPosition: vec2

  public localPosition: vec2
  public constructor(canvasPos: vec2, button: number, altKey: boolean = false, ctrlKey: boolean = false, shiftKey: boolean = false) {
    super(altKey, ctrlKey, shiftKey)
    this.canvasPosition = canvasPos
    this.button = button

    // 暂时创建一个 vec2
    this.localPosition = vec2.create()
  }
}

export class CanvasKeyboardEvent extends CanvasInputEvent {
  // 当前按下键的ASCII字符/码
  public key: string
  public keyCode: number
  // 当前按下的键是否不停地触发事件
  public repeat: boolean
  public constructor(
    key: string,
    keyCode: number,
    repeat: boolean,
    altKey: boolean = false,
    ctrlKey: boolean = false,
    shiftKey: boolean = false,
  ) {
    super(altKey, ctrlKey, shiftKey, EInputEventType.KEYBOARDEVENT)
    this.key = key
    this.keyCode = keyCode
    this.repeat = repeat
  }
}
