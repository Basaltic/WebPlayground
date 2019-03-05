import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import logo from '../image.jpeg';

export default () => {
  const capture = () => {
    const element = document.querySelector('#test-capture') as HTMLElement;
    if (element) {
      html2canvas(element).then(canvas => {
        document.body.appendChild(canvas);
        const dataUrl = canvas.toDataURL('image/png');
        const BASE64_MARKER = ';base64,';
        const parts = dataUrl.split(BASE64_MARKER);
        const raw = window.atob(parts[1]);
        const rawLength = raw.length;
        const uInt8Array = new Uint8Array(rawLength);

        for (let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }

        const contentType = parts[0].split(':')[1];
        const blob = new Blob([uInt8Array], { type: contentType });
        console.log(blob);
      });
    }
  };

  return (
    <div>
      <div id="test-capture" style={{ width: 200, height: 200 }}>
        <div>
          <img src={logo} style={{ width: 200, height: 200 }} />
        </div>
        <p style={{ color: 'red', position: 'absolute', top: '10px', left: '10px' }}>text</p>
      </div>
      <button onClick={capture}>Capture</button>
    </div>
  );
};
