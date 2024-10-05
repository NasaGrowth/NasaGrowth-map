import {
  Cartesian3,
  Math as CesiumMath,
  Terrain,
  Viewer,
  ModelGraphics
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./style.css";
import { polygonEntityAitAmira, polygonEntityFerkes } from "./locations";

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Viewer("cesiumContainer", {
  terrain: Terrain.fromWorldTerrain(),
});

// Fly the camera to XXXXX at the given longitude, latitude, and height.
const flyToFirstPoint = () => {
viewer.camera.flyTo({
  destination: Cartesian3.fromDegrees(-9.433781, 30.143166, 3000),
  orientation: {
    heading: CesiumMath.toRadians(0.0),
    pitch: CesiumMath.toRadians(-90.0),
  },
});
};

// Fly the camera to the second point
const flyToSecondPoint = () => {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-5.131704, 9.641149, 3000),
    orientation: {
      heading: CesiumMath.toRadians(0.01),
      pitch: CesiumMath.toRadians(-90.0),
    },
  });
};

// Function to rotate the Earth
const rotateEarth = () => {
  const currentTime = viewer.clock.currentTime;
  const rotationSpeed = CesiumMath.toRadians(0.01); // Adjust the rotation speed
  viewer.scene.camera.rotate(Cartesian3.UNIT_Z, rotationSpeed);
};

// Function to stop rotating the Earth
const stopRotatingEarth = () => {
  viewer.scene.postRender.removeEventListener(rotateEarth);
};

// EXECUTING THE CODE

// Add the polygon entity to the viewer
viewer.entities.add(polygonEntityAitAmira);
viewer.entities.add(polygonEntityFerkes);

// Add the rotateEarth function to the postRender event
viewer.scene.postRender.addEventListener(rotateEarth);

setTimeout(() => {
  stopRotatingEarth();
  flyToFirstPoint();
  setTimeout(flyToSecondPoint, 5000);
}, 8000);