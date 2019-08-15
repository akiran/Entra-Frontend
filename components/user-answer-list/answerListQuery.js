import gql from "graphql-tag";
import { perPage } from "../../config.js";

const USER_ANSWER_QUERY = gql`
  query USER_ANSWER_QUERY($id: ID!, $filter: String!, $skip: Int = 0, $first: Int = ${perPage}) {
    answers(where: {answeredBy: {id: $id}}, filter: $filter, first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      body
      approval
      selected
      createdAt
      upVotes
      downVotes
      answeredTo {
        id
      }
      answeredBy {
        name
      }
    }
  }
`;

export default USER_ANSWER_QUERY;
