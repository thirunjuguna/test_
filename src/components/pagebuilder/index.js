import grapesjs from "grapesjs";
import "./gjs.scss";
import { useEffect, useState, useRef } from "react";
import {
  // cmdImport,
  cmdSetDeviceDesktop,
  cmdSetDeviceTablet,
  cmdSetDeviceMobile,
  cmdStartTracking,
  // cmdStopTracking,
  // cmdClearStack,
  cmdToggleSSOCS,
  cmdToggleHistory,
  cmdToggleSettings,
  cmdPublish,
  cmdUndo,
  cmdRedo,
  cmdFullscreen,
  cmdPrv,
  cmdSave,
  cmdToggleBlkm,
  cmdToggleLym,
  cmdToggleStym,
  cmdOutlineComp
} from "./consts";
import "./gjs-preset-funnel";

import {
  PanelHeading,
  PanelSection,
  EditorGrid,
  EditorAside,
  SwitchPanel,
  PanelContent,
  BottomLeftPanel,
  EditorMain,
  EditorCanvas
} from "./styled";

function PageBuilder({ initialData = () => null }) {
  const [GJSConfig, setGJSConfig] = useState(null);
  const [editor, setEditor] = useState(null); //Editor ref

  const canvas = useRef(null); //Canvas ref
  const histm = useRef(null); //Blocks manager panel ref
  const setting = useRef(null); //Blocks manager panel ref
  const blm = useRef(null); //Blocks manager panel ref
  const lym = useRef(null); // Layers manager panel ref
  const stylm = useRef(null); // Styles manager panel ref
  // Canvas panel refs
  const pnltl = useRef(null); //Canvas actions left panel ref
  const pnltc = useRef(null); //Canvas actions center panel ref
  const pnltr = useRef(null); //Canvas actions right panel ref

  const switcherContainer = useRef(null);
  const switcher = useRef(null);
  const viewContext = "manager-views";
  // panel bottom
  const pnlbl = useRef(null);
  const aside = useRef(null); //Aside ref

  useEffect(() => {
    if (!editor) {
      try {
        const config = {
          // Get the content for the canvas directly from the element
          container: canvas.current,
          showOffsets: 1,
          noticeOnUnload: 0,
          clearStyles: 1,
          devicePreviewMode: 1,
          // Configurations for Undo Manager
          undoManager: {},
          //Configurations for Commands
          commands: {},
          // Configurations for Trait Manager
          traitManager: {},
          // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
          fromElement: 1,
          // Size of the editor
          height: "100%",
          width: "100%",
          // Disable the storage manager for the moment
          storageManager: { autoload: 0 },
          // Avoid any default panel
          blockManager: {
            appendTo: blm.current
          },
          layerManager: {
            appendTo: lym.current
          },
          // panels: { defaults: [] },
          selectorManager: {
            appendTo: stylm.current
          },
          styleManager: {
            appendTo: stylm.current
          },
          deviceManager: {
            appendTo: pnltc.current,
            devices: [
              {
                name: "Desktop",
                width: "" // default size
              },
              {
                name: "Tablet",
                width: "500px", // this value will be used on canvas width
                widthMedia: "768px" // this value will be used in CSS @media
              },
              {
                name: "Mobile portrait",
                width: "320px", // this value will be used on canvas width
                widthMedia: "500px" // this value will be used in CSS @media
              }
            ]
          },
          panels: {
            defaults: [
              {
                id: "bottom-left-panel",
                el: pnlbl.current,
                buttons: [
                  {
                    id: cmdUndo,
                    context: cmdUndo,
                    command: cmdUndo,
                    class: "text-gray-400",
                    label: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M479.9 394.9c0-19.6 4.2-97.1-56.8-158.7-40.4-40.7-91.9-61.7-163.4-65.5-2.1-.1-3.8-1.9-3.8-4V84c0-3.2-3.5-5.1-6.2-3.4L33.8 222.8c-2.4 1.6-2.4 5.1 0 6.7l215.9 142.2c2.7 1.8 6.2-.1 6.2-3.4v-81.6c0-2.3 1.9-4.1 4.2-4 44.1 1.7 69.5 10.9 97.1 23.2 36.1 16.2 72.9 50.9 94.5 83.5 13.1 19.9 19.2 33.9 21.4 39.7.7 1.7 2.3 2.8 4.1 2.8h2.9c-.1-11.7-.2-26.7-.2-37z"></path></svg>`
                  },
                  {
                    id: cmdRedo,
                    context: cmdRedo,
                    command: cmdRedo,
                    class: "text-gray-400",
                    label: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 3.881v-3.881l6 6-6 6v-3.966c-6.98-0.164-6.681 4.747-4.904 7.966-4.386-4.741-3.455-12.337 4.904-12.119z"></path></svg>`
                  },
                  {
                    id: cmdToggleHistory,
                    context: viewContext,
                    command: cmdToggleHistory,
                    class: "text-gray-400",
                    label: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0H24V24H0z"></path><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12h2c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8C9.25 4 6.824 5.387 5.385 7.5H8v2H2v-6h2V6c1.824-2.43 4.729-4 8-4zm1 5v4.585l3.243 3.243-1.415 1.415L11 12.413V7h2z"></path></g></svg>`
                  },
                  // {
                  //   id: cmdToggleSettings,
                  //   context: viewContext,
                  //   command: cmdToggleSettings,
                  //   class: "text-gray-400",
                  //   label: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M2.132 13.63a9.942 9.942 0 0 1 0-3.26c1.102.026 2.092-.502 2.477-1.431.385-.93.058-2.004-.74-2.763a9.942 9.942 0 0 1 2.306-2.307c.76.798 1.834 1.125 2.764.74.93-.385 1.457-1.376 1.43-2.477a9.942 9.942 0 0 1 3.262 0c-.027 1.102.501 2.092 1.43 2.477.93.385 2.004.058 2.763-.74a9.942 9.942 0 0 1 2.307 2.306c-.798.76-1.125 1.834-.74 2.764.385.93 1.376 1.457 2.477 1.43a9.942 9.942 0 0 1 0 3.262c-1.102-.027-2.092.501-2.477 1.43-.385.93-.058 2.004.74 2.763a9.942 9.942 0 0 1-2.306 2.307c-.76-.798-1.834-1.125-2.764-.74-.93.385-1.457 1.376-1.43 2.477a9.942 9.942 0 0 1-3.262 0c.027-1.102-.501-2.092-1.43-2.477-.93-.385-2.004-.058-2.763.74a9.942 9.942 0 0 1-2.307-2.306c.798-.76 1.125-1.834.74-2.764-.385-.93-1.376-1.457-2.477-1.43zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path></g></svg>`,
                  // },
                  {
                    id: cmdPublish,
                    context: cmdPublish,
                    command: cmdPublish,
                    class: "text-gray-400",
                    togglable: false,
                    label: `<button style="display: flex; gap:8px; padding: 4px 12px; background:#FF6206; color: white "><span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z"></path></svg></span><span>Publish</span></button>`
                  }
                ]
              },
              {
                id: "aside",
                el: aside.current,
                // Make the panel resizable
                resizable: {
                  tc: 0, // Top handler
                  cl: 0, // Left handler
                  cr: 1, // Right handler
                  bc: 0, // Bottom handler
                  // Being a flex child we need to change `flex-basis` property
                  // instead of the `width` (default)
                  keyWidth: "flex-basis"
                }
              },
              {
                id: "switch-view",
                el: switcher.current,
                buttons: [
                  {
                    id: cmdToggleBlkm,
                    command: cmdToggleBlkm,
                    context: viewContext,
                    label: "Elements",
                    togglable: false,
                    active: 1
                  },
                  {
                    id: cmdToggleStym,
                    command: cmdToggleStym,
                    context: viewContext,
                    label: "Styles",
                    togglable: false
                  },
                  {
                    id: cmdToggleLym,
                    command: cmdToggleLym,
                    context: viewContext,
                    label: "Layers",
                    togglable: false
                  }
                ]
              },
              /* */
              /*  , */
              {
                id: "top-left-panel",
                el: pnltl.current,
                buttons: [
                  {
                    id: cmdOutlineComp,
                    command: cmdOutlineComp,
                    context: cmdOutlineComp,
                    active: 1,
                    togglable: true,
                    label: "",
                    attributes: {
                      class: "icon icon-sw"
                    }
                  },
                  {
                    id: cmdFullscreen,
                    command: cmdFullscreen,
                    context: cmdFullscreen,
                    togglable: true,
                    label: "",
                    attributes: {
                      class: "icon icon-fullscreen"
                    }
                  }
                ]
              },
              {
                id: "top-center-panel",
                el: pnltc.current,
                buttons: [
                  {
                    label: "",
                    id: cmdSetDeviceDesktop,
                    command: cmdSetDeviceDesktop,
                    context: cmdSetDeviceDesktop,
                    active: 1,
                    togglable: 0,
                    attributes: {
                      title: "Set device width to desktop",
                      class: "icon icon-device-desktop"
                    }
                  },
                  {
                    label: ``,
                    id: cmdSetDeviceTablet,
                    command: cmdSetDeviceTablet,
                    context: cmdSetDeviceTablet,
                    togglable: 0,
                    attributes: {
                      title: "Set device width to tablet",
                      class: "icon icon-device-tablet"
                    }
                  },
                  {
                    label: ``,
                    id: cmdSetDeviceMobile,
                    command: cmdSetDeviceMobile,
                    context: cmdSetDeviceMobile,
                    togglable: 0,
                    attributes: {
                      title: "Set device width to mobile portrait",
                      class: "icon icon-device-mobile"
                    }
                  }
                ]
              },
              {
                id: "top-right-panel",
                el: pnltr.current,
                buttons: [
                  {
                    id: cmdPrv,
                    context: cmdPrv,
                    command: cmdPrv,
                    class: "text-gray-400",
                    label: `<button style="padding: 8px 12px;
                    font-weight: 700;">Preview</button>`
                  },
                  {
                    id: cmdSave,
                    context: cmdSave,
                    command: cmdSave,
                    class: "text-gray-400",
                    label: `<button style="background: red;color:white; padding: 8px 12px;
                    border-radius: 8px;
                    font-weight: 700;">Save Changes</button>`
                  }
                ]
              }
            ]
          },
          showStyleOnSelected: 1,
          plugins: ["gjs-preset-funnel"],
          pluginsOpts: {
            "gjs-preset-funnel": {}
          }
        };
        const e = grapesjs.init(config);
        // Set the editor
        setGJSConfig(config);
        setEditor(e);
      } catch (err) {
        console.error(err);
      }
    } else {
      const pnl = editor.Panels;
      const openBlkmBtn = pnl.getButton("switch-view", cmdToggleBlkm);
      const openLymBtn = pnl.getButton("switch-view", cmdToggleLym);
      const openStymBtn = pnl.getButton("switch-view", cmdToggleStym);

      editor.on("load", (e) => {
        // Run start tracking changes cmd
        openBlkmBtn && openBlkmBtn.set("active", 1);
      });

      // Define open layers manager cmd
      editor.Commands.add(cmdToggleLym, {
        run(editor, sender) {
          lym.current.style.display = "block";
        },
        stop(editor, sender) {
          lym.current.style.display = "none";
        }
      });

      // Define open history view
      editor.Commands.add(cmdToggleHistory, {
        run(editor, sender) {
          histm.current.style.display = "block";
          switcherContainer.current.style.display = "none";
        },
        stop(editor, sender) {
          histm.current.style.display = "none";
          switcherContainer.current.style.display = "block";
        }
      });
      // Define open settings view
      // editor.Commands.add(cmdSettings, {
      //   run(editor, sender) {
      //     setting.current.style.display = "block";
      //     switcherContainer.current.style.display = "none";
      //   },
      //   stop(editor, sender) {
      //     setting.current.style.display = "none";
      //     switcherContainer.current.style.display = "block";
      //   },
      // });
      // Define open style manager cmd
      editor.Commands.add(cmdToggleStym, {
        run(editor, sender) {
          stylm.current.style.display = "block";
        },
        stop(editor, sender) {
          stylm.current.style.display = "none";
        }
      });

      // Define open block/element manager cmd
      editor.Commands.add(cmdToggleBlkm, {
        run(editor, sender) {
          blm.current.style.display = "block";
        },
        stop(editor, sender) {
          blm.current.style.display = "none";
        }
      });

      editor.on("block:drag:stop", function (model) {
        editor.select(model);

        if (
          (!openLymBtn || !openLymBtn.get("active")) &&
          editor.getSelected()
        ) {
          openStymBtn && openStymBtn.set("active", 1);
        }
      });

      editor.on("change:device", (dev) => {
        console.log(dev);
      });
    }
  }, [
    canvas,
    GJSConfig,
    setGJSConfig,
    blm,
    lym,
    aside,
    stylm,
    pnltl,
    pnltc,
    pnltr,
    editor
  ]);

  function onConfigChange(key, value) {
    GJSConfig[key] = value;
  }
  return (
    <div className="left-0 ">
      <PanelHeading>
        {/* @s top left panel  */}
        <PanelSection ref={pnltl}></PanelSection>
        {/* @s top center panel  */}
        <PanelSection ref={pnltc}></PanelSection>
        {/* @s top right panel  */}
        <PanelSection ref={pnltr}></PanelSection>
      </PanelHeading>

      <EditorGrid id="editor-grid">
        <EditorAside id="aside-panel" ref={aside}>
          <SwitchPanel ref={switcherContainer}>
            <PanelHeading ref={switcher}></PanelHeading>
            <div>
              <PanelContent ref={blm}></PanelContent>
              <PanelContent ref={stylm}></PanelContent>
              <PanelContent ref={lym}></PanelContent>
            </div>
          </SwitchPanel>

          {/* @s history panel  */}
          <PanelContent ref={histm}>
            <h2>History section</h2>
          </PanelContent>
          {/* <PanelContent ref={setting}>
            <h2>Setting section</h2>
          </PanelContent> */}

          <BottomLeftPanel ref={pnlbl} bottom></BottomLeftPanel>
        </EditorAside>

        <EditorMain id="main_panel">
          {/* Main canvas */}
          <EditorCanvas id="editor-canvas" ref={canvas}>
            {initialData()}
          </EditorCanvas>
        </EditorMain>
      </EditorGrid>
    </div>
  );
}
export default PageBuilder;
