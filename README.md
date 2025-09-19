# PricingApp

---

## Features & Pages

PricingApp is a frontend tool built in Angular that supports pricing strategy development for Diagnostic Decision Support Systems (DDSS). It is part of a PhD research effort and remains under active development. The app lets users simulate, score, and compare pricing strategies through several pages:

- **Manage / Übersicht Scores**: Shows all saved scoring profiles with their names and total scores.  
- **Neuen Score berechnen**: Enter parameters (costs, complexity, etc.) to compute a new profile / score.  
- **Score Einstellungen**: Adjust weights/rules of how different inputs contribute to the score.  
- **Preissimulation**: Explore how changing inputs or business‑model assumptions affect recommended pricing outcomes.  
- **Pricing Strategie**: Multi‑step wizard guiding through:
  1. System Overview (detailed cost breakdown)
  2. Technical Complexity (multi‑dimensional scoring: data, medical case, AI involvement etc.)
  3. Market & Competition (benchmarking competitor prices and market alternatives)
  4. Implementation & Distribution (delivery model, partner/distributor, setup costs etc.)
  5. Business Model (e.g. license, usage‑based, hybrid, or complexity‑based pricing / DACS)
  6. Results (cost basis, margin, comparison to market, break‑even, recommendation etc.)
- **Simulation Ergebnisse (Simulation Results)**: View and compare results of simulations and scenarios; see recommended final pricing with strategic insights.

---

## Research Context & Roadmap

PricingApp is developed as part of a PhD thesis focusing on pricing models for AI/decision support in healthcare. Ongoing and future work includes:

- Improving cost breakdowns and making cost input more detailed (fixed, variable, implementation overhead, etc.).  
- Validating pricing recommendations via empirical user studies or pilot projects.  
- Supporting advanced pricing models like outcome‑based payments, regulatory constraints, or complexity‑based contributions (e.g. DACS).  
- Ensuring the tool remains entirely client‑side (no external APIs), for reproducibility, transparency, and ease of deployment.

---

