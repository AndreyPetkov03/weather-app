# 🌤️ Modern Weather App

A beautiful, fully responsive weather application built with React 19, TypeScript, and Tailwind CSS. Features real-time weather data, stunning Lottie animations, and automatic day/night themes.

## 📱 Screenshots & Demo

### Desktop View
![Desktop Weather App](./Weather%20app%20img%201.png)

### Mobile View
![Mobile Weather App](./weather%20app%201(2).png)

### Animated Weather Icons Demo
![Animated Weather Icons](./weather%20app%20animated.gif)

> 🎬 **Live Animation Demo**: Watch the beautiful Lottie weather icons come to life with smooth, context-aware animations that change based on weather conditions and time of day.

## ✨ Features

- �️ **Real-time Weather Data** - Current conditions, hourly, and 7-day forecasts
- 🎨 **Dynamic Lottie Animations** - Beautiful, smooth weather condition animations (see demo above)
- 🎬 **Context-Aware Icons** - Animations adapt to weather conditions and day/night cycles
- 🌙 **Automatic Day/Night Mode** - Theme changes based on time (6 AM - 6 PM)
- � **Location-based Detection** - Automatic weather for your current location
- �📱 **Fully Responsive Design** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with Vite for lightning-fast loading
- 🎭 **Modern Typography** - Bebas Neue font for clean, modern look
- 🔍 **Comprehensive Data** - Wind, UV Index, Humidity, Pressure, Visibility, Feels Like

## 🏗️ Project Structure

The app features a clean, organized layout:

- **Top Section**: Current weather with location and temperature
- **Left Column**: Today's hourly forecast (next 10 hours)
- **Right Column**: 7-day weather forecast
- **Bottom Section**: Comprehensive weather metrics in a responsive grid

## 🛠️ Technologies Used

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lottie Animations** - High-quality weather animations
- **WeatherAPI** - Reliable weather data source

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- WeatherAPI key (free from [weatherapi.com](https://weatherapi.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AndreyPetkov03/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_WEATHER_API_KEY=your_weather_api_key_here
   ```
   
   Or copy from the example:
   ```bash
   cp .env.example .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌍 API Integration

The app uses [WeatherAPI](https://weatherapi.com/) for comprehensive weather data:

- Current weather conditions
- Hourly forecasts (next 10 hours)
- 7-day daily forecasts
- Location-based automatic detection
- Detailed metrics (wind, UV, pressure, etc.)

## 🎨 Design Features

### Dynamic Theming
- **Day Mode**: Light blue gradient background (6 AM - 6 PM)
- **Night Mode**: Dark gradient background (6 PM - 6 AM)
- **Glassmorphism**: Cards with backdrop blur and transparency

### Responsive Layout
- **Mobile**: Stacked layout with 2-column metric grid
- **Tablet**: Optimized spacing with 3-column metrics
- **Desktop**: Full 3-column layout with 6-column metrics

### Weather Animations
Smart Lottie animations that create an immersive experience:
- **60+ Different Weather Icons** - Covering all weather conditions
- **Dynamic Day/Night Variants** - Icons change based on time (6 AM - 6 PM)
- **Smooth Transitions** - Seamless animation loops for visual appeal
- **Condition-Specific Details** - Accurate animations for rain, snow, clouds, sun, etc.
- **Hourly Forecast Animations** - Each hour shows appropriate weather animation

> 💡 **Pro Tip**: The animations automatically adapt - sunny icons during day hours, moon and stars during night hours, with weather-specific overlays for rain, clouds, and other conditions.

## 📊 Weather Metrics

The app displays comprehensive weather information:

| Metric | Description |
|--------|-------------|
| **Temperature** | Current temperature with feels-like |
| **Wind** | Speed (km/h) and direction |
| **UV Index** | With risk level indicators |
| **Humidity** | Percentage with comfort levels |
| **Pressure** | Atmospheric pressure in mb |
| **Visibility** | Distance with quality rating |

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Mobile Features

- Touch-friendly interface
- Swipeable hourly forecast
- Optimized tap targets
- Responsive images and icons

## 🔒 Privacy & Location

- Uses browser's Geolocation API
- No location data is stored
- Graceful fallback for location permissions
- Privacy-first approach

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [WeatherAPI](https://weatherapi.com/) for reliable weather data
- [LottieFiles](https://lottiefiles.com/) for beautiful animations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [React](https://react.dev/) for the amazing framework

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

Built with ❤️ using modern web technologies
