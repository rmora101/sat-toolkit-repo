import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {getStates} from '../components/LocationInput.js';
import {useEffect} from 'react';

export let setSelectedStateId = '';
console.log(setSelectedStateId)

// export default function SelectLabels() {
//   const [states, setStates] = React.useState({});

//   const handleChange = (event: SelectChangeEvent) => {
//     const selectedStateId = event.target.value;
//     setStates(selectedStateId);
//   };

//   useEffect(() => { 
//     const fetchStates = async () => {
//       const defaultStates = await getStates();
//       setStates(defaultStates);
//     };
//     fetchStates();

//   }, []);
// export default function SelectLabels() {
//   const [selectedStateId, setSelectedStateId] = React.useState(''); // Initialize with an empty string

//   const handleChange = (event: SelectChangeEvent) => {
//     setSelectedStateId(event.target.value); // Update selectedStateId instead of states
//   };

//   useEffect(() => {
//     const fetchStates = async () => {
//       const defaultStates = await getStates();
//       selectedStateId(defaultStates);
//     };
//     fetchStates();
//   }, []);

//   return (
//     <div>
//       <FormControl sx={{ m: 1, minWidth: 120 }}>
//         <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
//         <Select
//           labelId="demo-simple-select-helper-label"
//           id="demo-simple-select-helper"
//           value={selectedStateId}
//           label="states"
//           onChange={handleChange}
//         >
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           {Object.entries(selectedStateId).map(([k,v]) => (
//         <MenuItem key ={k} value={v.stateId}></MenuItem>
//       ))}
//         </Select>
//         <FormHelperText>Required</FormHelperText>
//       </FormControl>

//     </div>
//   );
// }

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
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedStateId}
          label="states"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {states.map((state) => (
            <MenuItem key={state['stateId']} value={state['stateId']}>
              {state['stateName']}
            </MenuItem>
          ))}
        </Select>
        <p>{selectedStateId}</p>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </div>
  );
}
