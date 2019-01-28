import React from 'react'
import SparkMD5 from "spark-md5";

export default () => {
  // Load File and compuate the md5 hash of the file content
  const onChange = async (e: any) => {
    const blobSlice = File.prototype.slice; //|| File.prototype.mozSlice || File.prototype.webkitSlice
    const file = e.target.files[0];
    const chunkSize = 2097152; // 2MB
    const chunks = Math.ceil(file.size / chunkSize);
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();

    let currentChunk = 0;

    console.log(file.name, file.size);
    console.log(file)

    fileReader.onload = function(e: any) {
      console.log("read chunk nr", currentChunk + 1, "of", chunks);
      spark.append(e.target.result); // Append array buffer
      currentChunk++;

      if (currentChunk < chunks) {
        loadNext();
      } else {
        console.log("finished loading");
        console.info("computed hash", spark.end()); // Compute hash
      }
    };
    fileReader.onerror = function() {
      console.warn("oops, something went wrong.");
    };

    function loadNext() {
      const start = currentChunk * chunkSize,
        end = start + chunkSize >= file.size ? file.size : start + chunkSize;

      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    loadNext();
  };
  return (<input type="file" onChange={onChange} />)
}