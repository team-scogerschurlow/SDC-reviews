CREATE TABLE reviewsgiven (
  id SERIAL PRIMARY KEY,
  reviewer_id INTEGER REFERENCES users(id),
  listing_id INTEGER REFERENCES listings(id),
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