import React from 'react'

import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import User from '../auth/User.js'
import Button from '@material-ui/core/Button'
import Link from 'next/link'
import NavLink from './NavLink'
import classNames from 'classnames'

import './Appbar.css'

const styles = ({ layout, palette }) => ({
  root: {
    width: layout.width,
    minHeight: layout.headerHeight,
    backgroundColor: palette.secondary.main,
    boxShadow: '0px 2px 4px -4px rgba(0, 0, 0, 0.2), 0px 4px 5px -5px rgba(0, 0, 0, 0.14), 0px 1px 10px -10px rgba(0, 0, 0, 0.12)',
  },
  subContainer: {
    display: 'flex',
    height: '33%',
    alignItems: 'center',
  },
  hidden: {
    visibility: 'hidden',
  },
  button: {
    margin: 12,
  },
  signupButton: {
    backgroundColor: '#E27D60',
    margin: 12,
    '&:hover': {
      backgroundColor: palette.accent.main,
    },
  },
  loginButton: {
    margin: 12,
    backgroundColor: palette.accent.grey,
    '&:hover': {
      backgroundColor: palette.accent.main,
    },
  },
  logo: {
    maxHeight: 50,
    cursor: 'pointer',
  },
  logoContainer: {
    padding: '12px 0 0 0',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    color: palette.accent.dark,
    fontSize: '1.2rem',
    padding: '12px 10px 8px 10px',
    textDecoration: 'none',
    '&:hover': {
      color: palette.primary.dark,
    },
  },
  navLinkActive: {
    alignItems: 'center',
    color: palette.accent.dark,
    display: 'flex',
    fontSize: '1.2rem',
    fontWeight: 500,
    height: layout.headerHeight,
    padding: '12px 10px 8px 10px',
  },
})

const Appbar = ({ isLoggedIn, classes }) => {
  const navLinks = [
    {
      name: 'Ask a question',
      target: isLoggedIn ? '/qa' : '/signup',
    },
    {
      name: 'Blog',
      target: '/blog',
    },
  ]

  return (
    <div className={classes.root}>
      <div className="appbarFlex">
        <div className="subContainer">
          <Typography variant="h6" className={classes.logoContainer}>
            <Link href="/all">
              <img src="/static/logo.png" className={classes.logo} />
            </Link>
          </Typography>
        </div>

        <Typography className={classes.subContainer} component={'div'}>
          {navLinks.map(({ name, target }) => (
            <NavLink key={name} activeClassName={classes.navLinkActive} href={target}>
              <a className={classes.navLink}>{name}</a>
            </NavLink>
          ))}
        </Typography>

        <User>
          {({ data: { me } }) => {
            if (!me) {
              return (
                <Typography className={me ? classes.hidden : classes.subContainer}>
                  <Link href="/signin">
                  <Button variant="contained" color="secondary" className={classNames(classes.loginButton, "login-btn")}>
                      Login
                    </Button>
                  </Link>

                  <Link href="/signup">
                    <Button variant="contained" color="secondary" className={classes.signupButton}>
                      Sign up
                    </Button>
                  </Link>
                </Typography>
              )
            }
            return null
          }}
        </User>
      </div>
    </div>
  )
}

export default withStyles(styles)(Appbar)
