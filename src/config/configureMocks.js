import MockAdapter from 'axios-mock-adapter';
import authAdapter from './mocks/adapters/auth';
import exampleAdapter from './mocks/adapters/example';
export const isMockEnabled = () => {
  return process.env.REACT_APP_MOCK_ENABLED === 'true';
};
export const initializeAxiosMockAdapter = (instance) => {
  const mock = new MockAdapter(instance, { delayResponse: 550 });
  authAdapter.init(mock);
  exampleAdapter.init(mock);
};
