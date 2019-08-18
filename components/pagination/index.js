import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import Table from '@material-ui/core/Table'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import PaginationActions from './PaginationActions'
import { perPage } from '../../config.js'
import Error from '../ErrorMessage'

const styles = ({ palette }) => ({
  paginationContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '15px 0 0 0',
  },
  text: {
    fontSize: 16,
    color: palette.primary.dark,
    textDecoration: 'none',
    fontWeight: 500,
  },
  subContainer: {
    display: 'flex',
    alignItems: 'center',
  },
})

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY($filter: String!) {
    questionsConnection(filter: $filter) {
      aggregate {
        count
      }
    }
  }
`

function Pagination({ filter, page, classes }) {
  return (
    <Query query={PAGINATION_QUERY} variables={{ filter: filter }}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <Error error={error} />

        const count = data.questionsConnection.aggregate.count
        const pages = Math.ceil(count / perPage)

        return (
          <div className={classes.paginationContainer} style={pages <= 1 ? { display: 'none' } : {}}>
            <Typography className={classes.subContainer}>
              <span className={classes.text}>{`Showing page ${page} of ${pages}`}</span>
            </Typography>
            <PaginationActions page={page} pages={pages} />
          </div>
        )
      }}
    </Query>
  )
}

export default withStyles(styles)(Pagination)
export { PAGINATION_QUERY }
