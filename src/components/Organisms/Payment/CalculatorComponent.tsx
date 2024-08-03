import FormGroup from '@/components/Molecules/Auth/FormGroup';
import { Grid } from '@mui/material';
import { CalculatorContainer } from './CalculatorComponentStyle';

const CalculatorComponent = () => {
  return (
    <CalculatorContainer data-testid="calculator-container">
      <div>Calculator</div>
      <Grid container justifyContent="center">
        <Grid item>
          <FormGroup
            data-testid="calculator-amount"
            placeholder="100"
            type="text"
            name="amount"
            suffix="NZD"
          />
        </Grid>
        <Grid item marginLeft={1}>
          <FormGroup
            data-testid="calculator-crypto-amount"
            placeholder="0.004987654"
            type="text"
            name="cryptoAmount"
            suffix="BTC"
          />
        </Grid>
      </Grid>
    </CalculatorContainer>
  );
};

export default CalculatorComponent;
