import React from 'react';
import Moment from 'moment';

const createIntroduction = (text) =>{
    var halfToHide = text.slice(270,text.length); 
    var characterToCutOn = 270 + halfToHide.indexOf(' ');
    var output = text.slice(0,characterToCutOn);
    return output;
}

class Reviews extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            clicked: true,
            intro: ''
        }
    }

    showFullReview(){
        this.setState({
            clicked: true,
        })
        this.render();
    }

    componentWillMount(){
        if(this.props.body.length > 270){
            var introduction = createIntroduction(this.props.body);
            this.setState({
                clicked: false,
                intro: introduction
            });
        }

        
    }

    render () {
        var reviewText = '';
        if(this.state.clicked === false){
            reviewText = 
            <p className = "review-body">
            {this.state.intro}...
            <a className = "read-more-button" onClick = {()=>this.showFullReview()}>Read More</a> 
            </p>
        } else {
            reviewText = 
            <p className = "review-body">
            {this.props.body}
            </p>
        }
        return(
        <div className= "review-container">
            <div className = "review-header">
                <img className = "reviewer-profile-pic" src = {this.props.profilePic}></img>
                <div className = "review-header-details">
                    <h3 className= "reviewer">{this.props.username}</h3>
                    <p className= "date-given">{Moment(this.props.date).format('MMMM YYYY')}</p>
                </div>
 
            </div>
            {reviewText}
        </div>
        )
    }
}

export default Reviews;