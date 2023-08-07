import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {getStates} from '../components/LocationInput.js';
import {useEffect} from 'react';

export default function SelectLabels() {
  const [states, setStates] = React.useState([]);
  const [area, setArea] = React.useState('');
  // let defaultStates = [];

  const handleChange = (event: SelectChangeEvent) => {
    setStates(event.target.value);
    setArea(event.target.value);
  };

  useEffect(() => { 
    const fetchStates = async () => {
      const defaultStates = await getStates();
      setStates(defaultStates);
    };
    fetchStates();

  }, []);

let selectedState = null;

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={states}
          label="states"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {states.length > 0 && states.map((state) => (
        <MenuItem value={state.stateId}>{state.stateName}</MenuItem>
      ))}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Area</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={area}
          label="states"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={0o4}>Phoenix</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>

    </div>
  );
}

