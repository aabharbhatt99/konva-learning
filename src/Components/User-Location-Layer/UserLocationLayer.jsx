import React, { useEffect, useState } from "react";
import Konva from "konva";
import { getUserPixelCoordinatesInsidePolygon } from "./UserLocationService";

const UserLocationLayer = ({ stage }) => {
  const locationPixelCoordinates = [
    { x: 407, y: 77 },
    { x: 406, y: 348 },
    { x: 246, y: 346 },
    { x: 246, y: 75 },
  ];

  const locationGeoCoordinates = [
    { lat: 26.874354419701618, long: 75.75627538528232 },
    { lat: 26.874234194992106, long: 75.7563364055386 },
    { lat: 26.87420369019473, long: 75.75626398589377 },
    { lat: 26.87432869999838, long: 75.75620363618977 },
  ];

  function getUserGeolocation() {
    // Get the user's current geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User's geolocation:", latitude, longitude);
        let userPixelLocation = getUserPixelCoordinatesInsidePolygon(
          {
            lat: latitude,
            long: longitude,
          },
          locationGeoCoordinates,
          locationPixelCoordinates
        );
        setUserLocation(userPixelLocation);
      },
      (error) => {
        console.error("Error getting user's geolocation:", error);
      }
    );
  }

  //////////////////////////////////////////////////
  const [userLocation, setUserLocation] = useState({ x: 500, y: 700 });

  function updateUserLocation() {
    console.log("updating User Location");
    let location = JSON.parse(JSON.stringify(userLocation));
    location.x += 10;
    location.y += 10;
    setUserLocation(location);
  }

  useEffect(() => {
    if (!stage) return;
    getUserGeolocation();
    var userLocationLayer = new Konva.Layer();
    var circle = new Konva.Circle({
      x: userLocation.x,
      y: userLocation.y,
      radius: 12,
      fill: "red",
      stroke: "black",
      strokeWidth: 4,
    });

    circle.on("click", function () {
      updateUserLocation();
    });

    userLocationLayer.add(circle);
    stage.add(userLocationLayer);

    return () => {
      userLocationLayer.remove();
    };
  }, [stage, userLocation]);

  return <div></div>;
};

export default UserLocationLayer;
