import { gql } from '@apollo/client';

export const GET_REFERRAL_PROGRAM = gql(`
query {
  referralProgram {
    data {
      id
      attributes {
        Text 
      }
    }
  }
}
`);
