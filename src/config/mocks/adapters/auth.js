const login = ({ username, password }) => {
  const response = {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzb21lLXVzZXItaWQiLCJuYW1lIjoiVGVzdCBVc2VyIiwicm9sZXMiOlsiVXNlciIsIkFkbWluIl0sImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiQXBwLUF1dGhTZXJ2aWNlIiwiZXhwIjoxMDQxMzgyMDgwMH0.W_GHIlAMcrQavZfwq_Vd43fQ2b9UOFnW4-uFW2HiUIg',
  };
  return [200, response];
};

const logout = () => {
  const response = {};
  return [200, response];
};

const init = (mockAdapter) => {
  mockAdapter.onPost('/auth/login').reply(() => login());
  mockAdapter.onPost('/auth/logout').reply(() => logout());
};

const adapter = {
  init,
};

export default adapter;
