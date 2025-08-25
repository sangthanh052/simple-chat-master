import { useQuery } from "@apollo/client";

import { graphql } from "../gql";
import { User } from "../models/User";

const getMeDocument = graphql(`
  query Me {
    me {
      _id
      email
    }
  }
`);

const useGetMe = () => {
  return useQuery<{ me: User }>(getMeDocument);
};

export { useGetMe };
