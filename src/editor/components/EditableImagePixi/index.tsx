import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';
// import { RenderNodeProps } from 'slate-react';

export default () => {
  // const { attributes, children } = props;

  const editingRef = useRef<HTMLDivElement>(null);
  const app = new PIXI.Application({ width: 500, height: 256, antialias: true, transparent: false, resolution: 1 });
  let sprite: PIXI.Sprite | null = null;

  useEffect(() => {
    editingRef.current && editingRef.current.appendChild(app.view);
  }, []);

  const onLoad = () => {
    const resourceMap = new Map();
    resourceMap.set(
      'test',
      'https://zhuji-public-beta-1256886009.picsh.myqcloud.com/123/goods/1548055404_79b59b94-a7f5-4bda-b260-57983b1d8eb7',
    );

    PIXI.loader.add('test', resourceMap.get('test'), { crossOrigin: 'anonymous', loadType: 2 }).load((lder: any, resources: any) => {
      const resource = resources['test'];

      sprite = new PIXI.Sprite(resource.texture);
      sprite.width = 200;
      sprite.height = 200;

      try {
        app.stage.addChild(sprite);
      } catch (e) {}
      console.log(app.stage.children);
    });
  };

  const rotate = () => {
    if (sprite !== null) {
      // sprite.anchor.set(1, 1)
      sprite.rotation = 0.5;
    }
  };

  return (
    <div>
      <div ref={editingRef} />
      <button onClick={onLoad}>load</button>
      <button onClick={rotate}>rotate</button>
    </div>
  );
};
