// controllers/feedbacksystemController.js
const pool = require('../config/db');

const feedbacksystemController = {
  data: async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT id , star_rating, person_name, feedback FROM feedback_info WHERE deleted_at IS NULL ORDER BY created_at DESC"
      );

      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: 'Data fetched successfully',
          data: result.rows
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'No data found'
        });
      }
    } catch (error) {
      console.error('❌ Query error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error'
      });
    }
  }
};

module.exports = feedbacksystemController;
