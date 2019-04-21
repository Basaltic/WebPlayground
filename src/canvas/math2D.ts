const EPSILON = 0.00001

// 二维向量。
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
  // 返回没有开根号的向量的大小
  public get squaredLength(): number {
    return this.x * this.x + this.y * this.y
  }
  // 返回真正的向量的大小
  public get length(): number {
    return Math.sqrt(this.squaredLength)
  }

  // 四个特殊的单位向量
  public static xAxis = new vec2(1, 0)
  public static yAxis = new vec2(0, 1)
  public static nXAxis = new vec2(-1, 0)
  public static nYAxis = new vec2(0, -1)

  public static create(x: number = 0, y: number = 0) {
    return new vec2(x, y)
  }

  public static copy(src: vec2, result: vec2 | null = null) {
    if (result === null) result = new vec2()
    result.x = src.x
    result.y = src.y
    return result
  }

  // 通过乘一个标量来改变向量的大小
  public static scale(direction: vec2, scalar: number, result: vec2): vec2 {
    if (result === null) result = new vec2()
    result.x = direction.x * scalar
    result.y = direction.y * scalar
    return result
  }

  // 缩放并相加
  // result = start + direction * scalar
  // 其意义是：将一个点（start），沿着direction给定的方向，移动scalar个单位
  public static scaleAdd(start: vec2, direction: vec2, scalar: number, result: vec2 | null = null): vec2 {
    if (result === null) result = new vec2()
    vec2.scale(direction, scalar, result)
    return vec2.sum(start, result, result)
  }

  // 两个向量的加法
  public static sum(left: vec2, right: vec2, result: vec2 | null = null): vec2 {
    if (result === null) result = new vec2()
    result.x = left.x + right.x
    result.y = left.y + right.y
    return result
  }

  // 向量差
  public static difference(end: vec2, start: vec2, result: vec2 | null): vec2 {
    if (result === null) result = new vec2()
    result.x = end.x - start.x
    result.y = end.y - start.y
    return result
  }

  // 向量的点乘
  public static dotProduct(left: vec2, right: vec2): number {
    return left.x * right.x + left.y * right.y
  }

  // 获取两个向量这边的夹角
  public static getAngle(a: vec2, b: vec2, isRadian: boolean = false): number {
    const dot: number = vec2.dotProduct(a, b)
    let radian: number = Math.acos(dot / (a.length * b.length))
    if (isRadian === false) {
      radian = Math2D.toDegree(radian)
    }
    return radian
  }

  // 朝向，表示物体的方向
  public static getOrientation(from: vec2, to: vec2, isRadian: boolean = false): number {
    const diff: vec2 = vec2.difference(to, from, null)
    let radian = Math.atan2(diff.y, diff.x)
    if (isRadian === false) {
      radian = Math2D.toDegree(radian)
    }
    return radian
  }

  // 叉乘
  public static crossProduct(left: vec2, right: vec2): number {
    return left.x * right.y - left.y * right.x
  }
  // 内积
  public innerProduct(right: vec2): number {
    return vec2.dotProduct(this, right)
  }

  // 在该向量的基础上加一个向量
  public add(right: vec2): vec2 {
    vec2.sum(this, right, this)
    return this
  }

  // 差
  public substract(another: vec2): vec2 {
    vec2.difference(this, another, this)
    return this
  }

  // 为了重用向量，有时需要重置x，y值
  public reset(x: number = 0, y: number = 0): vec2 {
    this.x = x
    this.y = y
    return this
  }

  // 为了避免浮点数误差，使用EPSILON进行容差处理，默认情况为0.00001
  public equals(vector: vec2): boolean {
    if (Math.abs(this.x - vector.x) > EPSILON) return false
    if (Math.abs(this.y - vector.y) > EPSILON) return false
    return true
  }

  // 调用本方法后会在内部修改当前向量的x和y值，修改后的向量大小为1.0（单位向量或叫方向向量），并返回未修改前的向量的大小
  // 方向 + 大小
  public normalize(): number {
    // 计算向量的大小
    const len: number = this.length
    // 对0向量的判断和处理
    if (Math2D.isEquals(len, 0)) {
      console.log('长度为0，并非方向向量')
      this.x = 0
      this.y = 0
      return 0
    }

    // 如果已经是单位向量了，直接返回1.0
    if (Math2D.isEquals(len, 1)) {
      console.log('The length = 1')
      return 1.0
    }

    this.x /= len
    this.y /= len
    return len
  }

  // 变为负向量
  public negative(): vec2 {
    this.x = -this.x
    this.y = -this.y
    return this
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

  public static isEquals(num1: number, num2: number) {
    return Math.abs(num1 - num2) < EPSILON
  }

  // 计算三角形两条边向量的叉积
  public static sign(v0: vec2, v1: vec2, v2: vec2): number {
    const e1: vec2 = vec2.difference(v1, v2, null)
    const e2: vec2 = vec2.difference(v1, v2, null)
    return vec2.crossProduct(e1, e2)
  }

  /**
   * 将一个点pt投影到start和end形成的线段上
   * 返回值： true表示pt在线段起点和终点之间， 此时closePoint输出参数返回线段上的投影坐标
   *        false表示在线段起点或终点之外，此时closePoint输入参数返回线段的起点或终点
   * 本方法使用了向量的difference， normalize，dotProduct，scaleAdd，scale，sum 方法
   */
  public static projectPointOnLineSegment(pt: vec2, start: vec2, end: vec2, closePoint: vec2): boolean {
    const v0: vec2 = vec2.create()
    const v1: vec2 = vec2.create()

    let d: number = 0
    vec2.difference(pt, start, v0)
    vec2.difference(end, start, v1)

    d = v1.normalize()

    let t: number = vec2.dotProduct(v0, v1)

    if (t < 0) {
      closePoint.x = start.x
      closePoint.y = start.y
    } else if (t > d) {
      closePoint.x = end.x
      closePoint.y = end.y
    } else {
      vec2.scaleAdd(start, v1, t, closePoint)
    }

    return true
  }

  // 是否是凸多边形
  public static isConvex(points: vec2[]): boolean {
    let sign: boolean = Math2D.sign(points[0], points[1], points[2]) < 0
    let j: number, k: number
    for (let i: number = 1; i < points.length; i++) {
      j = (i + 1) % points.length
      k = (i + 2) % points.length

      if (sign !== Math2D.sign(points[i], points[j], points[k]) < 0) {
        return false
      }
    }

    return true
  }

  public static isPointInTriangle(pt: vec2, v0: vec2, v1: vec2, v2: vec2): boolean {
    // 计算三角形三个顶点与点pt形成的三个子三角形的边向量的叉积
    const b1: boolean = Math2D.sign(v0, v1, pt) < 0.0
    const b2: boolean = Math2D.sign(v1, v2, pt) < 0.0
    const b3: boolean = Math2D.sign(v2, v0, pt) < 0.0
    return b1 === b2 && b2 === b3
  }

  public static isPointInPolygon(pt: vec2, points: vec2[]): boolean {
    if (points.length < 3) {
      return false
    }
    for (let i: number = 2; i < points.length; i++) {
      if (Math2D.isPointInTriangle(pt, points[0], points[i - 1], points[i])) {
        return true
      }
    }
    return false
  }

  /**
   *
   */
  public static isPointInCircle(pt: vec2, center: vec2, radius: number): boolean {
    const diff: vec2 = vec2.difference(pt, center, null)
    const len2: number = diff.squaredLength

    if (len2 <= radius * radius) {
      return true
    }
    return false
  }

  public static isPointInRect(ptX: number, ptY: number, x: number, y: number, w: number, h: number): boolean {
    if (ptX >= x && ptX <= x + w && ptY >= y && ptY <= y + h) {
      return true
    }
    return false
  }

  // 椭圆碰撞检测
  public static isPointInEllipse(ptX: number, ptY: number, centerX: number, centerY: number, radiusX: number, radiusY: number) {
    const diffX = ptX - centerX
    const diffY = ptY - centerY
    const n: number = (diffX * diffX) / (radiusX * radiusX) + (diffY * diffY) / (radiusY * radiusY)
    return n <= 1.0
  }

  // 三角形碰撞检测
  // 点p与三角形的3个顶点[v0,v1,v2]形成的三个子三角形的顶点排列顺序一直，那么p在三角形内

  public static isPointOnLineSegment(pt: vec2, start: vec2, end: vec2, radius: number = 2): boolean {
    const closePt: vec2 = vec2.create()

    if (Math2D.projectPointOnLineSegment(pt, start, end, closePt) === false) {
      return false
    }

    return Math2D.isPointInCircle(pt, closePt, radius)
  }
}

/**
 * 矩阵 类
 */
export class mat2d {
  public values: Float32Array // 表示矩阵的各个元素
  public constructor(a: number = 1, b: number = 0, c: number = 0, d: number = 1, x: number = 0, y: number = 0) {
    this.values = new Float32Array()
  }
}
