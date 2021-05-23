import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import ViewReview from '../../containers/ViewReview/ViewReview';

//import ThumbnailTest from "../../assets/images/thumbnailtest.png"
//import UserIcon from "../../assets/icons/user.png";
import PageContainer from '../../components/PageContainer/PageContainer';

const ViewReviewPage = (props) => {
    /*let review = {  bookName:'Book 1' ,
                    bookAuthor:'Bookiew Inc.' ,
                    bookThumbnail:ThumbnailTest,
                    reviewText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
                    reviewerIcon: UserIcon,
                    reviewerName:'Abdurrahman ODABAŞI',
                    reviewDate:'20.04.2021',
                    reviewRating: '4.3',
                    reviewComments: [
                        { commenterIcon: UserIcon, commenterName: 'Batoul', commentText: 'That is amazing!', commentDate: '20.04.2021'},
                        { commenterIcon: UserIcon, commenterName: 'Mahasin', commentText: 'Good Job', commentDate: '21.04.2021'},
                        { commenterIcon: UserIcon, commenterName: 'Sena', commentText: 'Wow', commentDate: '22.04.2021'}
                    ]                 
                }*/
    
    return(
        <div>
            <NavbarWithUser userName="Abdurrahman" />
            <PageContainer>
                <ViewReview review={props.location.state.review} book={props.location.state.book}/>
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default ViewReviewPage;