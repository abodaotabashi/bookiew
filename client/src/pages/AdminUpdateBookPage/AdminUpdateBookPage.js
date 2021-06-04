import React from 'react';
import AdminNavbarWithUser from '../../components/AdminNavbar/AdminNavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import AdminUpdateBook from '../../containers/AdminUpdateBook/AdminUpdateBook';
import PageContainer from '../../components/PageContainer/PageContainer';

const AdminUpdateBookPage = (props) => {
    const book = props.location.state.book;
    console.log(book);
  /* const book = {
        bookname: 'MyBook',
        author: 'MyAuthor',
        publishingyear: '2020',
        publisher: 'MyPublisher',
        subject: 'MySubject',
        category: 'MyCategory',
        language: 'English',
        coverURL: 'https://images-na.ssl-images-amazon.com/images/I/41ktse1ZqPL._SX311_BO1,204,203,200_.jpg'
    }*/
    
    return(
        <div>
            <AdminNavbarWithUser />
            <PageContainer>
                <AdminUpdateBook book={book} />
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default AdminUpdateBookPage;