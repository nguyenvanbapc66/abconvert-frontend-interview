# ABConvert E-Commerce A/B Testing Platform

A modern e-commerce platform with built-in A/B testing capabilities, built using Next.js and Tailwind CSS. This platform allows for dynamic testing of product prices, content, and user interface elements to optimize conversion rates and revenue.

## Features

- 🛍️ **E-Commerce Platform**

  - Product listings with detailed views
  - Shopping cart functionality
  - Responsive product grid layout
  - Product image galleries with sliders

- 🔄 **A/B Testing Dashboard**

  - Real-time preview of e-commerce site
  - Interactive element selection for testing
  - Dynamic pricing variations
  - AI-powered content suggestions
  - Comprehensive analytics dashboard

- 📊 **Advanced Analytics**
  - Revenue per visitor tracking
  - Average order value calculation
  - Conversion rate analysis
  - Price sensitivity metrics
  - Time-based analytics (24h, 7d, 30d)

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- OpenAI API key (for content generation)

## Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd abconvert-frontend-interview-question2
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:

```
OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── ab-testing/        # A/B testing dashboard
│   │   └── api/               # API routes
│   ├── components/            # Reusable UI components
│   │   ├── ABTestAnalytics/   # Analytics dashboard
│   │   └── productDetailPage/ # Product detail components
│   ├── utils/                 # Utility functions
│   │   └── abTesting.ts      # A/B testing core logic
│   └── constants/            # Application constants
├── public/                   # Static assets
└── assets/                  # Project assets
```

## A/B Testing Features

### Price Testing

- Dynamic price variations with multiple strategies:
  - Percentage-based discounts (10%, 20%)
  - Premium pricing
  - Psychological pricing (e.g., $9.99)
  - Rounded pricing
- Price sensitivity analysis
- Revenue impact tracking

### Content Testing

- AI-generated content variations
- Image testing capabilities
- CTA optimization
- Product description variations

### Analytics

- Real-time test results
- Conversion rate tracking
- Revenue metrics
- Visitor behavior analysis
- Time-based performance metrics

## API Endpoints

### A/B Testing API

- `POST /api/generate-variations`
  - Generates content variations for A/B testing
  - Supports text, price, and image variations
  - Uses OpenAI for content generation

## Usage

1. **Create A/B Tests**

   - Navigate to the A/B Testing dashboard
   - Select elements to test
   - Generate variations using AI
   - Apply variations to test groups

2. **Monitor Results**

   - View real-time analytics
   - Track conversion rates
   - Monitor revenue impact
   - Analyze visitor behavior

3. **Optimize Performance**
   - Compare test group performance
   - Identify winning variations
   - Implement successful changes
   - Track long-term impact

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or support, please contact talent@abconvert.io
