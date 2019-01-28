import React, { useState } from "react";

export default () => {
  // const imgRef = useRef<any>(null);

  const [src, setSrc] = useState<string>("");

  const onChange = (e: any) => {
    const file: File = e.target.files[0];
    console.log(file);

    if (!file.type.startsWith("image/")) {
      return;
    }

    // if (imgRef.current) {
    //   imgRef.current.file = file
    // }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      setSrc(e.target.result);
      console.log(e)
    }
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div>File Handler</div>
      <input type="file" onChange={onChange} />
      <img src={src} />
    </div>
  );
};
