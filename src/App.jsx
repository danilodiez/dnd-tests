import React from "react";
import { ThemeProvider } from "styled-components";
import { getDefaultTheme } from "@elliemae/pui-theme";
import { UnassignedContainer } from "./story/UnassignedContainer";
import { DocFoldersContainer } from "./story/DocFoldersContainer";
import "./index.css";
import "sanitize.css";
import { DndContext } from "@dnd-kit/core";
import { ExampleTree } from "./story/ExampleTree";

const theme = getDefaultTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <DndContext>
        <UnassignedContainer />
        <DocFoldersContainer />
      </DndContext>

      <div>
        <h1>Yuri components preview:</h1>
        <ExampleTree />
      </div>
    </ThemeProvider>
  );
}
