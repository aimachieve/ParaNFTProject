// material
import { styled, useTheme } from '@mui/material/styles';
import { Container, Typography, Stack, useMediaQuery, Grid, Button } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  background: '#000000',
  color: '#ffffff',
  margin: theme.spacing(14, 0, 0, 0),
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
          <Stack spacing={5}>
            <Stack justifyContent={'center'} alignItems={'center'} spacing={2}>
              <MotionInView variants={varFadeInUp}>
                <Typography sx={{
                  fontSize: { xs: '35px', md: '65px' },
                  letterSpacing: '-1px',
                  color: '#ffffff',
                  fontFamily: "'Michroma', sans-serif",
                  textAlign: 'center',
                  fontStyle: 'italic',
                  fontWeight: 'bold'
                }}>
                  PARA PREPPERS
                </Typography>
              </MotionInView>
              <MotionInView variants={varFadeInUp}>
                <Typography sx={{
                  fontSize: '16px',
                  letterSpacing: '0px',
                  lineHeight: '24px',
                  color: '#ffffff',
                  fontWeight: '300',
                  fontFamily: "Roboto",
                  textAlign: 'center',
                }}>
                  Para Holdings Inc is proud to present their first release of 3,000 PARA PREPPERS Generative NFT collection.
                  <br />
                  With each purchase from the NFT collection, you will be making an investment into the company with profits going back into $Para to help fund marketing and development.
                </Typography>
              </MotionInView>
            </Stack>

            <MotionInView variants={varFadeInUp}>
              <img src="/assets/para/hazard.png" alt="harzard" />
            </MotionInView>

            <MotionInView variants={varFadeInUp}>
              <Grid
                container
                justifyContent={{ xs: 'center', md: 'space-around' }}
                sx={{ textAlign: { xs: 'center', md: 'left' } }}
              >
                <Grid item xs={12} md={4}>
                  <img src="/assets/para/jungle.png" alt="jungle" style={{ height: '90%' }} />
                </Grid>
                <Grid item xs={12} md={8}>
                  <MotionInView variants={varFadeInUp}>
                    <Stack justifyContent={'center'} >
                      <Typography
                        sx={{
                          fontSize: { xs: '35px', md: '65px' },
                          letterSpacing: '-1px',
                          color: '#cddd17',
                          fontFamily: "'Michroma', sans-serif",
                          textAlign: { xs: 'center', md: 'left' },
                          mt: 10,
                          fontStyle: 'italic',
                          fontWeight: 'bold'
                        }}
                      >
                        ADVANCED
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
                        After leaving the school of hard knocks and basic training on the streets; the Para Preppers were plunged directly into advanced training in the back hills of the Metaverse. With the sound of banjoes in the distance and chiggers running up their legs, the preppers tirelessly train day and night.
                        <br />
                        <br />
                        Having mastered the basics of survival, the Preppers are now in the advanced stages of making explosives from the lethal combination of canned meats and pine tree scented air freshener. Weekly visits to the local flea market and military surplus stores prove to be highly successful in obtaining the much-needed supplies and equipment for their apocalyptic preparations.
                      </Typography>
                    </Stack>
                  </MotionInView>
                </Grid>
              </Grid>
            </MotionInView>
          </Stack>
        </ContentStyle>
      </Container>
    </RootStyle >
  );
}
