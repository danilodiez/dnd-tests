import React, { useState } from "react";
import { useTreeviewAsDSTree } from "@elliemae/ds-tree-model";
import TreeViewCompatibleData from "./mock/mock-data.json";
import TreeViewCompatibleUnasssigned from "./mock/mock-tree-unassigned.json";
import { BoxWithTitle } from "./parts/BoxWithTitle";
import { FolderItem, FileItem } from "./parts/items";
import { useDndMonitor, DragOverlay } from "@dnd-kit/core";
import { DraggableElement } from "./parts/DraggableElement";
import { DroppableContainer } from "./parts/DroppableContainer";
import { useItemsStore } from "./store";
import { v4 as uuidv4 } from 'uuid';

type FlatNode = {
  id: string;
  originalNodeData: {
    id: number;
    name: string;
    isGroup: boolean;
  };
  depth: number;
};


export const ExampleTree = React.memo(() => {

  const selectedItems = useItemsStore((state) => state.selected);

  // The useTreeviewAsDSTree hook allows us to use same data as we currently have on eFolder
  const docFoldersTree = useTreeviewAsDSTree(TreeViewCompatibleData);

  // This is the old useDSTree structure
  // const docFoldersTree = useDSTree(DocFolders, opts);

  // Use the Tress as flattened structures
  const FlatTreeWithoutRootDocs = React.useMemo(() => {
    // This returns us an array of nodes
    const fullTree = docFoldersTree.flatten();
    // Remove the first element --> the pseudoroot
    fullTree.shift();
    return fullTree;
  }, [docFoldersTree.hash]);

  const unassignedTree = useTreeviewAsDSTree(TreeViewCompatibleUnasssigned);
  // const unassignedTree = useDSTree(Unassigned, opts);
  const FlatTreeWithoutRootUnassigned = React.useMemo(() => {
    // This returns us an array of nodes
    const fullTree = unassignedTree.flatten();
    fullTree.shift();
    return fullTree;
  }, [unassignedTree.hash]);

  useDndMonitor({
    onDragEnd(e) {
      const startingTree = e.active.data.current.ownerTree;
      const grabbedNode = e.active.data.current.node;
      const destinationTree = e.over.data.current.ownerTree;
      const folderParent = e.over.data.current.node;

      // If the drop area is a folder, we must send the node, if not
      // we use the whole tree meaning unassigned
      const parentNode = folderParent
        ? e.over.data.current.node
        : destinationTree.getRoot();

      if (grabbedNode.parent === parentNode) return;

      // We have to create new nodes because if we don't we are gonna have collision of IDs
      if (selectedItems.length) {
        // Multiple Dnd
        selectedItems.forEach((item) => {
        const newId = uuidv4();
        const newNode = {id: newId, originalNodeData: {id: newId, name: item.node.plainItem.originalNodeData.name}}
          destinationTree.addNode(newNode, { parent: parentNode });
          startingTree.removeNode(item.node.dsId);
        });
      } else {
        // Single Dnd
        const newId = uuidv4();
        const newNode = {id: newId, originalNodeData: {id: newId, name: grabbedNode.plainItem.originalNodeData.name}}
        destinationTree.addNode(newNode, { parent: parentNode });
        startingTree.removeNode(grabbedNode.dsId);
      }
    },
  });

  return (
    <div>
      <BoxWithTitle title="Unassigned Files" section="unassigned">
        <DroppableContainer
          id="unassigned"
          data={{ ownerTree: unassignedTree }}
        >
          {FlatTreeWithoutRootUnassigned.map((node) => {
            const item = { ...node.plainItem, depth: node.depth };
            return (
              <DraggableElement
                key={item.id}
                model={item}
                node={node}
                ownerTree={unassignedTree}
                section="unassigned"
              >
                <FileItem item={item} shouldRenderTooltip={false} />
              </DraggableElement>
            );
          })}
        </DroppableContainer>
      </BoxWithTitle>

      {/* This is the same but for doc folders */}
      <BoxWithTitle title="Document Folders" section="attachment">
        {FlatTreeWithoutRootDocs.filter(
          (node) => node.plainItem.originalNodeData.isGroup
        ).map((node) => {
          const item = { ...node.plainItem, depth: node.depth };
          return (
            <DroppableContainer
              id={`${node.plainItem.id}`}
              data={{ node, ownerTree: docFoldersTree }}
              key={node.plainItem.id}
            >
              <FolderItem
                items={FlatTreeWithoutRootDocs}
                item={item}
                node={node}
                startingTree={docFoldersTree}
              />
            </DroppableContainer>
          );
        })}
      </BoxWithTitle>
    </div>
  );
});
