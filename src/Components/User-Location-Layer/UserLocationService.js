export function getUserPixelCoordinatesInsidePolygon(
  userGeoLocation,
  locationGeoCoordinates,
  locationPixelCoordinates
) {
  // Function to check if a point is inside a polygon
  function isPointInPolygon(point, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].lat,
        yi = polygon[i].long;
      const xj = polygon[j].lat,
        yj = polygon[j].long;

      let a = yi > point.long;
      let b = yj > point.long;
      let c = ((xj - xi) * (point.long - yi)) / (yj - yi) + xi;
      const intersect = a !== b && point.lat < c;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  // Check if the user's location is inside the polygon
  const isInside = isPointInPolygon(userGeoLocation, locationGeoCoordinates);

  // if (!isInside) {
  //   console.log("User is outside the defined area!");
  //   return { x: 0, y: 0 };
  //   // throw new Error("User is outside the polygon boundary.");
  // } else {
  //   console.log("User inside the polygon.");
  // }

  return calculatePixelCoordinates(
    userGeoLocation,
    locationGeoCoordinates,
    locationPixelCoordinates
  );
}

// Calculate pixel coordinates based on weighted distance
function calculatePixelCoordinates(geo, geoCoordinates, pixelCoordinates) {
  let totalWeight = 0;
  let weightedX = 0;
  let weightedY = 0;

  geoCoordinates.forEach((point, index) => {
    const distance = Math.sqrt(
      Math.pow(geo.lat - point.lat, 2) + Math.pow(geo.long - point.long, 2)
    );

    const weight = distance === 0 ? 1 : 1 / distance;
    totalWeight += weight;

    weightedX += pixelCoordinates[index].x * weight;
    weightedY += pixelCoordinates[index].y * weight;
  });

  return {
    x: weightedX / totalWeight,
    y: weightedY / totalWeight,
  };
}
