function getIncrementalId(items = []) {
  const lastItem = items[items.length - 1];
  if (!lastItem) return 0;
  return lastItem.id + 1;
}

module.exports = getIncrementalId;