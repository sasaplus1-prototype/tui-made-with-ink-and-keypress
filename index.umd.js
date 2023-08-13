(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('react'), require('ink'), require('keypress')) :
  typeof define === 'function' && define.amd ? define(['react', 'ink', 'keypress'], factory) :
  (global = global || self, factory(global.react, global.ink, global.keypress));
})(this, (function (React, ink, keypress) {
  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var keypress__default = /*#__PURE__*/_interopDefaultLegacy(keypress);

  // make `process.stdin` begin emitting "keypress" events
  keypress__default["default"](process.stdin);
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
    const {
      exit
    } = ink.useApp();
    const {
      setRawMode
    } = ink.useStdin();
    const [pressed, setPressed] = React.useState('');
    const [isEnterPressed, setIsEnterPressed] = React.useState(false);
    React.useEffect(() => {
      setRawMode(true);
      exitApp = exit;
      return () => {
        setRawMode(false);
      };
    }, []);
    React.useEffect(() => {
      enterPressed = setIsEnterPressed;
    });

    // useInput((input, key) => {
    //   setPressed(input);

    // 	if (input === 'q') {
    // 		exit();
    // 	}

    //   setIsEnterPressed(key.return);
    // });

    return /*#__PURE__*/React__default["default"].createElement(ink.Box, {
      width: "100%",
      height: "100%"
    }, /*#__PURE__*/React__default["default"].createElement(ink.Text, {
      color: "green",
      inverse: isEnterPressed
    }, "Hello World!"), /*#__PURE__*/React__default["default"].createElement(ink.Text, {
      color: "red"
    }, pressed || '<none>'));
  }
  ink.render( /*#__PURE__*/React__default["default"].createElement(App, null));

}));
//# sourceMappingURL=index.umd.js.map
