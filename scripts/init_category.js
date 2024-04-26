const { Pool } = require('pg');

// Database connection configuration
const pool = new Pool({
  user: 'tasksouk',
  host: 'localhost',
  database: 'TaskServiceDB',
  password: 'tasksouk',
  port: 5432,
});

const categories = [
  { name: 'Furniture Assembly', description: 'Assembly of furniture, including beds, desks, and shelves.' },
  { name: 'TV Mounting', description: 'Secure TV mounting to various wall materials.' },
  { name: 'Cleaning', description: 'General house cleaning services.' },
  { name: 'Electrical Help', description: 'Minor electrical services such as fixing switches and installing home appliances.' },
  { name: 'Moving Help', description: 'Help with moving houses including packing and heavy lifting.' },
  { name: 'Yard Work', description: 'Gardening and other yard maintenance services.' },
];

const initDb = async () => {
  try {
    await pool.connect();  // ensures that the pool starts up and connects
    await Promise.all(categories.map(category => {
      return pool.query(
        'INSERT INTO categories (name, description) VALUES ($1, $2)',
        [category.name, category.description]
      );
    }));
    console.log('Database has been initialized with mock data.');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    await pool.end();  // closes connection
  }
};

initDb();
