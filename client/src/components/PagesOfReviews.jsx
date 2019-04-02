import React from 'react';

const createPages = (numberOfReviews, func)=>{
    var output = [];
    var NumberOfPages = numberOfReviews/10;
    for(var i =0; i <= NumberOfPages; i++){
        output.push(
            <li className= "one-page-of-reviews" onClick= {func()} value = {i+1} key = {i}>{i+1}</li>
        )
    }
    return output;
}

class PageNavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            atBeginning: true,
            atEnd: false
        }
    }

    render(){
        return (
            <div className = "reviews-nav-bar">
                <ul className = "pages-of-reviews">
                    {createPages(this.props.reviewCount,this.props.nextPage)}
                </ul>
            </div>
        );
    }
}

export default PageNavBar;