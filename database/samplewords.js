const loremIpsum = require("lorem-ipsum").loremIpsum;

var reviewString1 = `The house has two floors and a terrace from which to admire "Sierra Nevada". The ground floor loft has a fully equipped kitchen with refrigerator microwave, dishwasher, kitchen utensils, everything needed for cooking. On this floor there is also a full bathroom, lounge / dining room with a sofa and a bio-heater. Upstairs has two bedrooms, one with double bed and one with two beds of 105 cm and if needed a spare bed of 90 cm, both with bathroom inside the rooms. All rooms have a heat pump and air conditioning.
Free WIFI in the rooms 24h. Outside there is a large courtyard and portable barbecue . The car can be left inside the house. It is located in a small town near the center of Granada (Churriana de la Vega, about 15 minutes by car and bus connection to downtown. Enjoy the tranquility of a small town or head to Granada (La Alhambra y el Albaicin), the mountains at 38 Km or the beaches at 50 km.`

var reviewString2 = `It is a nice and comfortable small apartment located in the city centre. Next to Plaza Nueva, the most famous square of the old part of the town. It has a fantastic terrace with wonderful views to the Alhambra. Free parking is not at the apartment .
The space It is a nice and comfortable small apartment located in the city centre. Next to Plaza Nueva, the most famous square of the old part of the town. It has a fantastic terrace with wonderful views to the Alhambra. It has a bedroom with a double bed for two people. The living room has a wooden kitchen next to a balcony and It also has a doble bed . The two part of the house have a wooden roof what will make you feel deep into a worm environment when you are at home. The apartment also has a bathroom It also has a window with fabulous views to the old city. There are a lot of tapas bars and restaurants in this area. It is closed to the shopping area too. You will find the the Alhambra bus stop just one minute from the apartment, just in Plaza Nueva Square.
The terrace also has a lot of plants what will meke you feel lost in thebest environment .
Guest access buses and taxi and foot. The apartment location is the best in the city. You would need necessary vehicle to move from one site to another Interaction with guests As much as I can . probably 24 hours to garantiee confidence to my guests Other things to note
The private parking is 3 km far from the apartment but just from there you can get the buses number SN1,SN2 and N4 to reach the (Website hidden by Airbnb) have to get off these buses in the middle of the way and get the eco-friendly bus called LAC to go to the old city centre where the apartment is located`;

var titleSamples = `The World Famous Seashell House ~ Casa Caracol Secluded Intown Treehouse Secluded Intown Treehouse Stunning All Bamboo House on Pristine Valley edge Romantic, Lakeside Home with Views of Lake Como Séjour Superb duplex apartment in the historical centre Villa Amonteera, Luxury with Fantastic Ocean Views Vacation house in etno-eco village Humac Luxury 2BR villa- walk to beach and restaurants Modern Eclectic Apartment within a 12th-Century Monastery`;

var titleWords = titleSamples.split(' ');

const createReviewWords = () => {
    var array1 = reviewString1.split(' ');
    var array2 = reviewString2.split(' ');
    return array1.concat(array2);
}

const generateListings = (inputNum) => {
    
    var output = []
    var randomLength= () =>{ return Math.floor(Math.random()*Math.floor(6)+2) }
    for(var i  = 0; i < inputNum; i++){
        output.push({
            id: i+1,
            title: loremIpsum({
                count: randomLength(),                // Number of "words", "sentences", or "paragraphs"
                format: "plain",         // "plain" or "html"
                paragraphLowerBound: 3,  // Min. number of sentences per paragraph.
                paragraphUpperBound: 7,  // Max. number of sentences per paragarph.
                random: Math.random,     // A PRNG function
                sentenceLowerBound: 5,   // Min. number of words per sentence.
                sentenceUpperBound: 15,  // Max. number of words per sentence.
                suffix: "\n",            // Line ending, defaults to "\n" or "\r\n" (win32)
                units: "words",      // paragraph(s), "sentence(s)", or "word(s)"       
                words: titleWords // Array of words to draw from
                })
        });
    }
    return output;
}

var listings = generateListings(101); 

var reviewWords = createReviewWords();


module.exports.reviewWords = reviewWords; 
module.exports.listings = listings;

