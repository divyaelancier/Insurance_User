import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './CardWrapper.scss'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export default function Cardbody(props) {
  const classes = useStyles();

  return (
    // <div className={classes.root}>
      <Paper elevation={props.elevation} variant={props.variant&&"outlined"} square={props.square} className={`${props.Customcardcss} card_comp_css`} style={{width:"100%",height:"auto"}}>
          {props.children}
      </Paper>
  
    // </div>
  );
}