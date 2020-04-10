import React from 'react';
import { EditButton } from "react-admin";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const moment = require('moment');

const useStyles = makeStyles(theme => ({
 root: {
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent: 'space-around',
   overflow: 'hidden',
   backgroundColor: theme.palette.background.paper,
   margin: 10
 },
 gridList: {
   width: '100%'
 },
 icon: {
   color: 'rgba(255, 255, 255, 0.6)',
 }
}));


const Gallery = ({ ids, data, basePath }) => {
  const [open, setOpen] = React.useState(false);
  const [dialogImage, setDialogImage] = React.useState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const handleClickOpen = (e) => {
    setDialogImage(e.target.src)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} className={classes.gridList} cols={4}>
        {ids.map(id =>(
          <GridListTile key={data[id].path}>
            <img src={data[id].path} alt={data[id].description} onClick={handleClickOpen}/>
            <GridListTileBar
              title={data[id].description}
              subtitle={<span>{moment(data[id].created_at).format('LLL')}</span>}
              actionIcon={
                <EditButton resource="posts" basePath={basePath} record={data[id]} label='' icon={<EditIcon />} className={classes.icon}/>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <img
          src={dialogImage}
          alt="Pikachu"
        />
      </Dialog>
    </div>
  );
}
Gallery.defaultProps = {
    data: {},
    ids: [],
};

export default Gallery;
