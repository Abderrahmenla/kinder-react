import formatCurrency from '@/utils/formatUtils/formatCurrency';
import formatDate from '@/utils/formatUtils/formatDate';
import { DataProps } from '@/components/Molecules/Settings/ResponsiveTable/ResponsiveTable.types';
import {
  greenText,
  yellowText
} from '@/components/Organisms/Settings/BetHistory/BetHistory.styles';
import {
  DELETE_LIMIT_CONFIRMATION,
  LOCAL_LIMIT_TYPES,
  TIME_RANGE_TO_LOCAL
} from '../ResponsibleGambling.constants';
import DeleteLimitButton from './DeleteLimitButton';
import { actionButtonStyles } from './LimitsTable.styles';
import { GetFormattedDataProps, LimitStatus, SelectedLimit } from './LimitsTable.types';

export const getFormattedData = ({
  header,
  playerLimit,
  isMobile,
  handleOnClickDelete
}: GetFormattedDataProps): DataProps => {
  const { id, limitType, time, amountValue, dateCreated, dateActivated, limitStatus } = playerLimit;

  const formattedAmount = formatCurrency(amountValue);
  const dataProps: DataProps = {
    label: header,
    value: undefined,
    dataStyles: undefined,
    actionButton: undefined
  };

  switch (header) {
    case 'limitType':
      dataProps.value = LOCAL_LIMIT_TYPES.get(limitType);
      break;
    case 'time':
      dataProps.value = time;
      break;
    case 'value':
      dataProps.value = formattedAmount;
      break;
    case 'dateCreated':
      dataProps.value = formatDate(dateCreated, { hasTime: true });
      break;
    case 'dateActivated':
      dataProps.value = formatDate(dateActivated, { hasTime: true });
      break;
    case 'limitStatus':
      dataProps.value = limitStatus;
      dataProps.dataStyles =
        {
          Active: greenText,
          Pending: yellowText
        }[limitStatus] || undefined;
      break;
    case 'action':
      if (isMobile) dataProps.label = undefined;
      if (limitStatus === LimitStatus.pending) {
        dataProps.dataStyles = actionButtonStyles;
        dataProps.actionButton = (
          <DeleteLimitButton
            key={id}
            onClick={() => handleOnClickDelete({ data: playerLimit, formattedAmount })}
          />
        );
      }
      break;
    default:
      dataProps.value = '';
  }

  return dataProps;
};

export const createFormattedLimit = (selectedLimit: SelectedLimit) => {
  const { data, formattedAmount } = selectedLimit;
  const { time, limitType } = data;

  return {
    data,
    formattedAmount,
    formattedTime: TIME_RANGE_TO_LOCAL.get(time || '')?.toLocaleLowerCase(),
    confirmation: DELETE_LIMIT_CONFIRMATION.get(limitType)
  };
};

export const createZeroAmountLimitData = (selectedLimit: SelectedLimit) => ({
  limit: {
    ...selectedLimit.data,
    amountValue: 0
  }
});
