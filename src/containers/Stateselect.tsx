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
  const [selectedStateId, setSelectedStateId] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedStateId(event.target.value);
  };

  const [states, setStates] = React.useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      const defaultStates = await getStates();
      setStates(defaultStates);
    };
    fetchStates();
  }, []);



  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 170, height:200}}>
        <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedStateId}
          label="states"
          onChange={handleChange}
          style={{height:'80px'}}
        >
          {states.map((state) => (
            <MenuItem key={state['stateId']} value={state['stateId']}>
              {state['stateName']}
            </MenuItem>
          ))} 
        </Select>
        {/* <FormHelperText>Required</FormHelperText> */}
      </FormControl>
    </div>
  );
}
