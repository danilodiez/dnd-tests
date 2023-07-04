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
const FirstDnDTest = () => (
      <DndContext>
        <UnassignedContainer />
        <DocFoldersContainer />
      </DndContext>
)
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1>New Tree preview:</h1>
      <DndContext>
        <ExampleTree />
      </DndContext>
      </div>
    </ThemeProvider>
  );
}
