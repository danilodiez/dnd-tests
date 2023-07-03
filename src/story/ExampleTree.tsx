import React from "react";
import { useDSTree } from "@elliemae/ds-tree-model";
import Data from "./mock/data-example.json";
import { BoxWithTitle } from "./parts/BoxWithTitle";
import { FolderItem, FileItem } from "./parts/items";

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
  getUniqueId: (node: any) => node.id,
};
export const ExampleTree = React.memo(() => {
  const tree = useDSTree(Data, opts);
  const FlatTreeWithoutRoot = React.useMemo(() => {
    const fullTree = tree.flatten();
    fullTree.shift();
    return fullTree;
  }, [tree]);

  return (
    <BoxWithTitle title="Unasigned Files">
      {FlatTreeWithoutRoot.map((node) => {
        const item = { ...node.plainItem, depth: node.depth };

        return item.originalNodeData.isGroup ? (
          <FolderItem key={item.originalNodeData.id} item={item} />
        ) : (
          <FileItem key={item.originalNodeData.id} item={item} />
        );
      })}
    </BoxWithTitle>
  );
});
