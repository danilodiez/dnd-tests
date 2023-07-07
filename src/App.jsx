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
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Grid } from "@elliemae/ds-grid";
const theme = getDefaultTheme();
const FirstDnDTest = () => (
  <DndContext>
    <UnassignedContainer />
    <DocFoldersContainer />
  </DndContext>
);
export default function App() {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <ThemeProvider theme={theme}>
      <h1>New Tree preview:</h1>
      <Grid cols={["40%", "60%"]}>
        <DndContext
          modifiers={[restrictToWindowEdges]}
          sensors={sensors}
          collisionDetection={closestCenter}
        >
          <ExampleTree />

        <BoxWithTitle title="Document Viewer"></BoxWithTitle>
        </DndContext>
      </Grid>
    </ThemeProvider>
  );
}
