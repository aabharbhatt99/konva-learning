import React, { useEffect, useState } from "react";
import Konva from "konva";
// import cityPalaceImage from "../Assets/city-palace.jpeg";
// import PottyLayer from "./Potty-Layer/PottyLayer";
import UserLocationLayer from "./User-Location-Layer/UserLocationLayer";
import homeImage from "../Assets/homeImage.png";

const BaseLayer = () => {
  const [stage, setStage] = useState(null);
  const backgroundImage = homeImage;

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const container = document.getElementById("container");
    if (!container) {
      console.error("Container not found");
      return;
    }

    let stageInstance = new Konva.Stage({
      container: container,
      width: width,
      height: height,
    });

    setStage(stageInstance);

    const backgroundImageLayer = new Konva.Layer();
    stageInstance.add(backgroundImageLayer);

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
    imageObj.src = backgroundImage;

    return () => {
      if (stageInstance) {
        stageInstance.destroy();
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div
      id="container"
      style={{
        margin: 0,
        padding: 0,
        overflow: "hidden",
        backgroundColor: "#f0f0f0",
      }}
    >
      {/* <PottyLayer stage={stage} /> */}
      <UserLocationLayer stage={stage} />
    </div>
  );
};

export default BaseLayer;
