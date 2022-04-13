import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MetaMaskProvider } from 'metamask-react';
import { AlertMessageProvider } from './contexts/AlertMessageContext';
import { WalletProvider } from './contexts/WalletContext';
import { WhitelistProvider } from './contexts/WhitelistContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import Routes from './Router';
import ThemeConfig from './theme';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers'
function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}
export default function App() {
  return (
    <ThemeConfig>
      <Web3ReactProvider getLibrary={getLibrary}>
      <MetaMaskProvider>
        <AlertMessageProvider>
          <WhitelistProvider>
            <WalletProvider>
              <AdminAuthProvider>
                <Router>
                  <Routes />
                </Router>
              </AdminAuthProvider>
            </WalletProvider>
          </WhitelistProvider>
        </AlertMessageProvider>
      </MetaMaskProvider>
      </Web3ReactProvider>
    </ThemeConfig>
  );
}
