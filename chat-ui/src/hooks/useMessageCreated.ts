import { useSubscription } from "@apollo/client";

import { updateMessages } from "../cache/message";
import { graphql } from "../gql";
import { SubscriptionMessageCreatedArgs } from "../gql/graphql";

const messageCreatedDocuments = graphql(`
  subscription messageCreated($chatIds: [String!]!) {
    messageCreated(chatIds: $chatIds) {
      ...MessageFragment
    }
  }
`);

export const useMessageCreated = (
  variables: SubscriptionMessageCreatedArgs
) => {
  return useSubscription(messageCreatedDocuments, {
    variables,
    onData: ({ client, data }) => {
      if (data.data) {
        updateMessages(client.cache, data.data.messageCreated);
      }
    },
  });
};
