// createSymbolWatcher;
import React from "react";
import { Link } from "react-router-dom";
const generatePath = (text) => {
  switch (text?.[0]) {
    case "@":
      return `/influencers/${text?.substring(1)}`;
    case "$":
      return `/stocks/${text?.substring(1)}`;
    case "#":
      return `/tags/${text?.substring(1)}`;
    default:
      return `/influencers/${text?.substring(1)}`;
  }
};

class SymbolCounter {
  constructor(_symbol, count, callback) {
    this._symbol = _symbol;
    this.callback = callback;
    this.count = count || 0;
  }

  getCount() {
    return this.count;
  }

  increaseCount() {
    this.count += 1;
    this.callback({ symbol: this._symbol, count: this.count });
  }

  decreaseCount() {
    this.count -= 1;
  }

  setCount(_count) {
    this.count = _count;
  }
}
export const createSymbolWatcher = (symbolArr, value) => {
  if (
    !symbolArr ||
    !Array.isArray(symbolArr) ||
    symbolArr?.length === 0 ||
    !value ||
    typeof value !== "string"
  ) {
    return null;
  }
  const symbolCounterObj = {};
  symbolArr?.forEach((_symbol) => {
    symbolCounterObj[_symbol.symbol] = new SymbolCounter(
      _symbol?.symbol,
      value.split(_symbol?.symbol).length - 1,
      _symbol?.callback
    );
  });

  return symbolCounterObj;
};

export const formatPost = (postContent) => {
  if (!postContent || postContent?.length === 0 || postContent === undefined) {
    return "";
  }
  const content = [];
  const contentArr = postContent
    ?.toString()
    ?.replaceAll("\n", " n ")
    ?.split(" ");

  contentArr?.forEach((text, index) => {
    if (text === "n") {
      content.push(React.createElement("br", null));
    } else if (
      text?.substring(0, 7) === "http://" ||
      text?.substring(0, 8) === "https://" ||
      text?.substring(0, 4) === "www."
    ) {
      content.push(
        ...[
          React.createElement("span", null, " "),
          React.createElement("a", { href: text, target: "_blank" }, text),
        ]
      );
    } else if (text?.[0] === "@" || text?.[0] === "#" || text?.[0] === "$") {
      content.push(
        ...[
          React.createElement("span", null, " "),
          React.createElement(Link, { to: generatePath(text) }, text),
        ]
      );
    } else if (index === 0) {
      content.push(React.createElement("span", null, text));
    } else {
      content.push(React.createElement("span", null, ` ${text}`));
    }
  });
  return content;
};
