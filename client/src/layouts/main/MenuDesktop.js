import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import arrowIosUpwardFill from '@iconify/icons-eva/arrow-ios-upward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Grid, List, Stack, Popover, ListItem, ListSubheader, CardActionArea, Button } from '@mui/material';
import useWallet from '../../hooks/useWallet';
import metamaskImage from './img/metamask.png'
import trustwalletImage from './img/coinbaseWalletIcon.svg'
import walletconnectImage from './img/walletconnect.png'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import { NotificationManager } from "react-notifications";
// Connect wallet
// ----------------------------------------------------------------------

const LinkStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  fontFamily: "'Michroma', sans-serif",
  color: '#FFFFFF',
  fontSize: '17px',
  letterSpacing: '1px',
  color: '#f0f0f0',
  marginRight: theme.spacing(5),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shortest
  }),
  '&:hover': {
    opacity: 0.48,
    textDecoration: 'none'
  }
}));

// ----------------------------------------------------------------------

IconBullet.propTypes = {
  type: PropTypes.oneOf(['subheader', 'item'])
};

function IconBullet({ type = 'item' }) {
  return (
    <Box sx={{ width: 24, height: 16, display: 'flex', alignItems: 'center' }}>
      <Box
        component="span"
        sx={{
          ml: '2px',
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'currentColor',
          ...(type !== 'item' && { ml: 0, width: 8, height: 2, borderRadius: 2 })
        }}
      />
    </Box>
  );
}

MenuDesktopItem.propTypes = {
  item: PropTypes.object,
  pathname: PropTypes.string,
  isHome: PropTypes.bool,
  isOffset: PropTypes.bool,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
};

