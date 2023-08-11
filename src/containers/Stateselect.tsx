import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useEffect} from 'react';
import axios from 'axios';


export default function SelectLabels() {
  const [selectedStateId, setSelectedStateId] = React.useState('');
  const [selectedArea, setSelectedArea] = React.useState('');
  const [areas, setAreas] = React.useState([]);
  const [states, setStates] = React.useState([]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedStateId(event.target.value);
    setSelectedArea(event.target.value);
  };


  useEffect(() => {
    const fetchStates = async () => {
      const defaultStates = await getStates();
      setStates(defaultStates);
    };
    fetchStates();
  }, []);

  const getStates = () => {
    const response = axios.get("https://api.census.gov/data/2016/acs/acs1?get=NAME&for=state:*")
        .then((response) => {
            const states = []
            for (let data of response.data) {
                const name = data[0];   // Accessing the "NAME" field
                const state = data[1];  // Accessing the "state" field
                const stateData = {'stateName': name, 'stateId': state};
                states.push(stateData)
            }
            console.log(states);
            return states
        })
        .catch(() => {return'hello'});
        return response
}
  useEffect(() => {
    const fetchArea = async () => {
      if (selectedStateId) {
        try {
          const response = await axios.get(
            `https://api.census.gov/data/2021/acs/acs1?get=NAME,B01001_001E&for=public%20use%20microdata%20area:*&in=state:${selectedStateId}`
          );
          const areasData = response.data.map((data) => ({ areaName: data[0], areaCode: data[3] }));
          setAreas(areasData);
          // for (let data of response.data) {
          //   const name = data[0]
          //   const microDataArea = data[3]; // access micro area code
          //   const areaData = {'AreaName': name, 'AreaCode' :microDataArea};
          //   areas.push(areaData)}
            // setSelectedArea(response)
            console.log(areas);
        } catch (error) {
          console.log(error);
        }
      }
      };
      // setAreas(fetchArea);
      fetchArea();
    }, [selectedStateId]);
  // console.log(selectedStateId)
  // console.log(Object.entries(areas))
  // console.log(typeof states)


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
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 170, height:200}}>
        <InputLabel id="demo-simple-select-helper-label">Area</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedArea}
          label="areas"
          onChange={(event) => setSelectedArea(event.target.value)}
          style={{height:'80px'}}
        >
          <MenuItem value="">
            <em>None</em>
            </MenuItem>
            {areas.map((area) => (
            <MenuItem key={area['areaCode']} value={area['areaCode']}>
              {area['areaName']}
            </MenuItem>
          ))} 
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </div>
  );
}
