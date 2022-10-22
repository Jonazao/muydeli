const getPosts = () => {
  console.log('getPOSTS');
  const response = [
    {
      id: 1,
      title: 'Some Title As Example',
    },
  ];
  return [200, response];
};

const init = (mockAdapter) => {
  mockAdapter.onGet('/posts').reply(() => getPosts());
};

const adapter = {
  init,
};

export default adapter;
