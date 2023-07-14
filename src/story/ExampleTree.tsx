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
  getUniqueId: (node: any) => `${node.id}`,
};

export const ExampleTree = React.memo(() => {

  const selectedItems = useItemsStore((state) => state.selected);
  const setItems = useItemsStore(state => state.setItems);

  const docFoldersTree = useTreeviewAsDSTree(TreeViewCompatibleData);
  // const docFoldersTree = useDSTree(DocFolders, opts);

  const FlatTreeWithoutRootDocs = React.useMemo(() => {
    // This returns us an array of nodes
    const fullTree = docFoldersTree.flatten();
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

  // Here we'll only have one DndMonitor
  useDndMonitor({
    onDragEnd(e) {
      const startingTree = e.active.data.current.ownerTree;
      const grabbedNode = e.active.data.current.node;
      const destinationTree = e.over.data.current.ownerTree;
      const folderParent = e.over.data.current.node;
      const parentNode = folderParent
        ? e.over.data.current.node
        : destinationTree.getRoot();

      if (grabbedNode.parent === parentNode) return;
      // If the drop area is a folder, we must send the node, if not
      // we use the whole tree meaning unassigned

      if (selectedItems.length) {
        selectedItems.forEach((item) => {
          destinationTree.addNode(item.node.plainItem, { parent: parentNode });
          startingTree.removeNode(item.node.dsId);
        });
      } else {
        destinationTree.addNode(grabbedNode.plainItem, { parent: parentNode });
        startingTree.removeNode(grabbedNode.dsId);
      }
    },
  });

  return (
    <div>
      <BoxWithTitle title="Unassigned Files" items={FlatTreeWithoutRootUnassigned} section="unassigned">
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
      <BoxWithTitle title="Document Folders" items={FlatTreeWithoutRootDocs} section="attachment">
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
