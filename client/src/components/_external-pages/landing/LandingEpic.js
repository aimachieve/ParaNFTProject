// material
import { styled, useTheme } from '@mui/material/styles';
import { Container, Typography, Stack, useMediaQuery, Grid, Button } from '@mui/material';
import { varFadeInUp, MotionInView } from '../../animate';
import { MHidden } from '../../@material-extend';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundImage: 'url(/assets/para/winter.jpg)',
  marginTop: 50,
  // backgroundColor: '#091c52',
  color: '#ffffff',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'left',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  }
}));
// ----------------------------------------------------------------------

export default function LandingAdvanced() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <ContentStyle>
          <MotionInView variants={varFadeInUp}>
            <Grid
              container
              justifyContent={{ xs: 'center', md: 'space-around' }}
              sx={{ textAlign: { xs: 'center', md: 'left' } }}
            >
              <Grid item xs={8} md={8}>
                <MotionInView variants={varFadeInUp}>
                  <Stack justifyContent={'center'} >
                    <Typography
                      sx={{
                        fontSize: { xs: '35px', md: '65px' },
                        letterSpacing: '-1px',
                        color: '#cddd17',
                        fontFamily: "'Michroma', sans-serif",
                        textAlign: 'left',
                        mt: '20%',
                        fontStyle: 'italic',
                        fontWeight: 'bold'
                      }}
                    >
                      EPIC
                    </Typography>
                    <MHidden width="smDown">
                      <Typography
                        sx={{
                          fontSize: '16px',
                          letterSpacing: '0px',
                          lineHeight: '27px',
                          color: '#ffffff',
                          fontWeight: '300',
                          fontFamily: "Roboto",
                        }}
                      >
                        After completing the riggers of advanced training and the ever-constant evading of banjo picking that could never seem to drown out the squealing pigs; the preppers move on to full integration back into the dying society they had left not so long ago. But blending in does not always come so easy; as the Preppers will soon discover their unique set of skills is not usually a welcome addition to high society’s delusions of grandeur. The preppers are now left with the Epic task of fighting in the silent shadows. Surviving in this Pre-apocalyptic world is what legends are made of.
                      </Typography>
                    </MHidden>
                  </Stack>
                </MotionInView>
              </Grid>
              <Grid item xs={4} md={4}>
                <img src="/assets/para/nurse.png" alt="nurse" style={{ height: 'auto' }} />
              </Grid>
            </Grid>
          </MotionInView>
        </ContentStyle>
      </Container>
    </RootStyle >
  );
}
