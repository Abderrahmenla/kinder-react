import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MaterialUISwitch } from './CryptoSwitchStyle';

interface CryptoSwitchProps {
  handleChange: () => any;
  checked?: boolean;
}

const CryptoSwitch: React.FC<CryptoSwitchProps> = ({ handleChange, checked }) => {
  return (
    <FormGroup>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography color="white">FIAT</Typography>
        <FormControlLabel
          data-testid="crypto-switch"
          onChange={handleChange}
          control={<MaterialUISwitch sx={{ m: 1 }} />}
          label=""
          checked={checked}
        />
        <Typography color="white">Crypto</Typography>
      </Stack>
    </FormGroup>
  );
};

export default CryptoSwitch;
