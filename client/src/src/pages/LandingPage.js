// material
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
import {
  LandingPreppers,
  LandingAdvanced,
  LandingEpic,
  LandingLegendary,
  LandingMint,
  LandingStaking,
} from '../components/_external-pages/landing';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: "#000000"
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <RootStyle title="PARA" id="move_top">
      <ContentStyle>
        {/* Preppers */}
        <LandingPreppers />
        {/* Advanced */}
        <LandingAdvanced />
        {/* Epic */}
        <LandingEpic />
        {/* Legendary */}
        <LandingLegendary />
        {/* Mint && Discord */}
        <LandingMint />
        {/* Staking && Coming soon */}
        <LandingStaking />
      </ContentStyle>
    </RootStyle>
  );
}
