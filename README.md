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
    npm install
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
