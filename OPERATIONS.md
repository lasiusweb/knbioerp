# KN Biosciences ERP - Operations & System Guide

This manual is intended for Admin and Factory Management staff.

## 🏭 Manufacturing Queue (RFQ)

Orders exceeding **₹10 Lakhs** are flagged as RFQs and follow this workflow:

1.  **Validation**: Sales Team verifies the customer credit limit.
2.  **Queue Entry**: Once validated, the order appears in the "Production Queue."
3.  **Lead Time**: Standard manufacturing lead time is **5 working days**.
4.  **Completion**: When production is finished, the Factory Manager marks the batch as "Complete."
5.  **Dispatch**: The order is handed over to **Delhivery** (Surface/Express) and an automated invoice is generated.

## 📦 Inventory & Batch Audit

### Periodic Reconciliation
Factory Managers must perform a weekly reconciliation:
*   Navigate to **Admin > Inventory Audit**.
*   Compare **Digital Stock** (system count) vs. **Physical Shelf** (actual count).
*   Log variances. Any variance >2% triggers an automatic alert to the Regional Director.

### Smart Pricing Refresh
The Pricing Engine refreshes batch data every 24 hours at 00:00 IST. Ensure all new batch expiry dates are entered accurately during stock-in.

---

## 🚀 Technical Ops

### Deployment
This application is optimized for **Vercel**.
*   **Environment Variables**: Ensure `SUPABASE_URL` and `SUPABASE_ANON_KEY` are configured.
*   **Edge Functions**: Payment validation is handled via Supabase Edge Functions (`validate-pay`).

### Monitoring
Monitor the `ApiError` logs in the developer console for any integration failures with Easebuzz or Delhivery API endpoints.
