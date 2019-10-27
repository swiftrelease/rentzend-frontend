import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import Wrapper from '../../components/Wrapper';
import AgentApplicationForm from './form';
import { CREATE_APPLICATION } from './query';

const AgentApplication = ({ onSuccess }) => {
  const [createAgentApplication] = useMutation(CREATE_APPLICATION);

  return (
    <Wrapper className="form-container">
      <h2>RentZend</h2>
      <AgentApplicationForm
        createAgentApplication={createAgentApplication}
        onSuccess={onSuccess}
      />
    </Wrapper>
  );
};

export default AgentApplication;
