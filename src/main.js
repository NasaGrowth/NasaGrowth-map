import {
  Cartesian3,
  Math as CesiumMath,
  Terrain,
  Viewer
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./style.css";
import { polygonEntityAitAmira, polygonEntityFerkes, polygonEntityPeru, polygonEntityThailand } from "./locations";

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Viewer("cesiumContainer", {
  terrain: Terrain.fromWorldTerrain(),
});

// Fly the camera to XXXXX at the given longitude, latitude, and height.
const flyToAitAmira = () => {
viewer.camera.flyTo({
  destination: Cartesian3.fromDegrees(-9.433781, 30.138166, 2000),
  orientation: {
    heading: CesiumMath.toRadians(0.0),
    pitch: CesiumMath.toRadians(-90.0),
  },
});
};

// Fly the camera to the second point
const flyToFerkes = () => {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-5.131704, 9.635149, 2000),
    orientation: {
      heading: CesiumMath.toRadians(0.01),
      pitch: CesiumMath.toRadians(-90.0),
    },
  });
};

const flyToPeru = () => {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-79.922369, -6.105769, 2000),
    orientation: {
      heading: CesiumMath.toRadians(0.01),
      pitch: CesiumMath.toRadians(-90.0),
    },
  });
}

const flyToThai = () => {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(101.328928, 15.130729, 2000),
    orientation: {
      heading: CesiumMath.toRadians(0.01),
      pitch: CesiumMath.toRadians(-90.0),
    },
  });
}

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
viewer.entities.add(polygonEntityPeru);
viewer.entities.add(polygonEntityThailand);

// Add the rotateEarth function to the postRender event
viewer.scene.postRender.addEventListener(rotateEarth);

setTimeout(() => {
  stopRotatingEarth();
  flyToThai();
  setTimeout(() => {
    flyToPeru();
    setTimeout(() => {
      flyToAitAmira();
      setTimeout(flyToFerkes, 6000);
    }, 6000);
  }, 6000);
}, 8000);