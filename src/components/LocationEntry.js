// import React from 'react';
// import PropTypes from 'prop-types';
import census from 'citysdk';
import dotenv from 'dotenv'
dotenv.config()

const apiAccessKey = process.env.CENSUS_TOKEN

// population sdk call
census({
    vintage: '2021',
    geoHierarchy: {
        state:'04',
        'metropolitan statistical area/micropolitan statistical area': '*',
    },
    sourcePath: ['acs', 'acs1','profile'],
    values: ['BB01001_001E'], // GINI index
    statsKey: apiAccessKey,
    geoResolution: '500k',
},   
(err, res) => console.log(res)
)
// median household income sdk calls
census({
    vintage: '2021',
    geoHierarchy: {
        state:'04',
        'metropolitan statistical area/micropolitan statistical area': '*',
    },
    sourcePath: ['acs', 'acs1','profile'],
    values: ['DP03_0062E'], // GINI index
    statsKey: apiAccessKey,
    geoResolution: '500k',
},   
(err, res) => console.log(res)
)

