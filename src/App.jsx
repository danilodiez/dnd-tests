import React from "react";
import { ThemeProvider } from "styled-components";
import { getDefaultTheme } from "@elliemae/pui-theme";
import { UnassignedContainer } from "./story/UnassignedContainer";
import { DocFoldersContainer } from "./story/DocFoldersContainer";
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
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Grid } from "@elliemae/ds-grid";
import { useCustomCollisionDetector } from "./story/dnd/collisionDetector";
import styled from "styled-components";

const theme = getDefaultTheme();
const FirstDnDTest = () => (
  <DndContext>
    <UnassignedContainer />
    <DocFoldersContainer />
  </DndContext>
);
export default function App() {
  const styleContainerRef = React.useRef(null);
  const customCollision = useCustomCollisionDetector({ styleContainerRef });
    const sensors = useSensors(
    useSensor(PointerSensor),
  );
  const resetBorderStyles = () => styleContainerRef.current.style.cssText = "";

  return (
    <ThemeProvider theme={theme}>
      <h1>eFolder Split View</h1>
      <Grid cols={["40%", "60%"]} ref={styleContainerRef}>
        <DndContext
          modifiers={[restrictToWindowEdges]}
          collisionDetection={customCollision}
          sensors={sensors}
          onDragEnd={resetBorderStyles}
        >
          <ExampleTree />

          <BoxWithTitle title="Document Viewer"></BoxWithTitle>
        </DndContext>
      </Grid>
    </ThemeProvider>
  );
}
