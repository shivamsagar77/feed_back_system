const pool = require('../config/db');

const feedbacksystemController = {
  // GET
  data: async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT id, star_rating, person_name, feedback FROM feedback_info WHERE deleted_at IS NULL ORDER BY created_at DESC"
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
  },

  // POST
  postData: async (req, res) => {
    try {
      const { star_rating, person_name, feedback } = req.body;
console.log(req.body)
      await pool.query(
        "INSERT INTO feedback_info (star_rating, person_name, feedback) VALUES ($1, $2, $3)",
        [star_rating, person_name, feedback]
      );

      res.status(201).json({
        success: true,
        message: 'Feedback added successfully'
      });

    } catch (error) {
      console.error('❌ Insert error:', error);
      res.status(500).json({
        success: false,
        message: 'Error adding feedback'
      });
    }
  },

  // PUT (Update)
  updateData: async (req, res) => {
    try {
      const { id } = req.params;
      const { star_rating, person_name, feedback } = req.body;

      await pool.query(
        "UPDATE feedback_info SET star_rating = $1, person_name = $2, feedback = $3, updated_at = NOW() WHERE id = $4",
        [star_rating, person_name, feedback, id]
      );

      res.status(200).json({
        success: true,
        message: 'Feedback updated successfully'
      });

    } catch (error) {
      console.error('❌ Update error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating feedback'
      });
    }
  },

  // DELETE (Soft Delete)
  deleteData: async (req, res) => {
    try {
      const { id } = req.params;

      await pool.query(
        "UPDATE feedback_info SET deleted_at = NOW() WHERE id = $1",
        [id]
      );

      res.status(200).json({
        success: true,
        message: 'Feedback deleted successfully'
      });

    } catch (error) {
      console.error('❌ Delete error:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting feedback'
      });
    }
  }
};

module.exports = feedbacksystemController;
