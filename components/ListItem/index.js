import React from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";

import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "next/router";

const CustomTableCell = withStyles(theme => ({
  head: {
    width: 5
  }
}))(TableCell);

const styles = ({ layout, palette }) => ({
  title: {
    color: palette.accent.dark,
    padding: "5px 0 15px 0",
    margin: 0,
    maxWidth: 800
  },
  body: {
    color: palette.accent.dark,
    padding: "5px 0 15px 0",
    margin: 0,
    maxWidth: 800
  },
  nameLink: {
    fontWeight: 500,
    textDecoration: "none",
    color: palette.primary.dark
  },
  tableRow: {
    cursor: "pointer",
    "&:hover": {
      background: "#f1f2f6"
    }
  },
  button: {
    color: palette.accent.dark
  }
});

const ListItem = ({
  item: {
    id,
    title,
    body,
    link,
    createdAt,
    tags,
    answers,
    views,
    upVotes,
    downVotes,
    askedBy
  },
  classes,
  router,
  linkTo,
  userName,
  showDetails
}) => {
  return (
    <TableRow
      key={id}
      className={classes.tableRow}
      onClick={() => router.push(linkTo)}
    >
      <TableCell component="th" scope="row">
        <Typography>
          {title && <h2 className={classes.title}>{title}</h2>}
          {body && <h3 className={classes.body}>{body}</h3>}
          {tags && (
            <div style={{ display: "flex", padding: "0 0 10px 0" }}>
              <ButtonGroup aria-label="outlined primary button group">
                {tags.map(({ id, name }) => (
                  <Button
                    size="small"
                    variant="contained"
                    className={classes.button}
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      router.push({
                        pathname: "/tags",
                        query: { id: id }
                      });
                    }}
                  >
                    {name}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          )}
        </Typography>
        <Typography style={{ paddingTop: 5 }}>
          <span>Posted by </span>
          <a href={`/${userName}`} className={classes.nameLink}>
            {userName}
          </a>
          <span> on </span>
          <span>{format(parseISO(createdAt), "MMMM dd, yyyy")}</span>
        </Typography>
      </TableCell>

      {showDetails && (
        <>
          <TableCell>{answers.length}</TableCell>
          <CustomTableCell>{views}</CustomTableCell>
        </>
      )}
      <CustomTableCell>{upVotes}</CustomTableCell>
      <CustomTableCell>{downVotes}</CustomTableCell>
    </TableRow>
  );
};

export default withRouter(withStyles(styles)(ListItem));