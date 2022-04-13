import { useState, useEffect } from 'react'
// material
import { styled, useTheme } from '@mui/material/styles';
import { Stack, Container, Typography, Button, useMediaQuery } from '@mui/material';
import { ethers } from "ethers";
//
import { varFadeInUp, MotionInView } from '../../animate';
import useWallet from '../../../hooks/useWallet';
import useAlertMessage from '../../../hooks/useAlertMessage';
import { useMetaMask } from 'metamask-react';
import { CHAIN_ID, CONTRACT_ABI, CONTRACT_ADDRESS, NFT_PRICE_PUBLIC, NFT_PRICE_WH1, NFT_PRICE_WH2 } from '../../../utils/constants';
import api from '../../../utils/api';
import { MetamaskErrorMessage } from "../../../utils/MetamaskErrorMessage";
import useWhitelist from '../../../hooks/useWhitelist';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  margin: theme.spacing(3, 0, 0, 0),
  background: 'url(/assets/para/camp.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}));
// ----------------------------------------------------------------------

export default function LandingMint() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const { currentAccount, connectWallet, walletConnected, registerAvailableWhitelist } = useWallet();
  const { mintAvailableWhitelist } = useWhitelist();
  const { chainId, ethereum } = useMetaMask();
  const { openAlert } = useAlertMessage();
  const [totalSupply, setTotalSupply] = useState(0)

  useEffect(() => {
    const init = async () => {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        const { _hex } = await contract.totalSupply();
        setTotalSupply(Number(_hex))
      }
    }

    init()
  });

  const handleMint = async () => {
    try {
      let transaction = null;
      if (ethereum) {
        if (chainId === CHAIN_ID) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

          if (mintAvailableWhitelist?.id_whitelist < 3) {
            const hexProof = (await api.post('/whitelist/getHexProof', {
              address: currentAccount,
              whitelistId: mintAvailableWhitelist.id_whitelist
            })).data;

            //  Whitelist 1
            if (mintAvailableWhitelist.id_whitelist === 1) {
              transaction = await contract.privateMint(hexProof, { value: ethers.utils.parseEther(String(NFT_PRICE_WH1)) });
            } else if (mintAvailableWhitelist.id_whitelist === 2) {
              //  Whitelist 2
              transaction = await contract.privateMint(hexProof, { value: ethers.utils.parseEther(String(NFT_PRICE_WH2)) });
            }
          } else {
            transaction = await contract.publicMint({ value: ethers.utils.parseEther(String(NFT_PRICE_PUBLIC)) });
          }
          await transaction.wait();

          openAlert({ severity: 'success', message: 'Minted!' });
        } else {
          openAlert({ severity: 'warning', message: 'Please choose the correct net.' });
        }
      } else {
        openAlert({ severity: 'error', message: 'Ethereum object doesn\'t exist' });
      }
    } catch (error) {
      openAlert({ severity: 'error', message: error.error.message });
    }
  };
  return (
    <RootStyle id="mint">
      <Stack spacing={5} alignItems="center" justifyContent={'center'} sx={{
        height: { xs: '200px', md: '700px' },
      }}>
        <MotionInView variants={varFadeInUp}>
          <Typography sx={{
            fontSize: { xs: '25px', md: '65px' },
            letterSpacing: '-1px',
            color: '#ffffff',
            fontFamily: "'Michroma', sans-serif",
            fontStyle: 'italic',
            fontWeight: 'bold'
          }}>
            JOIN THE <span style={{ color: '#d6e618' }}>PREPPERS</span>
          </Typography>
        </MotionInView>
        <MotionInView variants={varFadeInUp}>
          <Stack direction="row" spacing={3}>
            <Button
              sx={{
                width: { xs: '150px', md: '393px' },
                height: { xs: '30px', md: '78px' },
                fontSize: { xs: '20px', md: '45px' },
                borderRadius: '20px',
                filter: `drop-shadow(0px 10px 30px rgba(2,3,2,0.94))`,
                backgroundImage: `linear-gradient(0deg, #8e9b07 0%, #c3d216 100%)`,
                border: `4px solid #f1f1f1`,
                letterSpacing: '-1px',
                color: "#000000",
                fontStyle: 'italic',
                fontWeight: 'bold',
                fontFamily: "'Michroma', sans-serif",
                "&:hover": {
                  color: 'white'
                }
              }}
              onClick={walletConnected ? handleMint : connectWallet}
              disabled={mintAvailableWhitelist ? false : true}
            >
              {
                mintAvailableWhitelist ?
                  walletConnected ?
                    'MINT' :
                    'CONNECT' :
                  'ENDED!'
              }
            </Button>
            <Button
              href="https://discord.gg/paratoken"
              sx={{
                width: { xs: '150px', md: '393px' },
                height: { xs: '30px', md: '78px' },
                fontSize: { xs: '18px', md: '45px' },
                borderRadius: '20px',
                filter: `drop-shadow(0px 10px 30px rgba(2,3,2,0.94))`,
                backgroundImage: `linear-gradient(0deg, #8e9b07 0%, #c3d216 100%)`,
                border: `4px solid #f1f1f1`,
                letterSpacing: '-1px',
                lineHeight: '713px',
                color: "#000000",
                fontFamily: "'Michroma', sans-serif",
                fontStyle: 'italic',
                fontWeight: 'bold',
                "&:hover": {
                  color: 'white'
                }
              }}
            >
              DISCORD
            </Button>
          </Stack>
        </MotionInView>
        <MotionInView variants={varFadeInUp}>
          <Typography sx={{
            color: '#d4e611',
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontFamily: "'Michroma', sans-serif",
            fontSize: { xs: '25px', md: '55px' },
          }}>
            {totalSupply} / 3000
          </Typography>
        </MotionInView>
      </Stack>
    </RootStyle >
  );
}
