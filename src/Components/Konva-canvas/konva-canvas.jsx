// import React from "react";
// import { Stage, Layer, Rect, Konva } from "react-konva";
// import { URLImage } from "../common/UrlImage";

// const KonvaCanvas = () => {
//   // var width = window.innerWidth;
//   // var height = window.innerHeight;

//   // var stage = new Konva.Stage({
//   //   container: "container",
//   //   width: width,
//   //   height: height,
//   // });

//   return (
//     <>
//       <Stage width={window.innerWidth} height={window.innerHeight}>
//         <Layer>
//           <URLImage
//             src="https://www.tracyanddale.com/India/Rajasthan/images/city%20palace.JPG"
//             x={10}
//             y={10}
//           />
//         </Layer>
//         {/* <Layer>
//           <Rect
//             fillpatternimage="{<Image src='https://www.tracyanddale.com/India/Rajasthan/images/city%20palace.JPG' />}"
//             fillpriority="pattern"
//             height="{500}"
//             width="{500}"
//           />
//         </Layer> */}
//       </Stage>
//       {/* <div className="canvas-container"></div> */}
//     </>
//   );
// };

// export default KonvaCanvas;

import React, { useEffect } from "react";
import Konva from "konva";
import cityPalaceImage from "./city-palace.jpeg";

const KonvaImageDemo = () => {
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const stage = new Konva.Stage({
      container: "container",
      width: width,
      height: height,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    // Load Yoda image
    const imageObj = new Image();
    imageObj.onload = () => {
      const yoda = new Konva.Image({
        x: 0,
        y: 0,
        image: imageObj,
        width: width,
        height: height,
      });
      layer.add(yoda);
      layer.draw();
    };
    imageObj.src = cityPalaceImage;

    // Load Darth Vader image
    // Konva.Image.fromURL("/assets/darth-vader.jpg", (darthNode) => {
    //   darthNode.setAttrs({
    //     x: 200,
    //     y: 50,
    //     scaleX: 0.5,
    //     scaleY: 0.5,
    //     cornerRadius: 20,
    //   });
    //   layer.add(darthNode);
    //   layer.draw();
    // });

    // Cleanup function to remove the stage on unmount
    return () => {
      stage.destroy();
    };
  }, []);

  return (
    <div
      id="container"
      style={{
        margin: 0,
        padding: 0,
        overflow: "hidden",
        backgroundColor: "#f0f0f0",
      }}
    />
  );
};

export default KonvaImageDemo;
