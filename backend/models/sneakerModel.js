// backend/models/sneakerModel.js
const sql = require('../db/db');

const getSneakerById = async (id) => {
  try {
    const sneaker = await sql`
      SELECT id, name, brand, description, image_url_1, image_url_2, image_url_3, image_url_4, stock_quantity
      FROM sneakers 
      WHERE id = ${id}
    `;

    if (sneaker.length === 0) {
      throw new Error('Sneaker not found');
    }

    return sneaker[0];
  } catch (error) {
    throw error;
  }
};

const getSneakerSizes = async (id) => {
  try {
    const sizes = await sql`
      SELECT size, price, stock_quantity 
      FROM sneaker_sizes 
      WHERE sneaker_id = ${id}
    `;

    return sizes;
  } catch (error) {
    throw error;
  }
};

const getAllSneakers = async () => {
  try {
    const sneakers = await sql`
      SELECT s.id, s.name, s.brand, s.image_url_1, s.stock_quantity,
             (SELECT MIN(price) FROM sneaker_sizes WHERE sneaker_id = s.id) as min_price
      FROM sneakers s
    `;
    return sneakers;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getSneakerById,
  getSneakerSizes,
  getAllSneakers,
};