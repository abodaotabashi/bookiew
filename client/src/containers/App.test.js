import { render,fireEvent, screen } from '@testing-library/react';
import App from './App';
import { Router } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage';
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import Navbar from '../components/Navbar/Navbar';

import HomePage from '../pages/HomePage/HomePage';
import LoginForm from '../components/LoginForm/LoginForm';

// describe('LoginView' , () => {
//   describe('submit with valid credentials', () => {
//     it.todo('calls api with data from form');
//     it.todo('redirects to app page');
//     it.todo('renders snackbar with success message');
//   });

//   describe('submit with invalid credentials', () => {
//     it.todo('does not call api',);
//     it.todo('stays on login page');
//     it.todo('clears password field, but not email');
//     it.todo('renders snackbar with error message');
//   });

//   describe('with invalid input values', () => {
//     it.todo('display required errors for email and password when empty');
//     it.todo('display incorrect email address on invalid email');
//     it.todo('does not call api when i click the login button');
//   });
// });



test('renders langing page', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/landing.welcome/i)[0];
  expect(linkElement).toBeInTheDocument();
});

test('renders Home page', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <HomePage />
    </Router>
  );
  const linkElement = screen.getAllByText(/home.question/i)[0];
  expect(linkElement).toBeInTheDocument();
});
/*
test('renders navigatation from landing to login link', () => {
  render(<App />);
  const linkElement = screen.getByText(/login.login/i);
  expect(linkElement).toBeInTheDocument();
  const leftClick = { button: 0 }
  userEvent.click(screen.getByText(/login.login/i), leftClick);

  // let page;
  // await page.submitForm({ email: '', password: ''});


  const linkElement2 = screen.getByText(/email/i);
  expect(linkElement2).toBeInTheDocument();
});





test('allows the user to login successfully', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <LoginPage />
    </Router>
  );
  // fill out the form
  fireEvent.change(screen.getByPlaceholderText(/Your Email/i), {
    target: {value: 'email@gmail.com'},
  })
  fireEvent.change(screen.getByPlaceholderText(/Your Password/i), {
    target: {value: 'thepassword'},
  })

 // fireEvent.click(screen.getAllByText(/login.login/i)[1])

  // await console.log('aaaaaaaaaaaa');
  // just like a manual tester, we'll instruct our test to wait for the alert
  // to show up before continuing with our assertions.
 //const homeElement = await screen.findByText(/home.question/i) ;
 //expect(homeElement).toBeInTheDocument();
  // .toHaveTextContent() comes from jest-dom's assertions
  // otherwise you could use expect(alert.textContent).toMatch(/congrats/i)
  // but jest-dom will give you better error messages which is why it's recommended
  // expect(alert).toHaveTextContent(/congrats/i)
  //expect(window.localStorage.getItem('token')).toEqual(fakeUserResponse.token)
});
// */


test('allows the user to go LoginForm then login successfully', async () => {
  render(<App />);
  const linkElement = screen.getByText(/login.login/i);
  expect(linkElement).toBeInTheDocument();
  const leftClick = { button: 0 }
  userEvent.click(screen.getByText(/login.login/i), leftClick);

  const linkElement2 = screen.getByText(/email/i);
  expect(linkElement2).toBeInTheDocument();

  // fill out the form
  fireEvent.change(screen.getByPlaceholderText(/placeholders.Your_email/i), {
    target: {value: 'a3@s.ab'},
  })
  fireEvent.change(screen.getByPlaceholderText(/placeholders.Your_password/i), {
    target: {value: '12345678'},
  })
  fireEvent.click(screen.getAllByText(/login.login/i)[1]);
  const homeElement = await screen.findByText(/home.question/i) ;
  expect(homeElement).toBeInTheDocument();

});



test('allows the user to go RegisterForm then register successfully', async () => {
  render(<App />); 
  const linkElement = screen.getByText(/register.register/i);
  expect(linkElement).toBeInTheDocument();
  const leftClick = { button: 0 }
  userEvent.click(screen.getByText(/register.register/i), leftClick);

  const linkElement2 = screen.getByPlaceholderText(/First name/i);
  expect(linkElement2).toBeInTheDocument();

  // fill out the form
    fireEvent.change(screen.getByPlaceholderText(/First name/i), {
      target: { value: 'r' },
    })
    fireEvent.change(screen.getByPlaceholderText(/Surname/i), {
      target: { value: 'a' },
    })
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'a3@s.ab' },
    })
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: '12345678' },
    })
    fireEvent.change(screen.getByPlaceholderText(/Date of birth/i), {
      target: { value: '10/06/2021' },
    })

    const radio = screen.getByLabelText('female')
    fireEvent.change(radio, { target: { value: "male" } });
    expect(radio.value).toBe('male')

    
  userEvent.click(screen.getByText(/register.create/i), leftClick);

  const homeElement = await screen.findByText(/login.title/i) ;
  expect(homeElement).toBeInTheDocument();


});