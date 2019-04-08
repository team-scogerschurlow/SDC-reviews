import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Reviews from './components/Reviews.jsx'
import Stars from './components/Stars.jsx'
import PageNavBar from './components/PagesOfReviews.jsx'
require('./style.css')

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
const getListingId = (url) =>{
   var listingEnding = url.slice(-4).split('');
   listingEnding = listingEnding.filter( (element) => element != '/');
   listingEnding = listingEnding.join('')
   return Number(listingEnding)
}
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listing: getListingId(document.URL),
            reviews: [],
            totalReviews: 0,
            offset: 0,
            searchTerm: '',
            termSearched: '',
            searchResults: 0,
            hasSearched: false,
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
        this.loadAllReviews = this.loadAllReviews.bind(this);
        this.searchTermUpdate = this.searchTermUpdate.bind(this);
        this.submitSearchTerm = this.submitSearchTerm.bind(this);
        this.loadMoreReviews = this.loadMoreReviews.bind(this);
    }

    submitSearchTerm(e){
        e.preventDefault();
        axios.get(`/listings/${this.state.listing}/reviews?search=${this.state.searchTerm}`).then( (result)=> {
            this.setState({
                termSearched: this.state.searchTerm,
                hasSearched: true,
                reviews: result.data.reviews,
                searchResults: result.data.searchCount
            });
        })
    }

    searchTermUpdate(e){
        var query = e.target.value;
        this.setState({
            searchTerm: query
        })
    }

    loadMoreReviews(offset){
        if(this.state.hasSearched === false){
            axios.get(`/listings/${this.state.listing}/page?offset=${offset}`)
            .then( (result)=>{
                this.setState({
                    reviews: result.data.reviews
                })
            })
        }

        if(this.state.hasSearched === true){
            axios.get(`/listings/${this.state.listing}/page?offset=${offset}&search=${this.state.termSearched}`)
            .then( (result)=>{
                this.setState({
                    reviews: result.data.reviews
                })
            })
        }
    }

    loadAllReviews(){
        this.setState({
            hasSearched: false,
        })
        axios.get(`/listings/${this.state.listing}`).then( (result)=> {
            var ratingsSummary = findRatingsAverage(result.data.reviews);
             this.setState({
                reviews: result.data.reviews,
                ratings: ratingsSummary,
                totalReviews: result.data.reviewCount
             })
        });
    }

    componentWillMount(){
        this.loadAllReviews();
    }


    render() {
        return (
            <div className = "reviews-container">
                <div className = "listings-reviews-header">
                    <div className = "reviews-overview">
                        <h2> {this.state.totalReviews} Reviews </h2>
                        <Stars starCount = {this.state.ratings.overall_rating}/>
                    </div>
                    <form className= "search-form" onSubmit= {this.submitSearchTerm}>
                        <input placeholder= "Search Reviews" type= "text" onChange ={(e)=> this.searchTermUpdate(e)} onSubmit ={this.submitSearchTerm}></input>
                    </form>
                </div>
                {!this.state.hasSearched &&
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
                }
                {this.state.hasSearched && 
                <div className = "searchSummary">
                    <p>{this.state.searchResults} guests have mentioned "{this.state.termSearched}"</p>
                    <p className = "exit-search" onClick= {this.loadAllReviews}>Back to all reviews</p>
                </div>
                }
                <ul className = 'reviews-given'>
                {this.state.reviews.map((review)=> {
                    return <Reviews body= {review.body} username = {review.username} key = {review.id} profilePic = {review.profilePic} date = {review.date}/>
                })}
                </ul>
                {!this.state.hasSearched && 
                    <PageNavBar className = "page-nav-no-search" reviewCount = {this.state.totalReviews} nextPage = {this.loadMoreReviews}/> 
                }
                {this.state.hasSearched && 
                    <PageNavBar className = "search-nav" reviewCount = {this.state.searchResults} nextPage = {this.loadMoreReviews}/> 
                }
            </div>
        )
    }
}

export default App;