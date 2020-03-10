import React, { memo } from 'react';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import FeaturedVideoIcon from '@material-ui/icons/FeaturedVideo';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Styles from './index.module.css';

function ADList(adListProps) {
  /* Global & Local States */
  const {
    adContent,
    onSelectAD,
  } = adListProps;
  /* Main */
  return (
    <div className={classNames(Styles.adListContainer)}>
      <List dense>
        {
          adContent.list.map((ad, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <FeaturedVideoIcon />
              </ListItemIcon>
              <ListItemText primary={index} />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="toggle visibility"
                  onClick={() => onSelectAD(index)}
                >
                  {adContent.selectIndex === index ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        }
      </List>
    </div>
  );
}

export default memo(ADList);
