import { useMutation } from "@apollo/client";

import { updateLatestMessages } from "../cache/latest-message";
import { updateMessages } from "../cache/message";
import { graphql } from "../gql";

const createMessageDocument = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
`);

const useCreateMessage = () => {
  return useMutation(createMessageDocument, {
    update(cache, { data }) {
      if (data?.createMessage) {
        updateMessages(cache, data.createMessage);
        updateLatestMessages(cache, data.createMessage);
      }
    },
  });
};

export { useCreateMessage };
