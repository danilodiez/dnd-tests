import { useRef } from 'react';
import { DSButtonV2, BUTTON_TYPES } from '@elliemae/ds-button';
import { Grid } from '@elliemae/ds-grid';
import { useFocusTrap } from '@elliemae/ds-utilities';
import {
  DSDialog,
  DSDialogBody,
  DSDialogSeparator,
  DSDialogFooter,
  DSDialogDefaultLayout,
  DSDialogPrimaryMessage,
  DSDialogSecondaryMessage,
} from '@elliemae/ds-dialog';
import ConfirmationIcon from './icon';

export const ConfirmationModal = ({
  open,
  toggleDialog,
  onConfirmation,
  title,
  body,
  type,
}) => {
  const firstElementRef = useRef(null);
  const lastElementRef = useRef(null);
  const handleOnKeyDown = useFocusTrap({
    firstElementRef,
    lastElementRef,
  });

  return (
    <DSDialog
      isOpen={open}
      onClickOutside={toggleDialog}
      onClose={toggleDialog}
      onKeyDown={handleOnKeyDown}
      size="small"
      role="dialog"
      tabIndex="-1"
      aria-labelledby="primaryMessage"
      aria-describedby="secundaryMessage"
    >
      <DSDialogBody p={24}>
        <DSDialogDefaultLayout>
          <Grid alignItems="center" justifyItems="center" gutter="xxs">
            <ConfirmationIcon type={type} />
            <DSDialogPrimaryMessage id="primaryMessage">
              {title}
            </DSDialogPrimaryMessage>
            <DSDialogSecondaryMessage id="secundaryMessage">
              {body}
            </DSDialogSecondaryMessage>
          </Grid>
        </DSDialogDefaultLayout>
      </DSDialogBody>
      <DSDialogSeparator />
      <DSDialogFooter>
        <DSButtonV2
          innerRef={firstElementRef}
          onClick={toggleDialog}
          data-testid="no-confirmation-dialog-button"
          buttonType={BUTTON_TYPES.OUTLINE}
        >
          No
        </DSButtonV2>
        <DSButtonV2
          innerRef={lastElementRef}
          onClick={onConfirmation}
          data-testid="yes-confirmation-dialog-button"
          buttonType={BUTTON_TYPES.FILLED}
        >
          Yes
        </DSButtonV2>
      </DSDialogFooter>
    </DSDialog>
  );
};

