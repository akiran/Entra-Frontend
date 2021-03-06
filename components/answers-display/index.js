import React from "react";
import { Query } from "react-apollo";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import CircularProgress from '@material-ui/core/CircularProgress';
import Error from "./../ErrorMessage.js";
import { CURRENT_USER_QUERY } from "../auth/User";
import Answer from "./Answer";

const styles = ({ spacing, palette, layout }) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "0 0 30px 0",

    // width: `calc(${layout.width} / 1.2)`,
    maxWidth: 1000
  },
  title: {
    color: "#2d3436",
    padding: "5px 0 0 20px",
    margin: 0,
    marginTop: 30,
    marginBottom: 30,
    maxWidth: 800,
    fontWeight: "bold",
    textAlign: "left",
    lineHeight: "2.5rem",
  }
});

const Answers = ({ classes, question, user }) => {
  const { answers } = question;

  return question.answers.length === 0 ? null : (
    <Query query={CURRENT_USER_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <CircularProgress style={{margin: 20}} />
        if (error) return <Error error={error} />;
        const user = data.me;

        return (
          <div className={classes.container}>
            {answers === null || answers === "" ? null : (
              <>
                {/*
                <div style={{ maxWidth: 600, marginLeft: '-10px' }}>
                  <Divider variant="middle" />
                </div>
                */}

                <Typography variant="h3" className={classes.title}>
                  Answers
                </Typography>
              </>
            )}

            {answers.map(answer => (
              <Answer
                answer={answer}
                user={user}
                question={question}
                key={answer.id}
              />
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default withStyles(styles)(Answers);
