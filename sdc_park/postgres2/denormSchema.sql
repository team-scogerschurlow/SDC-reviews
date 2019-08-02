CREATE TABLE denorm (
  id SERIAL PRIMARY KEY,
  reviewer_id INTEGER NOT NULL,
  reviewer_title VARCHAR NOT NULL,
  reviewer_picture VARCHAR NOT NULL,
  listing_id INTEGER NOT NULL,
  listing_name VARCHAR NOT NULL,
  date VARCHAR NOT NULL,
  body VARCHAR NOT NULL,
  overall_rating FLOAT NOT NULL,
  accuracy_rating FLOAT NOT NULL,
  communication_rating FLOAT NOT NULL,
  cleanliness_rating FLOAT NOT NULL,
  location_rating FLOAT NOT NULL,
  checkin_rating FLOAT NOT NULL,
  value_rating FLOAT NOT NULL
);

-- \COPY reviewsgiven FROM '/Users/pwrmvs/SDC-reviews/sdc_park/postgres/reviewsgiven.csv' DELIMITER ',' CSV HEADER;
