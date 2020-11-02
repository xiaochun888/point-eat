// reactive box layout update
export const updateBoxLayout = (boxLayout, data) => {
  return {
    ...boxLayout,
    ...data
  };
};

// reactive box position update
export const updateBoxPosition = (boxLayout, data) => {
  return updateBoxLayout(boxLayout, {
    position: {
      ...boxLayout.position,
      ...data
    }
  });
};

// check if 2 positions are colliding
export const positionsAreColliding = (positionA, positionB) => {
  return positionA.x < (positionB.x + positionB.w) &&
        (positionA.x + positionA.w) > positionB.x &&
        positionA.y < (positionB.y + positionB.h) &&
        (positionA.y + positionA.h) > positionB.y;
};

// check if position is free in layout
export const isFree = (layout, position) => {
  for (let i = 0; i < layout.length; i++) {
    if (positionsAreColliding(layout[i].position, position)) {
      return false;
    }
  }
  return true;
};

export const isBoxFree = (layout, boxLayout) => {
  for (let i = 0; i < layout.length; i++) {
    if(layout[i].id !== boxLayout.id) {
      if (positionsAreColliding(layout[i].position, boxLayout.position)) {
        return false;
      }
    }
  }
  return true;
};

// moves the box to the upmost free position
export const bubbleUp = (layout, boxLayout) => {
  do {
    boxLayout = updateBoxPosition(boxLayout, {
      y: boxLayout.position.y - 1
    });
  } while (isBoxFree(layout, boxLayout) && boxLayout.position.y >= 0);
  return updateBoxPosition(boxLayout, {
    y: boxLayout.position.y + 1
  });
};

// updates box position to a free place in a given layout
export const moveBoxToFreePlace = (layout, boxLayout, doBubbleUp) => {
  if (doBubbleUp) {
    boxLayout = bubbleUp(layout, boxLayout);
  }
  while (!isBoxFree(layout, boxLayout)) {
    boxLayout = updateBoxPosition(boxLayout, {
      y: boxLayout.position.y + 1
    });
  }
  return boxLayout;
};

// sort layout based on position and visibility
export const sortLayout = (layout) => {
  return [ ...layout ].sort((a, b) => {
    if (a.hidden && !b.hidden) {
      return 1;
    }
    if (!a.hidden && b.hidden) {
      return -1;
    }
    if (a.pinned && !b.pinned) {
      return -1;
    }
    if (!a.pinned && b.pinned) {
      return 1;
    }
    if (a.position.y < b.position.y) {
      return -1;
    }
    if (a.position.y > b.position.y) {
      return 1;
    }
    if (a.position.x < b.position.x) {
      return -1;
    }
    if (a.position.x > b.position.x) {
      return 1;
    }
    return 0;
  });
};

// moves all boxes to the upmost free position
export const layoutBubbleUp = (layout) => {
  layout = sortLayout(layout);
  let newLayout = [];
  layout.forEach(boxLayout => {
    newLayout.push(bubbleUp(newLayout, boxLayout));
  });
  return newLayout;
};

// get box position in pixels
export const positionToPixels = (position, gridPixel, margin = 0, outerMargin = {x:0, y:0}) => {
  /**grid + margin = unit */
  return {
    x: position.x * (gridPixel.width + margin) + outerMargin.x,
    y: position.y * (gridPixel.height + margin) + outerMargin.y,
    w: position.w * (gridPixel.width + margin) - margin,
    h: position.h * (gridPixel.height + margin) - margin
  };
};

// get layout bounding box
export const getLayoutSize = (layout) => {
  return {
    w: layout.reduce((width, boxLayout) => {
      return boxLayout.hidden
        ? width
        : Math.max(width, boxLayout.position.x + boxLayout.position.w);
    }, 0),
    h: layout.reduce((height, boxLayout) => {
      return boxLayout.hidden
        ? height
        : Math.max(height, boxLayout.position.y + boxLayout.position.h);
    }, 0)
  };
};

// check if layout has collisions
export const layoutHasCollisions = (layout) => {
  for (let i = 0; i < layout.length; i++) {
    for (let j = i + 1; j < layout.length; j++) {
      if (positionsAreColliding(layout[i].position, layout[j].position)) {
        return true;
      }
    }
  }
  return false;
};

// fix layout with collisions
export const fixLayout = (layout, doBubbleUp) => {
  layout = sortLayout(layout);
  let fixedLayout = [];
  layout.forEach(boxLayout => {
    fixedLayout.push(moveBoxToFreePlace(fixedLayout, boxLayout, doBubbleUp));
  });
  return fixedLayout;
};

export const newDebounce = (func, wait) => {
  let debounce = function() {
    const context = this, args = arguments;
    const later = function() {
      debounce.timeout = null;
      func.apply(context, args);
    };
    if(debounce.timeout) {
      clearTimeout(debounce.timeout);
    }
    debounce.timeout = setTimeout(later, wait);
  };
  return debounce;
};
