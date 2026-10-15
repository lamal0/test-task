# Test Task

## Task

### Part 1 (Frontend)

Create a responsive product home page:
- There are a simple header and a hero banner
- Hero banner contains a product image, title, text and button
- Hero button opens the modal ("Get notified when this item is available for purchase")
- Modal contains a title, close button, email input and submit button
  - Submission is possible only when a valid email is entered
  - After submission page shows an appropriate success or error notification

You may use the Apple iPhone page as inspiration - https://www.apple.com/iphone-17e

A pixel-perfect reproduction is not required. You may also choose a different product and create your own design.

The page must be fully responsive and usable on:
- Mobile: 440px, 640px
- Tablet: 768px, 992px
- Desktop: 1024px, 1920px

### Part 2 (Backend)

Create a simple API to accept a POST request from Part 1 modal:
- This endpoint validates email, stores the email address and returns a proper HTTP status code and JSON response
- If an email address has already been submitted, the API returns an appropriate error response to the user.
- API stores the list of subscribers in a database

## Result

- Provide a link to a public GitHub repository
- Repository must include a README.md file with instructions on how to run the app

## Tech stack

- HTML
- CSS (Tailwind is acceptable)
- JS
- PHP
- MySQL (MariaDB or SQLite are acceptable)

You're free to use any frameworks, libraries or AI tools.

You're free to make reasonable implementation and design decisions that are not explicitly specified above.
