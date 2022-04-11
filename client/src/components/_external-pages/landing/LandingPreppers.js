import { useState, useEffect } from 'react'
// material
import { styled, useTheme } from '@mui/material/styles';
import { Stack, Container, Grid, Button, useMediaQuery, Typography } from '@mui/material';
import { ethers } from "ethers";
import { useMetaMask } from 'metamask-react';

//
import { varFadeInUp, MotionInView } from '../../animate';
import useAlertMessage from '../../../hooks/useAlertMessage';
import useWhitelist from '../../../hooks/useWhitelist';
import useWallet from '../../../hooks/useWallet';
import { CHAIN_ID, CONTRACT_ABI, CONTRACT_ADDRESS, NFT_PRICE_PUBLIC, NFT_PRICE_WH1, NFT_PRICE_WH2 } from '../../../utils/constants';
import api from '../../../utils/api';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  margin: theme.spacing(14, 0, 0, 0),
  background: 'url(/assets/para/city.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}));
// ----------------------------------------------------------------------

export default function LandingPreppers() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const { chainId, ethereum } = useMetaMask();
  const { openAlert } = useAlertMessage();
  const { mintAvailableWhitelist } = useWhitelist();
  const { currentAccount, connectWallet, walletConnected, registerAvailableWhitelist } = useWallet();
  const [totalSupply, setTotalSupply] = useState(0)
 
  useEffect(() => { 
    const init = async () => {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        const {_hex} = await contract.totalSupply();
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
    <RootStyle
      id="preppers">
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={6} md={6}>
            <MotionInView variants={varFadeInUp}>
              <Stack spacing={{ xs: 2, md: 9 }} alignItems="center" justifyContent={'center'} sx={{ marginTop: '30%' }}>
                <img src="/assets/para/preppers_logo.png" alt='preppers_logo' />
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
                <Typography sx={{
                  color: '#d4e611',
                  fontStyle: 'italic',
                  fontWeight: 'bold',
                  fontFamily: "'Michroma', sans-serif",
                  fontSize: { xs: '20px', md: '45px' },
                }}>
                  {totalSupply} / 3000
                </Typography>
              </Stack>
            </MotionInView>
          </Grid>
          <Grid item xs={6} md={6}>
            <img src="/assets/para/prepper_one.png" alt="prepper_one" style={{ height: '80%', marginTop: '10%' }} />
          </Grid>
        </Grid>
      </Container>
    </RootStyle >
  );
}
