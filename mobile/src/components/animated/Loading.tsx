import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {Svg, G, Path} from 'react-native-svg';

type Props = {
  color: string;
  size?: number;
  width?: number;
};

type Dots = {
  x: number;
  y: number;
  opacity: number;
};

function Loading({color, size = 20, width = 5}: Props) {
  const {width: viewWidth, height: viewHeight} = Dimensions.get('screen');
  const [progress, setProgress] = useState(0);
  const [circleDots, setCircleDots] = useState<Array<Dots>>([]);

  const getOpacity = (index: number, steps: number, offset: number) => {
    if (index === offset) {
      return 0.15;
    }
    if (index === (offset + 1) % steps) {
      return 0.3;
    }
    if (index === (offset + 2) % steps) {
      return 0.6;
    }
    return 1;
  };

  const getCircleArray = useCallback(
    (offset: number) => {
      let result = [];
      let centerX = viewWidth / 2;
      let centerY = viewHeight / 2;
      let radius = size;
      let steps = 8;
      for (var i = 0; i < steps; i++) {
        result[i] = {
          x: centerX + radius * Math.cos((2 * Math.PI * i) / steps),
          y: centerY + radius * Math.sin((2 * Math.PI * i) / steps),
          opacity: getOpacity(i, steps, offset),
        };
      }
      setCircleDots(result);
    },
    [size, viewWidth, viewHeight],
  );

  useEffect(() => {
    getCircleArray(progress);
  }, [progress, getCircleArray]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => (prevProgress + 1) % 8);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <Svg>
      {circleDots.map((circleDot, index) => (
        <G
          key={index}
          transform={`rotate(${index * (360 / circleDots.length)}, ${
            circleDot.x
          }, ${circleDot.y})`}>
          <G>
            <Path
              x={circleDot.x - size / 3}
              y={circleDot.y}
              scale={width / 100}
              d="m 0,25.858 c -3.404,3.404 -8.115,5.356 -12.924,5.356 h -56.409 c -4.815,0 -9.53,-1.952 -12.934,-5.355 -3.404,-3.405 -5.357,-8.12 -5.357,-12.935 0,-4.878 1.902,-9.468 5.365,-12.931 3.444,-3.449 8.034,-5.349 12.926,-5.349 h 56.409 c 4.815,0 9.522,1.949 12.924,5.357 3.454,3.454 5.356,8.044 5.356,12.923 0,4.816 -1.952,9.53 -5.356,12.934 M 21.222,-21.205 C 12.109,-30.33 -0.017,-35.356 -12.924,-35.356 h -56.409 c -12.914,0 -25.044,5.026 -34.148,14.145 -9.121,9.121 -14.143,21.244 -14.143,34.135 0,12.898 5.022,25.025 14.144,34.147 9.12,9.121 21.247,14.143 34.147,14.143 h 56.409 c 12.706,0 25.149,-5.155 34.137,-14.143 9.121,-9.12 14.143,-21.247 14.143,-34.147 0,-12.892 -5.022,-25.016 -14.134,-34.129"
              fill={color}
              opacity={circleDot.opacity}
            />
          </G>
        </G>
      ))}
    </Svg>
  );
}

export default Loading;
