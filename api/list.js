const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    const listDir = path.join(process.cwd(), 'list');
    
    if (!fs.existsSync(listDir)) {
      return res.status(200).json({
        success: true,
        count: 0,
        sessions: []
      });
    }

    const files = fs.readdirSync(listDir);
    const sessions = files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''))
      .sort();

    return res.status(200).json({
      success: true,
      count: sessions.length,
      sessions: sessions
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};