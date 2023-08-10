import React from 'react';
import BasicTable from './containers/Table.tsx';
import Input from './containers/Stateselect.tsx';
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
              <Input></Input>
              </section>
        </div>
				<div id="table_section">
          <div className='table'>
      <BasicTable></BasicTable>
      </div>
        </div>
        <div id="sat" >SAT</div>
        </div>
        <div id="welcome_to_the_skatepark_advocate_toolkit__" >
					Welcome to the Skatepark Advocate Toolkit !
				</div>
				<div id="this_website_will_provide_you_with_data_most_needed_to_begin_your_skatepark_building_journey_" >
					This website will provide you with data most needed to begin your skatepark building journey.
				</div>
				<div id="select_the_state_and_city_to_view_data" >
					Select the State and City to view Data
          </div>
        <div id="rectangle_2"  >
        </div>
        <div id="census-info" >
					Data Summary
          <p>Heres more information about the data you are pulling</p>
          </div>
      </section>

    </div>
  );
}

export default App;
