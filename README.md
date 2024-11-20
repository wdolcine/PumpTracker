# Welcome to PumpTracker 👋

PumpTracker is a cross-platform mobile application developed using React Native and Expo. The app helps users locate nearby gas stations, view real-time updates about their locations, and navigate to the nearest station. It also offers features like user authentication, profile management, and a clean, intuitive interface.

# **Features**

- [x] **Splash Screen**
   - Displays the app logo briefly during the startup.

- [x] User Authentication: 
   - Login and registration options using email or third-party providers (Google, Apple).

- [x] Real-Time Gas Station Mapping:
   - Displays nearby gas stations on a map with interactive markers.
   - Provides location-specific filtering.

- [x]  Pump List:
   - Lists all nearby gas stations in a scrollable flat list for easier browsing.

- [x] Profile:
   - Shows user details (profile picture, email).
   - Allows users to log out securely.

- [x] Tab Navigation: 
   - Intuitive bottom navigation to switch between Home, PumpList, and Profile screens.

# **Technologies Used**

- React Native with Expo
- Firebase
- MapView
- Expo Router
- TypeScript

# **Setup Instructions**

1. Prerequisites
   
  - Node.js installed on your system.
  - Expo CLI installed globally (npm install -g expo-cli).
  - A Firebase account for generating your own API keys.
  - GeoApiFy account to use your own Autocomplete, Places, Place details API keys

2. Clone the Repository

   ```bash
   git clone https://github.com/wdolcine/PumpTracker.git
   cd PumpTracker
   ```

3. Install Dependencies

   ```bash
    npm install
   ```
   
4. Configure API
   
   - Go to C:\YourPC\PumpTracker\constants\VariableConfigApi.ts
   - Replace the Api keys place holder with your own apis
     
6. Run the App
   
   ```bash
    npx expo start
   ```
   
7. Choose Expo to run the App on your phone by scanning the QR Code

# **License**

  ```bash
   MIT License
   ```


