import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import Flutterwave from 'flutterwave-node-v3';
import open from 'open';
import { v4 as uuidv4 } from 'uuid';
import request from 'request';

dotenv.config();

// @desc    Get merchant profile
// @route   GET /api/merchant/payments
// @access  Private
const merchantSubscription = asyncHandler(async (req, res) => {
  request(
    {
      url: 'https://api.flutterwave.com/v3/payments'
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }
      res.json(JSON.parse(body));
    }
  );
});
// @desc    Get merchant profile
// @route   GET /api/merchant/makepayments/card
// @access  Private
const makePayment = asyncHandler(async (req, res) => {
  request(
    {
      url: 'https://api.flutterwave.com/v3/charges?type=card'
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }
      res.json(JSON.parse(body));
    }
  );
  const {
    card_number,
    cvv,
    expiry_month,
    expiry_year,
    currency,
    amount,
    fullname,
    email,
    phone_number
  } = req.body;

  const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);

  const payload = {
    card_number: card_number,
    cvv: cvv,
    expiry_month: expiry_month,
    expiry_year: expiry_year,
    currency: currency,
    amount: amount,
    redirect_url:
      'https://mernstore-frontend-git-main.bisidavi.vercel.app/merchant-approval-payment',
    fullname: fullname,
    email: email,
    phone_number: phone_number,
    enckey: process.env.ENCRYPTION_KEY,
    tx_ref: uuidv4()
  };

  const chargeCard = async () => {
    try {
      const response = await flw.Charge.card(payload);
      console.log(response);
      if (response.meta.authorization.mode === 'pin') {
        let payload2 = payload;
        payload2.authorization = {
          mode: 'pin',
          fields: ['pin'],
          pin: 3310
        };
        const reCallCharge = await flw.Charge.card(payload2);

        const callValidate = await flw.Charge.validate({
          otp: '12345',
          flw_ref: reCallCharge.data.flw_ref
        });
        console.log(callValidate);
      }
      if (response.meta.authorization.mode === 'redirect') {
        var url = response.meta.authorization.redirect;
        open(url);
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  chargeCard();
});

export { merchantSubscription, makePayment };
