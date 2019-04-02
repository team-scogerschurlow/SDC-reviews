import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Reviews from './components/Reviews.jsx'
import Stars from './components/Stars.jsx'

const findRatingsAverage = (array)=> {
    var output = {}
    function roundHalf(num) {
        return Math.round(num*2)/2;
    }
    array.forEach( (review) => {
        for(var key in review){
            var desiredFields = 
                [
                "overall_rating",
                "accuracy_rating",
                "communication_rating",
                "cleanliness_rating",
                "location_rating",
                "checkin_rating",
                "value_rating"
            ];
            if(desiredFields.includes(key)){
                if (output[key] === undefined) { output[key] = review[key] } else {
                    output[key]+= review[key];
                }
            }
        }
    });
    for(var key in output){
        output[key] = roundHalf(output[key]/array.length)
    }
    return output; 
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listing: Number(document.URL.slice(-3).slice(0,2)),
            reviews: [],
            search: '',
            ratings: {
                overall_rating: 5,
                accuracy_rating: 5,
                communication_rating: 5,
                cleanliness_rating: 5,
                location_rating: 5,
                checkin_rating: 5,
                value_rating: 5
            }
        }
        this.searchTermUpdate = this.searchTermUpdate.bind(this);
        this.submitSearchTerm = this.submitSearchTerm.bind(this)
    }

    submitSearchTerm(e){
        e.preventDefault();
        console.log(this.state.search)
    }

    searchTermUpdate(e){
        var query = e.target.value;
        this.setState({
            search: query
        })
    }

    componentWillMount(){
        axios.get(`/api/${this.state.listing}`).then( (result)=> {
            var ratingsSummary = findRatingsAverage(result.data);
             this.setState({
                reviews: result.data,
                ratings: ratingsSummary
             })
        });
    }


    render() {
        return (
            <div className = "reviews-container">
                <div className = "listings-reviews-header">
                    <div className = "reviews-overview">
                        <h2> {this.state.reviews.length} Reviews </h2>
                        <Stars starCount = {this.state.ratings.overall_rating}/>
                    </div>
                    <form className= "search-form" onSubmit= {this.submitSearchTerm}>
                        <input placeholder= "Search Reviews" type= "text" onChange ={(e)=> this.searchTermUpdate(e)} onSubmit ={this.submitSearchTerm}></input>
                    </form>
                </div>
                <div className = "rating-breakdown">
                    <div className = "ratings-left">
                        <div id = "Accuracy-rating" className = "ratings-detail">
                            <h3>Accuracy</h3>
                            <Stars starCount = {this.state.ratings.accuracy_rating}/>
                        </div>
                        <div id = "Communication-rating" className = "ratings-detail">
                            <h3>Communication</h3>
                            <Stars starCount = {this.state.ratings.communication_rating}/>
                        </div>
                        <div id = "Accuracy-rating" className = "ratings-detail">
                            <h3>Cleanliness</h3>
                            <Stars starCount = {this.state.ratings.cleanliness_rating}/>
                        </div>
                    </div>
                    <div className = "ratings-right">
                        <div id = "Accuracy-rating" className = "ratings-detail"> 
                            <h3>Location</h3>
                            <Stars starCount = {this.state.ratings.location_rating}/>
                        </div>
                        <div id = "Communication-rating" className = "ratings-detail">
                            <h3>Check-in</h3>
                            <Stars starCount = {this.state.ratings.checkin_rating}/>
                        </div>
                        <div id = "Accuracy-rating" className = "ratings-detail">
                            <h3>Value</h3>
                            <Stars starCount = {this.state.ratings.value_rating}/>
                        </div>
                    </div>
                </div>
                <ul className = 'reviews-given'>
                {this.state.reviews.map((review)=> {
                    return <Reviews body= {review.body} username = {review.username} key = {review.id} profilePic = {review.profilePic} date = {review.date}/>
                })}
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('reviews'));