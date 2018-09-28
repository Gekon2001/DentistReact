import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AsideBlockItem from './AsideBlockItem';
import Services from './Services'

	const imgAdv1 = require('../../img/layer1.jpg');
  	const imgAdv2 = require('../../img/layer2.jpg');
  	
  	const company = [
	{	img: require('../../img/Layer 39.jpg'),
		text1: "Manufacturer",
		text2: "Belgrade, Serbia",

	},
	{	img: require('../../img/Layer 40.jpg'),
		text1: "Service Provider",
		text2: "New York, USA",

	},
	{	img: require('../../img/Layer 41.jpg'),
		text1: "Supplier",
		text2: "London, England",

	}
  ]
  const people = [
  	{	name: "Dennis Adams",
		img: require('../../img/Layer 36.jpg'),
		text1: "Dentist (Practice  Owner)",
		text2: "London, England"
	},
	{	name: "Mary Carpenter",
		img: require('../../img/Layer 37.jpg'),
		text1: "Dentist (Practice  Owner)",
		text2: "Belgrade, Serbia"
	},
	{	name: "Danielle Salazar",
		img: require('../../img/Layer 38.jpg'),
		text1: "Dentist (Practice  Owner)",
		text2: "Paris, France"
	}
  ]
	const product = [
  	{	name: "Product Name",
		img: require('../../img/Layer 34.jpg'),
		text1: "Product Short Description.",
		text2:"The quick brown  fox jumps over the lazy dog."
	},
	{	name: "Product Name",
		img: require('../../img/Layer 35.jpg'),
		text1: "Product Short Description.",
		text2:"The quick brown fox jumps over the lazy dog."
	}
  ]

class ServiceDirectory extends Component {

	render() {
	    return (
	      <div className="App">
	        	<header className="App-header">
			        <div className="width-wrapper">	
			        	<div className="flex-container">
		    				<div className="App-header__logo"></div>
		    				<div className="App-header__search">
		    				 	<div className="search__ico"></div>
		    				 	<input className="search__input" placeholder="Search"></input>
		    				 </div>
		    				<div className="App-header__item_messages"></div>
		    				<div className="App-header__item_notifications"></div>
		    				<div className="App-header__profile clearfix">
		    					<div className="profile__ico"></div>
		    					<div className="profile__text">Maximillian Beekeeper</div>
		    				</div>
		        		</div>
		        	</div>
	        	</header>
	        	
	        	<section className="App-body">
	        		<div className="flex-container">
	        			<div className="aside-left">
	        				<nav>
	        					<ul>
	        						
	        						<Link to="/">
	        							<li>
		        							<p className="feed" href="#">
		        								Feed
		        							</p>
		        						</li>
	        						</Link>
	        							
	        						<Link to="/">
	        							<li>
	        								<p className="ask" href="#">
	        									Ask a Colleague
	        								</p>
	        							</li>
	        						</Link>
	        							
	        						<Link to="/">		        						
		        						<li>
		        							<p className="companies" href="#">
		        								Companies
		        							</p>
		        						</li>
	        						</Link>
	        						<li>	        						
	        							<p className="directory" href="#">
	        								Service Directory
	        							</p>
	        						</li>
	        					</ul>
	        				</nav>

	        				

							<AsideBlockItem 
								type="Advertisement"
								img={imgAdv1} />

							<AsideBlockItem 
								type="List"
								content="Companies"
								title="Featured Companies"
								data={company} />
					
							
							<div className="copyright">
								<div>
									Denteez Copyright 2015
								</div>
								<span>
									Terms of use
								</span>
								<span>
									Privacy Policy
								</span>	
							</div>
	        			</div>
	        			
	        			<div className="main">
							<Services />
	        			</div>

	        			<div className="aside-right">
	       					<AsideBlockItem 
								type="List"
								content="People"
								title="People you may know"
								data={people} />

							<AsideBlockItem 
								type="List"
								content="Products"
								title="Featured Products"
								data={product} />
								
							<AsideBlockItem 
								type="Advertisement"
								img={imgAdv2} />
	        			</div>
	        		</div>
	        	</section>
	      </div>
	    );
	}
}

export default ServiceDirectory;
