<h1 align="center">QuickGlance</h1>
<p align="center">A Community Shortcuts App for Hands-Free Automation via Eye, Head, and Emotion Recognition</p>

![QUICKGLANCE](https://github.com/user-attachments/assets/ff91ac8b-0e3b-4084-bf83-c6dbac88a984)

## Introduction

QuickGlance is a mobile assistive platform that transforms natural movements into automated shortcuts for persons with disabilities (PWDs). By combining eye-tracking, head gestures, and emotion recognition, the app enables hands-free device control and automation for those that need it the most. With a community-driven ecosystem for sharing customized accessibility shortcuts and integration of various NGOs, the app becomes a central digital hub for the community of PWDs in the Philippines.

## Features

- [ ]  Eye-tracking for precise shortcut selection
- [x]  Head movements (left/right/up/down) for navigation and selection of elements
- [x]  Emotion tracking to automate certain shortcuts based on emotions
- [x]  App Store-like gallery for shortcut sharing (with installable shortcuts)
- [x]  User accounts to store shortcuts on the cloud
- [ ]  Scheduling and automation of shortcuts based on time or events
- [ ]  Integration with IoT and wearable technologies
- [ ]  AI Integration for personalized assistance with PWDs

## **Clone github repository**

```bash
git clone https://github.com/smart-innogen-2025/quickglance.git
```

## Requirements

- [NPM](https://nodejs.org/en/download)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) & [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Bun](https://bun.sh/package-manager) (Optional, alternative for faster package management)
- [eas-cli](https://github.com/expo/eas-cli) (Optional, for remote builds if weaker PC, must have [Expo account](https://expo.dev/signup))

## Setup

Create `.env` file in the root of the project. Below should be the variables:

```
EXPO_PUBLIC_WEATHER_API_KEY="ENTER_API_KEY_HERE"
EXPO_PUBLIC_OPENAI_API_KEY="ENTER_API_KEY_HERE"
```

- **EXPO_PUBLIC_WEATHER_API_KEY** - Get api key from [https://openweathermap.org/api](https://openweathermap.org/api)
- **EXPO_PUBLIC_OPENAI_API_KEY** - Get api key from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

## Install and Build

1. `npm install`
    - If using Bun: `bun install`
2. `npx expo prebuild --clean`
3. `npx expo run`
    - For iOS: `npx expo run:ios`
    - For Android: `npx expo run:android`
    - Note: add `--device` to select a specific device

## Run the app

- `npx expo start —clear`, then scan the QR code on your device to run on your real device.
    - Press `i` to run the app in the iOS Simulator (`shift + i` to select a specific iOS device)
    - Press `a` to run the app in the Android Simulator (`shift + a` to select a specific Android device)

## Build remotely through EAS

1. `npm install -g eas-cli`
2. `eas login` (enter your Expo account or if you dont have yet, [create one](https://expo.dev/signup))
3. Build the app with eas:
    - For Android: `eas build --platform android --profile development`
    - For iOS: `eas build --platform ios --profile development`
        - Note: add `--local` to build locally but still using the same EAS profile
4. After building, install the **apk** file or **app** file in your device and then open it, afterwards, run it as [above](#run-the-app).

## Access the app anywhere with Expo Go and EAS Update

1. `npm install -g eas-cli`
2. `eas login`
3. `eas update`
4. Select or create a branch then setup the configuration and the update message.
5. After saving as update, install [Expo Go](https://expo.dev/go) on your device then login your account.
6. Open the app, and then you can see all your saved updates in the app, which you can select and run.

## Build APK file for Android
- `eas build -p android --profile preview`, which will upload the apk to your Expo account where you can download it. Make sure you logged in your account.
    - Note: add `--local` to store in your local project instead

## Project Structure

| **Folder Name** | **Description** |
| --- | --- |
| actions | Contains all files and directories related to running the actions for the shortcuts (See [table](#actions-folder) below for more details) |
| app | Main directory of the mobile app, contains the modals, screens and tabs of the app. Also contains the layout, styles, and index files for each screen.<br>- **Layout files** define the structure of the navigation and is the root of the screen.<br>- **Style files** define the styling for each screens.<br>- **Index files** is the initial screen of the specific folder/navigation, can also just redirect to a specific screen. |
| assets | Contains the fonts, images, ML models, colors, and the global styles of the app. Currently there is only one model which is for emotion recognition based on this [project](https://github.com/Shubham-Zone/Emotion-detection-using-tflite). |
| components | Contains the components that is used in the app. These are reusable code that can be used across the app. |
| constants | Contains sample data that is used for testing, as well as, global constants and types. |
| hooks | Contains [React hooks](https://react.dev/reference/react/hooks) that is used to encapsulate complex setup into a reusable functions or hooks. |
| services | Contains the api functions and the [Axios](https://axios-http.com/docs/intro) API wrapper that can be used to access the backend. |
| stores | Contains various [Zustand](https://github.com/pmndrs/zustand) stores that handles the global state management and storage. |
| utils | Bite-sized utilities that is used for minor inconveniences and functionalities |

### **actions folder**

| **file/folder name** | **description** |
| --- | --- |
| handler | Handles the codes which runs the actions, separated for each category of actions (connectivity, data, AI actions, etc.) |
| actionHandlers.ts | Contains a dictionary that maps the id of the action to the handler of the code which runs the action. |
| shortcutRunner.ts | Has 2 functions:<br>1. **runShortcut** - runs the shortcut using its id<br>2. **resolveInputValues** - retrieves the inputs of the action when running the shortcut |

## Screenshots

<img src="https://github.com/user-attachments/assets/2ceea7a9-2d97-4e41-a13f-ff84f737d98f" alt="Home_-_Identifying_Emotions" width="300" />

<img src="https://github.com/user-attachments/assets/21830896-7e8b-49a5-9ccc-b1d27c49745c" alt="Shortcut_Gallery_-_User_Shortcuts" width="300" />

<img src="https://github.com/user-attachments/assets/9abba28d-b873-4ca0-977c-b4a25089e201" alt="Shortcut_Gallery_-_Install_Shortcut" width="300" />

<img src="https://github.com/user-attachments/assets/fd41c3d0-5522-4b96-8051-09c3c024d1fd" alt="Automation_-_Create_New_Automation" width="300" />

<img src="https://github.com/user-attachments/assets/e852a3aa-7536-465f-91c4-0674ac419f6b" alt="Home_-_New_Shortcut_Steps" width="300" />

<img src="https://github.com/user-attachments/assets/9e4db89a-ae62-40b7-b75e-07959e63fe4f" alt="Home_-_Running_Shortcut" width="300" />
