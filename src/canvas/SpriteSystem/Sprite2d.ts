import {
  ISprite,
  ERenderType,
  IShape,
  ISpriteContainer,
  MouseEventHandler,
  KeyboardEventHandler,
  UpdateEventHandler,
  RenderEventHandler,
} from './Sprite2DApplication'
import { Transform2D, mat2d, vec2 } from '../math2D'
import { EOrder } from './Sprite2DApplication'

/**
 * 精灵🧚‍
 */
export class Sprite2D implements ISprite {
  public showCoordSystem: boolean = false
  public renderType: ERenderType = ERenderType.FILL
  public isVisible: boolean = true
  public fillStyle: string | CanvasGradient | CanvasPattern = 'white'
  public strokeStyle: string | CanvasGradient | CanvasPattern = 'black'
  public lineWidth: number = 1

  // ITransformable接口的成员属性和方法都委托Transform2D中实现
  public transform: Transform2D = new Transform2D()

  // ISprite本身的成员变量
  public name: string
  public shape: IShape
  public data: any
  public owner!: ISpriteContainer

  public mouseEvent: MouseEventHandler | null = null
  public keyEvent: KeyboardEventHandler | null = null
  public updateEvent: UpdateEventHandler | null = null
  public renderEvent: RenderEventHandler | null = null

  public constructor(shape: IShape, name: string) {
    this.name = name
    this.shape = shape
  }

  public get x(): number {
    return this.transform.position.x
  }

  public set y(y: number) {
    this.transform.position.y = y
  }

  public get y(): number {
    return this.transform.position.y
  }

  public set rotation(rotation: number) {
    this.transform.rotation = rotation
  }

  public get rotation(): number {
    return this.transform.rotation
  }

  public set scaleX(s: number) {
    this.transform.scale.x = s
  }

  public get scaleX(): number {
    return this.transform.scale.x
  }

  public set scaleY(s: number) {
    this.transform.scale.y = s
  }

  public get scaleY(): number {
    return this.transform.scale.y
  }

  public getWorldMatrix(): mat2d {
    return this.transform.toMatrix()
  }

  // 如果矩阵求逆失败，直接抛出错误
  public getLocalMatrix(): mat2d {
    const src: mat2d = this.getWorldMatrix()
    const out: mat2d = mat2d.create()

    if (mat2d.invert(src, out)) {
      return out
    } else {
      alert('矩阵求逆失败')
      throw new Error('矩阵求逆失败')
    }
  }

  // 下面是ISprite接口成员方法的实现
  public update(mesc: number, diff: number, order: EOrder): void {
    // 如果当前精灵有挂载updateEvent, 则触发该事件
    if (this.updateEvent) {
      this.updateEvent(this, mesc, diff, order)
    }
  }

  // 委托调用IShape对应的hitTest方法（IHittable接口）
  // 而ISprite接口的hitTest方法依赖ITransform接口
  public hitTest(localPt: vec2): boolean {
    if (this.isVisible) {
      // 要将光标点变换为局部坐标系
      return this.shape.hitTest(localPt, this)
    } else {
      return false
    }
  }

  // 委托调用IShape对应的draw方法（IDrawable接口）
  // 而IShape接口的beginDraw，draw，endDraw方法依赖ITransform和IrenderState接口
  // 如果有必要同事会触发renderEvent事件
  public draw(context: CanvasRenderingContext2D): void {
    if (this.isVisible) {
      // 渲染状态进栈
      // 然后 设置渲染状态及当前变换矩阵
      this.shape.beginDraw(this, this, context)

      // 在draw之前，触发PREORDER渲染事件
      if (this.renderEvent !== null) {
        this.renderEvent(this, context, EOrder.PREORDER)
      }

      // 调用主要的绘图方法
      this.shape.draw(this, this, context)

      // 在Draw之后，触发POSTORDER渲染事件
      if (this.renderEvent !== null) {
        this.renderEvent(this, context, EOrder.POSTORDER)
      }

      // 恢复渲染状态
      this.shape.endDraw(this, this, context)
    }
  }
}

/**
 * 精灵工厂
 */
export class SpriteFactory {
  public static createSprite(shape: IShape, name: string): ISprite {
    let spr: ISprite = new Sprite2D(shape, name)
    return spr
  }
}
