# Stripe Checkout Backend

This is a simple Express backend for handling Stripe Checkout sessions. It provides endpoints to create a custom Stripe Checkout session and to retrieve the status of a session. The backend is configured to work with a frontend hosted at `http://localhost:5173`.

## Features

- Create Stripe Checkout sessions for custom items
- Retrieve payment and session status
- CORS enabled for frontend integration
- Environment variable support via `.env`

## Requirements

- Node.js (v16+ recommended)
- Stripe account (for API keys)

## Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/your-username/stripe-checkout-backend.git
   cd stripe-checkout-backend
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory (see `.env.example` or below):

   ```
   STRIPE_PUBLISHABLE_KEY=your_publishable_key
   STRIPE_SECRET_KEY=your_secret_key
   YOUR_DOMAIN=http://localhost:5173
   ```

4. **Start the server**

   ```sh
   node app.js
   ```

   The server will run on `http://localhost:4242`.

## API Endpoints

### `POST /create-checkout-session`

Creates a new Stripe Checkout session.

- **Request Body:**
  ```json
  {
    "items": [
      {
        "name": "Product Name",
        "price": 1000, // in dollars
        "quantity": 1
      }
    ]
  }
  ```
- **Response:**
  ```json
  {
    "clientSecret": "..."
  }
  ```

### `GET /session-status?session_id=...`

Retrieves the status of a Stripe Checkout session.

- **Response:**
  ```json
  {
    "status": "...",
    "payment_status": "...",
    "payment_intent_id": "...",
    "payment_intent_status": "..."
  }
  ```

## License

ISC
