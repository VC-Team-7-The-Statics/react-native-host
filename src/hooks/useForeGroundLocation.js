import { useState, useEffect } from "react";
import * as Location from "expo-location";

const SEOUL_STATION_COORDINATES = {
  longitude: 37.5559,
  latitude: 126.9723,
};

function useForeGroundLocation() {
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const requestLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        return setError("위치 권한 요청이 거부되었습니다.");
      }

      const location = await Location.getCurrentPositionAsync({});

      setLongitude(location.coords.longitude);
      setLatitude(location.coords.latitude);
    };

    requestLocation();
  }, []);

  useEffect(() => {
    if (error) {
      setLongitude(SEOUL_STATION_COORDINATES.longitude);
      setLatitude(SEOUL_STATION_COORDINATES.latitude);
    }
  }, [error]);

  return { longitude, latitude };
}

export default useForeGroundLocation;