function MenuDesktopItem({ item, pathname, isHome, isOpen, isOffset, onOpen, onClose }) {
  const { title, path, children } = item;
  const isActive = pathname === path;

  if (children) {
    return (
      <div key={title}>
        <LinkStyle
          onClick={onOpen}
          sx={{
            display: 'flex',
            cursor: 'pointer',
            alignItems: 'center',
            ...(isHome && { color: 'common.white' }),
            ...(isOffset && { color: '#ffffff' }),
            ...(isOpen && { opacity: 0.48 })
          }}
        >
          {title}
          <Box
            component={Icon}
            icon={isOpen ? arrowIosUpwardFill : arrowIosDownwardFill}
            sx={{ ml: 0.5, width: 16, height: 16 }}
          />
        </LinkStyle>

        <Popover
          open={isOpen}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 80, left: 0 }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={onClose}
          PaperProps={{
            sx: {
              px: 3,
              pt: 5,
              pb: 3,
              right: 16,
              margin: 'auto',
              maxWidth: 1280,
              borderRadius: 2,
              boxShadow: (theme) => theme.customShadows.z24
            }
          }}
        >
          <Grid container spacing={3}>
            {children.map((list) => {
              const { subheader, items } = list;

              return (
                <Grid key={subheader} item xs={12} md={subheader === 'Dashboard' ? 6 : 2}>
                  <List disablePadding>
                    <ListSubheader
                      disableSticky
                      disableGutters
                      sx={{
                        display: 'flex',
                        lineHeight: 'unset',
                        alignItems: 'center',
                        color: 'text.primary',
                        typography: 'overline'
                      }}
                    >
                      <IconBullet type="subheader" /> {subheader}
                    </ListSubheader>

                    {items.map((item) => (
                      <ListItem
                        key={item.title}
                        // href={item.path}
                        onClick={() => { window.location.href = item.path }}
                        // component={RouterLink}
                        underline="none"
                        sx={{
                          fontFamily: "'Michroma', sans-serif",
                          p: 0,
                          mt: 3,
                          typography: 'body2',
                          color: 'text.secondary',
                          cursor: 'pointer',
                          transition: (theme) => theme.transitions.create('color'),
                          '&:hover': { color: 'text.primary' },
                          ...(item.path === pathname && {
                            typography: 'subtitle2',
                            color: 'text.primary'
                          })
                        }}
                      >
                        {item.title === 'Dashboard' ? (
                          <CardActionArea
                            sx={{
                              py: 5,
                              px: 10,
                              borderRadius: 2,
                              color: 'primary.main',
                              bgcolor: 'background.neutral'
                            }}
                          >
                            <Box
                              component={motion.img}
                              whileTap="tap"
                              whileHover="hover"
                              variants={{
                                hover: { scale: 1.02 },
                                tap: { scale: 0.98 }
                              }}
                              src=""
                              sx={{ minWidth: 420 }}
                            />
                          </CardActionArea>
                        ) : (
                          <>
                            <IconBullet />
                            {item.title}
                          </>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              );
            })}
          </Grid>
        </Popover>
      </div>
    );
  }

  return (
    <LinkStyle
      key={title}
      // to={path}
      onClick={() => { window.location.href = item.path }}
      // component={RouterLink}
      sx={{
        cursor: 'pointer',
        ...(isHome && { color: 'common.white' }),
        ...(isOffset && { color: '#ffffff' }),
        ...(isActive && { color: 'primary.main' })
      }}
    >
      {title}
    </LinkStyle>
  );
}

MenuDesktop.propTypes = {
  isOffset: PropTypes.bool,
  isHome: PropTypes.bool,
  navConfig: PropTypes.array
};

export default function MenuDesktop({ isOffset, isHome, navConfig, connectWallet }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const { currentAccount } = useWallet();
  const { activate, connector, ...props } = useWeb3React();
  const connect = async (type) => {
      if (type === 'injected') {
        connectWallet('injected')
      }
      if (type === 'walletconnect') {
        connectWallet('walletconnect')
      }
      if (type === 'walletlink') {
        connectWallet('walletlink')
      }
  };
  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Stack direction="row" alignItems={'center'}>
      {navConfig.map((link) => (
        <MenuDesktopItem
          key={link.title}
          item={link}
          pathname={pathname}
          isOpen={open}
          onOpen={handleOpen}
          onClose={handleClose}
          isOffset={isOffset}
          isHome={isHome}
        />
      ))}
      <Link
        href="https://discord.gg/paratoken"
        target="_blank"
      >
        <img src="/assets/para/descord.webp" alt="discord" style={{
          marginRight: '20px',
          width: '25px',
          height: '20px'
        }} />
      </Link>
      <Link
        href="https://twitter.com/Para_Holdings"
        target="_blank"
      >
        <img src="/assets/para/twitter.webp" alt="twitter" style={{
          marginRight: '20px',
          width: '25px',
          height: '20px'
        }} />
      </Link>
      <Link
        href="https://t.me/ParaHoldings"
        target="_blank"
      >
        <img src="/assets/para/telegram.png" alt="telegram" style={{
          width: '28px',
          height: '28px'
        }} />
      </Link>

      <Button
        sx={{
          backgroundColor: '#d4e611',
          fontSize: '18px',
          fontStyle: 'italic',
          letterSpacing: '0px',
          lingHeight: '307px',
          color: 'black',
          fontFamily: "'Michroma', sans-serif",
          width: '280px',
          height: '34px',
          borderRadius: '17px',
          filter: 'drop-shadow(0px 10px 30px rgba(2,3,2,0.94))',
          marginLeft: 5,
          "&:hover": {
            color: 'white',
            backgroundColor: '#d4e611'
          }
        }}
        data-toggle="modal" data-target="#myModal"
        // onClick={connectWallet}
      >
        {
          currentAccount&&currentAccount.length > 0 ? (
            String(currentAccount).substring(0, 6) +
            '...' +
            String(currentAccount).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )
        }
      </Button>
      <div className="modal fade" id="myModal">
        <div className="modal-dialog modal-sm">
          <div className="modal-content bg-dark text-white">

            <div className="modal-header border-0">
              <h6 className="modal-title">Connect Wallet</h6>
              <button type="button" className="close text-white" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              <div
                className='p-2 border border-info rounded-xl border-width-3 cursor-pointer mb-2'
                onClick={() => connect('injected')}
                data-dismiss="modal" style={{cursor:'pointer',display: 'flex'}}
              >
                <img alt='SETIMAGE' src={metamaskImage} width='40' height='40' className='img-fluid ml-3'/>
                <span className='ml-3' style={{top:'8px',position:'relative'}}>Metamask</span>
              </div>
              <div
                className='p-2 border border-info rounded-xl border-width-3 cursor-pointer mb-2'
                onClick={() => connect('walletconnect')}
                data-dismiss="modal"  style={{cursor:'pointer',display: 'flex'}}
              >
                <img alt='SETIMAGE' src={walletconnectImage} width='40' height='40' className='img-fluid ml-3' />
                <span className='ml-3' style={{top:'8px',position:'relative'}}>WalletConnect</span>
              </div>
              <div
                className='p-2 border border-info rounded-xl border-width-3 cursor-pointer mb-2'
                onClick={() => connect('walletlink')}
                data-dismiss="modal" style={{cursor:'pointer',display: 'flex'}}
              >
                <img alt='SETIMAGE' src={trustwalletImage} width='40' height='40' className='img-fluid ml-3' />
                <span className='ml-3' style={{top:'8px',position:'relative'}}>Coinbase Wallet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Stack>
  );
}
