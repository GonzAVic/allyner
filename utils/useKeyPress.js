import { useState, useEffect } from "react";

/*
  References: https://usehooks.com/useKeyPress/
*/

export function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key.toLowerCase() === targetKey) {
      setKeyPressed(true);
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key.toLowerCase() === targetKey) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}

export function useTargetKeyPressed() {
  const [keyPressed, setKeyPressed] = useState(null);

  useEffect(() => {
    window.addEventListener("keydown", ({ key }) => {
      setKeyPressed(key);
    });
    window.addEventListener("keyup", ({ key }) => {
      setKeyPressed(null);
    });
  }, []);

  return keyPressed;
}

// KEY KEYS
const ENTER = "enter";
const ESCAPE = "escape";
const ARROW_DOWN = "arrowdown";
const ARROW_UP = "arrowup";
const ARROW_LEFT = "arrowleft";
const ARROW_RIGHT = "arrowright";
const META = "meta";
const CONTROL = "control";
const SHIFT = "shift";
const SPACE = " ";

export {
  ENTER,
  ESCAPE,
  ARROW_DOWN,
  ARROW_UP,
  ARROW_LEFT,
  ARROW_RIGHT,
  META,
  CONTROL,
  SHIFT,
  SPACE,
};