import { WarningTriangle, InfoCircle } from '@elliemae/ds-icons';

// Just to be used on the Confirmation Dialog as on eFolder
export const ConfirmationIcon = ({ type }) => {
  switch (type) {
    case 'warning':
      return (
        <WarningTriangle
          data-testid="warning-triangle-icon"
          size="xxl"
          color={['warning', '500']}
        />
      );

    case 'info':
      return (
        <InfoCircle
          data-testid="info-circle-icon"
          size="xxl"
          color={['brand', '600']}
        />
      );

    default:
      return null;
  }
};


export default ConfirmationIcon;

