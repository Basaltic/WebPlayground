import 'fabric'
import React, { useRef, useEffect } from 'react'

declare const fabric: any

const url =
  'https://fe-1256886009.cos.ap-shanghai.myqcloud.com/assets/%E9%A2%84%E8%A7%88%E5%9B%BE%E7%89%87/%E4%BF%83%E9%94%80%E4%B8%BB%E5%9B%BE.jpg'

export function Fabric() {
  const canvasRef = useRef(null)

  let canvas: fabric.Canvas = new fabric.Canvas()
  let image: any = ''
  useEffect(() => {
    if (canvasRef.current) {
      canvas = new fabric.Canvas(canvasRef.current, {
        width: 400,
        height: 400,
        selection: true,
        hoverCursor: 'pointer',
        backgroundColor: 'white',
        selectionColor: 'rgba(41, 141, 248,1)',
        selectionBorderColor: 'rgba(41, 141, 248,1)',
        selectionLineWidth: 10,
        uniScaleTransform: false,
        controlsAboveOverlay: false,
        preserveObjectStacking: true,
        renderOnAddRemove: true,
      })

      CustomImage.fromURL(url, (img: any) => {
        image = img
        canvas.add(img)
      })
    }
  }, [])

  let jsonStr = ''
  const toJson = () => {
    jsonStr = JSON.stringify(canvas.toDatalessJSON())
    canvas.clear()
  }

  const loadJson = () => {
    canvas.loadFromDatalessJSON(jsonStr, (arg: any) => {
      console.log(arg)
    })
  }

  const setSrc = () => {
    image.setSrc('https://fe-1256886009.cos.ap-shanghai.myqcloud.com/assets/%E5%B0%81%E9%9D%A2%E5%9B%BE.png')
  }

  return (
    <div>
      <canvas style={{ border: '1px solid grey' }} ref={canvasRef} />
      <button onClick={setSrc}>set src</button>
      <button onClick={toJson}>to json</button>
      <button onClick={loadJson}>load json</button>
    </div>
  )
}

// 自定义的，可以自适应，可以自动裁剪的图片元素
const CustomImage = fabric.util.createClass(fabric.Rect, {
  type: 'CustomImage',
  src: '',

  initialize: function(element: any, options: any) {
    console.log('initialize')
    this.callSuper('initialize', element, options)
    if (options) {
      const { src } = options
      this.src = src
    }
  },

  setSrc: function(url: string, callback?: any) {
    fabric.Image.fromURL(url, (img: fabric.Image) => {
      const pattern = getPattern(this.width, this.height, img)

      this.set('fill', pattern)
      this.canvas.requestRenderAll()
    })
  },

  toObject: function() {
    const object = this.callSuper('toObject')
    object.fill = ''
    object.src = this.src
    return object
  },
})

CustomImage.fromURL = function(url: string, callback: any, options?: any) {
  fabric.Image.fromURL(url, (img: fabric.Image) => {
    const customImage = new fabric.CustomImage({
      src: url,
      width: img.width ? img.width * 2 : 0,
      height: img.height ? img.height * 2 : 0,
      left: 0,
      top: 0,
    })

    const pattern = getPattern(customImage.width, customImage.height, img)
    customImage.set('fill', pattern)

    customImage.scaleToHeight(200)

    callback(customImage)
  })
}

CustomImage.fromObject = function(image: any, callback: any) {
  console.log(image, callback)
  const callback2 = (obj: any, error: any) => {
    fabric.Image.fromURL(url, (img: fabric.Image) => {
      const customImage = new fabric.CustomImage({
        ...obj,
      })

      const pattern = getPattern(customImage.width, customImage.height, img)

      customImage.set('fill', pattern)
      callback(customImage, error)
    })
  }

  return fabric.Rect.fromObject(image, callback2)
}

fabric.CustomImage = CustomImage

function getPattern(customImageWidth: number, customImageHeight: number, img: fabric.Image) {
  // if (customImageWidth > customImageHeight) {
  //   img.scaleToWidth(customImageWidth * 0.5)
  // } else {
  //   img.scaleToHeight(customImageHeight * 0.5)
  // }

  const patternImageWidth = img.getScaledWidth()
  const patternImageHeight = img.getScaledHeight()

  const patternSourceCanvas = new fabric.StaticCanvas()
  patternSourceCanvas.setDimensions({ width: patternImageWidth, height: patternImageHeight })
  patternSourceCanvas.add(img)
  patternSourceCanvas.renderAll()
  const pattern = new fabric.Pattern({
    source: () => patternSourceCanvas.getElement(),
    repeat: 'no-repeat',
  })
  return pattern
}
