import React from "react";

const collisionDetector = (args) => {
  const { collisionRect, droppableRects, droppableContainers } = args;
  const nothingToDoReturn = {
    droppableContainer: null,
    droppableContainerRect: null,
    collisionPosition: null,
  };

  // droppableContainers contains an array of rect of collisioned with droppable items
  // we want to first of all sort this list from the most nested droppable, to the least nested
  //   then we want to get the most "leaf"-like nest droppable and we are going to chose which to use based on:
  //    1 - center of the collisionRect vs the remaining droppable "leaf"
  //    2 - the droppable leaf with the most overlap with the center of the collisionRect will be used as our "reference"
  let finalDroppableContainer = null;
  let finalDroppableContainerRect = null;
  const collisionRectVerticalCenter =
    collisionRect.top + collisionRect.height / 2;
  if (droppableContainers.length === 0) {
    return nothingToDoReturn;
  }
  droppableContainers.forEach((droppableContainer) => {
    const { id } = droppableContainer;
    const rect = droppableRects.get(id);
    const { top, left, right, bottom } = rect;

    if (
      collisionRectVerticalCenter > top &&
      collisionRectVerticalCenter < bottom
    ) {
      finalDroppableContainer = droppableContainer;
      finalDroppableContainerRect = rect;
    }
  });
  // if we are hovering over the space between droppable containers and we are collisioning with them BUT the center of the hover isn't really overlapping with any of them
  // finalDroppableContainer will be null and we have nothing to do
  if (!finalDroppableContainer) {
    return nothingToDoReturn;
  }
  // now that we have the droppable container and it's rect,
  // we need to understand if the collision is happening on the top 75% or bottom 25% of the droppable container
  // if it neither, then the collision is happening in the middle of it
  let collisionPosition = "middle";

  const height25 = finalDroppableContainerRect.height / 4;
  const top25Position = finalDroppableContainerRect.top + height25;
  const bottom25Position = finalDroppableContainerRect.bottom - height25;

  if (collisionRect.top < top25Position) {
    collisionPosition = "top";
  } else if (collisionRect.bottom > bottom25Position) {
    collisionPosition = "bottom";
  }
  return {
    droppableContainer: finalDroppableContainer,
    droppableContainerRect: finalDroppableContainerRect,
    collisionPosition,
  };
};
// this custom hook will return a memoized function that implements the collisionDetector function
//  and on top of that collision detector function, it will also add the data-droppable-id and data-droppable-position to the styleContainerRef
export const useCustomCollisionDetector = ({ styleContainerRef }) =>
  React.useCallback(
    (args) => {
      const customCollision = collisionDetector(args);
      const { droppableContainer, collisionPosition } = customCollision;

      styleContainerRef.current.style.cssText = ``;
      if (droppableContainer) {
        const { id } = droppableContainer;
        let borderVal = "2px 2px 2px 2px";
        if (collisionPosition === "top") {
          borderVal = `2px 0px 0px 0px`;
        } else if (collisionPosition === "bottom") {
          borderVal = `0px 0px 2px 0px`;
        }
        const borderWidth = `--hover-item-${id}-border-width: ${borderVal};`;
        const borderStyle = `--hover-item-${id}-border-style: solid;`;
        const borderColor = `--hover-item-${id}-border-color: #1E79C2;`;
        styleContainerRef.current.style.cssText = `${borderWidth}${borderStyle}${borderColor}`;

        return [{ id, data: customCollision }];
      }
      return [];
    },
    [styleContainerRef]
  );
