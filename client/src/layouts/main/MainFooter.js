// NavLink as RouterLink,
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Container, Stack } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
// components
import { MHidden } from '../../components/@material-extend';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 110;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  background: '#1e1e1e',
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.longer
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
  }
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8
}));
// ----------------------------------------------------------------------
export default function MainFooter() {
  const isOffset = useOffSetTop(100);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      <ToolbarStyle
        disableGutters
        sx={{
          justifyContent: 'space-around',
        }}
      >
        <MHidden width="mdDown">
          <RouterLink to="/">
            <Box component="img" src="/assets/para/logo.png" sx={{
              width: 80,
              height: 80
            }} />
          </RouterLink>
        </MHidden>
        
        <MHidden width="mdDown">
          <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
        </MHidden>

        <MHidden width="mdUp">
          <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
        </MHidden>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </>
  );
}
