import React from 'react';
import Grid from '@mui/material/Grid';
import ImageCrop from '../../commons/images/crop/ImageCrop';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import ImageContainer from '../../commons/images/ImageContainer';
import aspectRatios from '../../../constants/images/aspect-ratios';
import imagePlaceHolder from '../../../assets/image-place-holder.jpg';

export default function SelectPhotoStep({ file, setFile }) {
  const [photoURL, setPhotoURL] = useState(null);

  useEffect(() => {
    if (file && !photoURL) {
      setPhotoURL(URL.createObjectURL(file));
    }
  }, [file, photoURL]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
    }
  };

  return (
    <Grid container flexDirection="column" alignItems="center">
      <Grid item xs={12} sx={{ width: '100%' }} alignSelf="center">
        {file ? (
          <ImageCrop photoURL={photoURL} setPhotoURL={setPhotoURL} setFile={setFile} />
        ) : (
          <Box
            htmlFor="profilePhoto"
            component={'label'}
            sx={{ display: 'flex', justifyContent: 'center', minHeight: 300 }}
          >
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: 'none' }}
              onChange={handleChange}
            />
            <ImageContainer
              item
              imageUrl={imagePlaceHolder}
              aspectRatio={aspectRatios.oneToOne}
              xs={4}
              sx={{ minHeight: 300, minWidth: 300 }}
              imageProps={{
                sx: {
                  margin: 1,
                },
              }}
              component={Grid}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
