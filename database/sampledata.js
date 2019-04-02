const loremIpsum = require("lorem-ipsum").loremIpsum;
const users = require('./sampleusers');
const words = require('./samplewords');

const generateReviews = () => {
    //generate random word count 
    const randomWordCount = () => {
        return Math.floor(Math.random() * Math.floor(200)+6)
    }
    //generate a random review date between 2016 and 2018
    const randomDate = () => {
        var start = new Date(2016, 0, 1);
        var end = new Date();
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    const createRandomReview = () => {
        let weightedRatings = [1, 1.5, 2,2.5, 3, 3.5, 3.5, 4, 4, 4, 4, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 5, 5, 5, 5, 5,5]
        var randomIndex = Math.floor(Math.random() * Math.floor(weightedRatings.length-1))
        return weightedRatings[randomIndex];
    }

    const generateReviewBody = ()=> {
        return (
            loremIpsum({
            count: randomWordCount(),                // Number of "words", "sentences", or "paragraphs"
            format: "plain",         // "plain" or "html"
            paragraphLowerBound: 3,  // Min. number of sentences per paragraph.
            paragraphUpperBound: 7,  // Max. number of sentences per paragarph.
            random: Math.random,     // A PRNG function
            sentenceLowerBound: 5,   // Min. number of words per sentence.
            sentenceUpperBound: 15,  // Max. number of words per sentence.
            suffix: "\n",            // Line ending, defaults to "\n" or "\r\n" (win32)
            units: "words",      // paragraph(s), "sentence(s)", or "word(s)"       
            words: words.reviewWords // Array of words to draw from
            })
        )
    };

    const assignRandomUser = ()=> {
        var randomIndex = Math.floor(Math.random() * Math.floor(users.length-2))+1
        return randomIndex;
    }
    const createUsersReview = (listingID) => {
        var review = {}
        review = {
            reviewer: assignRandomUser(),
            listing: listingID,
            date: randomDate(),
            body: generateReviewBody(),
            overall_rating: createRandomReview(),
            accuracy_rating: createRandomReview(),
            communication_rating: createRandomReview(),
            cleanliness_rating: createRandomReview(),
            location_rating: createRandomReview(),
            checkin_rating: createRandomReview(),
            value_rating: createRandomReview()
        };
        return review;
    }
    var output = [] 
    for(var j = 0; j < words.listings.length; j++ ){
        var randomNumberOfReviews = Math.floor(Math.random() * Math.floor(30))
        for(var i = 0; i < randomNumberOfReviews; i++){
           output.push(createUsersReview(words.listings[j].id));
        }
    };
    return output; 
}

var reviewsToImport = generateReviews ();
// console.log(reviewsToImport.map(e => e.reviewer));
module.exports = reviewsToImport;