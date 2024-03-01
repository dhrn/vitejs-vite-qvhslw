import { Button, Typography } from '@mui/material';
import React, { useState, useRef, useCallback, useEffect } from 'react';

const VideoRecorder = ({ onSuccess }) => {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = useCallback(() => {
    const stream = videoRef.current.srcObject;
    const options = { mimeType: 'video/webm' };
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, {
        type: 'video/webm',
      });
      onSuccess({ url: URL.createObjectURL(blob) });
      stream.getTracks().forEach((s) => s.stop());
    };

    mediaRecorderRef.current = mediaRecorder;
    streamRef.current = stream;
    mediaRecorder.start();
    setRecording(true);
  }, [onSuccess]);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current
      .getTracks() // get all tracks from the MediaStream
      .forEach((track) => track.stop());
    setRecording(false);
  }, []);

  const handleStartStopClick = async () => {
    if (!recording) {
      try {
        await handlePermissions();
        startRecording();
      } catch (e) {
        console.log();
      }
    } else {
      stopRecording();
    }
  };

  const handlePermissions = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
    } catch (error) {
      setError('Error accessing media devices');
      console.error('Error accessing media devices:', error);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  if (error) {
    return <Typography variant="h3">{error}</Typography>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
      }}
    >
      <Button variant="contained" onClick={handleStartStopClick}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </Button>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ flex: '1 1 auto' }}
      />
    </div>
  );
};

export default VideoRecorder;
