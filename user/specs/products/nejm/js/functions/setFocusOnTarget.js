A17.Functions.setFocusOnTarget = function(node) {
  node.focus();
  if (node!== document.activeElement) {
    node.setAttribute('tabindex','-1');
    node.focus();
  }
};
