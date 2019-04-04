import React from 'react';



const buttonStyle = {
    height: "1em",
    width: "1em",
    display: "block",
    fill: 'rgb(0, 132, 137)'
};
const forwardButton = 
<button className = "nav-button" type="button" aria-busy="false">
    <div>
        <div>
            <svg viewBox="0 0 18 18" role="img" aria-label="Next" focusable="false"  style={buttonStyle}>
                <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path>
            </svg>
        </div>
    </div>
</button> ;

const backbutton = 
<button className = "nav-button" type="button" aria-busy="false">
    <div>
        <div>
            <svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false" style={buttonStyle}>
                <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path>
            </svg>
        </div>
    </div>
</button> ;

class PageNavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            atBeginning: true,
            atEnd: false,
            currentPage: 0
        }

        this.goForwardClick = this.goForwardClick.bind(this);
        this.goBackClick = this.goBackClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
       var currentPage = e.target.value;
       this.props.nextPage(currentPage+1);
       var NumberOfPages = Math.floor(this.props.reviewCount/10);
       if(currentPage === 0){
           var atBeginning = true;
       } else{ atBeginning = false}
       if(currentPage === NumberOfPages){
            var atEnd = true
       } else{ atEnd = false}
       this.setState({
           currentPage: currentPage,
           atBeginning: atBeginning,
           atEnd: atEnd
       })
    }

    goBackClick(){
        this.props.nextPage(this.state.currentPage);
        this.setState({
            currentPage: this.state.currentPage-1,
            atBeginning: this.state.currentPage-1 === 0,
            atEnd: false
        })
    }

    goForwardClick(){
        this.props.nextPage(this.state.currentPage+2);
        this.setState({
            currentPage: this.state.currentPage+1,
            atBeginning: false,
            atEnd: (Math.floor(this.props.reviewCount/10))/(this.state.currentPage+1) === 1
        })
    }

    componentWillMount(){
        if(this.props.reviewCount< 11){
            this.setState({
                atBeginning: true,
                atEnd: true
            })
        }
    }

    render(){
        const createPages = (numberOfReviews, func)=>{
            var output = [];
            var NumberOfPages = numberOfReviews/10;
            for(var i =0; i <= NumberOfPages; i++){
                output.push(
                    <li id={this.state.currentPage === i ? 'active': ''}className= "one-page-of-reviews" onClick= {func} value = {i} key = {i}>{i+1}</li>
                )
            }
            return output;
        }

        return (
            <div className = "reviews-nav-bar">
                <ul className = "pages-of-reviews">
                    {!this.state.atBeginning &&
                        <li id= "back-button" onClick = {this.goBackClick}>{backbutton}</li>
                    }
                    {createPages(this.props.reviewCount,(e)=>{this.handleClick(e)})}
                    {!this.state.atEnd &&
                        <li id= "forward-button" onClick ={this.goForwardClick}>{forwardButton}</li>
                    }
                </ul>
            </div>
        );
    }
}

export default PageNavBar;