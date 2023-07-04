import React from "react";
import { useDSTree } from "@elliemae/ds-tree-model";
import DocFolders from "./mock/documents-example.json";
import Unassigned from "./mock/unassigned-example.json";
import { BoxWithTitle } from "./parts/BoxWithTitle";
import { FolderItem, FileItem } from "./parts/items";
import { v4 as uuidv4 } from "uuid";

import { DraggableElement } from "./parts/DraggableElement";

type FlatNode = {
  id: string;
  originalNodeData: {
    id: number;
    name: string;
    isGroup: boolean;
  };
  depth: number;
};
type FlatNodes = FlatNode[];

const opts = {
  getUniqueId: () => uuidv4(),
};
export const ExampleTree = React.memo(() => {
  const docFoldersTree = useDSTree(DocFolders, opts);
  const FlatTreeWithoutRootDocs = React.useMemo(() => {
    // This returns us an array of nodes
    const fullTree = docFoldersTree.flatten();
    fullTree.shift();
    return fullTree;
  }, [docFoldersTree]);

  const unassignedTree = useDSTree(Unassigned, opts);
  const FlatTreeWithoutRootUnassigned = React.useMemo(() => {
    // This returns us an array of nodes
    const fullTree = unassignedTree.flatten();
    fullTree.shift();
    return fullTree;
  }, [unassignedTree]);

  return (
    <div>
      <BoxWithTitle
        title="Unassigned Files"
        dropZone="unassigned"
        nodes={unassignedTree}
      >
        {FlatTreeWithoutRootUnassigned.map((node) => {
          const item = { ...node.plainItem, depth: node.depth };
          return (
            <DraggableElement dragPrefix="unassigned" model={item} node={node}>
              <FileItem key={item.id} item={item} />
            </DraggableElement>
          );
        })}
      </BoxWithTitle>
      {/* This is the same but for doc folders */}
      <BoxWithTitle
        title="Document Folders"
        dropZone="folders"
        nodes={docFoldersTree}
      >
        {FlatTreeWithoutRootDocs
          .filter((node) => node.plainItem.originalNodeData.isGroup)
          .map((node) => {
            const item = { ...node.plainItem, depth: node.depth };
            return (
              <DraggableElement dragPrefix="folder" model={item} node={node}>
                <FolderItem
                  key={item.originalNodeData.id}
                  item={item}
                  children={node.children}
                />
              </DraggableElement>
            );
          })}
      </BoxWithTitle>
    </div>
  );
});
