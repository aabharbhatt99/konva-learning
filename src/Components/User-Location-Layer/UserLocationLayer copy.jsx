import React, { useEffect, useState } from "react";
import Konva from "konva";
import { getUserPixelCoordinatesInsidePolygon } from "./UserLocationService";

// const UserLocationLayer = ({ stage }) => {
//   const locationPixelCoordinates = [
//     { x: 390, y: 113 },
//     { x: 474, y: 322 },
//     { x: 364, y: 374 },
//     { x: 277, y: 165 },
//   ];

//   const locationGeoCoordinates = [
//     { lat: 26.874356841081813, long: 75.75627598437819 },
//     { lat: 26.874235420108484, long: 75.75633499297001 },
//     { lat: 26.874204915311438, long: 75.7562652555433 },
//     { lat: 26.87432753258296, long: 75.75620222363838 },
//   ];

//   function getUserGeolocation() {
//     // Get the user's current geolocation
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         console.log("User's geolocation:", latitude, longitude);
//         let userPixelLocation = getUserPixelCoordinatesInsidePolygon(
//           {
//             lat: latitude,
//             long: longitude,
//           },
//           locationGeoCoordinates,
//           locationPixelCoordinates
//         );
//         if (
//           JSON.stringify(userPixelLocation) !== JSON.stringify(prevLocation)
//         ) {
//           setPrevLocation(userPixelLocation);
//           setUserLocation(userPixelLocation);
//         }
//       },
//       (error) => {
//         console.error("Error getting user's geolocation:", error);
//       }
//     );
//   }

//   //////////////////////////////////////////////////
//   const [userLocation, setUserLocation] = useState();
//   const [prevLocation, setPrevLocation] = useState();

//   function updateUserLocation() {
//     console.log("updating User Location");
//     let location = JSON.parse(JSON.stringify(userLocation));
//     location.x += 10;
//     location.y += 10;
//     setUserLocation(location);
//   }

//   useEffect(() => {
//     getUserGeolocation();
//   }, []);

//   useEffect(() => {
//     if (!stage && !userLocation) return;

//     var text = new Konva.Text({
//       x: 100,
//       y: 100,
//       text: `User Location x:${userLocation.x} , y:${userLocation.y}`,
//       fontSize: 18,
//       fill: "black",
//     });

//     var userLocationLayer = new Konva.Layer();
//     var circle = new Konva.Circle({
//       x: userLocation.x,
//       y: userLocation.y,
//       radius: 12,
//       fill: "red",
//       stroke: "black",
//       strokeWidth: 4,
//     });

//     circle.on("click", function () {
//       updateUserLocation();
//     });

//     userLocationLayer.add(text);

//     userLocationLayer.add(circle);
//     stage.add(userLocationLayer);

//     return () => {
//       userLocationLayer.remove();
//     };
//   }, [stage, userLocation]);

//   return <div></div>;
// };

// export default UserLocationLayer;

const UserLocationLayer = ({ stage }) => {
  const locationPixelCoordinates = [
    { x: 310, y: 181 },
    { x: 310, y: 456 },
    { x: 805, y: 458 },
    { x: 800, y: 181 },
  ];

  // const locationGeoCoordinates = [
  //   { lat: 26.8744004, long: 75.7563448 },
  //   { lat: 26.8743931, long: 75.7562939 },
  //   { lat: 26.8742624, long: 75.7562411 },
  //   { lat: 26.8742815, long: 75.7563162 },
  // ];
  const locationGeoCoordinates = [
    { lat: 26.874354917476747, long: 75.75627430192152 },
    { lat: 26.874329197773637, long: 75.75620590559916 },
    { lat: 26.87420658050392, long: 75.756264914191 },
    { lat: 26.874238281566896, long: 75.75633398106552 },
  ];

  // 26.8744004, 75.7563448;
  // 26.8743931, 75.7562939;
  // 26.8742624, 75.7562411;
  // 26.8742815, 75.7563162;

  const [userLocation, setUserLocation] = useState(null);
  const [geoLocation, setGeoLocation] = useState(null);

  useEffect(() => {
    // Watch the user's geolocation
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        let { latitude, longitude } = position.coords;
        console.log("accuracy:", position.coords.accuracy);
        if (position.coords.accuracy < 10) return;
        console.log("position:", position);
        latitude = latitude.toFixed(5);
        longitude = longitude.toFixed(5);
        // console.log("User's geolocation updated:", latitude, longitude);
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

    // Cleanup the geolocation watcher on unmount
    return () => {
      console.log("watchId cleared");
      navigator.geolocation.clearWatch(watchId);
    };
  }, []); // Empty dependency array ensures this effect runs only once

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
      // console.log("Point to note:", geoLocation.x, geoLocation.y);
      console.warn("Point to note:", geoLocation.x, geoLocation.y);
      alert(`location noted, ${geoLocation.x}, ${geoLocation.y}`);
      // Add your logic here to handle the click event
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

    // Cleanup the Konva layer on unmount
    return () => {
      userLocationLayer.remove();
    };
  }, [stage, userLocation]);

  return <div></div>;
};

export default UserLocationLayer;
