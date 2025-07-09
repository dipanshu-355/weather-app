Full Stack Weather App
A sleek, modern weather application built using the MERN stack that allows users to:
- Get current weather info by city
- View recently searched cities (stored in MongoDB)
- Toggle between Light & Dark mode
- Enjoy a fully redesigned UI with animations, gradients, and particle effects
- (Upcoming) View a 7-day forecast using OpenWeatherMap's One Call API
Features
- Search by city name for real-time weather info
- Stores recently searched cities in MongoDB (via Express backend)
- Smart UI: City names are clickable to re-trigger search
- Dark Mode toggle with full UI theme change
- Fully responsive design with animations and vibrant colors
- Environment variables securely store your API keys
Tech Stack
Frontend:
- React.js (with hooks & state)
- Custom CSS (Dark mode, transitions, particles, modern design)
Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
API:
- OpenWeatherMap API
Folder Structure
weather-app/
■■■ backend/
■ ■■■ models/
■ ■■■ routes/
■ ■■■ index.js
■ ■■■ .env
■■■ frontend/
■ ■■■ src/
■ ■ ■■■ components/
■ ■ ■ ■■■ Weather.jsx
■ ■ ■■■ assets/
■ ■ ■■■ App.jsx
■ ■ ■■■ index.css
■ ■ ■■■ Weather.css
■■■ package.json
■■■ README.md
Environment Variables
In backend/.env:
PORT=5000
MONGO_URI=your_mongodb_connection_string
In frontend/.env:
VITE_APP_ID=your_openweather_api_key
How to Run the App Locally
1. Clone the Repository:
 git clone https://github.com/dipanshu-355/weather-app.git
 cd weather-app
2. Setup Backend:
 cd backend
 npm install
 npm start
3. Setup Frontend:
 cd ../frontend
 npm install
 npm run dev
App runs at: http://localhost:5173
Future Features
- 7-Day Weather Forecast UI
- Button to clear recent searches
- Language and unit switcher
- Geolocation weather detection
Author
Dipanshu Sahu
B.Tech CSE @ Eklavya University, Damoh
License: MIT License
