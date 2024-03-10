# React Native Mobile Template
<span style="color:red">WARNING: Template in development</span>
## Current tasks
- [x] Splash screen
- [x] Login phone screen
- [x] Login phone password screen
- [x] Login email screen
- [x] Login email password screen
- [x] Register screen
- [x] Navigation
- [x] Bottom tab bar
- [ ] Home screen
- [ ] Favorite screen
- [ ] Messages screen
- [x] Profile screen
- [x] Change theme
- [ ] Push notification
- [ ] Communication with server
- [ ] Disable auto rotate
- [x] Change language
- [ ] Add cookiecutter
## How build for development
 1. For IOS need open terminal in main project path and execute ```cd ios && pod install```
 2. For Android need add lines in ```~/.bash_profile``` and each deploy run ```source ~/.bash_profile```
  ```
  export ANDROID_HOME=$HOME/Library/Android/sdk
  export PATH=$PATH:$ANDROID_HOME/emulator
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  ```
## How add fonts
 - For Android copy font in ```android/app/src/main/assets/fonts```
 - For IOS copy font in ```ios/{project_name}/Fonts```
## Server
 This template will prepare for communication with template server [ASP NET Core Backend Template](https://github.com/GubanovKN/aspnetcore-backend-template)
## Used in the template
 1. [React nav](https://reactnavigation.org)
 2. [RNE](https://reactnativeelements.com)
 3. [React Native Select Dropdown](https://github.com/AdelRedaa97/react-native-select-dropdown)
 4. [React Native SVG](https://github.com/software-mansion/react-native-svg)
 5. [React Native Text Input Mask](https://github.com/react-native-text-input-mask/react-native-text-input-mask)
