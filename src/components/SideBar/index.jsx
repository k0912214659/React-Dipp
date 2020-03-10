import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import useDispatch from '@Hooks/useDispatch';
import useMappedState from '@Hooks/useMappedState';
import { postGlobalSideBar } from '@Reducers/global/actions';
import Styles from './index.module.css';

function SideBar() {
  /* Global & Local States */
  const dispatch = useDispatch();
  const storeGlobal = useMappedState((state) => state.global);
  /* Functions */
  const requestPostGlobalSideBar = (open) => {
    dispatch(postGlobalSideBar(open));
  };
  const onChangeSideBar = () => {
    requestPostGlobalSideBar(!storeGlobal.globalSideBar);
  };
  /* Main */
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={storeGlobal.globalSideBar}
      onClose={onChangeSideBar}
      className={classNames(Styles.sidebarDrawerStyle)}
    >
      <List>
        <ListItem component={NavLink} button to="/weather" onClick={onChangeSideBar}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Weather" />
        </ListItem>
        <ListItem component={NavLink} button to="/adviewer" onClick={onChangeSideBar}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="AD Viewer" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
}

export default memo(SideBar);
