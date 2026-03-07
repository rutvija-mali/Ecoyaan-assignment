# Ecoyaan Checkout

A sustainable shopping checkout flow built with modern web technologies. 

## Architectural Choices

- **Framework**: **Next.js 16 (App Router)**. Leveraging both Server and Client Components to optimize rendering and initial data fetching (e.g., initial cart loading via `app/page.js`), while ensuring a highly interactive user experience on the client.
- **State Management**: **React Context API** (`CheckoutContext.js`) is used as a global, centralized state manager throughout the checkout process (cart -> shipping -> payment).
  - Handles state hydration / rehydration internally via `localStorage`. This prevents data from being lost when the user refreshes any of the checkout steps.
- **Styling**: **Tailwind CSS v4** for utility-first styling. It enables a clean, responsive, and easily maintainable design without separating styles from structural markup. 
- **Component Design**: Highly modular architecture. Reusable components like `CartClient`, `CartItem`, `OrderSummary`, and `StepIndicator` keep the page layout clean, making the codebase highly legible and easy to add future features.
- **API Architecture**: Next.js App Router API Routes are used to mock the back-end endpoints (e.g., `/api/cart`), demonstrating clear separation of concerns between client requests and server operations.

## How to Run Locally

Follow these steps to spin up the local development environment:

1. **Clone the repository** and navigate into the project directory:
   ```bash
   cd ecoyaan-checkout
   ```

2. **Install the dependencies**:
   Ensure you have Node.js installed, then run the corresponding command for your package manager:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **View the application**:
   Open [http://localhost:3000](http://localhost:3000) with your browser to explore the fully functional checkout system. You can interact with the cart, proceed to shipping, and mock a payment.

Live Demo: https://ecoyaan-assignment-nine.vercel.app/
