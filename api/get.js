const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const { number } = req.query;

  if (!number) {
    return res.status(400).json({
      success: false,
      error: 'Parameter number required'
    });
  }

  const sanitizedNumber = number.replace(/\D/g, '');
  const filePath = path.join(process.cwd(), 'list', `${sanitizedNumber}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      error: 'Session not found'
    });
  }

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    return res.status(200).json({
      success: true,
      number: sanitizedNumber,
      session: data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Invalid session file'
    });
  }
};