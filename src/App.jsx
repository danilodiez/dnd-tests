import React from "react";
import { ThemeProvider } from "styled-components";
import { getDefaultTheme } from "@elliemae/pui-theme";
import "./index.css";
import "sanitize.css";
import { ExampleTree } from "./story/ExampleTree";
import { BoxWithTitle } from "./story/parts/BoxWithTitle";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Grid } from "@elliemae/ds-grid";
import { useCustomCollisionDetector } from "./story/dnd/collisionDetector";
import { useItemsStore } from "./story/store";
import { MoveToFolderDialog } from "./story/parts/MoveToDialog";

const theme = getDefaultTheme();

export default function App() {
  // Set the style ref inside our custom collision algorithm
  // in order to detect the changes on the CSS variables
  const styleContainerRef = React.useRef(null);
  const customCollision = useCustomCollisionDetector({ styleContainerRef });
  
  // sensors
  const pointerSensor = useSensor(PointerSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(pointerSensor, keyboardSensor);

  // store
  const resetItemsStore = useItemsStore((state) => state.resetStore);

  // We reset the component styles and selection when the Dnd is over
  const resetDnD = () => {
    resetItemsStore();
    styleContainerRef.current.style.cssText = "";
  };

  return (
    <ThemeProvider theme={theme}>
      <h1>eFolder Split View</h1>
      <Grid cols={["25%", "75%"]} ref={styleContainerRef}>
        {/* We need to wrap all the containers that allow DnD with DndContext */}
        <DndContext
          modifiers={[restrictToWindowEdges]}
          collisionDetection={customCollision}
          sensors={sensors}
          onDragEnd={resetDnD}
        >
          <ExampleTree />

          <BoxWithTitle title="Document Viewer" section="viewer"></BoxWithTitle>
        </DndContext>
      </Grid>
      <MoveToFolderDialog />
    </ThemeProvider>
  );
}
