import AppShell from './../components/layouts/AppShell';
import '@/styles/globals.css';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store/store';

export default function App({ Component, pageProps }: any) {
  	return (
		<Provider store={store}>
			<AppShell>
				<Component {...pageProps} />
			</AppShell>
		</Provider>
  	);
}