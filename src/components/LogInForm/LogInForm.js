import React, { Component } from 'react';
import { Link } from "react-router-dom"

const logo = require("../../img/Logo.png");



class LogInForm extends Component {

	constructor(props) {
        super(props);
        this.state = {
				select: "",
				selectErr: "",
				other: "",
				otherErr: "",
				name: "",
				nameErr: "",
				email: "", 
				emailErr:"",
				subject: "", 
				subjectErr:"",
				description: "",
				descriptionErr:"",
				foto: "",
				fotoErr: "",
				selectData: []
        };
    }
    //hiden input file
	inputFileClick = () => {
		document.getElementById('fileElem').click()
	}

	isValidEmailAddress = emailAddress => {
    	const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    	return pattern.test(emailAddress);
 	}

	handleChange = (e) => {
		let state = this.state
		if ((e.target.name === "select") && state.selectErr) {
			this.setState({
				selectErr: ""
			})
		}
		if ((e.target.name === "name") && state.nameErr && e.target.value.match(/\w/)) {
			console.log(e.target.name.match(/\w/));
			this.setState({
				nameErr: ""
			})
		}
		if ((e.target.name === "email") && state.emailErr && this.isValidEmailAddress(e.target.value)) {
			this.setState({
				emailErr: ""
			})
		}
		if ((e.target.name === "subject") && state.subjectErr && e.target.value.match(/\w/)) {
			this.setState({
				subjectErr: ""
			})
		}
		if ((e.target.name === "description") && state.descriptionErr && e.target.value.match(/\w/) && (e.target.value.length <= 1000)) {
			this.setState({
				descriptionErr: ""
			})
		}
		this.setState({
			[e.target.name] : e.target.value
		})
	} 

	handleSubmit = (e) => {
		e.preventDefault()
		let state = this.state;
		let errorCount = 0
		if (!state.select) {
			errorCount++
			this.setState({
				selectErr: "You must choose something"
			})
		}

		if (!state.name || !state.name.match(/\w/)) {
			console.log('dasdasdas')
			errorCount++
			this.setState({
				nameErr: "Name cannot be blank"
			})
		}
		if (!this.isValidEmailAddress(state.email)) {
			errorCount++
			this.setState({
				emailErr: "You must enter real email"
			})
		}
		if (!state.subject || !state.subject.match(/\w/)) {
			errorCount++
			this.setState({
				subjectErr: "Subject cannot be blank"
			})
		}
		if (!state.description || !state.description.match(/\w/)) {
			errorCount++
			this.setState({
				descriptionErr: "Description cannot be blank"
			})
		} else if (state.description.length > 1000) {
			this.setState({
				descriptionErr: "Description cannot contain more than 1000 symbols"
			})
		}
		if (!state.foto) {
			errorCount++
			this.setState({
				fotoErr: "Foto cannot be blank"
			})
		}
		if (errorCount) {
		
		} else {	
			let formData = new FormData;
			formData.append('enquiry_type', this.state.select);
			formData.append('user_name', this.state.name);
  			formData.append('email', this.state.email);
  			formData.append('subject', this.state.subject);
  			formData.append('description', this.state.description);

			let obj = {
				method: "POST",
  				body: formData
			}
			fetch('http://504080.com/api/v1/support', obj).then(function(response) {
            return response.json();}).then( response => { alert(response.data.message); this.setState({
				select: "",
				selectErr: "",
				other: "",
				otherErr: "",
				name: "",
				nameErr: "",
				email: "", 
				emailErr:"",
				subject: "", 
				subjectErr:"",
				description: "",
				descriptionErr:"",
				foto: "",
				fotoErr: ""
        	});}).catch( error => {console.error(error)})  
		}	
    }

	handleFiles = (e) => {
		let file = e.target.files[0];
		if (file.type.split("/")[0] !== "image") {
			this.setState({fotoErr: "File type not a Foto"})
		} else if (file.size > 5*1028*1028) {
			this.setState({fotoErr: "File to large"})
		} else {

			var reader = new FileReader();
			reader.onload = (e) => { 
				let img = new Image();
				img.src = e.target.result;
				img.onload = () => {
					if ((img.naturalWidth >= 300) && (img.naturalHeight >= 300)) {
					this.setState({
						foto: e.target.result,
						fotoErr: ""
					});
				} else {
					this.setState({
						foto: "",
						fotoErr: "Foto must be not less than 300x300px"			
					});
				}};
			}
	    	reader.readAsDataURL(file);
		}
	} 

	fetchOptions = () => (
		this.state.selectData.map((item, index) => (
			<option key={index} value={item.name}>{item.name}</option>
		))		
	)
	

	componentWillMount(){
        fetch('http://504080.com/api/v1/directories/enquiry-types').then(function(response) {
            return response.json();
        }).then( response => {
                this.setState({
                    selectData: response.data
                });
            })
        .catch( error => {console.error(error)})  
    }

