class Zye {
  state = {};

  setState(newState) {
    const keys = Object.keys(newState);
    if (Object.keys(this.state).indexOf(keys[0]) === -1) {
      throw new Error(`please provide an inital value for ${keys[0]}`);
    }
    this.state = {
      ...this.state,
      ...newState
    };
  }

  render() {
    throw new Error("Zye Component must have render function");
  }
}

Zye.__APP_TREE__ = {
  element: null,
  children: []
};

Zye.createElement = (element, attributes = {}, content = []) => {
  const node = document.createElement(element);
  for (let key in attributes) {
    node.setAttribute(key, attributes[key]);
  }
  if (typeof content === "string") {
    node.textConent = content;
  }
  const __APP__ = {
    element: node,
    children: content
  };
  Zye.__APP_TREE__ = __APP__;
  return __APP__;
};

Zye.__APPEND_ELEMENT__ = function(element, children) {
  if (typeof children === "string") {
    element.textContent = children;
    return element;
  }
  for (let child of children) {
    element.appendChild(Zye.__APPEND_ELEMENT__(child.element, child.children));
  }
  return element;
};

Zye.prototype.createTree = function() {
  return Zye.__APPEND_ELEMENT__(
    Zye.__APP_TREE__.element,
    Zye.__APP_TREE__.children
  );
};

Zye.createApp = function(tree, main) {
  console.log("Createing AST");
  const ast = tree.render();
  console.log("AST:", ast);
  console.log("Successfully Created AST");
  console.log("Creating App HTML Tree");
  const app = tree.createTree();
  console.log("APP:", app);
  console.log("Successfully Created App HTML Tree");
  main.appendChild(app);
};
