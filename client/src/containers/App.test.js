import { render, fireEvent, waitFor, screen, getByText, getByLabelText } from '@testing-library/react';
import App from './App';
import { useTranslation, initReactI18next } from 'react-i18next';
/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/

beforeEach(() => {

});





test('renderLoginPage', ()=> {


render(<App/>);
const loginButton = screen.getByRole('button', {name: /login.login/i})
fireEvent.click(loginButton)


//fireEvent.change(screen.getByLabelText('email'), { target: { value: 'space@gmail.com' } })

  
  /*

  fireEvent.change(screen.getByLabelText('password'), {
    target: {value: 'password1'},
  })

  const submitLoginButton = screen.getByRole('button', {name: /login.login/i})

  fireEvent.click(submitLoginButton)


expect(localStorage.getItem('isUserAuthenticated')).toBeTruthy*/

})