	render() {
		return (
	    	<div className="App App-form">

				<div className="form-login">
						<div className="form-title">
	    					<h1>
	    						Home of Dentistry
	    					</h1>
	    					<p className="form-title__text">
	    						Denteez was created by dentists for dentistry in order to <br/> make the life of everyone involved in dentistry easier.
	    					</p>
	    				</div>

						<form action="submit" className="form-body" onSubmit={this.handleSubmit}>
							<div className="input-wrapper">
								<p className="form__label">
									Fields marked “*” are required
								</p>
								<label>
									Enquiry Type *
									<div className="styled-select">
										<select 
											name="select"
											className={this.state.selectErr && "not-valid"}
											value={this.state.select} 
											onChange={this.handleChange}>
											<option value=""></option>
											{this.fetchOptions()}
				        					
		        						</select>
									</div>
										
		        				</label>
								{(this.state.select === "Other") && <input
									name="other"
									placeholder="Other"
									type="text" 
									value={this.state.other} 
									onChange={this.handleChange}/>}
								<div className="half-width clearfix">
									<div>
										<label>Name *
											<input
				    							name="name"
												className={this.state.nameErr && "not-valid"}
				    							placeholder="Dentist"
				    							type="text"
				    							value={this.state.name} 
				    							onChange={this.handleChange}/>
				    						{this.state.nameErr && <p className="form__error">{this.state.nameErr}</p>}
				    					</label>
									</div>
									<div>
										<label>
											Email *
											<input
												className={this.state.emailErr && "not-valid"}
				    							name="email" 
				    							placeholder="rachelm@gmail.com"
				    							type="text"
				    							value={this.state.email} 
				    							onChange={this.handleChange}/>
				    						{this.state.emailErr && <p className="form__error">{this.state.emailErr}</p>}

				    					</label>		
									</div>
								</div>
								
								<label>
									Subject *
									<input
										name="subject"
										className={this.state.subjectErr && "not-valid"} 
										type="text"
										value={this.state.subject} 
										onChange={this.handleChange}/>
		    						{this.state.subjectErr && <p className="form__error">{this.state.subjectErr}</p>}

								</label>

								<label>
									<div className="textarea clearfix">
										<p className="textarea__label">Description *</p>
										<p className="textarea__counter">
											(<span>{this.state.description.length}</span>/1000)
										</p>
									</div>
									<textarea 
										name="description" 
										className={this.state.descriptionErr && "not-valid"}
			   							value={this.state.description} 
										onChange={this.handleChange}>
									</textarea>
									{this.state.descriptionErr && <p className="form__error">{this.state.descriptionErr}</p>}

								</label>
								<div className="foto-loader clearfix">
									<div 
										className={"foto-loader__label " + (this.state.fotoErr && "not-valid")}
										onClick={this.inputFileClick}>
										<p>Add photo</p>
										<p>Minimum size of 300x300 jpeg jpg png 5 MB</p>
									</div>
									<input 
										type="file" 
										id="fileElem" 
										accept="image/*"
										onChange={this.handleFiles}/>
		    						{this.state.fotoErr && <p style={{ float: "left", paddingLeft: "10px"}} className="form__error">{this.state.fotoErr}</p>}

									
									{this.state.foto && !this.state.fotoErr && <img 
										className="foto-loader__img"
										src={this.state.foto}
										alt="Thumbnails"/>
									}
										
								</div>
								
							</div>
								<button type="submit" className="btn">
									Submit
								</button>
						</form>
				</div>	



	    		<div className="form-header">
    				<div className="wrapper clearfix">
    					<img className="form-header__logo" src={logo} alt="Logo"/>
    					<Link to="/service">
	    					<p href="#" className="form-header__btn btn">
	    						Log in now
	    					</p>
	    				</Link>
    				</div>
	    		</div>

	    		<div className="form-background">
	    		</div>

	    		<div className="form-footer">
	    			<div className="form-footer__border">
		    			<div className="footer-text clearfix">
		    				<h2>About Denteez</h2>
		    				<div className="footer-text__left">
		    					Why is it always so difficult to find what you are looking for in dentistry? Whether it is the latest advancement in technology or techniques or simply a review or understanding of the vast amount of products? Perhaps finding someone to just fix your broken equipment or simply hiring new staff or looking for that new job?
		    				</div>
		    				<div className="footer-text__right">
		    					Our mission is to give every dental professional the possibility to discuss and share all aspects of their profession, their practice and their business. We aim to make the world of dentistry easy and accessible, so every dental professional can find what they are looking for quickly and easily all in one place.
		    				</div>
		    			</div>
		    		</div>

	    			<div className="footer-copyright clearfix">
	    				<div className="footer-copyright__name">Denteez Copyright 2015</div>
						<a href="#">Support</a>
	    				<a href="#">Privacy Policy</a>
	    				<a href="#">Terms of use</a>	

	    			</div>
	    		</div>



	    	</div>
	    )
	}
}

export default LogInForm;
