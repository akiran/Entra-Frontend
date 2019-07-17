import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Link from "next/link";
import Head from "next/head";

import { perPage } from "../../config.js";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";

import Error from "../ErrorMessage";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY($skip: Int = 0, $first: Int = 0) {
    questionsConnection(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <Error error={error} />;
      console.log(data.questionsConnection.aggregate.count);
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
                pathname: window.location.pathname,
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
                pathname: window.location.pathname,
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

export default Pagination;
export { PAGINATION_QUERY };
