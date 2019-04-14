import { vec2 } from '../math2D'

export class Application implements EventListenerObject {
  // 是否处于不间断循环状态
  protected _start: boolean = false

  // 由Window对象的requestAnimationFrame返回的大于0的id号
  // 可以使用cancelAnimationFrame(this._requestId)来取消动画循环
  protected _requestId: number = -1
  // 用于基于时间的物理更新。可以进行延迟赋值操作
  protected _lastTime!: number
  protected _startTime!: number

  public canvas!: HTMLCanvasElement

  // 对于mousemove事件提供一个开关，如果为true，则每次鼠标移动都会触发mousemove事件，否则就不会触发
  public isSupportMouseMove: boolean = false
  // 当前鼠标是否是按下的状态，提供mousedrag事件
  protected _isMouseDown: boolean = false

  // 由Application来控制每个Timer, 支持同时触发多个Timer
  public timers: Timer[] = []
  private _timeId: number = -1

  // 帧率
  private _fps: number = 0
  public get fps() {
    return this._fps
  }

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    // canvas元素能够监听鼠标事件
    this.canvas.addEventListener('mouseup', this, false)
    this.canvas.addEventListener('mousedown', this, false)
    this.canvas.addEventListener('mousemove', this, false)

    // 键盘事件不能在canvas中触发，但是能在全局window对象中触发
    window.addEventListener('keyup', this, false)
    window.addEventListener('keydown', this, false)
    window.addEventListener('keypress', this, false)

