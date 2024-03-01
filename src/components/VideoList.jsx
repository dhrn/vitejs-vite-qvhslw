import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import * as React from 'react';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { downloadFile } from './utils';

const VideoList = ({ videos, handleDelete }) => {
  const [preview, setPreview] = React.useState(null);
  return (
    <>
      <div>
        <Typography variant="h1">Video List</Typography>
      </div>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {videos?.map(({ url, name }, index) => (
          <ListItem alignItems="flex-start" key={name}>
            <ListItemAvatar>
              <Avatar alt={name} src={url} />
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={
                <>
                  <Button variant="outlined" onClick={() => downloadFile(url)}>
                    Download
                  </Button>
                  <Button variant="contained" onClick={() => setPreview(url)}>
                    Preview
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleDelete(index);
                      if (preview === url) {
                        setPreview(null);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </>
              }
            />
          </ListItem>
        ))}
        <Divider variant="inset" component="li" />
      </List>
      {preview && <video src={preview} autoPlay playsInline />}
    </>
  );
};

export default VideoList;
