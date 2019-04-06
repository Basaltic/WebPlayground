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
