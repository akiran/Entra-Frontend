import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import questionQuery from "../question-display/questionQuery.js";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";

const APPROVE_ANSWER_MUTATION = gql`
  mutation updateAnswerApproval($id: ID!, $approval: Boolean!) {
    updateAnswerApproval(id: $id, approval: $approval) {
      id
      body
      answeredTo {
        id
      }
      answeredBy {
        id
      }
    }
  }
`;

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  buttonReject: {
    backgroundColor: "#E27D60",
    marginTop: 10
  },
  buttonAccept: {
    backgroundColor: "#85BDCB",
    marginTop: 10
  },
  buttonAccepted: {
    backgroundColor: "#85BDCB",
    marginTop: 10,
    marginRight: 10
  },
  buttonRejected: {
    backgroundColor: "#E27D60",
    marginTop: 10
  }
};

class ApproveAnswers extends Component {
  handleApproval = async (e, updateAnswer) => {
    e.preventDefault();
    const res = await updateAnswer({
      variables: {
        id: this.props.id,
        approval: true
      }
    });

    console.log("Updated!!");
  };

  handleReject = async (e, updateAnswer) => {
    e.preventDefault();
    const res = await updateAnswer({
      variables: {
        id: this.props.id,
        approval: false
      }
    });

    console.log("Updated!!");
  };

  render() {
    const { classes, isApproved, approval, hasPermissions } = this.props;
    if (!hasPermissions) {
      if (approval === null) {
        return <div />;
      } else if (!isApproved) {
        return <div>Rejected</div>;
      } else {
        return <div>Approved</div>;
      }
    }
    return (
      <Mutation
        mutation={APPROVE_ANSWER_MUTATION}
        refetchQueries={[
          {
            query: questionQuery,
            variables: { id: this.props.questionId }
          }
        ]}
      >
        {(updateAnswer, { error, loading }) => {
          if (approval === null) {
            return (
              <div>
                <Button
                  className={classes.buttonAccepted}
                  variant="contained"
                  onClick={e => this.handleApproval(e, updateAnswer)}
                >
                  Approve
                </Button>
                <Button
                  className={classes.buttonRejected}
                  variant="contained"
                  onClick={e => this.handleReject(e, updateAnswer)}
                >
                  Reject
                </Button>
              </div>
            );
          } else if (!isApproved) {
            return (
              <div>
                {" "}
                <Button
                  className={classes.buttonAccept}
                  variant="contained"
                  onClick={e => this.handleApproval(e, updateAnswer)}
                >
                  Approve
                </Button>
              </div>
            );
          }
          return (
            <div>
              <Button
                className={classes.buttonReject}
                variant="contained"
                onClick={e => this.handleReject(e, updateAnswer)}
              >
                Reject
              </Button>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(ApproveAnswers);
