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
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDndMonitor,
} from "@dnd-kit/core";
import { Grid } from "@elliemae/ds-grid";
import { useCustomCollisionDetector } from "./story/dnd/collisionDetector";
import { useItemsStore } from "./story/store";

const theme = getDefaultTheme();

export default function App() {
  const styleContainerRef = React.useRef(null);
  const customCollision = useCustomCollisionDetector({ styleContainerRef });
  const pointerSensor = useSensor(PointerSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(pointerSensor, keyboardSensor);
  const resetStore = useItemsStore((state) => state.resetStore);

  const resetDnD = () => {
    resetStore();
    styleContainerRef.current.style.cssText = "";
  };

  return (
    <ThemeProvider theme={theme}>
      <h1>eFolder Split View</h1>
      <Grid cols={["25%", "75%"]} ref={styleContainerRef}>
        <DndContext
          modifiers={[restrictToWindowEdges]}
          collisionDetection={customCollision}
          sensors={sensors}
          onDragEnd={resetDnD}
        >
          <ExampleTree />

          <BoxWithTitle title="Document Viewer"></BoxWithTitle>
        </DndContext>
      </Grid>
    </ThemeProvider>
  );
}
