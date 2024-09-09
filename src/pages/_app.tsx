import AppShell from './../components/layouts/AppShell';
import '@/styles/globals.css';
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '@/redux/store/store';
import { setUser } from '@/redux/store/authSlice';

const App = ({ Component, pageProps }: any) => {
    return (
        <Provider store={store}>
			<AppShell>
				<Component {...pageProps} />
			</AppShell>
        </Provider>
    );
}

export default App;