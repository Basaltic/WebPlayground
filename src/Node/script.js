
// const img = new Image()
// img.src = 'http://localhost:3000/image.jpeg'

// document.body.appendChild(img)
var flag = false
function test() {
  const jsonStr = `{"version":"2.7.0","objects":[{"type":"image","version":"2.7.0","originX":"left","originY":"top","left":100,"top":100,"width":770,"height":962,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.2,"scaleY":0.2,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"crossOrigin":"anonymous","cropX":0,"cropY":0,"src":"https://zhuji-public-beta-1256886009.picsh.myqcloud.com/123/goods/1548055404_79b59b94-a7f5-4bda-b260-57983b1d8eb7","filters":[]}]}`

  const fabCanvas = new fabric.Canvas('canvas')

  var rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'red',
    width: 20,
    height: 20
  });

  fabCanvas.add(rect)
  // fabCanvas.loadFromJSON(jsonStr)

  fabCanvas.loadFromJSON(jsonStr, () => {
    console.log(jsonStr)
    flag = true
  })
}
test()
