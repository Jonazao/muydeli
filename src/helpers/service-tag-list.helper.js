const createTagItemId = (type, id) => {
  return { type, id };
};

const createTagList = (type) => ({ type, id: 'LIST' });

const createTagListItems = (type, ids) => {
  const tagList = ids
    ? [...ids.map((id) => createTagItemId(type, id)), createTagList(type)]
    : [createTagList(type)];
  return tagList;
};

export const getTagLists = (type) => ({
  getOneTagList: (id) => [createTagItemId(type, id)],
  getListTagList: () => [createTagList(type)],
  getPaginatedListTagList: (ids) => createTagListItems(type, ids),
});
