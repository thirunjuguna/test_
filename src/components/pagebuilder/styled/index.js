import styled from "styled-components";

const pnlMaxHeight = "calc(100vh - 139px)";

export const PanelHeading = styled("div")`
  display: flex;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  justify-content: space-between;
  overflow: hidden;
  color: #060e4f;
  /* padding: 4px; */
  max-height: 47px;
  height: 47px;
  width: 100%;
  position: relative;
  border-bottom: 1px solid rgba(234, 234, 234, 0.53);
  background: rgba(255, 255, 255, 0.53);
  .gjs-pn-panel {
    background-color: transparent;
  }
  .gjs-pn-buttons {
    justify-content: space-between;
    gap: 8px;

    width: 100%;
    padding-left: 8px;
    padding-right: 8px;
    .gjs-pn-btn {
      font-size: inherit;
      &.gjs-pn-active {
        box-shadow: none;
        box-shadow: 0 0 1px 1px currentColor;
        background-color: rgba(255, 255, 255, 0.76);
      }
    }
  }
  &:hover {
    scrollbar-width: thin;
  }
`;
export const SwitchPanel = styled("div")`
  .gjs-pn-buttons {
    justify-content: space-between;
    gap: 8px;
    width: auto;
    padding-left: 8px;
    padding-right: 8px;
    .gjs-pn-btn {
      font-size: inherit;
      &.gjs-pn-active {
        box-shadow: none;
        border-bottom: 2px currentColor solid;
        background: transparent;
      }
    }
  }
`;
export const BottomLeftPanel = styled("div")`
  position: relative;
  height: 47px;
  background: #3b3b3d;
  display: flex;
  color: white;
  gap: 8px;
  scrollbar-width: thin;
  justify-content: space-around;
  align-items: center;
  overflow-x: auto;
  z-index: 100;
  ${(props) => (props.buttom ? "bottom: 0" : "top: 0")}
`;
export const PanelSection = styled("section")`
  display: flex;
  padding: 8px;
  position: relative;
  box-sizing: border-box;
`;
export const PanelContent = styled("div")`
  overflow-y: auto;
  display: none;
  /* border: 1px dashed red; */
  min-height: ${pnlMaxHeight};
  max-height: ${pnlMaxHeight};

  background: transparent;
  .gjs-sm-sector {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    border: none;
    .gjs-sm-title {
      border: none;
      color: rgb(168, 165, 165);
      padding: 0;
    }
  }
  .gjs-blocks-cs {
    padding: 8px;
    background: transparent;
    .gjs-blocks-c {
      padding: 0;
    }
    .gjs-block {
      box-shadow: none;
      color: #c4c4c4;
      background: white;

      &:hover {
        color: #ff6206;
      }
    }

    .gjs-block-category {
      border: none;
      padding: 8px;
      .gjs-title {
        background: transparent;
        border: none;
        font-style: normal;
        font-weight: 500;
        padding: 0;
      }
    }
  }
`;
export const EditorAside = styled("div")`
  background: #f4f3f3;
  flex-basis: 200px;
  position: relative;
  padding: 0;
  font-size: 14px;
  min-width: 250px;
  max-width: 350px;
  max-height: calc(100vh - 47px);
  border-right: 1px solid rgba(234, 234, 234, 0.53);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
export const EditorGrid = styled("div")`
  display: flex;
  height: calc(100vh -47px);
  max-height: calc(100vh -47px);
  /* grid-template-columns: minmax(300px, 300px) auto; */
  /* grid-template-rows: 1fr; */
  overflow: hidden;
  width: 100%;
`;
export const EditorMain = styled("div")`
  background: #535353;
  overflow: hidden;
  position: relative;
  /* outline: 2px dashed orange; */
  /* outline-offset: -4px; */
  flex-grow: 1;
  .gjs-frame-wrapper {
    padding: 10px;
    background: #888;
  }
  .gjs-editor {
    background: transparent;
    .gjs-cv-canvas {
      background: #c3c3c3;
      height: 100%;
      top: 0;
      width: 100%;
      left: 0;
      position: absolute;
    }
  }
`;
export const EditorCanvas = styled("section")`
  display: block;
  overflow: scroll;
  scrollbar-width: thin;

  /* background: white; */
  /* border: 1px dashed #8a8a8a; */

  /* left: 0; */
  /* top: 0; */
`;

export const AsideResizer = styled.button`
  position: absolute;
  width: 100px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  top: 20px;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  box-shadow: -2px 2px 2px 0px rgba(34, 34, 34, 0.124); /* border: 2px dashed red; */
  background: #f4f3f3;
  border-radius: 0 0 10px 10px;
  transform: rotate(-90deg);
  border-left: 1px solid #f4f3f3;
  border-right: 1px solid #f4f3f3;
  border-bottom: 1px solid #f4f3f3;
  transform-origin: bottom left;
  margin-left: 25px;
  cursor: pointer;
  transition: left 500ms ease-in-out;
  left: 100%;
  right: 0;
  svg {
    width: 20px;
    height: 20px;
    color: #9a9797;
  }
`;

export const SearchGroupInput = styled.label`
  background: #ffffff;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  gap: 0;
  align-items: center;
  &:focus-within {
    box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px,
      rgb(255, 98, 6) 0px 0px 0px 2px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
  }
  input {
    padding: 12px;
    min-width: 0;
    width: auto;
    display: block;
    border-radius: inherit;
    flex-grow: 1;
  }
  button {
    border-radius: inherit;
    background: #9a9797;
    padding: 12px;
  }
`;
