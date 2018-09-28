import React, { Component } from 'react';
//import '../sass/app.sass';

class AsideBlockItem extends Component {
  

  render() {
  	switch (this.props.type) {
  		case "Advertisement":
  			return (
	  			<div className="block">
					<div className="block__title">
						Advertisement
					</div>
					<img className="block__img" src={this.props.img} alt="Advertisement"/>
					<div className="block__footer ellipsis">
						Ads By Denteez.com 
					</div>
				</div>
  			)
		case "List":
			const props = this.props;
			return (
				<div className="block">
					<div className="clearfix">
						<div className="block__title ellipsis">
							{props.title}
						</div>
						<a href="#" className="block__all">
							See All
						</a>
					</div>
					<ul className="block-list">
						{
							props.data.map((item, index) => (
								<li key={index} className="clearfix">
									{(props.content !== 'Companies') && <p className="block-list__title">{item.name}</p>}
									<img className="block-list__img" src={item.img} alt={item.name}/>
									<div>
										{(props.content === 'Companies') && <p className="block-list__title ellipsis">Company Name</p>}
										<p className={`block-list__text ${(props.content === 'Companies')? 'ellipsis' : 'line-clamp'}`}>{item.text1}</p> 
										<p className="block-list__text line-clamp"> {item.text2}</p>
										{(props.content !== 'Products') && <a href="#" className="block-list__link">{(props.content === 'Companies') ? 'Follow Now' : 'Add Friend'}</a>}
									</div>
								</li>
							))
						}
					</ul>
				</div>
			)
  		default:
  			return ("");
  	}  
  }
}

export default AsideBlockItem;