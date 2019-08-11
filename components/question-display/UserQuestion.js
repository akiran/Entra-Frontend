import React, { Component } from "react";
import { format, parseISO, differenceInDays } from "date-fns";
import { Query } from "react-apollo";
import Link from "next/link";
import gql from "graphql-tag";
import NoQuestion from "./NoQuestion";
import ApproveQuestion from "../approval/AppoveQuestion.js";
import CreatBookMark from "../bookmark/CreateBookMark.js";

import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withApollo } from "react-apollo";
import questionQuery from "./questionQuery";
import Icon from "../ui/Icon";
import DeleteQuestion from "../delete-question";

import { CURRENT_USER_QUERY } from "../auth/User";

const styles = theme => ({
  bigAvatar: {
    width: 70,
    height: 70,
    cursor: "pointer"
  },
  grid: {
    margin: theme.spacing.unit
  },
  root: {
    margin: theme.spacing.unit,
    marginTop: 40
  },
  title: {
    marginBottom: 20,
    fontSize: 20
  },
  photoTitle: {
    display: "inline-flex",
    marginRight: 10,
    marginBottom: 20
  },
  paper: {
    backgroundColor: "#F2F4EF",
    padding: 30
  },
  tags: {
    display: "inline-flex",
    marginRight: 10,
    marginTop: 20
  },
  date: {
    marginTop: 20
  },
  description: {
    fontSize: 17,
    minHeight: 20
  }
});

const CREATE_QUESTION_VOTE_MUTATION = gql`
  mutation CREATE_QUESTION_VOTE_MUTATION($questionId: ID!, $vote: String) {
    createQuestionVote(questionId: $questionId, vote: $vote)
  }
`;

const CREATE_QUESTION_VIEW_MUTATION = gql`
  mutation CREATE_QUESTION_VIEW_MUTATION($questionId: ID!) {
    createQuestionView(questionId: $questionId)
  }
`;

class UserQuestion extends Component {
  componentDidMount() {
    this.props.client.mutate({
      mutation: CREATE_QUESTION_VIEW_MUTATION,
      variables: {
        questionId: this.props.question.id
      },
      refetchQueries: [
        { query: questionQuery, variables: { id: this.props.question.id } }
      ]
    });

    this.props.client.query({
      query: CURRENT_USER_QUERY
    });
  }
  upVote = () => {
    this.props.client.mutate({
      mutation: CREATE_QUESTION_VOTE_MUTATION,
      variables: {
        questionId: this.props.question.id,
        vote: "up"
      },
      refetchQueries: [
        { query: questionQuery, variables: { id: this.props.question.id } }
      ]
    });
  };
  downVote = () => {
    this.props.client.mutate({
      mutation: CREATE_QUESTION_VOTE_MUTATION,
      variables: {
        questionId: this.props.question.id,
        vote: "down"
      },
      refetchQueries: [
        { query: questionQuery, variables: { id: this.props.question.id } }
      ]
    });
  };
  handleImage(askedby, classes) {
    if (askedby.image == null || askedby.image == "") {
      return (
        <div>
          <Link
            href={{
              pathname: "/user",
              query: { id: askedby.id }
            }}
          >
            <Avatar className={classes.bigAvatar}>{askedby.name[0]}</Avatar>
          </Link>
        </div>
      );
    }

    return (
      <div>
        <Link
          href={{
            pathname: "/user",
            query: { id: askedby.id }
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={askedby.image}
            className={classes.bigAvatar}
          />
        </Link>
      </div>
    );
  }

  tagsList(tags, classes) {
    return tags.map(tags => (
      <div key={tags.id} className={classes.tags}>
        <Typography style={{ textTransform: "uppercase" }}>
          <strong>{tags.name} </strong>
        </Typography>
      </div>
    ));
  }

  handleEdit(question, user) {
    const answers = question.answers.length;
    const date1 = new Date(question.createdAt);
    const date2 = new Date();
    const diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));

    if (question.askedBy[0].id == user.id && diffDays <= 1 && !answers) {
      return (
        <div>
          <Typography>
            <Link
              href={{
                pathname: "/edit-question",
                query: { id: question.id }
              }}
            >
              <a style={{ textDecoration: "none", color: "grey" }}>EDIT</a>
            </Link>
          </Typography>
          <DeleteQuestion id={question.id} />
          <div />
        </div>
      );
    }
  }

  render() {
    const { classes } = this.props;
    const question = this.props.question;
    const askedby = this.props.question.askedBy[0];
    const user = this.props.user;
    const hasPermissions = user.permissions.some(permission =>
      ["ADMIN", "MODERATOR"].includes(permission)
    );
    const ownsQuestion = askedby.id === user.id;
    const isApproved = question.approval === true;

    if (!ownsQuestion && !hasPermissions && !isApproved) {
      return <NoQuestion />;
    }

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs />
        <Grid item xs={7} className={classes.grid}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h5">
              <strong>{question.title}</strong>
            </Typography>
            <div className={classes.photoTitle}>
              {this.handleImage(askedby, classes)}
              <Typography style={{ paddingTop: 20, marginLeft: 10 }}>
                {" "}
                <strong>{askedby.display}</strong> asks:
              </Typography>
            </div>
            <Grid container>
              <Grid item xs={10}>
                <Typography className={classes.description}>
                  {question.description}{" "}
                </Typography>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  className={classes.date}
                >
                  <Typography>
                    Posted{" "}
                    {format(parseISO(question.createdAt), "MMMM dd, yyyy")}
                  </Typography>
                </Grid>
                <Typography style={{ display: "inline-flex", marginRight: 10 }}>
                  <strong> Tags:</strong>
                </Typography>{" "}
                {this.tagsList(question.tags, classes)}
                {this.handleEdit(question, user)}
                <ApproveQuestion
                  hasPermissions={hasPermissions}
                  isApproved={isApproved}
                  id={this.props.question.id}
                  approval={this.props.question.approval}
                />
              </Grid>
              <Grid item xs={2} container>
                <Grid item xs={4}>
                  <Icon onClick={this.upVote} src="/static/thumb_up.svg" />
                  <div>{question.upVotes}</div>
                </Grid>
                <Grid item xs={4}>
                  <Icon onClick={this.downVote} src="/static/thumb_down.svg" />
                  <div>{question.downVotes}</div>
                </Grid>
                <div>
                  <Grid container alignItems="center">
                    <Icon src="/static/visibility.svg" />{" "}
                    <span style={{ paddingLeft: 10 }}>
                      {question.views} views
                    </span>
                    <CreatBookMark user={user} question={question} />
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs />
      </Grid>
    );
  }
}

export default withStyles(styles)(withApollo(UserQuestion));