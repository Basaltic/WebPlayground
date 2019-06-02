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
  public static difference(end: vec2, start: vec2, result: vec2 | null = null): vec2 {
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

  // 用单位向量来表示 sin，通过这种方式可以替换计算量大的三角函数运算
  // 等价为：夹角为 a 的两个单位向量的叉积
  public static sinAngle(a: vec2, b: vec2, norm: boolean = false): number {
    if (norm === true) {
      a.normalize()
      b.normalize()
    }
    // return a.x * b.y - b.x * a.y
    return vec2.crossProduct(a, b)
  }

  // 用单位向量来表示 cos，通过这种方式可以替换计算量大的三角函数运算
  // 等价位：夹角为 a 的两个单位向量的点积
  public static cosAngle(a: vec2, b: vec2, norm: boolean = false): number {
    if (norm === true) {
      a.normalize()
      b.normalize()
    }
    return vec2.dotProduct(a, b)
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

/**
 * 矩阵 类
 *
 * 3 * 3 仿射矩阵，最后一行固定为[0, 0, 1]
 * 仿射变换，又称仿射映射，是指在几何中，一个向量空间进行一次线性变换并接上一个平移，变换为另一个向量空间
 * a0 a2 a4
 * a1 a3 a5
 * 0  0  1
 */
export class mat2d {
  public values: Float32Array // 表示矩阵的各个元素
  public constructor(a: number = 1, b: number = 0, c: number = 0, d: number = 1, x: number = 0, y: number = 0) {
    this.values = new Float32Array([a, b, c, d, x, y])
  }
  public static create(a: number = 1, b: number = 0, c: number = 0, d: number = 1, x: number = 0, y: number = 0) {
    return new mat2d(a, b, c, d, x, y)
  }

  /**
   * 复制一个 新的矩阵
   * @param mat
   */
  public static copy(mat: mat2d, mat2?: mat2d) {
    if (mat2) {
      mat.values = mat2.values
      return mat
    }
    return new mat2d(mat.values[0], mat.values[1], mat.values[2], mat.values[3], mat.values[4], mat.values[5])
  }

  /**
   * 矩阵乘法
   */
  public static multiply(left: mat2d, right: mat2d, result: mat2d) {
    if (result === null) result = new mat2d()
    const a0 = left.values[0]
    const a1 = left.values[1]
    const a2 = left.values[2]
    const a3 = left.values[3]
    const a4 = left.values[4]
    const a5 = left.values[5]

    const b0 = right.values[0]
    const b1 = right.values[1]
    const b2 = right.values[2]
    const b3 = right.values[3]
    const b4 = right.values[4]
    const b5 = right.values[5]

    result.values[0] = a0 * b0 + a2 * b1
    result.values[1] = a1 * b0 + a3 * b1
    result.values[2] = a0 * b2 + a2 * b3
    result.values[3] = a1 * b2 + a3 * b3
    result.values[4] = a0 * b4 + a2 * b5 + a4
    result.values[5] = a1 * b4 + a3 * b5 + a5
    return result
  }

  /**
   * 变为单位矩阵
   * 单位矩阵是对角线是1，其他都是0
   */
  public identity(): void {
    this.values[0] = 1
    this.values[1] = 0
    this.values[2] = 0
    this.values[3] = 1
    this.values[4] = 0
    this.values[5] = 0
  }

  /**
   * 计算矩阵的行列式
   * 二阶行列式的另一个意义就是是两个行向量或列向量的叉积的数值，这个数值是z轴上（在二维平面上，z轴的正向想象为指向读者的方向）的叉积分量。如果数值是正值，则与z坐标同向；负值就与z坐标反向。如果我们不强调叉积是第三维的向量，也就是忽略单位向量，那么二阶行列式就与两个向量的叉积完全等价了
   * @param mat
   */
  public static determinant(mat: mat2d): number {
    return mat.values[0] * mat.values[3] - mat.values[2] * mat.values[1]
  }

  // 求矩阵src的逆矩阵，将结算后的逆矩阵从result参数输出
  // 如果有逆矩阵，返回true，否则false
  // 下面采用 伴随矩阵，行列式的方式求矩阵的逆
  // 逆矩阵的一个大的用途是实现矩阵的乘法。矩阵A * A的逆矩阵是单位矩阵
  public static invert(src: mat2d, result: mat2d): boolean {
    // 1.获取要求逆矩阵的行列式
    let det: number = mat2d.determinant(src)

    // 2.如果行列式为0，则无法求逆，直接返回false
    if (Math2D.isEquals(det, 0)) {
      return false
    }

    // 3.下面采用 伴随矩阵，行列式的方式求矩阵的逆
    // 由于计算机除法效率低下，先进行一次除法，求行列式的函数
    // 后面代码可以直接乘以行列式的倒数，这样避免了多次除法操作
    det = 1.0 / det

    // 4.下面代码中，* det都是求标准伴随矩阵的源码
    result.values[0] = src.values[3] * det
    result.values[1] = -src.values[1] * det
    result.values[2] = -src.values[2] * det
    result.values[3] = src.values[0] * det
    result.values[4] = (src.values[2] * src.values[5] - src.values[3] * src.values[4]) * det
    result.values[5] = (src.values[1] * src.values[4] - src.values[0] * src.values[5]) * det

    return true
  }

  /**
   * 采用列向量的方式
   * x
   * y
   * 0
   * 矩阵 A * 列向量B =  列向量C
   */
  public static transform(mat: mat2d, pt: vec2, result: vec2 | null = null): vec2 {
    if (result === null) result = vec2.create()
    result.values[0] = mat.values[0] * pt.values[0] + mat.values[2] * pt.values[1] + mat.values[4]
    result.values[1] = mat.values[1] * pt.values[0] + mat.values[3] * pt.values[1] + mat.values[5]
    return result
  }

  // 生成2d 平移矩阵。把向量、坐标 乘以 平移矩阵就实现的平移的效果
  public static makeTranslation(tx: number, ty: number, result: mat2d | null = null): mat2d {
    if (result === null) result = new mat2d()
    result.values[0] = 1
    result.values[1] = 0
    result.values[2] = 0
    result.values[3] = 1
    result.values[4] = tx
    result.values[5] = ty
    return result
  }

  // 生成缩放矩阵
  public static makeScale(sx: number, sy: number, result: mat2d | null = null): mat2d {
    if (result === null) result = new mat2d()
    result.values[0] = sx
    result.values[1] = 0
    result.values[2] = 0
    result.values[3] = sy
    result.values[4] = 0
    result.values[5] = 0
    return result
  }

  // 生成旋转矩阵
  public static makeRotation(radians: number, result: mat2d | null = null): mat2d {
    if (result === null) result = new mat2d()
    const s: number = Math.sin(radians)
    const c: number = Math.cos(radians)
    result.values[0] = c
    result.values[1] = s
    result.values[2] = -s
    result.values[3] = c
    result.values[4] = 0
    result.values[5] = 0
    return result
  }

  // 只求旋转矩阵的逆矩阵
  // 采用最简单的办法：转置
  // cos(a)   sin(a)
  // -sin(a)  cos(a)
  // 转置为
  // cos(a)   -sin(a)
  // sin(a)   cos(a)
  // 这种方式效率最高，只要更改一下顺序
  public onlyRotationMatrixInvert(): mat2d {
    const s: number = this.values[1]
    this.values[1] = this.values[2]
    this.values[2] = s
    return this
  }

  // 通过向量的方式来构建旋转矩阵
  public static makeRotationFromVectors(v1: vec2, v2: vec2, norm: boolean = false, result: mat2d | null = null): mat2d {
    if (result === null) result = new mat2d()

    result.values[0] = vec2.cosAngle(v1, v2, norm)
    result.values[1] = vec2.sinAngle(v1, v2, norm)
    result.values[2] = -vec2.sinAngle(v1, v2, norm)
    result.values[3] = vec2.cosAngle(v1, v2, norm)
    result.values[4] = 0
    result.values[5] = 0
    return result
  }
}

/**
 * 矩阵堆栈
 */
export class MatrixStack {
  // 持有一个矩阵堆栈
  private _mats: mat2d[]

  public constructor() {
    // 初始化矩阵堆栈并且push一个单位矩阵
    this._mats = []
    this._mats.push(new mat2d())
  }

  // 获取栈顶的矩阵（也就是当前炒作矩阵）
  // 矩阵堆栈操作的都是当前堆栈顶部的矩阵
  public get matrix(): mat2d {
    if (this._mats.length === 0) {
      alert('矩阵堆栈为空！')
      throw new Error('矩阵堆栈为空！')
    }
    return this._mats[this._mats.length - 1]
  }

  // 复制栈顶的矩阵，将其push到堆栈中成为当前操作矩阵
  public pushMatrix(): void {
    const mat: mat2d = mat2d.copy(this.matrix)
    this._mats.push(mat)
  }

  // 删除栈顶的矩阵
  public popMatrix(): void {
    if (this._mats.length === 0) {
      alert('矩阵堆栈为空')
      return
    }
    this._mats.pop()
  }

  // 将堆栈顶部的矩阵设置为单位矩阵
  public loadIdentity(): void {
    this.matrix.identity()
  }

  // 将参数mat矩阵替换堆栈顶部的矩阵
  public loadMatrix(mat: mat2d): void {
    mat2d.copy(mat, this.matrix)
  }

  // 将栈顶（当前矩阵）矩阵与参数矩阵相乘
  // 其作用是更新栈顶元素，累积变换效果
  // 是一个关键操作
  public multMatrix(mat: mat2d): void {
    mat2d.multiply(this.matrix, mat, this.matrix)
  }
  public translate(x: number = 0, y: number = 0): void {
    let mat: mat2d = mat2d.makeTranslation(x, y)
    // 看到translate， rotate和scale都会调用multMatrix
    this.multMatrix(mat)
  }
  public rotate(angle: number = 0, isRadian: boolean = true): void {
    if (isRadian === false) {
      angle = Math2D.toRadian(angle)
    }
    const mat: mat2d = mat2d.makeRotation(angle)
    this.multMatrix(mat)
  }
  // 从两个向量构建旋转矩阵
  public rotateFrom(v1: vec2, v2: vec2, norm: boolean = false): void {
    const mat: mat2d = mat2d.makeRotationFromVectors(v1, v2, norm)
    this.multMatrix(mat)
  }
  public scale(x: number = 1.0, y: number = 1.0): void {
    const mat: mat2d = mat2d.makeScale(x, y)
    this.multMatrix(mat)
  }
  public invert(): mat2d {
    const ret: mat2d = new mat2d()
    if (mat2d.invert(this.matrix, ret) === false) {
      alert('堆栈顶部矩阵为奇异矩阵，无法求你')
      throw new Error('堆栈顶部矩阵为奇异矩阵，无法求你')
    }
    return ret
  }
}

const PiBy180: number = Math.PI / 180

/**
 * 2D 数学类
 */
export class Math2D {
  public static matStack: MatrixStack = new MatrixStack()

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

  // 二次贝塞尔曲线标量版
  public static getQuadraticBezierPosition(start: number, ctrl: number, end: number, t: number): number {
    if (t < 0.0 || t > 1.0) {
      throw new Error('取值范围为[0, 1]')
    }
    const t1: number = 1.0 - t
    const t2: number = t1 * t1
    return t2 * start + 2 * t * t1 * ctrl + t * t * end
  }

  // 二次贝塞尔曲线向量版
  public static getQuadraticBezierVector(start: vec2, ctrl: vec2, end: vec2, t: number, result: vec2 | null = null): vec2 {
    if (result === null) result = vec2.create()
    result.x = Math2D.getQuadraticBezierPosition(start.x, ctrl.x, end.x, t)
    result.y = Math2D.getQuadraticBezierPosition(start.y, ctrl.y, end.y, t)
    return result
  }

  // 三次贝塞尔曲线标量版
  public static getCubicBezierPosition(start: number, ctrl0: number, ctrl1: number, end: number, t: number): number {
    if (t < 0.0 || t > 1.0) {
      throw new Error('取值范围为[0, 1]')
    }
    const t1: number = 1.0 - t
    const t2: number = t * t
    const t3: number = t2 * t
    return t1 * t1 * t1 * start + 3 * t * (t1 * t1) * ctrl0 + 3 * t2 * t1 * ctrl1 + t3 * end
  }

  // 三次贝塞尔曲线向量版
  public static getCubicBezierVector(start: vec2, ctrl0: vec2, ctrl1: vec2, end: vec2, t: number, result: vec2 | null = null): vec2 {
    if (result === null) result = vec2.create()
    result.x = Math2D.getCubicBezierPosition(start.x, ctrl0.x, ctrl1.x, end.x, t)
    result.y = Math2D.getCubicBezierPosition(start.y, ctrl0.y, ctrl1.y, end.y, t)
    return result
  }

  public static transform() {}
}

/**
 * 2d转换类
 */
export class Transform2D {
  // 位移
  public position: vec2
  // 方向
  public rotation: number
  // 缩放
  public scale: vec2
  public constructor(x: number = 0, y: number = 0, rotation: number = 0, scaleX: number = 1, scaleY: number = 1) {
    this.position = new vec2(x, y)
    this.rotation = rotation
    this.scale = new vec2(scaleX, scaleY)
  }
  // 转换为矩阵
  public toMatrix(): mat2d {
    // 设置矩阵栈顶矩阵归一化
    Math2D.matStack.loadIdentity()
    // 先平移
    Math2D.matStack.translate(this.position.x, this.position.y)
    // 然后旋转，最后一个参数false，表示rotation是角度，非弧度
    Math2D.matStack.rotate(this.rotation, false)
    // 最后是缩放
    Math2D.matStack.scale(this.scale.x, this.scale.y)
    // 返回TRS合成后的，表示从局部到世界的变换矩阵
    return Math2D.matStack.matrix
  }
  public toInvMatrix(result: mat2d): boolean {
    // 获取从局部到世界的变换矩阵
    const mat: mat2d = this.toMatrix()
    // 求逆矩阵，从世界到局部的变换矩阵
    return mat2d.invert(mat, result)
  }
}
