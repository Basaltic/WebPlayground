import { Application, CanvasKeyboardEvent, CanvasMouseEvent } from "../Application/Application";

/**
 * 测试
 */
export class ApplicationTest extends Application {
  protected dispatchKeyDown(evt: CanvasKeyboardEvent): void {
    console.log(`key: ${evt.key} is down`)
  }

  protected dispatchMouseDown(evt: CanvasMouseEvent): void {
    console.log(`canvasPosition ${JSON.stringify(evt.canvasPosition)}`)
  }

  public update(elapsedMsec: number, intervalSec: number) {
    console.log(`elapsedMsec ${elapsedMsec}, intervalSec ${intervalSec}`)
  }

  public render(): void {
    console.log('Call render Method!')
  }
}