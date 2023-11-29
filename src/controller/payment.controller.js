import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET, HOST, PAYPAL_API } from "../config.js";

export const createOrder = async (req, res) => {
  try {
    const formData = req.body.formData;
    console.log(formData);
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "40",
          },
          shipping: {
            name: {
                full_name: formData.firstname + "" + formData.lastname,
            },
            email_address: 'customer@example.com',
            address: {
                address_line_1: formData.address1,
                address_line_2: formData.address,
                admin_area_2: 'Phoenix',
                admin_area_1: 'AZ',
                postal_code: '85001',
                country_code: 'US'
            }
        },
        },
      ],
      application_context: {
        user_action: "PAY_NOW",
        return_url: `${HOST}/onapprove`,
        cancel_url: `${HOST}/cancel-order`,
      },
    };

    // format the body
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    // Generate an access token
    const {
      data: { access_token },
    } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.CLIENT_ID,
          password: process.env.CLIENT_SECRET,
        },
      }
    );

    console.log(access_token);

    // request
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log(response.data);

    return res.json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something goes wrong");
  }
};

export const onApprove = async (req, res) => {
  const { token } = req.query;

  try {
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: process.env.CLIENT_ID,
          password: process.env.CLIENT_SECRET,
        },
      }
    );
console.log(token);
    console.log(response.data);

    res.redirect("/success.html");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const cancelOrder = (req, res) => res.redirect("/");