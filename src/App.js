import React from 'react';
import BasicTable from './containers/Table.tsx';
import './styles/index.css';



function App() {
  return (
    <div className="App">
      <section id="content-container">
        <div id="page_desktop___1_ek1">
        <div id="_bg__desktop___1_ek2"  >
        </div>
				<div id="header_rectangle"  ></div>
				<div id="summary_rectangle"  ></div>
				<div id="state_city_box"  >
        <section className='cityInput'>
        <BasicTable></BasicTable>
              </section>
        </div>
        <div id="sat" >SAT</div>
        </div>
        <div id="welcome_to_the_skatepark_advocate_toolkit__" >
					<h1>Welcome to the Skatepark Advocate Toolkit ! </h1>
				</div>
				<div id="this_website_will_provide_you_with_data_most_needed_to_begin_your_skatepark_building_journey_" >
					<p>This website will provide you with data most needed to begin your skatepark building journey.<br></br> With this tool, you are able to pull median household income, population, and demographic data
            from thousands of locations in the United States.</p>
				</div>
				<div id="select_the_state_and_city_to_view_data" >
					Select your State and City/Area to view Data
          </div>
        <div id="census-info" >
					<h1>Data Summary</h1>
          <p>This data derives from the American Community Survey 2021 provided by the U.S Census Bureau. Visit <a href='https://www.census.gov/programs-surveys/acs/data.html'>U.S Census</a> for more information on ACS.</p>
          <div id="skater_estimates">
            Based off your areas population, This will calculate the service area needed for skateparks.<br></br>This will also calculate the number of skaters and more in your area.
          </div>
            {/* <h2>Limitations</h2> */}
          </div>
      </section>
      <div id="rectangle_2"  >
      <footer>
	      <p>Created by Ruth Mora © 2023</p>
      </footer>
        </div>
      

    </div>
  );
}

export default App;
