
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
     // Set weather type as any to avoid strict type checking
   const [weather, setWeather] = useState<any>(null);
   const [location, setLocation] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [cityWeatherList, setCityWeatherList] = useState<any[]>([]);
    const additionalCities = [
          { name: "New York", latitude: 40.7128, longitude: -74.0060 },
          { name: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
          { name: "Chicago", latitude: 41.8781, longitude: -87.6298 },
          { name: "Miami", latitude: 25.7752, longitude: -80.2105 },
          { name: "New Orleans", latitude: 29.9511, longitude: -90.0715 },
          { name: "Austin", latitude: 30.2672, longitude: -97.7431 },
          { name: "Seattle", latitude: 47.6062, longitude: -122.3321 },
          { name: "Denver", latitude: 39.7392, longitude: -104.9903 },
          { name: "Boston", latitude: 42.3601, longitude: -71.0589 },
          { name: "San Francisco", latitude: 37.7749, longitude: -122.4194 },
          // Add more cities as desired
        ];
 
  useEffect(() => {
 
const getLocationAndFetchWeather = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
  }
 
  // Retrieve the current location
  const currentLocation = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = currentLocation.coords;
 
  // Save location to state
  setLocation({ latitude, longitude });
 
  // Fetch weather data for the current location
  fetchWeather(latitude, longitude, "Your Location");
};
 
 
const fetchWeather = async (latitude: number, longitude: number, cityName: string) => {
  
      const apiKey = '2b07069d613a6d2daea23267e9dc774b'; // Replace with your API key
 
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
 
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
          const cityWeather = {
              name: cityName,
              temp: `${data.main.temp}°F`,
              description: data.weather[0].description,
              icon: data.weather[0].icon,
              humidity: `${data.main.humidity}%`,
              windSpeed: `${data.wind.speed}MPH`,
          };
          setCityWeatherList(prevList => [cityWeather, ...prevList]); // Adds to the list
        }
else {
          alert('Failed to fetch weather data.');
        }
      } catch (error) {
        alert('Error fetching weather data.');
      }
    };
 
 
    getLocationAndFetchWeather();
 
    additionalCities.forEach(city => {
      fetchWeather(city.latitude, city.longitude, city.name);
  });
  }, []);
 
 
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Weather in Your Location and Other Cities:</Text>
          {errorMsg ? (
              <Text>{errorMsg}</Text>
          ) : (
              <FlatList
        data={cityWeatherList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/CityDetail',
                params: { cityData: JSON.stringify(item) }, // Serialize cityData as a JSON string
              })
            }
          >
            <View style={{ padding: 10, alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#2c3e50' }}>{item.name} </Text>
              <Text style={{ fontSize: 16, color: '#34495e' }}>Temperature: {item.temp}</Text>
              <Text style={{ fontSize: 16, color: '#34495e' }}>Conditions: {item.description}</Text>

            </View>
          </TouchableOpacity>
        )}
      />
            )}  
      </View>
  );
 
}