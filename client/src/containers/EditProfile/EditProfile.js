import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import { withTranslation } from 'react-i18next';

import AnimatedNumber from 'react-animated-number';

import UserIcon from "../../assets/icons/user.png";
import EditIcon from "../../assets/icons/edit.png";
import EditPhotoIcon from "../../assets/icons/edit_image.png";
import "./EditProfile.css";

class EditProfile extends Component {
    state = {
        user: this.props.user,
        userID: localStorage.getItem('userID'),
        firstname: localStorage.getItem('userFirstname'),
        surname: localStorage.getItem('userSurname'),
        email: localStorage.getItem('userEmail'),
        password: localStorage.getItem('userPassword'),
        profilePhotoURL: localStorage.getItem('userProfilePhotoURL'),
        numberOfReviews: this.props.user.numberOfReviews,
        newPassword: '',
        confirmPassword: '',
        errorMessage: '',
        firstnameDisabled: true,
        surnameDisabled: true,
        emailDisabled: true,
        errorVisible: 'none',
        passwordChange: true
    }

    handleFirstnameClicked = () => {
        this.setState({firstnameDisabled: !this.state.firstnameDisabled});
    };

    handleSurnameClicked = () => {
        this.setState({surnameDisabled: !this.state.surnameDisabled});
    };

    handleEmailClicked = () => {
        this.setState({emailDisabled: !this.state.emailDisabled});
    };


    validate = () => {
        if (this.state.email === ""){
            this.setState({ 
                errorMessage: 'Please enter your Email first!',
                errorVisible: 'flex' });
            return false;
        }
        if (!this.state.email.includes('@')) {
            this.setState({ 
                errorMessage: 'Invalid Email!',
                errorVisible: 'flex'   
            });
            return false;
        }
        if (this.state.firstname || this.state.surname) {
            if (!(/^[A-Za-z ]+$/.test(this.state.firstname)) || !(/^[A-Za-z ]+$/.test(this.state.surname))) {
                this.setState({ 
                    errorMessage: 'Invalid name!',
                    errorVisible: 'flex'  
                });
                return false;
            }
        } else {
            this.setState({ 
                errorMessage: 'Firstname and Surname cannot be empty!',
                errorVisible: 'flex' 
            });
            return false;
        }

        if (this.state.passwordChange===true) {
            console.log("inside valid true");
        } else {
            return false;
        }
        return true;
    };

    handleUpdatePhoto = async (event) => {
        if (!event.target.files || Object.keys(event.target.files).length === 0) {
            console.log("Photo couldn't be uploaded. Please Try again!");
        } else {
            const data = new FormData();
            data.append("userID", this.state.userID)
            data.append("photo", event.target.files[0]);
            const uploadPhoto= await axios.post("http://localhost:3000/uploadPhoto", data)
            if(uploadPhoto.data.response){
                const photoName = uploadPhoto.data.photoName;
                const photoPath = window.location.origin + "/files/uploadedPhotos/"+photoName;
                this.setState({profilePhotoURL: photoPath});
            } else {
                console.log("Something went wrong! Try Again!");
            }
        }
    }

    handleEditProfile = async() => {
            this.clearInputs();
            console.log("userID: " + this.state.userID);
            console.log("firstname: " + localStorage.getItem('userFirstname'));
            console.log("surname: " + localStorage.getItem('userSurname'));
            console.log("email: " + localStorage.getItem('userEmail'));
            console.log("password: " + localStorage.getItem('userPassword'));
            console.log("photo: " + localStorage.getItem('userProfilePhotoURL'));
            console.log("firstname after changing: " + this.state.firstname);
            console.log("surname after changing: " + this.state.surname);
            console.log("email after changing: " + this.state.email);
            console.log("photo after changing: " + this.state.profilePhotoURL);

            if (this.state.profilePhotoURL === null || typeof(this.state.profilePhotoURL) === "undefined") {
                this.setState({profilePhotoURL: ''})
            }
            if (this.state.newPassword === "" && this.state.confirmPassword === "") {
                this.setState({ passwordChange: this.state.passwordChange = true})
                this.setState({ newPassword: this.state.newPassword = this.state.user.password})
            } else if (this.state.newPassword !== this.state.confirmPassword){
                this.setState({ passwordChange: this.state.passwordChange = false});
            } else {
                this.setState({ passwordChange: this.state.passwordChange = true});
            }
        
            if(this.validate()){
                const result2 = await axios.post("http://localhost:3000/updateProfile", {
                    userID: this.state.userID,
                    firstname: this.state.firstname,
                    surname: this.state.surname,
                    email: this.state.email,
                    password: this.state.newPassword,
                    photoURL: this.state.profilePhotoURL
                });
                if(result2.data.response){
                    const result = await axios.post("http://localhost:3000/editProfile", {
                        userID: this.state.userID,
                    })
                    if(result.data.response){
                        this.setState({user: result.data.user});
                        localStorage.setItem('userFirstname',  result.data.user.firstname);
                        localStorage.setItem('userSurname',  result.data.user.surname);
                        localStorage.setItem('userEmail',  result.data.user.email);
                        localStorage.setItem('userProfilePhotoURL',  result.data.user.profilePhotoURL);
                        localStorage.setItem('userPassword',  result.data.user.password);
                        this.props.history.push({ pathname: '/home'});
                        }else{
                            console.log("something went wrong")
                        }
                }else{
                    console.log(result2)
                    console.log(result2.data.message);
                }
            }
    };

