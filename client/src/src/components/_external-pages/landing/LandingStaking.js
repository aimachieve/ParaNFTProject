// material
import { styled, useTheme } from '@mui/material/styles';
import { Stack, Container, Typography, useMediaQuery, Button } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  margin: theme.spacing(8, 0, 10, 0),
  textAlign: 'center'
}));
// ----------------------------------------------------------------------

export default function LandingStaking() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <RootStyle id="staking">
      <Container maxWidth="lg">
        <MotionInView variants={varFadeInUp}>
          <Stack alignItems={'center'} spacing={1}>
            <Typography sx={{
              fontSize: {xs: '35px', md: '65px'},
              letterSpacing: '-1px',
              color: '#d5e518',
              fontFamily: "'Michroma', sans-serif",
              fontStyle: 'italic',
              fontWeight: 'bold'
            }}>
              NFT STAKING
            </Typography>
            <Typography sx={{
              fontSize: {xs: '20px', md: '29px'},
              letterSpacing: '-1px',
              color: '#ffffff',
              fontFamily: "'Michroma', sans-serif",
              fontStyle: 'italic',
              fontWeight: 'bold'
            }}>
              COMING SOON...
            </Typography>
            <Button
              href="https://para.global"
            sx={{
                width: { xs: '180px', md: '315px' },
                height: { xs: '30px', md: '63px' },
                fontSize: { xs: '18px', md: '36px' },
              borderRadius: '20px',
              filter: 'drop-shadow(0px 10px 30px rgba(2,3,2,0.94))',
              backgroundColor: '#d4e611',
              letterSpacing: '-1px',
              color: '#1b1b1b',
              fontFamily: "'Michroma', sans-serif",
              fontStyle: 'italic',
              fontWeight: 'bold',
              '&:hover': {
                color: 'white'
              }
            }}>
              BUY PARA
            </Button>
          </Stack>
        </MotionInView>
      </Container>
    </RootStyle >
  );
}
