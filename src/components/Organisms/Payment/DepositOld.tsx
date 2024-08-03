import { Grid } from '@mui/material';
import { ModalSection } from '@/components/Atoms';

interface DepositProps {
  loadingWrapper?: JSX.Element;
  isLoading?: boolean;
  iframeUrl?: string;
}

const Deposit: React.FC<DepositProps> = ({ iframeUrl, isLoading, loadingWrapper }) => {
  return (
    <ModalSection className="wallet-modal-section" data-testid="deposit-section">
      <Grid container spacing={2} data-testid="payment-methods">
        <Grid
          item
          xs={12}
          sx={{
            width: 350,
            height: 505,
            ['@media screen and (max-width: 768px)']: {
              height: '82vh',
              width: '100%'
            }
          }}
        >
          {isLoading ? (
            loadingWrapper
          ) : (
            <>
              {iframeUrl && (
                <iframe
                  src={`${iframeUrl}&fetchConfig=true`}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
                />
              )}
            </>
          )}
        </Grid>
      </Grid>
    </ModalSection>
  );
};

export default Deposit;
