// material
import { styled, useTheme } from '@mui/material/styles';
import { Container, Typography, Stack, useMediaQuery, Grid, Button } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  background: '#000000',
  color: '#ffffff',
  padding: theme.spacing(10, 0, 0, 0),
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
              <Grid item xs={12} md={4}>
                <img src="/assets/para/rocket.png" alt="rocket" style={{ height: '90%' }} />
              </Grid>
              <Grid item xs={12} md={8}>
                <MotionInView variants={varFadeInUp}>
                  <Stack justifyContent={'center'} >
                    <Typography
                      sx={{
                        fontSize: {xs: '35px', md: '65px'},
                        letterSpacing: '-1px',
                        color: '#cddd17',
                        fontFamily: "'Michroma', sans-serif",
                        textAlign: {xs: 'center', md: 'left'},
                        mt: '15%',
                        fontStyle: 'italic',
                        fontWeight: 'bold'
                      }}
                    >
                      LEGENDARY
                    </Typography>
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
                      Only spoken of in hushed whispers, the Preppers now secretly, but very openly set out to reset and overthrow the tyrannical governmental system that has now gone to the brink of insanity. The renown of this now legendary group of preppers has now stretched beyond their own realm of reality and earthly existence. What they once feared as those things that go bump in the night, have now become their own personal realities when faced with the self-reflection of what they have now become. These newfound abilities combined with their weapons of legend make this Legendary group a forced to be reckoned with. The Legendary Preppers creed: “No one can hear you scream in space!”
                    </Typography>
                  </Stack>
                </MotionInView>
              </Grid>
            </Grid>
          </MotionInView>
        </ContentStyle>
      </Container>
    </RootStyle >
  );
}
