import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { ethers } from "ethers";
import { useMetaMask } from 'metamask-react';
import {
  ERROR,
  SUCCESS,
  CHAIN_ID,
  SWITCH_ERROR_CODE,
  CHAIN_NAME,
  RPC_URLS,
  BLOCK_EXPLORER_URLS,
  NATIVE_CURRENCY_NAME,
  NATIVE_CURRENCY_SYMBOL,
  DECIMALS,
  CONTRACT_ABI,
  CONTRACT_ADDRESS
} from '../utils/constants';
import { useWallet } from "../hooks/useWallets";
import { AlertMessageContext } from './AlertMessageContext';
import { WhitelistContext } from './WhitelistContext';

// ----------------------------------------------------------------------

const initialState = {
  walletConnected: false,
  currentAccount: '',
  tokenId: 0
};

const handlers = {
  SET_WALLET_CONNECTED: (state, action) => {
    return {
      ...state,
      walletConnected: action.payload
    };
  },
  SET_CURRENT_ACCOUNT: (state, action) => {
    return {
      ...state,
      currentAccount: action.payload
    };
  },
  SET_TOKEN_ID: (state, action) => {
    return {
      ...state,
      tokenId: action.payload
    };
  }
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

//  Context
const WalletContext = createContext({
  ...initialState,
  connectWallet: () => Promise.resolve()
});

//  Provider
function WalletProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { openAlert } = useContext(AlertMessageContext);
  const { checkAddressIsWhitelisted } = useContext(WhitelistContext);
  const { connect,account } = useWallet();
  const connectWallet = async (type) => {
    if(type=='injected'){
    try{
    await connect('injected');
      if(account==undefined&&account=='')
      {
        openAlert({
          severity: ERROR,
          message: 'Wrong Please connect again.'
        })
      }
      else{
        dispatch({
          type: 'SET_CURRENT_ACCOUNT',
          payload: account
        });
    
        dispatch({
          type: 'SET_WALLET_CONNECTED',
          payload: true
        });
        checkAddressIsWhitelisted(account);
        // openAlert({
        //   severity: SUCCESS,
        //   message: 'Connected.'
        // })
      }
    }catch(error){
      console.log(error)
    }
    
}
  else if(type=='walletconnect'){
    try{ 
    await connect('walletconnect')
    console.log(account)
    if(account==undefined&&account=='')
    {
      openAlert({
        severity: ERROR,
        message: 'Wrong Please connect again.'
      })
    }
    else{
      dispatch({
        type: 'SET_CURRENT_ACCOUNT',
        payload: account
      });
  
      dispatch({
        type: 'SET_WALLET_CONNECTED',
        payload: true
      });
      checkAddressIsWhitelisted(account);
      // openAlert({
      //   severity: SUCCESS,
      //   message: 'Connected.'
      // })
    }
   }
    catch(error){
      console.log(error)
    }
   
  }
  else if(type=='walletlink'){
    try{
      await connect('walletlink')
      if(account==undefined&&account=='')
      {
        openAlert({
          severity: ERROR,
          message: 'Wrong Please connect again.'
        })
      }
      else{
        dispatch({
          type: 'SET_CURRENT_ACCOUNT',
          payload: account
        });
    
        dispatch({
          type: 'SET_WALLET_CONNECTED',
          payload: true
        });
        checkAddressIsWhitelisted(account);
        // openAlert({
        //   severity: SUCCESS,
        //   message: 'Connected.'
        // })
      }
    }
    catch(error){console.log(error)}
  }
  };
  return (
    <WalletContext.Provider
      value={{
        ...state,
        connectWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export { WalletContext, WalletProvider };
