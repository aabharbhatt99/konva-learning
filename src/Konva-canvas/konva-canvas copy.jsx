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

import React, { useEffect, useState } from "react";
import Konva from "konva";
import cityPalaceImage from "./city-palace.jpeg";

const KonvaImageDemo = () => {
  // const [userLocation, setUserLocation] = useState({ x: 500, y: 700 });
  // const [stage, setStage] = useState();

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const userLocation = { x: 750, y: 650 };

    const stage = new Konva.Stage({
      container: "container",
      width: width,
      height: height,
    });

    const backgroundImageLayer = new Konva.Layer();
    stage.add(backgroundImageLayer);

    const imageObj = new Image();
    imageObj.onload = () => {
      const cityPalace = new Konva.Image({
        x: 0,
        y: 0,
        image: imageObj,
        width: width,
        height: height,
      });
      backgroundImageLayer.add(cityPalace);
      backgroundImageLayer.draw();
    };
    imageObj.src = cityPalaceImage;

    //adding user location layer
    var userLocationLayer = new Konva.Layer();
    var circle = new Konva.Circle({
      x: userLocation.x,
      y: userLocation.y,
      radius: 12,
      fill: "red",
      stroke: "black",
      strokeWidth: 4,
    });
    userLocationLayer.add(circle);
    stage.add(userLocationLayer);

    return () => {
      stage.destroy();
    };
  }, []);

  // useEffect(() => {

  // }, [userLocation]);

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
