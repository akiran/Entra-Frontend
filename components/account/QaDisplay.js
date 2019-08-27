import React, { Component } from 'react'
import Link from 'next/link'
import { Query } from 'react-apollo'

import Error from './../ErrorMessage.js'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { PAGINATION_QUERY } from '../pagination/paginationQuery.js'

const styles = ({ spacing, palette }) => ({
  elementContainer: {
    width: 200,
    padding: 50,
    maxWidth: '90%',
  },
  link: {
    textDecoration: 'none',
    color: 'grey',
  },
})

class QaDisplay extends Component {
  handlePointCount(questions, answers) {
    const allQuestions = questions.map(data => data.questionVote)
    const flatQuestionVotes = allQuestions.reduce(
      (acc, vote) => [...acc, ...vote],
      []
    )
    const questionVotes = flatQuestionVotes.map(data => data.vote)
    const questionCount = questionVotes.reduce((n, x) => n + (x === 'up'), 0)

    const allAnswers = answers.map(data => data.answerVote)
    const flatVotes = allAnswers.reduce((acc, vote) => [...acc, ...vote], [])
    const answerVote = flatVotes.map(data => data.vote)
    const answerCount = answerVote.reduce((n, x) => n + (x === 'up'), 0)
    const count = answerCount + questionCount
    return count
  }

  render() {
    const { classes } = this.props

    const user = this.props.user
    const answers = user.myAnswers
    const userId = user.id

    const questions = user.myQuestions

    return (
      <div className="root">
        <Typography variant="h3" className="title">
          Activity
        </Typography>

        <div className="container">
          <div className={classes.elementContainer}>
            <Typography variant="h4" align="center">
              {user.myQuestions.length}
            </Typography>

            <Typography variant="h5" align="center">
              <Link
                href={{
                  pathname: '/users',
                  query: { id: userId },
                }}
              >
                <a className={classes.link}>Questions</a>
              </Link>
            </Typography>
          </div>

          <div className={classes.elementContainer}>
            <Typography variant="h4" align="center">
              {user.myAnswers.length}
            </Typography>

            <Typography variant="h5" align="center">
              <Link
                href={{
                  pathname: '/answers',
                  query: { id: userId },
                }}
              >
                <a className={classes.link}>Answers</a>
              </Link>
            </Typography>
          </div>

          <div className={classes.elementContainer}>
            <Typography variant="h4" align="center">
              {
                answers.filter((x, i) => {
                  return x.selected
                }).length
              }
            </Typography>

            <Typography variant="h5" align="center">
              <Link
                href={{
                  pathname: '/selected',
                  query: { id: userId },
                }}
              >
                <a className={classes.link}>Accepted Answers</a>
              </Link>
            </Typography>
          </div>

          <div className={classes.elementContainer}>
            <Typography variant="h4" align="center">
              {this.handlePointCount(questions, answers)}
            </Typography>

            <Typography variant="h5" align="center" className={classes.link}>
              Points
            </Typography>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(QaDisplay)
