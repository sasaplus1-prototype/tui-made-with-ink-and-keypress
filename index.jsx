import React, { useState, useEffect } from 'react';
import { Box, render, Text, useApp, useInput, useStdin } from 'ink';
import keypress from 'keypress';

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

let exitApp = () => {};
let enterPressed = () => {};

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);

  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }

  if (key && key.name === 'q') {
    exitApp();
  }

  enterPressed(key && key.name === 'return');
});
process.stdin.setRawMode(true);
process.stdin.resume();
function App() {
  const { exit } = useApp();

  const { setRawMode } = useStdin();

  const [pressed, setPressed] = useState('');
  const [isEnterPressed, setIsEnterPressed] = useState(false);

  useEffect(() => {
    setRawMode(true);

    exitApp = exit;

    return () => {
      setRawMode(false);
    };
  }, []);

  useEffect(() => {
    enterPressed = setIsEnterPressed;
  });

	// useInput((input, key) => {
  //   setPressed(input);

	// 	if (input === 'q') {
	// 		exit();
	// 	}

  //   setIsEnterPressed(key.return);
	// });

  return (
    <Box width="100%" height="100%">
      <Text color="green" inverse={isEnterPressed}>Hello World!</Text>
      <Text color="red">{pressed || '<none>'}</Text>
    </Box>
  );
}

render(<App />);
