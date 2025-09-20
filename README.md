# € Pricing Simulator

A web application for AI-based pricing strategy simulation and score calculation in healthcare and medical technology domains. This tool is part of a PhD research project and is currently under development.

## Features

- **AI Score Calculation**: Multi-dimensional scoring system for medical AI applications
- **Pricing Strategy Simulation**: Advanced pricing models including DACS (Dynamic AI Complexity Scoring)
- **Series Simulation**: Parameter variation analysis for pricing optimization
- **Score Management**: Complete CRUD operations for evaluation management
- **Bilingual Support**: Full German (DE) and English (EN) language support with dynamic switching

## Technology Stack

- Angular 17+ with TypeScript
- Angular Material Design
- RxJS for state management
- Responsive CSS3 design

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Angular CLI (v17 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd pricing-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
```

## Language Support

The application supports two languages:
- **German (DE)**: Default language
- **English (EN)**: Full translation available

To switch languages, use the language selector in the main navigation sidebar. Your language choice is automatically saved and the entire application updates immediately.

## Application Structure

### Main Components

1. **Score Management** (`/manage`) - Overview and management of calculated scores
2. **Data Input** (`/input`) - Multi-dimensional scoring form with 20+ criteria
3. **Score Properties** (`/properties`) - Customizable scoring criteria and scale labels
4. **Pricing Strategy** (`/pricing-strategy`) - 6-step pricing wizard with multiple models
5. **Simulation Results** (`/series-results`) - Series simulation visualization and analysis

### Scoring Dimensions

The application evaluates AI systems across four main dimensions:

1. **Data Complexity & Diversity** - Data source variety, integrity, complexity, linking, volume
2. **Disease Complexity** - Disease rarity, diagnostic ambiguity, prognostic uncertainty, multimorbidity, severity
3. **Question Complexity Level** - Differential diagnostic depth, prognostic precision, real-time requirements, interdisciplinary relevance, dynamic adaptability
4. **AI Support Extent** - Automation level, analysis depth, recommendation complexity, guideline integration, patient-specific individualization

## Development Status

⚠️ **This application is currently under development** as part of a PhD research project. Features and functionality may change as the research progresses.

## Contributing

This is a research project in development. For questions or contributions, please contact the development team.

---

**Note**: This application is designed for healthcare and medical technology professionals. The scoring system and pricing models are based on industry best practices and should be validated for specific use cases.