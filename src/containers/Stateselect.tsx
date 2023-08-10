import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {getStates} from '../components/LocationInput.js';
import {useEffect} from 'react';
import { sizing } from '@mui/system';



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
      <FormControl sx={{ m: 1, minWidth: 150, height:200}}>
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
