import React from 'react';
import Paper from '@material-ui/core/Paper';

const Wrapper = ({ children, className, ...rest }) => (
  <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper className={className} elevation={4} {...rest} >
        {children}
      </Paper>
    </div>
);

export default Wrapper;
