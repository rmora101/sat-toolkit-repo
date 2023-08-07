import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {getStates} from '../components/LocationInput.js';
import {useEffect} from 'react';

export let selectedStateId = '';
console.log(selectedStateId)

export default function SelectLabels() {
  const [states, setStates] = React.useState({});

  const handleChange = (event: SelectChangeEvent) => {
    const selectedStateId = event.target.value;
    setStates(selectedStateId);
  };

  useEffect(() => { 
    const fetchStates = async () => {
      const defaultStates = await getStates();
      setStates(defaultStates);
    };
    fetchStates();

  }, []);

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
          {Object.entries(states).map(([k,v]) => (
        <MenuItem key ={k} value={v.stateId}>{v.stateName}</MenuItem>
      ))}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>

    </div>
  );
}