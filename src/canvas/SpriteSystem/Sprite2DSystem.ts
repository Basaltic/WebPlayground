import { ISpriteContainer, ISprite, IDispatcher, EOrder } from './Sprite2DApplication'
import { CanvasKeyboardEvent, CanvasMouseEvent, EInputEventType } from '../Application/Application'
import { Sprite } from 'pixi.js'
import { mat2d, Math2D, Transform2D } from '../math2D'

export class Sprite2DManager implements ISpriteContainer, IDispatcher {
  public name: string = 'sprite2dManager'

  // 数组存放ISprite接口的实例对象
  private _sprites: ISprite[] = []

  public addSprite(sprite: ISprite): ISpriteContainer {
    sprite.owner = this
    this._sprites.push(sprite)
    return this
  }
  // 删除某个精灵
  public removeSpirteAt(idx: number): void {
    this._sprites.splice(idx, 1)
  }
  // 从容器中删除一个精灵
  public removeSprite(sprite: ISprite): boolean {
    const idx = this.getSpriteIndex(sprite)
    if (idx === -1) {
      this.removeSpirteAt(idx)
      return true
    }
    return false
  }

  // 清空整个容器
  public removeAll(includeThis: boolean): void {
    this._sprites = []
  }

  // 根据精灵获取索引号，如果没有找到精灵，返回 -1
  public getSpriteIndex(sprite: ISprite): number {
    for (let i = 0; i < this._sprites.length; i++) {
      if (this._sprites[i] === sprite) {
        return i
      }
    }
    return -1
  }

  // 根据索引号获取精灵
  public getSprite(idx: number): ISprite {
    if (idx < 0 || idx > this._sprites.length - 1) {
      throw new Error('参数idx越界！')
    }
    return this._sprites[idx]
  }

  // 获取容器中精灵的数量
  public getSpriteCount(): number {
    return this._sprites.length
  }

  // IDispatcher的实现
  // 由_dragSprite接受drag事件的处理
  // 也就是说，drag事件都是发送到_dragSprite的
  private _dragSprite: ISprite | undefined = undefined
  public get container(): ISpriteContainer {
    return this
  }

  // 分发update事件
  public dispatchUpdate(msec: number, diff: number): void {
    // 从前到后遍历精灵数组，触发PREORDER updateEvent
    for (let i = 0; i < this._sprites.length; i++) {
      this._sprites[i].update(msec, diff, EOrder.PREORDER)
    }
    // 从后到前遍历精灵数组，触发POSTORDER updateEvent
    for (let i = this._sprites.length - 1; i >= 0; i--) {
      this._sprites[i].update(msec, diff, EOrder.POSTORDER)
    }
  }

  // 分发draw命令
  public dispatchDraw(contex: CanvasRenderingContext2D): void {
    // 从前到后遍历精灵数组，调用Draw方法
    // 绘制的顺序是先添加的精灵先绘制，后绘制的精灵后绘制
    for (let i = 0; i < this._sprites.length; i++) {
      this._sprites[i].draw(contex)
    }
  }

  // 分发键盘事件，采取最简单的方式
  // 遍历每个精灵，凡是有键盘处理事件的都触发该事件
  public dispatchKeyEvent(evt: CanvasKeyboardEvent): void {
    let spr: ISprite
    for (let i = 0; i < this._sprites.length; i++) {
      spr = this._sprites[i]
      if (spr.keyEvent) {
        spr.keyEvent(spr, evt)
      }
    }
  }

  // 分发鼠标事件
  public dispatchMouseEvent(evt: CanvasMouseEvent): void {
    // 每次按下鼠标时，将_dragSprite设置为鼠标指针下面的每个精灵
    // 每次释放鼠标时，将_dragSprite设置为undefined
    if (evt.type === EInputEventType.MOUSEUP) {
      this._dragSprite = undefined
    } else if (evt.type === EInputEventType.MOUSEDRAG) {
      // 触发drag事件，由_dragSprite接受并处理
      if (this._dragSprite !== undefined) {
        if (this._dragSprite.mouseEvent !== null) {
          this._dragSprite.mouseEvent(this._dragSprite, evt)
          // 一旦处理完成，不在继续分发，直接退出方法
          return
        }
      }
    }

    let spr: ISprite
    // 遍历精灵数组，注意是从后向前的顺序遍历
    // 绘制时，以由前往后方式遍历，这样可以保证绘制的深度正确性
    // 绘制鼠标事件时，以由后往前方式遍历，确保上面的精灵能先接收到事件
    for (let i = this._sprites.length - 1; i > 0; i--) {
      spr = this._sprites[i]

      // 获取当前精灵的局部矩阵
      const mat: mat2d | null = spr.getLocalMatrix()
      // 将全局表示的canvasPosition点变换到相对当前精灵局部坐标系的表示：localPosition
      mat2d.transform(mat, evt.canvasPosition, evt.localPosition)

      // 要测试的点和精灵必须同一个坐标系中，
      // 如果碰撞检测成功，说明选中改精灵
      if (spr.hitTest(evt.localPosition)) {
        evt.hasLocalPosition = true
        // 鼠标按下并且有点选选中的精灵时，记录下来
        // 后续的drag事件都是发送到该精灵上的
        if (evt.type === EInputEventType.MOUSEDOWN) {
          this._dragSprite = spr
        }
        // 如果有选中的精灵，并且有事件处理程序，则立刻出发该事件的事件处理程序
        if (spr.mouseEvent) {
          spr.mouseEvent(spr, evt)
          // 一旦处理完成，不再继续分发，直接退出方法
          return
        }
      }
    }
  }
}
