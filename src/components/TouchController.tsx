import React from "react";
import { checkTouchDevice } from "../utils";
import styled from "styled-components";
import p5 from "p5";

const TouchController = () => {
  if (!checkTouchDevice) return null;
  const { UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW } = p5.prototype;

  const dispatchEvent = (keyCode: number) => {
    window.dispatchEvent(new KeyboardEvent("keydown", { keyCode }));
    window.dispatchEvent(new KeyboardEvent("keyup", { keyCode }));
    if ("vibrate" in navigator) navigator.vibrate(20);
  };

  return (
    <Root>
      <Button onTouchStart={() => dispatchEvent(UP_ARROW)}>↑</Button>
      <div className="middle">
        <Button onTouchStart={() => dispatchEvent(LEFT_ARROW)}>←</Button>
        <DragPoint />
        <Button onTouchStart={() => dispatchEvent(RIGHT_ARROW)}>→</Button>
      </div>
      <Button onTouchStart={() => dispatchEvent(DOWN_ARROW)}>↓</Button>
    </Root>
  );
};

const Root = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-20%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  .middle {
    display: flex;
    gap: 12px;
  }
`;

const Button = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid grey;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  user-select: none;

  &:active {
    box-shadow: inset 0px 0px 8px lightgrey, 0px 0px 2px lightgrey;
  }
`;

const DragPoint = styled.div`
  width: 50px;
  height: 50px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: lightgrey;
  }
`;

export default TouchController;
