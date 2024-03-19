# React Native Mobile Template
## What is this
 This is a template mobile application written in React Native. This is all my experience when I first created a mobile app. There will be new versions in this repository when I have problems and resolve.
## Current tasks
- [x] Splash screen
- [x] Login phone screen
- [x] Login phone password screen
- [x] Login email screen
- [x] Login email password screen
- [x] Register screen
- [x] Navigation
- [x] Bottom tab bar
- [X] Home screen
- [X] Favorite screen
- [X] Messages screen
- [x] Profile screen
- [x] Change theme
- [x] Communication with server
- [x] Disable auto rotate
- [x] Storage data
- [x] Change language
- [x] Add cookiecutter
- [ ] Google OAuth
- [ ] Apple OAuth
- [ ] Push notification
- [ ] Messages
## Setup
 1. Use cookiecutter for first config cookiecutter ```https://github.com/GubanovKN/native-mobile-template.git```
 2. Parameter login_type in env has two values type "phone" or "email"
 3. Parameter use_password in env has two values type "yes" or "no"
## How build for development
 1. Use ```npm install``` in root path project
 2. For IOS need open terminal in main project path and execute ```cd ios && pod install```
 3. For Android need add lines in ```~/.bash_profile``` and each deploy run ```source ~/.bash_profile```
  ```
  export ANDROID_HOME=$HOME/Library/Android/sdk
  export PATH=$PATH:$ANDROID_HOME/emulator
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  ```
 4.If change env need reset cache ```npm start -- --reset-cache```
## How add fonts
 - For Android copy font in ```android/app/src/main/assets/fonts```
 - For IOS copy font in ```ios/{project_name}/Fonts```
## How disable autorotate
 - For Andorid add attribute ```android:screenOrientation="portrait"``` in ```android/app/src/main/AndroidManifest.xml``` (MainActivity tag)
 - For IOS delete other orientation except ```<string>UIInterfaceOrientationPortrait</string>``` in array tag from ```ios/mobile/Info.plist``` (after <key>UISupportedInterfaceOrientations</key>)
## Server
 This template will prepare for communication with template server [ASP NET Core Backend Template](https://github.com/GubanovKN/aspnetcore-backend-template)
## Used in the template
 1. [React nav](https://reactnavigation.org)
 2. [RNE](https://reactnativeelements.com)
 3. [React Native Select Dropdown](https://github.com/AdelRedaa97/react-native-select-dropdown)
 4. [React Native SVG](https://github.com/software-mansion/react-native-svg)
 5. [React Native Text Input Mask](https://github.com/react-native-text-input-mask/react-native-text-input-mask)
 6. [React Native MMKV Storage](https://github.com/ammarahm-ed/react-native-mmkv-storage)
 7. [React Native DotENV](https://github.com/goatandsheep/react-native-dotenv)
