import { Canvas2DApplication } from '../Application/Canvas2DApplication'
import { CanvasMouseEvent, CanvasKeyboardEvent } from '../Application/Application'
import { mat2d } from '../math2D'

export default class Sprite2DApplication extends Canvas2DApplication {
  // 声明一个受保护的类型为IDispatcher的成员变量
  // 下面所有的虚方法都委托调用IDispatcher相关的方法
  protected _dispatcher: IDispatcher
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
