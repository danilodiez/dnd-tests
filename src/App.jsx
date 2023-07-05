import React from "react";
import { ThemeProvider } from "styled-components";
import { getDefaultTheme } from "@elliemae/pui-theme";
import { UnassignedContainer } from "./story/UnassignedContainer";
import { DocFoldersContainer } from "./story/DocFoldersContainer";
import "./index.css";
import "sanitize.css";
import { DndContext } from "@dnd-kit/core";
import { ExampleTree } from "./story/ExampleTree";
import { BoxWithTitle } from "./story/parts/BoxWithTitle";

import { Grid } from "@elliemae/ds-grid";
const theme = getDefaultTheme();
const FirstDnDTest = () => (
  <DndContext>
    <UnassignedContainer />
    <DocFoldersContainer />
  </DndContext>
);
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <h1>New Tree preview:</h1>
      <Grid cols={["40%", "60%"]}>
        <DndContext>
          <ExampleTree />
        </DndContext>

        <BoxWithTitle title="Document Viewer"></BoxWithTitle>
      </Grid>
    </ThemeProvider>
  );
}
