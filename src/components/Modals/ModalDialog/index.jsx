import React, { memo, useMemo } from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Modal from '@Components/Base/Modal';
import useDispatch from '@Hooks/useDispatch';
import useMappedState from '@Hooks/useMappedState';
import { removeMessageDialog } from '@Reducers/message/actions';
import Styles from './index.module.css';

/* Dialog Item */
function DialogItem(props) {
  /* Global & Local States */
  const { dialog, requestRemoveDialog } = props;
  /* Functions */
  const onConfirmClick = () => {
    if (dialog.onConfirm) dialog.onConfirm();
    requestRemoveDialog();
  };
  /* Views */
  return (
    <React.Fragment>
      <DialogTitle>
        {dialog.typeTitle}
      </DialogTitle>
      <DialogContent>
        <div className={classNames(Styles.dialogItemTitleContainer)}>
          {dialog.typeContent && dialog.typeContent}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onConfirmClick}
        >
          Ok
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}

function ModalDialog() {
  /* Global & Local States */
  const dispatch = useDispatch();
  const storeMessage = useMappedState((state) => state.message);
  /* Functions */
  const requestRemoveDialog = () => {
    dispatch(removeMessageDialog());
  };
  /* Views */
  const RenderMessages = useMemo(() => {
    if (storeMessage.messageDialogList.list.length > 0) {
      return (
        <DialogItem
          dialog={storeMessage.messageDialogList.list[0]}
          requestRemoveDialog={requestRemoveDialog}
        />
      );
    }
    return (<React.Fragment />);
  }, [storeMessage.messageDialogList]);
  const RenderIsMessageOpen = useMemo(() => {
    if (storeMessage.messageDialogList.list.length > 0) {
      return true;
    }
    return false;
  }, [storeMessage.messageDialogList]);
  /* Main */
  return (
    <Modal
      open={RenderIsMessageOpen}
      onClose={requestRemoveDialog}
      typeSize="xs"
      typeBackground="white"
    >
      {RenderMessages}
    </Modal>
  );
}

export default memo(ModalDialog);
