import { useState, useEffect } from 'react'

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface CurrentWeather {
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
    code: number;
  };
  wind_mph: number;
  wind_kph: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

interface HourlyForecast {
  time: string;
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
    code: number;
  };
  chance_of_rain: number;
  chance_of_snow: number;
}

interface DayForecast {
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    condition: {
      text: string;
      code: number;
    };
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    uv: number;
  };
  hour: HourlyForecast[];
}

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: CurrentWeather;
  forecast: {
    forecastday: DayForecast[];
  };
}

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Location SVG Icon Component
  const LocationIcon = () => (
    <svg 
      width="32" 
      height="32" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto mb-2"
    >
      <path 
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
        fill="currentColor"
      />
    </svg>
  );

  // Get animation based on weather condition
  const getWeatherAnimation = (conditionCode: number, isNight: boolean) => {
    // Using new Lottie animations based on condition codes
    if (conditionCode === 1000) { // Sunny/Clear
      return isNight ? '/lottie/clear-night.json' : '/lottie/clear-day.json';
    } else if ([1003].includes(conditionCode)) { // Partly cloudy
      return isNight ? '/lottie/partly-cloudy-night.json' : '/lottie/partly-cloudy-day.json';
    } else if ([1006, 1009].includes(conditionCode)) { // Cloudy/Overcast
      return isNight ? '/lottie/overcast-night.json' : '/lottie/overcast-day.json';
    } else if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(conditionCode)) { // Rain
      return isNight ? '/lottie/overcast-night-rain.json' : '/lottie/overcast-day-rain.json';
    } else if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) { // Thunder
      return isNight ? '/lottie/thunderstorms-night.json' : '/lottie/thunderstorms-day.json';
    } else if ([1066, 1069, 1072, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264].includes(conditionCode)) { // Snow
      return isNight ? '/lottie/overcast-night-snow.json' : '/lottie/overcast-day-snow.json';
    } else if ([1030, 1135, 1147].includes(conditionCode)) { // Mist/Fog
      return isNight ? '/lottie/fog-night.json' : '/lottie/fog-day.json';
    } else if ([1150, 1153, 1168, 1171].includes(conditionCode)) { // Drizzle
      return isNight ? '/lottie/overcast-night-drizzle.json' : '/lottie/overcast-day-drizzle.json';
    } else {
      return isNight ? '/lottie/clear-night.json' : '/lottie/clear-day.json';
    }
  };

  const getHourlyWeatherAnimation = (conditionCode: number, hour: number) => {
    const isNight = hour < 6 || hour > 18;
    return getWeatherAnimation(conditionCode, isNight);
  };

  const fetchWeatherByLocation = async (lat: number, lon: number) => {
    setLoading(true);
    setError('');
    
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      
      if (!apiKey) {
        throw new Error('Weather API key not configured');
      }
      
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7&aqi=no&alerts=no`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching weather');
    } finally {
      setLoading(false);
    }
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByLocation(latitude, longitude);
      },
      () => {
        setError('Location access denied. Please enable location services.');
      }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  const currentHour = new Date().getHours();
  const isNight = currentHour < 6 || currentHour > 18;

  // Get today's hourly forecast (next 24 hours)
  const getTodayHourlyForecast = () => {
    if (!weather?.forecast?.forecastday?.[0]?.hour || !weather?.forecast?.forecastday?.[1]?.hour) return [];
    const now = new Date();
    const currentHour = now.getHours();
    
    // Get remaining hours from today
    const todayHours = weather.forecast.forecastday[0].hour.slice(currentHour);
    
    // If we need more hours to show at least 8-10 hours, get from tomorrow
    const tomorrowHours = weather.forecast.forecastday[1].hour;
    const totalHours = [...todayHours, ...tomorrowHours].slice(0, 10); // Show next 10 hours
    
    return totalHours.map(hour => ({
      ...hour,
      time: new Date(hour.time).toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        hour12: true 
      })
    }));
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 font-['Bebas_Neue'] ${
      isNight 
        ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'
    }`}>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center px-4">
            <div className={`animate-spin rounded-full h-12 w-12 sm:h-14 sm:w-14 md:h-18 md:w-18 border-b-2 mx-auto mb-4 sm:mb-5 ${
              isNight ? 'border-white' : 'border-gray-600'
            }`}></div>
            <p className={`text-lg sm:text-xl md:text-2xl ${
              isNight ? 'text-gray-200' : 'text-gray-700'
            }`}>Getting your weather...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center px-4">
            <p className={`mb-4 sm:mb-5 text-base sm:text-lg md:text-xl ${
              isNight ? 'text-red-400' : 'text-red-500'
            }`}>{error}</p>
            <button
              onClick={requestLocation}
              className="px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-base sm:text-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {weather && !loading && (
        <div className="max-w-7xl w-full space-y-6">
          {/* Top Row - Main Weather Info and 7-Day Forecast */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Current Weather and Today's Forecast */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Weather Card */}
              <div className={`rounded-2xl p-6 ${
                isNight 
                  ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
                  : 'bg-white/70 backdrop-blur-sm border border-gray-200'
              }`}>
                {/* Top Row - City and Weather Icon */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className={`flex items-center gap-2 mb-2 ${
                      isNight ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <LocationIcon />
                      <span className="text-lg">{weather.location.name}</span>
                    </div>
                    <div className={`text-5xl md:text-6xl font-light ${
                      isNight ? 'text-white' : 'text-gray-800'
                    }`}>
                      {Math.round(weather.current.temp_c)}°
                    </div>
                  </div>
                  <div className="w-24 h-24 md:w-32 md:h-32">
                    <DotLottieReact
                      src={getWeatherAnimation(weather.current.condition.code, isNight)}
                      loop
                      autoplay
                    />
                  </div>
                </div>
                
                <p className={`text-lg ${
                  isNight ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {weather.current.condition.text}
                </p>
              </div>

              {/* Today's Hourly Forecast */}
              <div className={`rounded-2xl p-6 ${
                isNight 
                  ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
                  : 'bg-white/70 backdrop-blur-sm border border-gray-200'
              }`}>
                <h3 className={`text-xl font-medium mb-4 ${
                  isNight ? 'text-white' : 'text-gray-800'
                }`}>
                  Today's Forecast
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {getTodayHourlyForecast().map((hour, index) => (
                    <div key={index} className="flex-shrink-0 text-center min-w-[80px]">
                      <p className={`text-sm mb-2 ${
                        isNight ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {hour.time}
                      </p>
                      <div className="w-12 h-12 mx-auto mb-2">
                        <DotLottieReact
                          src={getHourlyWeatherAnimation(hour.condition.code, new Date(hour.time).getHours())}
                          loop
                          autoplay
                        />
                      </div>
                      <p className={`text-lg font-medium ${
                        isNight ? 'text-white' : 'text-gray-800'
                      }`}>
                        {Math.round(hour.temp_c)}°
                      </p>
                      <p className={`text-xs ${
                        isNight ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {hour.chance_of_rain}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - 7-Day Forecast */}
            <div className="lg:col-span-1">
              <div className={`rounded-2xl p-6 h-full ${
                isNight 
                  ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
                  : 'bg-white/70 backdrop-blur-sm border border-gray-200'
              }`}>
                <h3 className={`text-xl font-medium mb-6 ${
                  isNight ? 'text-white' : 'text-gray-800'
                }`}>
                  7-Day Forecast
                </h3>
                <div className="space-y-4">
                  {weather.forecast.forecastday.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10">
                          <DotLottieReact
                            src={getWeatherAnimation(day.day.condition.code, false)}
                            loop
                            autoplay
                          />
                        </div>
                        <div>
                          <p className={`font-medium ${
                            isNight ? 'text-white' : 'text-gray-800'
                          }`}>
                            {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </p>
                          <p className={`text-sm ${
                            isNight ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {day.day.condition.text}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          isNight ? 'text-white' : 'text-gray-800'
                        }`}>
                          {Math.round(day.day.maxtemp_c)}°
                        </p>
                        <p className={`text-sm ${
                          isNight ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {Math.round(day.day.mintemp_c)}°
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - Weather Details Grid (Full Width) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Wind Speed */}
            <div className={`rounded-xl p-4 ${
              isNight 
                ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
                : 'bg-white/70 backdrop-blur-sm border border-gray-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8">
                  <DotLottieReact
                    src="/lottie/wind.json"
                    loop
                    autoplay
                  />
                </div>
                <span className={`text-sm ${
                  isNight ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Wind
                </span>
              </div>
              <p className={`text-xl font-medium ${
                isNight ? 'text-white' : 'text-gray-800'
              }`}>
                {Math.round(weather.current.wind_kph)} km/h
              </p>
              <p className={`text-xs ${
                isNight ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {weather.current.wind_dir}
              </p>
            </div>

            {/* UV Index */}
            <div className={`rounded-xl p-4 ${
              isNight 
                ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
                : 'bg-white/70 backdrop-blur-sm border border-gray-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8">
                  <DotLottieReact
                    src="/lottie/uv-index.json"
                    loop
                    autoplay
                  />
                </div>
                <span className={`text-sm ${
                  isNight ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  UV Index
                </span>
              </div>
              <p className={`text-xl font-medium ${
                isNight ? 'text-white' : 'text-gray-800'
              }`}>
                {weather.current.uv}
              </p>
              <p className={`text-xs ${
                isNight ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {weather.current.uv <= 2 ? 'Low' : weather.current.uv <= 5 ? 'Moderate' : weather.current.uv <= 7 ? 'High' : 'Very High'}
              </p>
            </div>

            {/* Real Feel */}
            <div className={`rounded-xl p-4 ${
              isNight 
                ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
                : 'bg-white/70 backdrop-blur-sm border border-gray-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8">
                  <DotLottieReact
                    src="/lottie/thermometer.json"
                    loop
                    autoplay
                  />
                </div>
                <span className={`text-sm ${
                  isNight ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Feels like
                </span>
              </div>
              <p className={`text-xl font-medium ${
                isNight ? 'text-white' : 'text-gray-800'
              }`}>
                {Math.round(weather.current.feelslike_c)}°
              </p>
            </div>

            {/* Humidity */}
            <div className={`rounded-xl p-4 ${
              isNight 
                ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
                : 'bg-white/70 backdrop-blur-sm border border-gray-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8">
                  <DotLottieReact
                    src="/lottie/humidity.json"
                    loop
                    autoplay
                  />
                </div>
                <span className={`text-sm ${
                  isNight ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Humidity
                </span>
              </div>
              <p className={`text-xl font-medium ${
                isNight ? 'text-white' : 'text-gray-800'
              }`}>
                {weather.current.humidity}%
              </p>
            </div>

            {/* Pressure */}
            <div className={`rounded-xl p-4 ${
              isNight 
                ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
                : 'bg-white/70 backdrop-blur-sm border border-gray-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8">
                  <DotLottieReact
                    src="/lottie/barometer.json"
                    loop
                    autoplay
                  />
                </div>
                <span className={`text-sm ${
                  isNight ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Pressure
                </span>
              </div>
              <p className={`text-xl font-medium ${
                isNight ? 'text-white' : 'text-gray-800'
              }`}>
                {Math.round(weather.current.pressure_mb)} mb
              </p>
              <p className={`text-xs ${
                isNight ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {weather.current.pressure_mb > 1013 ? 'High' : weather.current.pressure_mb > 1000 ? 'Normal' : 'Low'}
              </p>
            </div>

            {/* Visibility */}
            <div className={`rounded-xl p-4 ${
              isNight 
                ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
                : 'bg-white/70 backdrop-blur-sm border border-gray-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8">
                  <DotLottieReact
                    src="/lottie/horizon.json"
                    loop
                    autoplay
                  />
                </div>
                <span className={`text-sm ${
                  isNight ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Visibility
                </span>
              </div>
              <p className={`text-xl font-medium ${
                isNight ? 'text-white' : 'text-gray-800'
              }`}>
                {Math.round(weather.current.vis_km)} km
              </p>
              <p className={`text-xs ${
                isNight ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {weather.current.vis_km >= 10 ? 'Excellent' : weather.current.vis_km >= 5 ? 'Good' : 'Poor'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
