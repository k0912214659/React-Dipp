import React, { memo } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const CustomCheckBox = withStyles({
  root: {
    color: 'gray',
    '&$checked': {
      color: '#e96e50',
    },
  },
  checked: {},
})(Checkbox);

function CheckBox(checkBoxProps) {
  return (
    <CustomCheckBox {...checkBoxProps} />
  );
}

export default memo(CheckBox);
