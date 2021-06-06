import React from "react";

const style = {
    width: '100%',
    minHeight: '100%',
    padding: '7.5vh 0 0 0',
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

const PageContainer = (props) => {
    return <div style={style}>{props.children}</div>;
}

export default PageContainer;