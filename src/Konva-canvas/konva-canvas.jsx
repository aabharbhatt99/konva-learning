import cityPalaceImage from "./city-palace.jpeg";
import React, { useEffect, useState } from "react";
import Konva from "konva";

const BaseCanvas = () => {
  const [stage, setStage] = useState(null);
  const [userLocation, setUserLocation] = useState({ x: 100, y: 100 });

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const container = document.getElementById("container");

    if (!container) {
      console.error("Container not found");
      return;
    }

    const stageInstance = new Konva.Stage({
      container: container,
      width: width,
      height: height,
    });

    setStage(stageInstance);

    const baseLayer = new Konva.Layer();
    stageInstance.add(baseLayer);

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
    imageObj.src = cityPalaceImage; // Placeholder image URL

    return () => {
      if (stageInstance) {
        stageInstance.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!stage) return;

    const userLocationLayer = new Konva.Layer();
    stage.add(userLocationLayer);

    const circle = new Konva.Circle({
      x: userLocation.x,
      y: userLocation.y,
      radius: 30,
      fill: "red",
      stroke: "black",
      strokeWidth: 4,
    });
    userLocationLayer.add(circle);
    userLocationLayer.draw();

    return () => {
      userLocationLayer.remove();
    };
  }, [stage, userLocation]);

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
      <input
        type="number"
        value={userLocation.x}
        onChange={(e) =>
          setUserLocation({ ...userLocation, x: parseInt(e.target.value) })
        }
        style={{ margin: "10px" }}
      />
      <input
        type="number"
        value={userLocation.y}
        onChange={(e) =>
          setUserLocation({ ...userLocation, y: parseInt(e.target.value) })
        }
        style={{ margin: "10px" }}
      />
    </div>
  );
};

export default BaseCanvas;
