import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import { client } from '../../services/api';
import AgentApplication from '../../pages/AgentApplication';
import SuccessMessage from '../../pages/SuccessMessage';


const App = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  
  const onSuccess = () => setShowSuccess(true);
  
  return (
    <ApolloProvider client={client}>
      <div style={{ width: '100vw', minHeight: '100vh' }}>
        {
          showSuccess
          ? <SuccessMessage />
          : <AgentApplication onSuccess={onSuccess} />
        }
      </div>
    </ApolloProvider>
  );
}

export default App;
