import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { perPage } from "../../config.js";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Typography from "@material-ui/core/Typography";

import Error from "../ErrorMessage";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY($filter: String!) {
    questionsConnection(filter: $filter) {
      aggregate {
        count
      }
    }
  }
`;

function Pagination(props) {
  const router = useRouter();
  return (
    <Query query={PAGINATION_QUERY} variables={{ filter: props.filter }}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <Error error={error} />;

        const count = data.questionsConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        const page = props.page;

        return (
          <div>
            <Head>
              <title>
                Entra — Page {page} of {pages}
              </title>
            </Head>
            <div align="right">
              <Typography style={{ display: "inline-flex" }}>
                Page {page} - {pages}
              </Typography>
              <Link
                prefetch
                href={{
                  pathname: router.pathname,
                  query: { page: page - 1 }
                }}
              >
                <IconButton disabled={page <= 1}>
                  <KeyboardArrowLeft />
                </IconButton>
              </Link>
              <Link
                prefetch
                href={{
                  pathname: router.pathname,
                  query: { page: page + 1 }
                }}
              >
                <IconButton disabled={page >= pages}>
                  <KeyboardArrowRight />
                </IconButton>
              </Link>
            </div>
          </div>
        );
      }}
    </Query>
  );
}

export default Pagination;
export { PAGINATION_QUERY };