    clearInputs = () => {
        this.setState({
            errorMessage: '',
            errorVisible: 'none'
        });
    };

    goToLogin = () => {
        this.props.history.push({ pathname: '/login' });
    };

    render() {
        if(localStorage.getItem('isUserAuthenticated') === 'false'){
            this.goToLogin();
        }

        let image = null;
        if (this.state.profilePhotoURL) {
            image = (<img src={this.state.profilePhotoURL} className='editProfilePhoto' alt='Update ProfilePhoto'/>);
        } else {
            image = (<img src={UserIcon} className='editProfilePhoto' alt='ProfilePhoto'/>);
        }
        
        const {t} = this.props;
        return (
            <div className='editProfileBackgroundSection'>
                <div className='editProfileBackgroundFilterSection'>
                    <div className='editProfileSectionsContainer'>
                        <div className='editProfileSection'>
                            <div className='editProfileSectionWrapper'>
                                <div className='editProfileSectionPhotoContainer'>
                                    <div className='editProfileSectionPhotoWrapper'>
                                        {image}
                                    </div>
                                    <div className='editProfileUpdatePhotoWrapper' onClick={() => this.inputElement.click()} >
                                        <img src={EditPhotoIcon} className='editProfileUpdatePhotoIcon' alt='Update ProfilePhoto'/>
                                        {t('edit_profile.photo')}
                                    </div>
                                    <input className="updatePhotoInput" type="file" accept=".png, .jpg, .jpeg" name="profilePhoto"
                                    ref={input => this.inputElement = input} 
                                    onChange={this.handleUpdatePhoto}/>
                                </div>
                                <div className='editProfileVerticalBreakline'>
                                </div>
                                <div className='editProfileSectionInputsContainer'>
                                    <table className='editProfileInputTable'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p className='editProfileInputLabel'>{t('edit_profile.first_name')}</p>
                                                </td>
                                                <td className='editProfileInputWrapper'>
                                                    <input  className='editProfileInputText' 
                                                            type='text' 
                                                            name=''
                                                            required value={this.state.firstname} 
                                                            onChange={(event) => this.setState({firstname: event.target.value})}  
                                                            placeholder={t('placeholders.your_firstname')}
                                                            disabled = {(this.state.firstnameDisabled) ? "disabled" : ""} />
                                                    <img src={EditIcon} className='editProfileEditIcon' alt='Edit' onClick={this.handleFirstnameClicked}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className='editProfileInputLabel'>{t('edit_profile.surname')}</p>
                                                </td>
                                                <td className='editProfileInputWrapper'>
                                                    <input  className='editProfileInputText' 
                                                            type='text' 
                                                            name='' 
                                                            placeholder={t('placeholders.your_surname')}
                                                            required value={this.state.surname} 
                                                            onChange={(event) => this.setState({surname: event.target.value})} 
                                                            disabled = {(this.state.surnameDisabled) ? "disabled" : ""} />
                                                    <img src={EditIcon} className='editProfileEditIcon' alt='Edit' onClick={this.handleSurnameClicked}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className='editProfileInputLabel'>{t('edit_profile.email')}</p>
                                                </td>
                                                <td className='editProfileInputWrapper'>
                                                    <input  className='editProfileInputText' 
                                                            type='text' 
                                                            name='' 
                                                            placeholder={t('placeholders.your_email')}
                                                            required value={this.state.email} 
                                                            onChange={(event) => this.setState({email: event.target.value})}
                                                            disabled = {(this.state.emailDisabled) ? "disabled" : ""}  />
                                                    <img src={EditIcon} className='editProfileEditIcon' alt='Edit' onClick={this.handleEmailClicked}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className='editProfileInputLabel'>{t('edit_profile.password')}</p>
                                                </td>
                                                <td>
                                                    <details className='editProfilePasswordFieldContainer'> 
                                                        <summary className='editProfilePasswordFieldLabel'>{t('edit_profile.update_password')}</summary>
                                                        <div className='editProfilePasswordField'>
                                                            <input  className='editProfileInputText' 
                                                                    type='password'
                                                                    name=''
                                                                    onChange={(event) => this.setState({newPassword: event.target.value})} 
                                                                    placeholder={t('placeholders.new_pwd')}  />
                                                            <input  className='editProfileInputText' 
                                                                    type='password' 
                                                                    name=''
                                                                    onChange={(event) => this.setState({confirmPassword: event.target.value})} 
                                                                    placeholder={t('placeholders.confirm_pwd')}  />
                                                        </div>
                                                    </details>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                </td>
                                                <td>
                                                    <div className='editProfileErrorMessage' style={{ display: this.state.errorVisible}}>{this.state.errorMessage}</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='editProfileUpdateSectionWrapper'>
                                <button className='editProfileUpdateButton' onClick={this.handleEditProfile}>{t('edit_profile.update_profile')}</button>
                            </div>
                        </div>
                        <div className='editProfileInformationSection'>
                            <p className='editProfileReviewCounterLabel'>
                                {t('edit_profile.your_reviews')}
                            </p>
                            <AnimatedNumber
                                className='editProfileReviewCounter'
                                value={this.state.numberOfReviews}
                                formatValue={n => n.toFixed(0)}
                                frameStyle={percentage => percentage > 15 && percentage < 85 ? { opacity: 0.5 } : {}}
                                duration={500}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 

export default withTranslation()(withRouter(EditProfile));
