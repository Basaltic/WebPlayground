/**
 * 模拟Canvas的渲染状态机模式，来加深对于Canvas的原理的了解
 * 这里只模拟三个属性
 * lineWidth strokeStyle fillStyle
 */

export class RenderState {
  public lineWidth: number = 1
  public fillStyle: string = 'green'
  public strokeStyle: string = 'red'

  public clone(): RenderState {
    const state: RenderState = new RenderState()
    state.lineWidth = this.lineWidth
    state.fillStyle = this.fillStyle
    state.strokeStyle = this.strokeStyle
    return state;
  }

  public toString(): string{
    return JSON.stringify(this, null)
  }
}

export class RenderStateStack {
  private _stack: RenderState[] = [new RenderState()]
  // 获取堆栈顶部的渲染状态
  private get _currentState(): RenderState {
    return this._stack[this._stack.length - 1]
  }

  // save其实是克隆栈顶元素，并入栈
  public save(): void {
    this._stack.push(this._currentState.clone())
  }

  // restore就是把栈顶元素状态丢弃
  public restore(): void {
    this._stack.pop()
  }

  
}
