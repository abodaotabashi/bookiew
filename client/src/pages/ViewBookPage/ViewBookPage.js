import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import ViewBook from '../../containers/ViewBook/ViewBook';

import ThumbnailTest from "../../assets/images/thumbnailtest.png"
import UserIcon from "../../assets/icons/user.png";
import PageContainer from '../../components/PageContainer/PageContainer';

const ViewBookPage = (props) => {
    let book = {  bookName:'Book 1' ,
                    bookAuthor:'Bookiew Inc.' ,
                    bookThumbnail:ThumbnailTest,
                    bookPublisher:'Bookiew Yayinevi',
                    bookPublishingYear:'2020',
                    bookLanguage:'English',
                    bookCategory:'IT',
                    bookSubject:'WebDev',
                    reviews: [
                        /*{
                            reviewText: "ABD Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
                            reviewerIcon: UserIcon,
                            reviewerID:'123456',
                            reviewerName:'Abdurrahman ODABAŞI',
                            reviewDate:'20.04.2021',
                            reviewRating: '4.3',
                            reviewComments: [
                                { commenterIcon: UserIcon, commenterName: 'Batoul', commentText: 'That is amazing!', commentDate: '20.04.2021'},
                                { commenterIcon: UserIcon, commenterName: 'Mahasin', commentText: 'Good Job', commentDate: '21.04.2021'},
                                { commenterIcon: UserIcon, commenterName: 'Sena', commentText: 'Wow', commentDate: '22.04.2021'}
                            ]
                        },*/
                        {
                            reviewText: "Betul Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
                            reviewerIcon: UserIcon,
                            reviewerID:'1515151',
                            reviewerName:'Betul Beidas',
                            reviewDate:'20.03.2021',
                            reviewRating: '4.6',
                            reviewComments: [
                                { commenterIcon: UserIcon, commenterName: 'Abdurrahman', commentText: 'That is amazing!', commentDate: '30.03.2021'},
                                { commenterIcon: UserIcon, commenterName: 'Mahasin', commentText: 'Good Job', commentDate: '21.04.2021'}
                            ]
                        },
                        {
                            reviewText: "Beyza Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
                            reviewerIcon: UserIcon,
                            reviewerID:'1313131',
                            reviewerName:'Beyza Kara',
                            reviewDate:'20.05.2021',
                            reviewRating: '3.7',
                            reviewComments: [
                                { commenterIcon: UserIcon, commenterName: 'Sara', commentText: 'That is amazing!', commentDate: '20.05.2021'}
                            ]
                        },
                        {
                            reviewText: "Merve Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
                            reviewerIcon: UserIcon,
                            reviewerID:'1212121',
                            reviewerName:'Merve Beyaz',
                            reviewDate:'13.04.2021',
                            reviewRating: '4.8',
                            reviewComments: [
                                { commenterIcon: UserIcon, commenterName: 'Beyza', commentText: 'That is amazing!', commentDate: '20.04.2021'},
                                { commenterIcon: UserIcon, commenterName: 'Mert', commentText: 'Good Job', commentDate: '21.04.2021'},
                                { commenterIcon: UserIcon, commenterName: 'Sena', commentText: 'Wow', commentDate: '22.04.2021'},
                                { commenterIcon: UserIcon, commenterName: 'Nehir', commentText: 'Wow', commentDate: '22.04.2021'},
                                { commenterIcon: UserIcon, commenterName: 'Ayse', commentText: 'Wow', commentDate: '22.04.2021'}
                            ]
                        }
                    ]
                }

    let user = {
        userName:'Abdurrahman ODABAŞI',
        userID:'123456',
        userIcon: UserIcon
    }
    return(
        <div>
            <NavbarWithUser userName="Abdurrahman" />
            <PageContainer>
                <ViewBook book={book} user={user} />
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default ViewBookPage;