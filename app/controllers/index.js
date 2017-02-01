/**
 * GET /
 * Index page.
 */
exports.index = (req, res) => {
  return res.status(200).json({ message: 'Hello CTO :)' })
}
