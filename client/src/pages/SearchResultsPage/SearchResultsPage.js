import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import SearchResults from '../../containers/SearchResults/SearchResults';

import PageContainer from '../../components/PageContainer/PageContainer';


const SearchResultsPage = (props) => {
    return(
        <div>
            <NavbarWithUser />
            <PageContainer>
                <SearchResults searchedBook={props.location.state.searchedBook} />
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default SearchResultsPage;