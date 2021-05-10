import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import SearchResults from '../../containers/SearchResults/SearchResults';

import ThumbnailTest from "../../assets/images/thumbnailtest.png"


const SearchResultsPage = (props) => {
    let books = [ 
                    {bookName:'Book 9' , bookAuthor:'Bookiew Inc.' , bookThumbnail:ThumbnailTest },
                    {bookName:'Book 2' , bookAuthor:'AB' , bookThumbnail:ThumbnailTest },
                    {bookName:'Book 7' , bookAuthor:'CS' , bookThumbnail:ThumbnailTest },
                    {bookName:'Book 4' , bookAuthor:'DE' , bookThumbnail:ThumbnailTest },
                    {bookName:'Book 5' , bookAuthor:'FH' , bookThumbnail:ThumbnailTest },
                    {bookName:'Book 6' , bookAuthor:'GI' , bookThumbnail:ThumbnailTest },
                    {bookName:'Book 3' , bookAuthor:'JL' , bookThumbnail:ThumbnailTest },
                    {bookName:'Book 8' , bookAuthor:'KM' , bookThumbnail:ThumbnailTest },
                    {bookName:'Book 1' , bookAuthor:'NS' , bookThumbnail:ThumbnailTest },
    ]
    
    return(
        <div>
            <NavbarWithUser userName="Abdurrahman" />
            <SearchResults books={books} />
            <MiniFooter />
        </div>
    );
}


export default SearchResultsPage;