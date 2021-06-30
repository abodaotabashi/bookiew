import { render,fireEvent, screen } from '@testing-library/react';
import App from './App';
import { Router } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage';
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import Navbar from '../components/Navbar/Navbar';

import HomePage from '../pages/HomePage/HomePage';
import LoginForm from '../components/LoginForm/LoginForm';


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
    target: {value: 'spac@gmail.com'},
  })
  fireEvent.change(screen.getByPlaceholderText(/placeholders.Your_password/i), {
    target: {value: '123456'},
  })
  fireEvent.click(screen.getAllByText(/login.login/i)[1]);
  const homeElement = await screen.findByText(/home.question/i) ;
  expect(homeElement).toBeInTheDocument();

});

test('login then search for a book', async () => {
  render(<App />);
  const linkElement = screen.getByText(/login.login/i);
  expect(linkElement).toBeInTheDocument();
  const leftClick = { button: 0 }
  userEvent.click(screen.getByText(/login.login/i), leftClick);

  const linkElement2 = screen.getByText(/email/i);
  expect(linkElement2).toBeInTheDocument();

  // fill out the form
  fireEvent.change(screen.getByPlaceholderText(/placeholders.Your_email/i), {
    target: {value: 'spac@gmail.com'},
  })
  fireEvent.change(screen.getByPlaceholderText(/placeholders.Your_password/i), {
    target: {value: '123456'},
  })
  fireEvent.click(screen.getAllByText(/login.login/i)[1]);
  const homeElement = await screen.findByText(/home.question/i) ;
  expect(homeElement).toBeInTheDocument();

  const linkElement1 = screen.getByPlaceholderText(/placeholders.search/i);
  expect(linkElement1).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText(/placeholders.search/i), {
    target: {value: 'Siddharta'},
  })

  const leftClick1 = { button: 0 }
  userEvent.click(screen.getByAltText(/Search/i), leftClick1);

  
  const bookName = screen.getByText(/Siddharta/i);
  expect(bookName).toBeInTheDocument();

});


test('login then recommend a book', async () => {
  render(<App />);
  const linkElement = screen.getByText(/login.login/i);
  expect(linkElement).toBeInTheDocument();
  const leftClick = { button: 0 }
  userEvent.click(screen.getByText(/login.login/i), leftClick);

  const linkElement2 = screen.getByText(/email/i);
  expect(linkElement2).toBeInTheDocument();

  // fill out the form
  fireEvent.change(screen.getByPlaceholderText(/placeholders.Your_email/i), {
    target: {value: 'spac@gmail.com'},
  })
  fireEvent.change(screen.getByPlaceholderText(/placeholders.Your_password/i), {
    target: {value: '123456'},
  })
  fireEvent.click(screen.getAllByText(/login.login/i)[1]);
  const homeElement = await screen.findByText(/home.question/i) ;
  expect(homeElement).toBeInTheDocument();


<<<<<<< HEAD
  const recommend = screen.getByText(/navbar.Book_Recommendation/i);
  expect(recommend).toBeInTheDocument();
=======
>>>>>>> 66e881c2df7b3b7b2869166e1ab68c4810ddc480

  userEvent.click(recommend,leftClick);

  fireEvent.change(screen.getByPlaceholderText(/placeholders.name_of_book/i), {
    target: {value: 'test'},
  })
  fireEvent.change(screen.getByPlaceholderText(/placeholders.author_of_book/i), {
    target: {value: 'Verlyn Klinkenborg'},
  })

  fireEvent.change(screen.getByPlaceholderText(/placeholders.year_of_pub/i), {
    target: {value: '202'},
  })
   
  const send = { button: 0 }
  userEvent.click(screen.getByText(/Send Recommendation/i), send);


  //expect(ok).toBeInTheDocument();
  const ok = await screen.findByText(/Your Recommendation was successfully added!/i) ;
  expect(ok).toBeInTheDocument();

});

test('login then edit profile', async () => {
  render(<App />);
  const linkElement = screen.getByText(/login.login/i);
  expect(linkElement).toBeInTheDocument();
  const leftClick = { button: 0 }
  userEvent.click(screen.getByText(/login.login/i), leftClick);

  const linkElement2 = screen.getByText(/email/i);
  expect(linkElement2).toBeInTheDocument();

  // fill out the form
<<<<<<< HEAD
  fireEvent.change(screen.getByPlaceholderText(/placeholders.Your_email/i), {
    target: {value: 'spac@gmail.com'},
  })
  fireEvent.change(screen.getByPlaceholderText(/placeholders.Your_password/i), {
    target: {value: '123456'},
  })
  fireEvent.click(screen.getAllByText(/login.login/i)[1]);
  const homeElement = await screen.findByText(/home.question/i) ;
  expect(homeElement).toBeInTheDocument();



  const userIcon = await screen.getByRole('div', {
    name: /navbarDropDownContainer/i
  })    
  
  userEvent.click(userIcon,leftClick);
  const editProfile = await screen.getByText(/navbar.Edit_Profile/i);
  userEvent.click(editProfile,leftClick);

  fireEvent.change(screen.getByLabelText(/edit_profile.surname/i), {
    target: {value: 'changed'},
  })

  const question = await screen.getByText(/home.question/i)

  expect(question).toBeInTheDocument();
 
});
=======
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
>>>>>>> 66e881c2df7b3b7b2869166e1ab68c4810ddc480