    this._isMouseDown = false
    this.isSupportMouseMove = false
  }

  public start(): void {
    if (!this._start) {
      this._start = true
      this._requestId = -1

      this._lastTime = -1
      this._startTime = -1

      // 启动更新循环
      this._requestId = requestAnimationFrame(
        (msec: number): void => {
          this.step(msec)
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
    let intervalSec: number = timestamp - this._lastTime
    // 增加FPS的计算
    if (intervalSec !== 0) {
      this._fps = 1000 / intervalSec
    }

    intervalSec /= 1000 // 转换为秒
    this._lastTime = timestamp

    // 1.处理计时任务
    // 2.更新
    // 3.渲染
    this._handleTimers(intervalSec)
    this.update(elapsedMsec, intervalSec)
    this.render()

    this._requestId = requestAnimationFrame(
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

  /**
   * 事件处理
   */
  public handleEvent(evt: Event): void {
    // 根据事件类型，调用对应的dispatchXXXX 方法
    switch (evt.type) {
      case 'mousedown':
        this._isMouseDown = true
        this.dispatchMouseDown(this._toCanvasMouseEvent(evt))
        break
      case 'mouseup':
        this._isMouseDown = false
        this.dispatchMouseUp(this._toCanvasMouseEvent(evt))
        break
      case 'mousemove':
        if (this.isSupportMouseMove) {
          this.dispatchMouseMove(this._toCanvasMouseEvent(evt))
        }
        // 如果鼠标出入按下状态，并且move的话，就是在拖动
        if (this._isMouseDown) {
          this.dispatchMouseDrag(this._toCanvasMouseEvent(evt))
        }
        break
      case 'keypress':
        this.dispatchKeyPress(this._toCanvasKeyBoardEvent(evt))
        break
      case 'keydown':
        this.dispatchKeyDown(this._toCanvasKeyBoardEvent(evt))
        break
      case 'keyup':
        this.dispatchKeyUp(this._toCanvasKeyBoardEvent(evt))
        break
    }
  }
  protected dispatchMouseUp(evt: CanvasMouseEvent): void {}
  protected dispatchMouseDown(evt: CanvasMouseEvent): void {}
  protected dispatchMouseMove(evt: CanvasMouseEvent): void {}
  protected dispatchMouseDrag(evt: CanvasMouseEvent): void {}
  protected dispatchKeyUp(evt: CanvasKeyboardEvent): void {}
  protected dispatchKeyDown(evt: CanvasKeyboardEvent): void {}
  protected dispatchKeyPress(evt: CanvasKeyboardEvent): void {}

  /**
   * 初始化的时候 timers列表是空的
   * 每次添加先看是否有timer可以重用，如果没有再new一个timer
   * @param callback
   * @param timeout
   */
  public addTimer(callback: TimerCallback, timeout: number = 1.0, onlyOnce: boolean = false, data: any = undefined): number {
    let timer: Timer
    let found: boolean = false
    for (let i = 0; i < this.timers.length; i++) {
      timer = this.timers[i]
      if (timer.enabled === false) {
        timer.callback = callback
        timer.callbackData = data
        timer.timeout = timeout
        timer.countdown = timeout
        timer.enabled = true
        timer.onlyOnce = onlyOnce
        return timer.id
      }
    }

    timer = new Timer(callback)
    timer.enabled = true
    timer.timeout = timeout
    timer.callbackData = data
    timer.countdown = timeout
    timer.id = ++this._timeId
    timer.onlyOnce = onlyOnce
    this.timers.push(timer)
    return timer.id
  }

  /**
   * Timer的软删除
   * 寻找到匹配id的Timer，如果找到，把enable设置为false，返回true
   * 如果没有找到，返回false.
   *
   * 软删除的目的：
   * 避免调整数组，产生的析构内存
   * 在添加Timer的时候，可以通过查找哪些是false的Timer，直接重用
   * @param id
   */
  public removeTimer(id: number): boolean {
    let found: boolean = false
    for (let i = 0; i < this.timers.length; i++) {
      const timer: Timer = this.timers[i]
      if (timer && timer.id === id) {
        timer.enabled = false
        found = true
        break
      }
    }
    return found
  }

  /**
   * update函数的第二个参数是以秒表示前后帧的时间差，正符合handleTimers的参数要求
   * 没有start，计时器不生效
   * @param intervalSec 每一帧的时间差，以秒为单位
   */
  private _handleTimers(intervalSec: number): void {
    // 遍历整个timers列表
    for (let i = 0; i < this.timers.length; i++) {
      let timer: Timer = this.timers[i]
      if (timer.enabled === false) {
        continue
      }

      // countdown初始化和timeout是一样的，每次调用update，每一帧，都会减去这个时间差，产生倒计时的效果
      timer.countdown -= intervalSec
      // 如果countdown 小于0.0，那么说明时间到了，需要出发回调。
      // timer并不是很精准，比如设置timer是0.3s回调，那么实际是 0.32s的时候触发回调
      if (timer.countdown < 0.0) {
        timer.callback(timer.id, timer.callbackData)
        // 如果需要重复触发，那么把countdown倒计时重置
        if (timer.onlyOnce === false) {
          timer.countdown = timer.timeout
        } else {
          this.removeTimer(timer.id)
        }
      }
    }
  }

  /**
   * 把鼠标在浏览器视域的坐标转换为Canvas中的坐标
   * 需要考虑到 Padding, Border 的影响
   * @param evt
   */
  private _viewportToCanvasCoordinate(evt: MouseEvent): vec2 {
    if (this.canvas) {
      let rect: ClientRect = this.canvas.getBoundingClientRect()
      if (evt.type === 'mousedown') {
        console.log(`boundingClientRect: ${JSON.stringify(rect)}`)
        console.log(`clientX: ${evt.clientX}, clientY: ${evt.clientY}`)
      }

      // 获取 Canvas 的padding和border，来计算偏移
      if (evt.target) {
        let paddingTop = 0
        let paddingLeft = 0
        let borderTopWidth = 0
        let borderLeftWidth = 0

        const decl: CSSStyleDeclaration = window.getComputedStyle(evt.target as HTMLElement)
        if (decl.paddingTop) {
          paddingTop = parseInt(decl.paddingTop, 10)
        }
        if (decl.paddingLeft) {
          paddingLeft = parseInt(decl.paddingLeft, 10)
        }
        if (decl.borderTopWidth) {
          borderTopWidth = parseInt(decl.borderTopWidth, 10)
        }
        if (decl.borderLeftWidth) {
          borderLeftWidth = parseInt(decl.borderLeftWidth, 10)
        }

        const x: number = evt.clientX - rect.left - borderLeftWidth - paddingLeft
        const y: number = evt.clientY - rect.top - borderTopWidth - paddingTop
        return vec2.create(x, y)
      } else {
        throw new Error('evt.target is null!')
      }
    }
    throw new Error('canvas is null!')
  }

  /**
   * 把Dom事件转换为自定义的鼠标事件
   * @param evt
   */
  private _toCanvasMouseEvent(evt: Event) {
    const event: MouseEvent = evt as MouseEvent
    const mousePosition: vec2 = this._viewportToCanvasCoordinate(event)
    const canvasMouseEvent: CanvasMouseEvent = new CanvasMouseEvent(
      mousePosition,
      event.button,
      event.altKey,
      event.ctrlKey,
      event.shiftKey,
    )
    return canvasMouseEvent
  }

  /**
   * 把Dom事件转换了自定义的键盘输入事件
   * @param evt
   */
  private _toCanvasKeyBoardEvent(evt: Event) {
    const event: KeyboardEvent = evt as KeyboardEvent
    const canvasKeyboardEvent: CanvasKeyboardEvent = new CanvasKeyboardEvent(
      event.key,
      event.keyCode,
      event.repeat,
      event.altKey,
      event.ctrlKey,
      event.shiftKey,
    )
    return canvasKeyboardEvent
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

// Timer的回调
export type TimerCallback = (id: number, data: any) => void

/**
 * 自己实现一个和 setTimeout, setInterval 相似功能的Timer
 */
class Timer {
  public id: number = -1
  public enabled: boolean = false
  public callback!: TimerCallback
  public callbackData: any = undefined
  public countdown: number = 0
  public timeout: number = 0
  public onlyOnce: boolean = false
  constructor(callback: TimerCallback) {
    this.callback = callback
  }
}
