import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import VideoRecorder from './VideoRecorder';
import { DialogContent } from '@mui/material';
import VideoList from './VideoList';
import { deleteFile } from './utils';

const VideosContainer = () => {
  const [open, setOpen] = React.useState(false);
  const [videos, setVideos] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSuccessRecording = ({ url }) => {
    setVideos((vides) => [
      ...vides,
      { url, name: `Recording-${vides.length + 1}` },
    ]);
  };

  const handleDelete = (index) => {
    setVideos((vides) => {
      const cloned = [...vides];
      const { url } = cloned[index];
      deleteFile(url);
      cloned.splice(index, 1);
      return cloned;
    });
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <VideoList videos={videos} handleDelete={handleDelete} />
        </div>
        <div>
          <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
              New Recording
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                  <Typography
                    sx={{ ml: 2, flex: 1 }}
                    variant="h6"
                    component="div"
                  >
                    Record Video
                  </Typography>
                  <Button autoFocus color="inherit" onClick={handleClose}>
                    Close
                  </Button>
                </Toolbar>
              </AppBar>
              <DialogContent>
                <VideoRecorder
                  onSuccess={(result) => {
                    onSuccessRecording(result);
                    handleClose();
                  }}
                />
              </DialogContent>
            </Dialog>
          </React.Fragment>
        </div>
      </div>
    </>
  );
};

export default VideosContainer;
