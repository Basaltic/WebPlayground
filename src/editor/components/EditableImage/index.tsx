import 'fabric';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
declare let fabric: any;

const canvasWidth = 300;
const canvasHeight = 300;
const collageInnerMargin = 10;
const collageOuterMargin = 10;

const collage = {
  width: 360,
  height: 360,
  grid: {
    slots: [{ name: 1, top: 0, left: 0, width: 0.5, height: 1 }, { name: 2, top: 0, left: 0.5, width: 0.5, height: 1 }],
  },
  images: [],
};

const img01URL = 'http://fabricjs.com/assets/pug_small.jpg';
const img02URL = 'http://fabricjs.com/lib/pug.jpg';

export default () => {
  // const { attributes, children } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas>(new fabric.Canvas('null'));

  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    if (canvasRef !== null) {
      const newCanvas = new fabric.Canvas(canvasRef.current as HTMLCanvasElement, {
        backgroundColor: 'lightGrey',

        width: canvasWidth,
        height: canvasHeight,

        // Disable Group Selection
        snapAngle: 90,
        selection: true,
        uniScaleTransform: false,
        controlsAboveOverlay: false,
        perPixelTargetFind: true,
      });

      setCanvas(newCanvas);
    }
  }, []);

  const draw = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20,
      angle: 45,
    });

    rect.on('selected', (options: any) => {
      console.log('selected', options);
    });

    rect.set('fill', 'red');
    rect.set({ strokeWidth: 5, stroke: 'rgba(100,200,200,0.5)' });
    rect.set('angle', 15).set('flipY', true);

    rect.setGradient('fill', {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: rect.height,
      colorStops: {
        0: 'red',
        0.5: 'green',
        1: 'blue',
      },
    });

    rect.animate('left', 200, {
      onChange: canvas.renderAll.bind(canvas),
      duration: 2000,
      easing: fabric.util.ease.easeOutBounce,
    });

    canvas.add(rect);
  };

  const manipulate = () => {
    // fabric.Image.fromURL(
    //   img01URL,
    //   () => {},
    //   { crossOrigin: 'Anonymous' },
    // );
    // canvas.setBackgroundImage(img01URL, () => {}, { crossOrigin: 'anonymous'})
    console.log('manipulate');
    canvas.setBackgroundColor('#999999', () => {});
    canvas.renderAll();
  };

  const drawImage = () => {
    fabric.Image.fromURL(
      img01URL,
      (image: fabric.Image) => {
        image.set({ scaleX: 0.5, scaleY: 0.5, opacity: 0.5 });

        // Add Filter and Apply
        // if (image.filters) {
        //   fabric.Image.filters.Redify = fabric.util.createClass(fabric.Image.filters.BaseFilter, {
        //     type: 'Redify',

        //     /**
        //      * Fragment source for the redify program
        //      */
        //     fragmentSource: `precision highp float;
        //       uniform sampler2D uTexture;
        //       varying vec2 vTexCoord;
        //       void main() {
        //         vec4 color = texture2D(uTexture, vTexCoord);
        //         color.g = 0;
        //         color.b = 0;
        //         gl_FragColor = color;
        //       }`,

        //     applyTo: function(options: any) {
        //       // console.log(options)
        //       // const imageData = options.imageData;
        //       // const data = imageData.data;

        //       // const len = data.length;

        //       // for (let i = 0; i < len; i += 4) {
        //       //   data[i + 1] = 0;
        //       //   data[i + 2] = 0;
        //       // }
        //     },
        //   });
        //   fabric.Image.filters.Redify.fromObject = fabric.Image.filters.BaseFilter.fromObject;

        // image.filters.push(new fabric.Image.filters.Grayscale());
        // image.filters.push(new fabric.Image.filters.Sepia());
        // image.filters.push(new fabric.Image.filters.Redify());

        //   image.applyFilters();
        // }

        canvas.add(image);
      },
      { crossOrigin: 'anonymous' },
    );
  };

  const drawPath = () => {
    const path = new fabric.Path('M 0 0 L 200 100 L 170 200 z');
    path.set({ left: 0, top: 0 });
    path.set({ fill: 'red', stroke: 'green', opacity: 0.5 });
    canvas.add(path);
  };

  const drawText = () => {
    const text = new fabric.Text('hello world', { left: 50, top: 50, fontFamily: 'Comic Sans' });
    canvas.add(text);
  };

  const drawGroup = () => {
    const circle = new fabric.Circle({
      radius: 100,
      fill: '#eef',
      scaleY: 0.5,
      originX: 'center',
      originY: 'center',
    });

    const text = new fabric.Text('hello world', {
      fontSize: 30,
      originX: 'center',
      originY: 'center',
    });

    const group = new fabric.Group([circle, text], {
      left: 150,
      top: 100,
      angle: -10,
    });

    canvas.add(group);
  };

  const setEvents = () => {
    canvas.on('mouse:down', (options: any) => {
      console.log(options);
      console.log(options.e.clientX, options.e.clientY);
      if (options.target) {
        console.log(options.target.type);
      }
    });
  };

  const serialize = () => {
    const jsonObj = canvas.toDatalessJSON();
    const jsonStr = JSON.stringify(jsonObj);
    console.log(jsonStr);
    console.log(JSON.stringify(canvas));

    const src = canvas.toDataURL({ format: 'jpeg', quality: 1,  enableRetinaScaling: true });
    setImageSrc(src)
    // const image = document.getElementById('image') as HTMLImageElement;
    // if (image) {
    //   image.src = src;
    // }
  };

  return (
    <div id="test-capture">
      <canvas ref={canvasRef} width="500" height="256" />
      <button onClick={draw}>draw shape</button>
      <button onClick={drawText}>draw text</button>
      <button onClick={drawPath}>draw paths</button>
      <button onClick={drawImage}>draw image</button>
      <div>
        <button onClick={drawGroup}>draw group</button>
      </div>
      <div>
        <button onClick={manipulate}>manipulate</button>
        <button onClick={setEvents}>set events</button>
        <button id="serialize" onClick={serialize}>
          Serialize
        </button>
      </div>
      <div>
        <img id="image" src={imageSrc} />
      </div>
    </div>
  );
};
