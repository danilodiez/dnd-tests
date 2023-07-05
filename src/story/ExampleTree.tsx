import React from "react";
import { useDSTree, useTreeviewAsDSTree } from "@elliemae/ds-tree-model";
import DocFolders from "./mock/documents-example.json";
import Unassigned from "./mock/unassigned-example.json";
import TreeViewCompatibleData from "./mock/mock-data.json";
import TreeViewCompatibleUnasssigned from "./mock/mock-tree-unassigned.json";
import { BoxWithTitle } from "./parts/BoxWithTitle";
import { FolderItem, FileItem } from "./parts/items";
import { v4 as uuidv4 } from "uuid";
import { useDroppable, useDndMonitor, useDraggable } from "@dnd-kit/core";

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
  getUniqueId: (node) => `${node.id}`
};
export const ExampleTree = React.memo(() => {
  // const docFoldersTree = useTreeviewAsDSTree(TreeViewCompatibleData);
  const docFoldersTree = useDSTree(DocFolders, opts);

  const FlatTreeWithoutRootDocs = React.useMemo(() => {
    // This returns us an array of nodes
    const fullTree = docFoldersTree.flatten();
    fullTree.shift();
    return fullTree;
  }, [docFoldersTree.hash]);

  // const unassignedTree = useTreeviewAsDSTree(TreeViewCompatibleUnasssigned);
  const unassignedTree = useDSTree(Unassigned, opts);
  const FlatTreeWithoutRootUnassigned = React.useMemo(() => {
    // This returns us an array of nodes
    const fullTree = unassignedTree.flatten();
    fullTree.shift();
    return fullTree;
  }, [unassignedTree.hash]);

  // This should be for the unassigned files, we could handle this in a new unassigned container
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable-unassigned",
    data: { ownerTree: unassignedTree },
  });
  const style = {
    border: isOver ? "1px solid green" : "1px solid black",
  };

  // each useDndMonitor should handle it's own behavior
  useDndMonitor({
    onDragEnd(e) {
      const droppableSecondWord = e.over.id.split("-")[1];
      const draggableSecondWord = e.active.id.split("-")[1];
      // Here we want to handle from one folder to unassigned
      const startingTree = e.active.data.current.ownerTree;
      const grabbedNode = e.active.data.current.node;
      const destinationTree = e.over.data.current.ownerTree;
      const parentNode = e.over.data.current.node ? e.over.data.current.node : destinationTree.getRoot();
      if (
        droppableSecondWord === "unassigned" &&
        draggableSecondWord === "attachment"
      ) {

        // If the drop area is a folder, we must send the node, if not
        // we use the whole tree meaning unassigned
        destinationTree.addNode(grabbedNode.plainItem, { parent: parentNode });
        console.log(startingTree);
        startingTree.removeNode(grabbedNode.dsId);
        // const nodes = e.over.data.current;
        // nodes.addNode(newNode, { parent: nodes.getRoot() });
        // e.active.data.current.removeNode(e.active.data.current.dsId);
      }
    },
  });

  return (
    <div>
      <BoxWithTitle title="Unassigned Files">
        <div ref={setNodeRef} style={style}>
          {FlatTreeWithoutRootUnassigned.map((node) => {
            const item = { ...node.plainItem, depth: node.depth };
            return (
              <DraggableElement
                dragPrefix="unassigned"
                model={item}
                node={node}
                ownerTree={unassignedTree}
              >
                <FileItem key={item.id} item={item} />
              </DraggableElement>
            );
          })}
        </div>
      </BoxWithTitle>
      {/* This is the same but for doc folders */}
      <BoxWithTitle title="Document Folders">
        {FlatTreeWithoutRootDocs.filter(
          (node) => node.plainItem.originalNodeData.isGroup
        ).map((node) => {
          const item = { ...node.plainItem, depth: node.depth };
          return (
            <DraggableElement dragPrefix="folder" model={item} node={node} ownerTree={docFoldersTree}>
              <FolderItem
                key={item.originalNodeData.id}
                item={item}
                node={node}
                startingTree={docFoldersTree}
              />
            </DraggableElement>
          );
        })}
      </BoxWithTitle>
    </div>
  );
});
