import { useState, useEffect } from "react";
import * as Location from "expo-location";

const SEOUL_STATION_COORDINATES = JSON.stringify({
  longitude: 37.5559,
  latitude: 126.9723,
});

function useForeGroundLocation() {
  const [location, setLocation] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const requestLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        return setError("위치 권한 요청이 거부되었습니다.");
      }

      const location = await Location.getCurrentPositionAsync({});

      const coordinates = JSON.stringify({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });

      setLocation(coordinates);
    };

    requestLocation();
  }, []);

  useEffect(() => {
    if (error) {
      setLocation(SEOUL_STATION_COORDINATES);
    }
  }, [error]);

  return { location };
}

export default useForeGroundLocation;
