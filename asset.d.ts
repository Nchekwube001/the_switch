declare module '*.png';
declare module '*.jpg';
declare module '*.mp3';
declare module '*.jpeg';
declare module '*.html';
declare module '*.gltf';
declare module '*.glb';
declare module '*.bin';
declare module 'msw';
declare module 'msw/native';
declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
