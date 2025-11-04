PUTRA VOUCER - Deployment & Payment Integration Guide

What this package contains:
- Frontend (index.html, admin.html, CSS, JS) that calls a simple Express server
- server.js: demo Express server that creates orders and stores them in orders.json
- /api/create-order -> create order and (demo) return payment_url or virtual_account
- /api/webhook -> endpoint to receive payment gateway notifications (simulate)
- /api/admin/settle -> admin confirms and delivers topup to user

To make REAL payments work:
1. Choose a payment gateway that supports Indonesia (Midtrans, Xendit, iPaymu, etc).
2. Create a merchant account and get API keys (server key / client key).
3. Replace the simulation block in server.js (/api/create-order) with calls to the gateway SDK/API.
   - For Midtrans: use midtrans-client npm package, create a transaction/snap token and return redirect URL.
   - For Xendit: call createInvoice or createVA endpoints as needed.
4. Configure your gateway to call /api/webhook on payment updates (use public HTTPS URL).

Admin withdraw (Tarik):
- In real flow, funds go to your merchant account (gateway/partner) automatically.
- "Tarik" (withdraw) to bank means: log in to payment gateway dashboard and request payout to your bank.
- The admin UI in this demo allows admin to 'settle' an order (mark paid and deliver topup).
- To automate: when webhook marks order 'paid', call game topup API and mark settled automatically.

Security & Production notes:
- Do NOT store keys in code. Use environment variables.
- Use HTTPS and verify webhook signatures.
- Use a real database (MySQL/MongoDB) instead of a JSON file for concurrency and reliability.
