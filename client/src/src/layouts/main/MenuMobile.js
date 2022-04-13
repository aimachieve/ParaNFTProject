import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, List, Drawer, Link, Collapse, ListItemButton, ListItemText, ListItemIcon, Button } from '@mui/material';
// components
import Logo from '../../components/Logo';
import NavSection from '../../components/NavSection';
import Scrollbar from '../../components/Scrollbar';
import { MIconButton } from '../../components/@material-extend';
import menuConfig from './MenuConfig';
import useWallet from '../../hooks/useWallet';
import metamaskImage from './img/metamask.png'
import trustwalletImage from './img/trustwallet.png'
import walletconnectImage from './img/walletconnect.png'
import { injected, walletconnect, walletlink } from './connector';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import { NotificationManager } from "react-notifications";
// Connect wallet

// ----------------------------------------------------------------------

const ICON_SIZE = 22;
const ITEM_SIZE = 48;
const PADDING = 2;

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: ITEM_SIZE,
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(PADDING),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary
}));

// ----------------------------------------------------------------------

MenuMobileItem.propTypes = {
  item: PropTypes.object,
  isOpen: PropTypes.bool,
  isActive: PropTypes.bool,
  onOpen: PropTypes.func
};

function MenuMobileItem({ item, isOpen, isActive, onOpen, handleDrawerClose }) {
  const { title, path, icon, children } = item;

  if (children) {
    return (
      <div key={title}>
        <ListItemStyle onClick={onOpen}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
          <Box
            component={Icon}
            icon={isOpen ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <NavSection
              navConfig={menuConfig[2].children}
              sx={{
                '&.MuiList-root:last-child .MuiListItem-root': {
                  height: 200,
                  backgroundSize: '92%',
                  backgroundPosition: 'center',
                  bgcolor: 'background.neutral',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: 'url(/static/illustrations/illustration_dashboard.png)',
                  '& > *:not(.MuiTouchRipple-root)': { display: 'none' }
                },
                '& .MuiListSubheader-root': {
                  pl: PADDING,
                  display: 'flex',
                  alignItems: 'center',
                  '&:before': {
                    ml: '6px',
                    mr: '22px',
                    width: 8,
                    height: 2,
                    content: "''",
                    borderRadius: 2,
                    bgcolor: 'currentColor'
                  }
                },
                '& .MuiListItem-root': {
                  pl: PADDING,
                  '&:before': { display: 'none' },
                  '&.active': { color: 'primary.main', bgcolor: 'transparent' }
                },
                '& .MuiListItemIcon-root': {
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  '&:before': {
                    width: 4,
                    height: 4,
                    content: "''",
                    borderRadius: '50%',
                    bgcolor: 'currentColor'
                  }
                }
              }}
            />
          </Box>
        </Collapse>
      </div>
    );
  }

  return (
    <ListItemStyle
      key={title}
      onClick={() => {
        window.location.href = `${path}`
        handleDrawerClose()
      }}
      // to={path}
      // component={RouterLink}
      sx={{
        ...(isActive && {
          color: 'primary.main',
          fontWeight: 'fontWeightMedium',
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
        })
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText disableTypography primary={title} />
    </ListItemStyle>
  );
}

MenuMobile.propTypes = {
  isOffset: PropTypes.bool,
  isHome: PropTypes.bool
};

export default function MenuMobile({ isOffset, isHome, connectWallet }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const { activate, account,  connector, ...props } = useWeb3React();
  const connect = async (type) => {
      if (type === 'injected') {
        activate(injected)
      }
      if (type === 'walletconnect') {
        activate(walletconnect)
      }
      if (type === 'walletlink') {
        activate(walletlink)
      }
  };
  useEffect(() => {
    if (mobileOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleDrawerOpen = () => {
    setMobileOpen(true);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <MIconButton
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          ...(isHome && { color: 'common.white' }),
          ...(isOffset && { color: 'common.white' })
        }}
      >
        <Icon icon={menu2Fill} />
      </MIconButton>

      <Drawer
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <Scrollbar>
          <Link component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <Logo sx={{ my: 3 }} />
          </Link>

          <List disablePadding>
            {menuConfig.map((link) => (
              <MenuMobileItem
                key={link.title}
                item={link}
                isOpen={open}
                onOpen={handleOpen}
                isActive={pathname === link.path}
                handleDrawerClose={handleDrawerClose}
              />
            ))}
          </List>

          <Button
            sx={{
              backgroundColor: '#d4e611',
              fontSize: { xs: '12px', md: '18px' },
              fontStyle: 'italic',
              letterSpacing: '0px',
              lingHeight: '307px',
              color: 'black',
              fontFamily: "'Michroma', sans-serif",
              width: '160px',
              height: '34px',
              borderRadius: '17px',
              filter: 'drop-shadow(0px 10px 30px rgba(2,3,2,0.94))',
              "&:hover": {
                color: 'white',
                backgroundColor: '#d4e611'
              }
            }}
            data-toggle="modal" data-target="#myModal">
            {
              account && account.length > 0 ? (
                String(account).substring(0, 6) +
                '...' +
                String(account).substring(38) +
                ')'
              ) : (
                <span>Connect Wallet</span>
              )
            }
          </Button>

        </Scrollbar>
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
                  data-dismiss="modal" style={{ cursor: 'pointer', display: 'flex' }}
                >
                  <img alt='SETIMAGE' src={metamaskImage} width='40' height='40' className='img-fluid ml-3' />
                  <span className='ml-3' style={{ top: '8px', position: 'relative' }}>Metamask</span>
                </div>
                <div
                  className='p-2 border border-info rounded-xl border-width-3 cursor-pointer mb-2'
                  onClick={() => connect('walletconnect')}
                  data-dismiss="modal" style={{ cursor: 'pointer', display: 'flex' }}
                >
                  <img alt='SETIMAGE' src={walletconnectImage} width='40' height='40' className='img-fluid ml-3' />
                  <span className='ml-3' style={{ top: '8px', position: 'relative' }}>WalletConnect</span>
                </div>
                <div
                  className='p-2 border border-info rounded-xl border-width-3 cursor-pointer mb-2'
                  onClick={() => connect('walletlink')}
                  data-dismiss="modal" style={{ cursor: 'pointer', display: 'flex' }}
                >
                  <img alt='SETIMAGE' src={trustwalletImage} width='40' height='40' className='img-fluid ml-3' />
                  <span className='ml-3' style={{ top: '8px', position: 'relative' }}>Coinbase Wallet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
