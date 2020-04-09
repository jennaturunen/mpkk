import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import useUploadForm from '../hooks/UploadHooks';
import Typography from '@material-ui/core/Typography';
import {uploadFile} from '../hooks/ApiHooks';
import {Button, CircularProgress, Grid, Slider} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import BackButton from '../components/BackButton';

const Upload = ({history}) => {
  const [loading, setLoading] = useState(false);
  const doUpload = async () => {
    console.log('input up', inputs);
    setLoading(true);
    try {
      const uploadObject = {
        title: inputs.title,
        description: JSON.stringify({
          desc: inputs.description,
          filters: {
            brightness: inputs.brightness,
            contrast: inputs.contrast,
            saturation: inputs.saturation,
            sepia: inputs.sepia,
          },
        }),
        file: inputs.file,
      };
      // eslint-disable-next-line max-len
      const result = await uploadFile(uploadObject, localStorage.getItem('token'));
      console.log('filen lataus onnistui', result);
      // Siirry etusivulle
      setTimeout(() => {
        setLoading(false);
        history.push('/home');
      }, 2000);
    } catch (e) {
      console.log(e.message);
    }
  };

  const {
    inputs,
    setInputs,
    handleInputChange,
    handleSubmit,
    handleFileChange,
    handleSliderChange,
  } = useUploadForm(doUpload);

  console.log('ips', inputs);

  // Use-effect käynnistyy kun inputs.file muuttuu
  useEffect(() => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      // convert image file to base64 string
      setInputs((inputs) => {
        return {
          ...inputs,
          dataUrl: reader.result,
        };
      });
    }, false);

    if (inputs.file !== null) {
      if (inputs.file.type.includes('image')) {
        reader.readAsDataURL(inputs.file);
      } else {
        setInputs((inputs) => {
          return {
            ...inputs,
            dataUrl: 'logo192.png',
          };
        });
      }
    }
  }, [inputs.file, setInputs]);

  return (
    <>
      <BackButton />
      <Grid container>
        <Grid item>
          <Typography
            component="h1"
            variant="h2"
            gutterBottom>Upload</Typography>
        </Grid>
        <Grid item>
          <ValidatorForm
            instantValidate={false}
            noValidate
            onSubmit={handleSubmit}
          >
            <Grid container>
              <Grid container item>
                <TextValidator
                  fullWidth
                  label="Title"
                  type="text"
                  name="title"
                  value={inputs.title}
                  onChange={handleInputChange}
                  validators={[
                    'required',
                  ]}
                  errorMessages={[
                    'This field is required',
                  ]}
                />
              </Grid>
              <Grid container item>
                <TextValidator
                  fullWidth
                  label="Description"
                  name="description"
                  value={inputs.description}
                  onChange={handleInputChange}
                  validators={
                    ['matchRegexp:^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$']
                  }
                  errorMessages={['text only']}
                />
              </Grid>
              <Grid container item>
                <TextValidator
                  type="file"
                  name="file"
                  accept="image/*,video/*,audio/*"
                  onChange={handleFileChange}
                />
              </Grid>
              <Grid container item>
                <Button
                  fullWidth
                  color="primary"
                  type="submit"
                >Upload</Button>
              </Grid>
            </Grid>
          </ValidatorForm>
          {loading &&
              <Grid item>
                <CircularProgress/>
              </Grid>
          }
          {inputs.dataUrl.length > 0 &&
            <Grid item>
              <img style={
                {
                  filter: `brightness(${inputs.brightness}%)
                  contrast(${inputs.contrast}%)
                  saturate(${inputs.saturation}%)
                  sepia(${inputs.sepia}%)`,
                  width: '100%',
                }
              }
              src={inputs.dataUrl}
              alt="preview"/>
              <Typography>Brightness</Typography>
              <Slider
                name="brightness"
                value={inputs.brightness}
                min={0}
                max={200}
                step={1}
                onChange={handleSliderChange}
              />
              <Typography>Contrast</Typography>
              <Slider
                name="contrast"
                value={inputs.contrast}
                min={0}
                max={200}
                step={1}
                onChange={handleSliderChange}
              />
              <Typography>Saturation</Typography>
              <Slider
                name="saturation"
                value={inputs.saturation}
                min={0}
                max={200}
                step={1}
                onChange={handleSliderChange}
              />
              <Typography>Sepia</Typography>
              <Slider
                name="sepia"
                value={inputs.sepia}
                min={0}
                max={200}
                step={1}
                onChange={handleSliderChange}
              />
            </Grid>
          }
        </Grid>
      </Grid>
    </>
  );
};

Upload.propTypes = {
  history: PropTypes.object,
};

export default Upload;
