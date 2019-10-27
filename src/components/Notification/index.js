import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green, amber, red } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';

const iconMap = {
  success: CheckCircleIcon,
  warning: ErrorIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles(() => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red[600],
  },
  info: {
    backgroundColor: '#fff',
  },
  warning: {
    backgroundColor: amber[700],
  },
}));

const Notification = ({ open, onClose, type, message }) => {
  const Icon = type in iconMap ? iconMap[type] : InfoIcon;
  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
    >
      <SnackbarContent
        className={classes[type]}
        message={
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <Icon className="icon" />
            {message}
          </span>
        }
      />
    </Snackbar>
  );
};

export default Notification;
