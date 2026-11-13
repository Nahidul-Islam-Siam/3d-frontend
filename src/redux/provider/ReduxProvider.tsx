import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/redux/store';
import AuthBootstrap from './AuthBootstrap';

export function ReduxProvider({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthBootstrap>{children}</AuthBootstrap>
      </PersistGate>
    </Provider>
  );
}

export default ReduxProvider;

