import React from 'react'
import { upperFirst } from 'lodash'

import Grid from '@material-ui/core/Grid'
import QuestionAnswer from '@material-ui/icons/QuestionAnswer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import Tooltip from '@material-ui/core/Tooltip'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import ListItem from './ListItem';
import Pagination from '../pagination'

const CustomTableCell = withStyles(theme => ({
  head: {
    width: 5,
  },
}))(TableCell)

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  icon: {
    color: 'black',
  },
  customColumnStyle: {
    maxWidth: '.3px',
  }
})

function QuestionList(props) {
  const { classes, questions, filter, page } = props

  return (
    <Grid container className={classes.container}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="display3" className={classes.title}>
                {upperFirst(filter)} Questions
              </Typography>
            </TableCell>
            <Tooltip title="Answers" placement="top">
              <CustomTableCell className={classes.customColumnStyle}>
                <QuestionAnswer className={classes.icon} />
              </CustomTableCell>
            </Tooltip>
            <Tooltip title="Views" placement="top">
              <CustomTableCell className={classes.customColumnStyle}>
                <img src="/static/visibility.svg" />
              </CustomTableCell>
            </Tooltip>
            <Tooltip title="Up Votes" placement="top">
              <CustomTableCell className={classes.customColumnStyle}>
                <img src="/static/thumb_up.svg" />
              </CustomTableCell>
            </Tooltip>
            <Tooltip title="Down Votes" placement="top">
              <CustomTableCell className={classes.customColumnStyle}>
                <img src="/static/thumb_down.svg" />
              </CustomTableCell>
            </Tooltip>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map(question => {
            return <ListItem question={question} />
          })}
        </TableBody>
      </Table>
      <Pagination page={page} filter={filter} />
    </Grid>
  )
}

export default withStyles(styles)(QuestionList)
