/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export interface ColorPalette{
  background: string;
  text: string;
  button: string;
  textButton: string;
  iconDefault: string;
  iconSelected: string;
  tintColor:string;
}
export interface ColorsType{
  lightColor: ColorPalette;
  darkColor: ColorPalette;
}

const lightColor: ColorPalette={
  background: '#F8F8FF',
  text: '#181717',
  button: '#1A9AEA',
  textButton: '#fff',
  iconDefault: '#181717',
  iconSelected: '#1A9AEA',
  tintColor : '#1A9AEA',
}
const darkColor: ColorPalette={
  background: '#181717',
  text: '#F8F8FF',
  button: '#1A9AEA',
  textButton: '#181717',
  iconDefault: '#dee6ed',
  iconSelected: '#1A9AEA',
  tintColor : '#fff',
}

const Colors: ColorsType={
  lightColor,
  darkColor,
}


export{Colors};