import React, { useEffect, useState } from "react";
import Konva from "konva";

const PottyLayer = ({ stage }) => {
  const [userLocation, setUserLocation] = useState({ x: 700, y: 650 });

  function movePotty() {
    console.log("moving potty");
    let location = JSON.parse(JSON.stringify(userLocation));
    location.x += 10;
    location.y += 10;
    setUserLocation(location);
  }

  useEffect(() => {
    if (!stage) return;

    var pottyLayer = new Konva.Layer();
    var circle = new Konva.Circle({
      x: userLocation.x,
      y: userLocation.y,
      radius: 12,
      fill: "blue",
      stroke: "black",
      strokeWidth: 4,
    });

    circle.on("click", function () {
      movePotty();
    });

    pottyLayer.add(circle);
    stage.add(pottyLayer);

    return () => {
      pottyLayer.remove();
    };
  }, [stage, userLocation]);

  return <div></div>;
};

export default PottyLayer;
