import React, { useEffect, useState } from "react";
import Konva from "konva";
import { getUserPixelCoordinatesInsidePolygon } from "./UserLocationService";

const UserLocationLayer = ({ stage }) => {
  const locationPixelCoordinates = [
    { x: 310, y: 181 },
    { x: 310, y: 456 },
    { x: 805, y: 458 },
    { x: 800, y: 181 },
  ];

  const locationGeoCoordinates = [
    { lat: 26.874354917476747, long: 75.75627430192152 },
    { lat: 26.874329197773637, long: 75.75620590559916 },
    { lat: 26.87420658050392, long: 75.756264914191 },
    { lat: 26.874238281566896, long: 75.75633398106552 },
  ];

  const [userLocation, setUserLocation] = useState(null);
  const [geoLocation, setGeoLocation] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        let { latitude, longitude } = position.coords;
        console.log("accuracy:", position.coords.accuracy);
        if (position.coords.accuracy < 10) return;
        console.log("position:", position);
        latitude = latitude.toFixed(5);
        longitude = longitude.toFixed(5);
        setGeoLocation({ x: latitude, y: longitude });

        const userPixelLocation = getUserPixelCoordinatesInsidePolygon(
          { lat: latitude, long: longitude },
          locationGeoCoordinates,
          locationPixelCoordinates
        );

        setUserLocation(userPixelLocation);
      },
      (error) => {
        console.error("Error watching user's geolocation:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 2000,
        timeout: 5000,
      }
    );

    return () => {
      console.log("watchId cleared");
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    if (!stage || !userLocation) return;

    const userLocationLayer = new Konva.Layer();
    const text = new Konva.Text({
      x: 100,
      y: 100,
      text: `User Location x:${geoLocation.x} , y:${geoLocation.y}`,
      fontSize: 18,
      fill: "black",
    });

    const circle = new Konva.Circle({
      x: userLocation.x,
      y: userLocation.y,
      radius: 12,
      fill: "red",
      stroke: "black",
      strokeWidth: 4,
    });

    circle.on("click", function () {
      console.warn("Point to note:", geoLocation.x, geoLocation.y);
      alert(`location noted, ${geoLocation.x}, ${geoLocation.y}`);
    });

    circle.on("touchstart", function () {
      alert(`location noted, ${geoLocation.x}, ${geoLocation.y}`);
      navigator.clipboard
        .writeText(`${geoLocation.x}, ${geoLocation.y}`)
        .then(() => {
          alert("String copied to clipboard!");
        })
        .catch((err) => {
          alert("Failed to copy string: " + err);
        });
    });

    userLocationLayer.add(text);
    userLocationLayer.add(circle);
    stage.add(userLocationLayer);

    return () => {
      userLocationLayer.remove();
    };
  }, [stage, userLocation]);

  return <div></div>;
};

export default UserLocationLayer;
