import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { withApollo } from "react-apollo";
import { perPage } from "../../config.js";
import QuestionList from "../question-list";
import tagsListQuery from "./tagsListQuery.js";
import { useQuery } from "@apollo/react-hooks";

const TAG_QUERY = gql`
  query TAG_QUERY($id: ID!) {
    tag(id: $id) {
      name
      id
    }
  }
`;

class TagsList extends Component {
  render() {
    const filter = "tags";
    const { page } = this.props;

    return (
      <Query
        query={TAG_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          const name = data.tag.name;
          return (
            <Query
              query={tagsListQuery}
              variables={{
                id: this.props.id,
                filter,
                skip: page * perPage - perPage,
                first: perPage
              }}
            >
              {({ data: { questions }, loading }) => {
                if (loading) return <p>Loading...</p>;

                return (
                  <QuestionList
                    questions={questions}
                    filter={filter}
                    page={page}
                    name={name}
                  />
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

export default withApollo(TagsList);