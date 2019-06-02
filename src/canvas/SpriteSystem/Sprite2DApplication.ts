import { Canvas2DApplication } from '../Application/Canvas2DApplication'
import { CanvasMouseEvent, CanvasKeyboardEvent } from '../Application/Application'
import { mat2d, vec2 } from '../math2D'
import { Sprite2DManager } from './Sprite2DSystem'

export default class Sprite2DApplication extends Canvas2DApplication {
  // 声明一个受保护的类型为IDispatcher的成员变量
  // 下面所有的虚方法都委托调用IDispatcher相关的方法
  protected _dispatcher?: IDispatcher

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this._dispatcher = new Sprite2DManager()
  }
}

/**
 * 进行事件、更新、绘制命令分发的接口
 *
 * 接收到分发命令的精灵存储在ISpriteContainer容器中
 */
export interface IDispatcher {
  // 只读类型为ISpriteContainer的成员变量
  // 本接口中所有的dispatch开关的方法都是针对ISpriteContainer接口进行遍历操作
  readonly container: ISpriteContainer
  // 遍历ISpriteContainer容器，进行精灵的update分发
  dispatchUpdate(msec: number, diffSec: number): void
  // 遍历ISpriteContainer容器，进行精灵的render分发
  dispatchDraw(context: CanvasRenderingContext2D): void
  // 遍历ISpriteContainer容器，进行精灵的鼠标事件分发
  dispatchMouseEvent(evt: CanvasMouseEvent): void
  // 遍历ISpriteContainer容器，进行精灵的键盘事件分发
  dispatchKeyEvent(evt: CanvasKeyboardEvent): void
}

/**
 * 精灵容器 接口
 */
export interface ISpriteContainer {
  name: string
  // 添加一个精灵到容器中
  addSprite(sprite: ISprite): ISpriteContainer
  // 从容器中删除一个精灵
  removeSprite(sprite: ISprite): boolean
  // 清空整个容器
  removeAll(includeThis: boolean): void
  // 根据精灵获取索引号，如果没有找到精灵，返回 -1
  getSpriteIndex(sprite: ISprite): number
  // 根据索引号获取精灵
  getSprite(idx: number): ISprite
  // 获取容器中精灵的数量
  getSpriteCount(): number
}

/**
 * 渲染类型
 */
export enum ERenderType {
  // 自定义
  CUSTOM,
  // 线框渲染模式
  STROKE,
  // 填充模式
  FILL,
  // 线框渲染模式 + 填充模式
  STROKE_FILL,
  // 裁剪模式
  CLIP,
}

/**
 * 渲染状态
 */
export interface IRenderState {
  // 是否可见
  isVisible: boolean
  // 是否显示坐标系统
  showCoordSystem: boolean
  lineWidth: number
  fillStyle: string | CanvasGradient | CanvasPattern
  strokeStyle: string | CanvasGradient | CanvasPattern
  renderType: ERenderType
}

/**
 * 坐标类型
 */
export interface ITransformable {
  x: number
  y: number
  // 角度表示的方位
  rotation: number
  scaleX: number
  scaleY: number
  // 获取全局坐标系矩阵
  getWorldMatrix(): mat2d
  // 获取局部坐标系矩阵
  getLocalMatrix(): mat2d
}

export enum EOrder {
  PREORDER,
  POSTORDER,
}

export type UpdateEventHandler = (spr: ISprite, mesc: number, diffSec: number, travelOrder: EOrder) => void
export type MouseEventHandler = (spr: ISprite, evt: CanvasMouseEvent) => void
export type KeyboardEventHandler = (spr: ISprite, evt: CanvasKeyboardEvent) => void
// export type RenderEventHandler = (spr: ISprite, evt: CanvasKeyboardEvent, order: EOrder) => void
export type RenderEventHandler = (spr: ISprite, contex: CanvasRenderingContext2D, order: EOrder) => void

/**
 * 精灵接口
 */
export interface ISprite extends ITransformable, IRenderState {
  // 精灵的名称
  name: string
  // ISprite引用一个IShape接口，如果draw和hitTest都调用
  shape: IShape
  // 双向关联，通过owner找到精灵所在容器
  owner: ISpriteContainer
  // 精灵包含的数据
  data: any
  // 点选碰撞检测
  hitTest(localPt: vec2): boolean
  // 更新
  update(mesc: number, diff: number, order: EOrder): void
  // 绘制
  draw(context: CanvasRenderingContext2D): void

  // 事件处理
  mouseEvent: MouseEventHandler | null
  keyEvent: KeyboardEventHandler | null
  updateEvent: UpdateEventHandler | null
  renderEvent: RenderEventHandler | null
}

/**
 * IDrawable所有接口方法依赖ITransformable, IRenderState和CanvasRenderingContext2D这3个参数进行绘制
 */
export interface IDrawable {
  // 用于draw之前的操作，例如渲染状态进栈、设备各个渲染状态值及设置当前变换矩阵
  beginDraw(transformable: ITransformable, state: IRenderState, context: CanvasRenderingContext2D): void
  // 用于形体的绘制操作
  draw(transformable: ITransformable, state: IRenderState, context: CanvasRenderingContext2D): void
  // 绘制后的操作，例如渲染状态恢复操作等
  endDraw(transformable: ITransformable, state: IRenderState, context: CanvasRenderingContext2D): void
}

/**
 * 用于点与IShape的精确碰撞检测
 * 如果选中返回true，否则返回false
 */
export interface IHittable {
  // 参数localPt点事相对于IShape所在的坐标系的偏移（offset）
  // 这意味着localPt = transform.getLocalMatrix * worldPt
  // 某些情况下可能需要获取worldPt， 可以做如下操作
  // worldPt = transform.getWorldMatrix * localPt
  // 其中 * 表示 Math2D.transform方法
  hitTest(localPt: vec2, transform: ITransformable): boolean
}

/**
 * 精灵形体
 */
export interface IShape extends IHittable, IDrawable {
  // 例如Rect, Circle等具有唯一性表示的字符串
  readonly type: string
  // 为了方便起见，有时候需要添加一些不知道数据类型的额外数据
  data: any
}
