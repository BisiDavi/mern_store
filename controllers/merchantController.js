import asyncHandler from 'express-async-handler';

// @desc    Get merchant profile
// @route   GET /api/merchant/payment
// @access  Private
const merchantSubscription = asyncHandler(async (req, res) => {
  request(
    { url: 'https://api.flutterwave.com/v3/payments' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }
      res.json(JSON.parse(body));
    }
  );
});
export { merchantSubscription };
