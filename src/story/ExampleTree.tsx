import React from "react";
import { useTreeviewAsDSTree } from "@elliemae/ds-tree-model";
import TreeViewCompatibleData from "./mock/mock-data.json";
import TreeViewCompatibleUnasssigned from "./mock/mock-tree-unassigned.json";
import { BoxWithTitle } from "./parts/BoxWithTitle";
import { FolderItem, FileItem } from "./parts/items";
import { useDndMonitor } from "@dnd-kit/core";
import { DraggableElement } from "./parts/DraggableElement";
import { DroppableContainer } from "./parts/DroppableContainer";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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
    onDragMove(e){
      console.log(e);
    },
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

      destinationTree.addNode(grabbedNode.plainItem, { parent: parentNode });
      startingTree.removeNode(grabbedNode.dsId);
    },
  });
  return (
    <div>
      <DroppableContainer
        id="unassigned"
        data={{ ownerTree: unassignedTree }}
        items={FlatTreeWithoutRootUnassigned}
      >
        <BoxWithTitle title="Unassigned Files">
          {FlatTreeWithoutRootUnassigned.map((node) => {
            const item = { ...node.plainItem, depth: node.depth };
            return (
              <DraggableElement
                key={item.id}
                dragPrefix="unassigned"
                model={item}
                node={node}
                ownerTree={unassignedTree}
              >
                <FileItem item={item} />
              </DraggableElement>
            );
          })}
        </BoxWithTitle>
      </DroppableContainer>
      {/* This is the same but for doc folders */}
      <BoxWithTitle title="Document Folders">
        {FlatTreeWithoutRootDocs.filter(
          (node) => node.plainItem.originalNodeData.isGroup
        ).map((node) => {
          const item = { ...node.plainItem, depth: node.depth };
          return (
            <DroppableContainer
              key={item.originalNodeData.id}
              id={`folder-${item.id}`}
              data={{ node, ownerTree: docFoldersTree }}
              items={FlatTreeWithoutRootDocs}
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
