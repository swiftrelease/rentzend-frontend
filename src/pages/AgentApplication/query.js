import gql from 'graphql-tag';

export const CREATE_APPLICATION = gql`
  mutation submitApplication($application: AgentApplicationInput $attachments: [Upload!]) {
    application: createAgentApplication(application: $application attachments: $attachments) {
      name
      email
      phone
      address
      zipCode
      attachments {
        id
        path
      }
    }
  }
`;
