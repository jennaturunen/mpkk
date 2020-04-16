import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {modifyFile, useSingleMedia} from '../hooks/ApiHooks';
import {Button, CircularProgress, Grid, Slider} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import BackButton from '../components/BackButton';
import useModifyForm from '../hooks/ModifyHooks';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Modify = ({history, match}) => {
  const [loading, setLoading] = useState(false);
  const file = useSingleMedia(match.params.id);

  const doModify = async () => {
    setLoading(true);
    try {
      const modifyObject = {
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
      };
      // eslint-disable-next-line max-len
      const result = await modifyFile(modifyObject, match.params.id);
      console.log('filen lataus onnistui', result);
      // Siirry etusivulle
      setTimeout(() => {
        setLoading(false);
        history.push('/myfiles');
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
    handleSliderChange,
  } = useModifyForm(doModify);

  useEffect(() => {
    (async () => {
      if (file !== null) {
        const description = JSON.parse(file.description);
        setInputs((inputs) => {
          return {
            title: file.title,
            description: description.desc,
            filename: file.filename,
            brightness: description.filters.brightness,
            contrast: description.filters.contrast,
            saturation: description.filters.saturation,
            sepia: description.filters.sepia,
          };
        });
      }
    })();
  }, [file, setInputs]);

  return (
    <>
      <BackButton />
      <Grid container>
        <Grid item>
          <Typography
            component="h1"
            variant="h2"
            gutterBottom>Modify your file</Typography>
        </Grid>
        <Grid container item>
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
                <Button
                  fullWidth
                  color="primary"
                  type="submit"
                >Save changes</Button>
              </Grid>
            </Grid>
          </ValidatorForm>
          {loading &&
            <Grid item>
              <CircularProgress/>
            </Grid>
          }
          {inputs.filename.length > 0 &&
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
              src={mediaUrl + inputs.filename}
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

Modify.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default Modify;
