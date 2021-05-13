import React, { Component } from 'react';
import "./EditProfile.css";
import AnimatedNumber from 'react-animated-number';

import UserIcon from "../../assets/icons/user.png";
import EditIcon from "../../assets/icons/edit.png";
import EditPhotoIcon from "../../assets/icons/edit_image.png";

class EditProfile extends Component {
    state = {
        user: this.props.user,
        firstname: this.props.user.firstname,
        surname: this.props.user.surname,
        email: this.props.user.email,
        photo: '',
        numberOfReviews: this.props.user.numberOfReviews,
        newPassword: '',
        confirmPassword: '',
        errorMessage: '',
        firstnameDisabled: true,
        surnameDisabled: true,
        emailDisabled: true,
        errorVisible: 'none'
    }

    handleFirstnameClicked = () => {
        this.setState( {firstnameDisabled: !this.state.firstnameDisabled});
    }

    handleSurnameClicked = () => {
        this.setState( {surnameDisabled: !this.state.surnameDisabled});
    }

    handleEmailClicked = () => {
        this.setState( {emailDisabled: !this.state.emailDisabled});
    }

    validate = () =>{
        
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
        if (this.state.password.length < 6) {
            this.setState({ 
                errorMessage: 'Password must contain more than 6 characters',
                errorVisible: 'flex'
            });
            return false;
        }
        return true;
    }

    handleUpdatePhoto = () => {
        //TODO
    }

    handleEditProfile = () => {
        this.clearInputs();
        //TODO
    }

    clearInputs = () => {
        this.setState({
            errorMessage: '',
            errorVisible: 'none'
        });
    }

    render(){

        return(
            <div className='editProfileBackgroundSection'>
                <div className='editProfileBackgroundFilterSection'>
                    <div className='editProfileSectionsContainer'>
                        <div className='editProfileSection'>
                            <div className='editProfileSectionWrapper'>
                                <div className='editProfileSectionPhotoContainer'>
                                    <div className='editProfileSectionPhotoWrapper'>
                                        <img src={UserIcon} className='editProfilePhoto' alt='Profile Photo'/>
                                    </div>
                                    <div className='editProfileUpdatePhotoWrapper' onClick={this.handleUpdatePhoto}>
                                        <img src={EditPhotoIcon} className='editProfileUpdatePhotoIcon' alt='Update Profile Photo'/>
                                        <p>Update Photo</p>
                                    </div>
                                </div>
                                <div className='editProfileVerticalBreakline'>
                                </div>
                                <div className='editProfileSectionInputsContainer'>
                                    <table className='editProfileInputTable'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p className='editProfileInputLabel'>First Name</p>
                                                </td>
                                                <td className='editProfileInputWrapper'>
                                                    <input  className='editProfileInputText' 
                                                            type='text' 
                                                            name=''
                                                            required value={this.state.firstname} 
                                                            onChange={(event) => this.setState({firstname: event.target.value})}  
                                                            placeholder='Your Firstname'
                                                            disabled = {(this.state.firstnameDisabled) ? "disabled" : ""} />
                                                    <img src={EditIcon} className='editProfileEditIcon' alt='Edit' onClick={this.handleFirstnameClicked}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className='editProfileInputLabel'>Surname</p>
                                                </td>
                                                <td className='editProfileInputWrapper'>
                                                    <input  className='editProfileInputText' 
                                                            type='text' 
                                                            name='' 
                                                            placeholder='Your Surname'
                                                            required value={this.state.surname} 
                                                            onChange={(event) => this.setState({surname: event.target.value})} 
                                                            disabled = {(this.state.surnameDisabled) ? "disabled" : ""} />
                                                    <img src={EditIcon} className='editProfileEditIcon' alt='Edit' onClick={this.handleSurnameClicked}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className='editProfileInputLabel'>E-mail</p>
                                                </td>
                                                <td className='editProfileInputWrapper'>
                                                    <input  className='editProfileInputText' 
                                                            type='text' 
                                                            name='' 
                                                            placeholder='Your E-mail'
                                                            required value={this.state.email} 
                                                            onChange={(event) => this.setState({email: event.target.value})}
                                                            disabled = {(this.state.emailDisabled) ? "disabled" : ""}  />
                                                    <img src={EditIcon} className='editProfileEditIcon' alt='Edit' onClick={this.handleEmailClicked}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className='editProfileInputLabel'>Password</p>
                                                </td>
                                                <td>
                                                    <details className='editProfilePasswordFieldContainer'> 
                                                        <summary className='editProfilePasswordFieldLabel'>Update Password</summary>
                                                        <div className='editProfilePasswordField'>
                                                            <input  className='editProfileInputText' 
                                                                    type='password' 
                                                                    name='' 
                                                                    placeholder='New Password'  />
                                                            <input  className='editProfileInputText' 
                                                                    type='password' 
                                                                    name='' 
                                                                    placeholder='Confirm Password'  />
                                                        </div>
                                                    </details>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                </td>
                                                <td>
                                                    <div className='editProfileErrorMessage' style={{ display: this.state.errorVisible}}>Your Password is invaild</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='editProfileUpdateSectionWrapper'>
                                <button className='editProfileUpdateButton'>Update Profile</button>
                            </div>
                        </div>
                        <div className='editProfileInformationSection'>
                            <p className='editProfileReviewCounterLabel'>
                                Your Reviews
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
        )
    }
}

export default EditProfile;