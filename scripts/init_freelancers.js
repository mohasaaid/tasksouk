const { Pool } = require('pg');

// Database connection configuration
const pool = new Pool({
  user: 'tasksouk',
  host: 'localhost',
  database: 'TaskServiceDB',
  password: 'tasksouk',
  port: 5432,
});

const freelancers = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    skills: "Plumbing, Electrical",
    ratings: 4.5,
    location: "Downtown",
    availability: true,
    profile_picture: "http://example.com/images/johndoe.jpg",
    bio: "Experienced handyman skilled in plumbing and electrical work."
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "0987654321",
    skills: "Landscaping, Gardening",
    ratings: 4.7,
    location: "Suburb",
    availability: true,
    profile_picture: "http://example.com/images/janesmith.jpg",
    bio: "Professional landscaper and gardener with 10 years of experience."
  },
  // Additional freelancers can be added here
];

const initDb = async () => {
  try {
    // Connects to the database
    await pool.connect();  
    console.log("Connected to the database.");

    // Inserts freelancers
    for (const freelancer of freelancers) {
      await pool.query(
        'INSERT INTO freelancers (name, email, phone, skills, ratings, location, availability, profile_picture, bio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [freelancer.name, freelancer.email, freelancer.phone, freelancer.skills, freelancer.ratings, freelancer.location, freelancer.availability, freelancer.profile_picture, freelancer.bio]
      );
    }
    console.log('Freelancers table has been initialized with mock data.');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    // Closes the database connection
    await pool.end();
    console.log("Database connection closed.");
  }
};

initDb();
