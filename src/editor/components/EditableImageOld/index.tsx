import React, { useEffect, useState, useRef } from 'react';
import interact from 'interactjs';
import html2canvas from 'html2canvas';
import { RenderNodeProps } from 'slate-react';
import logo from '../../../image.jpeg';

export default (props: RenderNodeProps) => {
  const { attributes, children, node, editor } = props;

  const captureAreaRef = useRef<any>(null);
  const [image, setImage] = useState<string>('');

  const captureImage = () => {
    if (captureAreaRef.current) {
      const element = document.querySelector('#test-capture') as HTMLElement;
      html2canvas(element).then(canvas => {
        const imageDataUrl = canvas.toDataURL('image/png');
        setImage(imageDataUrl);
        // document.body.appendChild(canvas);

      });
    }
  };

  return (
    <div {...attributes}>
      <div
        ref={captureAreaRef}
        id="test-capture"
        style={{ width: '300px', height: '300px', backgroundColor: '#e8e9e8', position: 'relative' }}
        contentEditable={false}
      >
        <InteractableImage />
        <InteractableText />
      </div>
      <button onClick={captureImage}>Convert To Image</button>
      {image ? (
        <div style={{ width: '300px', height: '300px' }}>
          <img src={image} style={{ width: '100%', height: '100%' }} />
        </div>
      ) : null}
      {children}
    </div>
  );
};

function dragEvent(event: any) {
  var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  // target.style.top = x + 'px';
  // target.style.left = y + 'px';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

function InteractableImage() {
  useEffect(() => {
    interact('.resize-drag')
      .draggable({
        onmove: dragEvent,
        restrict: {
          restriction: 'parent',
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
        },
      })
      .resizable({
        edges: { left: false, right: true, bottom: true, top: false },

        inertia: true,
      })
      .on('resizemove', function(event: any) {
        var target = event.target,
          x = parseFloat(target.getAttribute('data-x')) || 0,
          y = parseFloat(target.getAttribute('data-y')) || 0;

        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        console.log(Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height));
        // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
      });
  });

  return (
    <div className="resize-drag" style={{ width: '100px', height: '100px', position: 'absolute' }}>
      <img
        draggable={false}
        src={logo}
        style={{ width: '200px', height: '200px' }}
      />
    </div>
  );
}

function InteractableText() {
  useEffect(() => {
    interact('.drag-text').draggable({
      onmove: dragEvent,
      restrict: {
        restriction: 'parent',
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
      },
    });
  });

  return (
    <div className="drag-text" style={{ width: 'fit-content', position: 'absolute' }}>
      <p style={{ userSelect: 'none' }}>你好</p>
    </div>
  );
}
