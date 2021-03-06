import React from 'react'
import './Register.css'
import { connect } from 'react-redux'
import { navigate } from '@reach/router'

import FormText from '../Forms/FormText/FormText'
import PubAcc from '../Common/PubAcc/PubAcc'
import { registerUser } from '../../actions/authActions'

import IRegisterUser from '../../interfaces/IRegisterUser'
import IFormSubmitEvent from '../../interfaces/IFormSubmitEvent'
import IAuthProps from '../../interfaces/IAuthProps'
import IErrorProps from '../../interfaces/IErrorProps'

interface Props {
  registerUser(userData: IRegisterUser): void
  auth: IAuthProps
  errors: IErrorProps
  path: string
}

class Register extends React.Component<Props, IRegisterUser> {
  public state = {
    email: '',
    username: '',
    password1: '',
    password2: ''
  }

  // Tracking input value changes
  private onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      // For cases where the input is not password, it will be converted to lowercase for DB storing. This makes input fields case insensitive (except for the passwords)
      [e.target.name]: e.target.value
    } as Pick<IRegisterUser, keyof IRegisterUser>)
  }

  // Runs on form submission
  private onSubmit = (e: IFormSubmitEvent): void => {
    e.preventDefault()

    const { email, username, password1, password2 } = this.state
    const userData = {
      email: email.toLowerCase(),
      username: username,
      password1,
      password2
    }

    // Redux action for registering users. Takes form data and browser history.
    this.props.registerUser(userData)
  }

  public render(): JSX.Element {
    // If a users is logged in, they cannot access this page and are redirected to their feed.
    if (this.props.auth.isLoggedIn) {
      navigate('/feed')
      return null
    } else {
      return (
        <section className='register'>
          <h1 className='register__heading-1'>Sign up for an account</h1>
          <form noValidate onSubmit={this.onSubmit} className='register__form'>
            <FormText
              type='email'
              name='email'
              placeholder='Email Address'
              onChange={this.onChange}
              value={this.state.email}
              errors={this.props.errors}
            />
            <FormText
              type='text'
              name='username'
              placeholder='Username'
              onChange={this.onChange}
              value={this.state.username}
              errors={this.props.errors}
            />
            <FormText
              type='password'
              name='password1'
              placeholder='Password'
              onChange={this.onChange}
              value={this.state.password1}
              errors={this.props.errors}
            />
            <FormText
              type='password'
              name='password2'
              placeholder='Password'
              onChange={this.onChange}
              value={this.state.password2}
              errors={this.props.errors}
            />
            <input
              type='submit'
              className='register__form-btn'
              value='Register'
            />
          </form>
          <h2 className='register__heading-2'>
            Or use one of our public accounts
          </h2>
          <PubAcc />
        </section>
      )
    }
  }
}

const mapStateToProps = (state: Props) => {
  return {
    errors: state.errors,
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { registerUser }
)(Register)
