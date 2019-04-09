// 二维向量
export class vec2 {
  public values: Float32Array
  public constructor(x: number = 0, y: number = 0) {
    this.values = new Float32Array([x, y])
  }
  public toString(): string {
    return `[${this.values[0]},  ${this.values[1]}]`
  }
  public get x() {
    return this.values[0]
  }
  public set x(x: number) {
    this.values[0] = x
  }
  public get y() {
    return this.values[1]
  }
  public set y(y: number) {
    this.values[1] = y
  }

  public static create(x: number = 0, y: number = 0) {
    return new vec2(x, y)
  }
}

// 2D尺寸
export class Size {
  public values: Float32Array
  public constructor(w: number = 1, h: number = 1) {
    this.values = new Float32Array([w, h])
  }
  public toString(): string {
    return `[${this.values[0]},  ${this.values[1]}]`
  }
  public get width() {
    return this.values[0]
  }
  public set width(w: number) {
    this.values[0] = w
  }
  public get height() {
    return this.values[1]
  }
  public set height(h: number) {
    this.values[1] = h
  }

  public static create(w: number = 1, h: number = 1) {
    return new Size(w, h)
  }
}

// 矩形包围框
export class Rectangle {
  public origin: vec2
  public size: Size
  public constructor(origin: vec2 = new vec2(), size: Size = new Size()) {
    this.origin = origin
    this.size = size
  }
  public static create(x: number = 0, y: number = 0, w: number = 1, h: number = 1) {
    return new Rectangle(new vec2(x, y), new Size(w, h))
  }
}

const PiBy180: number = Math.PI / 180

export class Math2D {
  // 将角度表示的参数转换为弧度
  public static toRadian(degree: number) {
    return degree * PiBy180
  }
  // 将弧度表示的参数转换为角度表示
  public static toDegree(radian: number) {
    return radian / PiBy180
  }
}
