export interface Criterion {
  id: string;
  name: string;
  description: string;
  scale: { [key: number]: string }; // Represents scores 1-5 and their descriptions
  value?: number; // To store user input later
}

export interface Dimension {
  id: string;
  name: string;
  description: string; // Added description for dimension
  criteria: Criterion[];
}

// This will hold the user's input for a specific evaluation
export interface ScoreInput {
  evaluationId: string; // Identifier for this specific evaluation
  dimensionValues: {
    [dimensionId: string]: {
      [criterionId: string]: number;
    };
  };
}

// Structure to hold the calculated score
export interface ScoreResult {
  evaluationId: string;
  dimensionScores: {
    [dimensionId: string]: number;
  };
  totalScore: number;
}

// --- Updated Dimensions and Criteria ---

export const SCORING_DIMENSIONS: Dimension[] = [
  {
    id: 'dataComplexity',
    name: 'Datenkomplexität und -vielfalt',
    description: 'Diese Dimension bewertet die Eigenschaften und Herausforderungen der Eingangsdaten.',
    criteria: [
      {
        id: 'sourceVariety',
        name: 'Datenquellenvielfalt',
        description: 'Anzahl der genutzten Datentypen.',
        scale: {
          1: 'Nur ein Datentyp (z.B. Labordaten).',
          5: 'Fünf oder mehr Datentypen (z.B. Bild-, Text-, und Genomdaten).'
        }
      },
      {
        id: 'dataIntegrity',
        name: 'Datenintegrität',
        description: 'Grad der Vollständigkeit und Konsistenz der verarbeitbaren Eingangsdaten.',
        scale: {
          1: 'Nur ein Teil der Eingangsdaten kann verarbeitet werden.',
          5: 'Daten sind nahezu vollständig und konsistent verarbeitbar.'
        }
      },
      {
        id: 'dataComplexityLevel',
        name: 'Datenkomplexität',
        description: 'Schwierigkeitsgrad bei der Interpretation der Daten.',
        scale: {
          1: 'Strukturiert, leicht interpretierbar (z.B. numerische Labordaten).',
          5: 'Unstrukturierte oder hochkomplexe Daten (z.B. freier Text oder verrauschte Daten).'
        }
      },
      {
        id: 'dataLinking',
        name: 'Datenverknüpfung',
        description: 'Fähigkeit, mehrere Datenquellen in einer Analyse zu kombinieren.',
        scale: {
          1: 'Keine Verknüpfung unterschiedlicher Quellen.',
          5: 'Vollständig integrierte Analyse aus mehreren Quellen.'
        }
      },
      {
        id: 'dataVolume',
        name: 'Datenvolumen',
        description: 'Menge der Daten pro Analyse.',
        scale: {
          1: 'Gering (z.B. ein einzelner Parameter).',
          5: 'Sehr groß (z.B. Millionen von Parametern pro Patient).'
        }
      }
    ]
  },
  {
    id: 'diseaseComplexity',
    name: 'Komplexität der Erkrankung',
    description: 'Diese Dimension misst die klinische Herausforderung, die durch die Erkrankung entsteht.',
    criteria: [
      {
        id: 'diseaseRarity',
        name: 'Seltenheit der Erkrankung',
        description: 'Prävalenz in der Bevölkerung.',
        scale: {
          1: 'Häufig (z.B. Anämie).',
          5: 'Sehr selten (z.B. Morbus Gaucher).'
        }
      },
      {
        id: 'diagnosticAmbiguity',
        name: 'Diagnostische Mehrdeutigkeit',
        description: 'Schwierigkeit der Abgrenzung von anderen Krankheitsbildern.',
        scale: {
          1: 'Einfach abzugrenzen (z.B. Grippe).',
          5: 'Hochgradig mehrdeutig (z.B. systemischer Lupus erythematodes).'
        }
      },
      {
        id: 'prognosticUncertainty',
        name: 'Prognostische Unsicherheit',
        description: 'Vorhersehbarkeit des Krankheitsverlaufs.',
        scale: {
          1: 'Gut vorhersagbar (z.B. unkomplizierte bakterielle Infektion).',
          5: 'Unvorhersehbar und individuell unterschiedlich (z.B. aggressive Krebsarten).'
        }
      },
      {
        id: 'multimorbidity',
        name: 'Multimorbidität',
        description: 'Einfluss anderer Erkrankungen auf die Zielerkrankung.',
        scale: {
          1: 'Kaum beeinflusst durch Komorbiditäten.',
          5: 'Stark beeinflusst durch zahlreiche Komorbiditäten.'
        }
      },
      {
        id: 'diseaseSeverity',
        name: 'Schweregrad der Erkankung',
        description: 'Lethalit und Bedeutung einer frühen Entdeckung.',
        scale: {
          1: 'Geringe Lethalität und wenig Einfluss auf Patienten.',
          5: 'Hohe Letalität wie z.B. Krebs.'
        }
      }
    ]
  },
  {
    id: 'questionDifficulty',
    name: 'Schwierigkeitsgrad der Fragestellung',
    description: 'Bewertet die fachliche und technische Komplexität der Fragestellung, die durch das System beantwortet wird.',
    criteria: [
      {
        id: 'differentialDepth',
        name: 'Differenzialdiagnostische Tiefe',
        description: 'Anzahl möglicher Diagnosen, die in der Anfrage berücksichtigt werden müssen.',
        scale: {
          1: 'Wenige Differenzialdiagnosen (< 3).',
          5: 'Viele Differenzialdiagnosen (> 10).'
        }
      },
      {
        id: 'prognosticPrecision',
        name: 'Prognostische Präzision',
        description: 'Grad der Genauigkeit und Langfristigkeit der Vorhersage.',
        scale: {
          1: 'Nur kurzfristige Trends (z.B. einfache Risikoabschätzung).',
          5: 'Hochpräzise, langfristige Vorhersagen (z.B. Krankheitsprogression).'
        }
      },
      {
        id: 'realtimeRequirement',
        name: 'Anforderung an die Echtzeit',
        description: 'Erwartung an die Geschwindigkeit des Systems.',
        scale: {
          1: 'Nächtliche Batch Prozessierung ausreichend.',
          5: 'Sofortige Antwort erwartet.'
        }
      },
      {
        id: 'interdisciplinaryRelevance',
        name: 'Interdisziplinäre Relevanz',
        description: 'Anzahl der Fachbereiche, die in die Analyse einfließen.',
        scale: {
          1: 'Nur ein Fachbereich.',
          5: 'Mehrere Fachbereiche (> 3).'
        }
      },
      {
        id: 'dynamicAdaptability',
        name: 'Dynamische Anpassungsfähigkeit',
        description: 'Fähigkeit des Systems, auf Änderungen klinischer Parameter zu reagieren.',
        scale: {
          1: 'Keine Anpassung an dynamische Parameter.',
          5: 'Echtzeit-Anpassung an klinische Änderungen.'
        }
      }
    ]
  },
  {
    id: 'aiSupportExtent',
    name: 'Ausmaß der KI-Unterstützung',
    description: 'Bewertet, wie stark und eigenständig die KI im Entscheidungsprozess eingebunden ist.',
    criteria: [
      {
        id: 'automationLevel',
        name: 'Automatisierungsgrad',
        description: 'Grad der Autonomie der KI.',
        scale: {
          1: 'Nur unterstützend, keine eigenständigen Analysen.',
          5: 'Vollautomatisierte Analysen und Entscheidungen.'
        }
      },
      {
        id: 'analysisLevel',
        name: 'Analyseebene',
        description: 'Tiefe der durchgeführten Analyse.',
        scale: {
          1: 'Einfacher Vorschlag.',
          5: 'Hochdimensionale, integrative Analysen.'
        }
      },
      {
        id: 'recommendationComplexity',
        name: 'Empfehlungskomplexität',
        description: 'Umfang der Vorschläge oder Handlungspläne.',
        scale: {
          1: 'Einfache, generische Vorschläge.',
          5: 'Detaillierte, umsetzungsfähige Handlungspläne.'
        }
      },
      {
        id: 'guidelineIntegration',
        name: 'Integration von Leitlinien',
        description: 'Umfang der Einbindung medizinischer Standards.',
        scale: {
          1: 'Keine Berücksichtigung von Leitlinien.',
          5: 'Vollständige Integration aktueller Leitlinien.'
        }
      },
      {
        id: 'patientIndividualization',
        name: 'Patientenspezifische Individualisierung',
        description: 'Berücksichtigung individueller Patientenmerkmale.',
        scale: {
          1: 'Keine Individualisierung.',
          5: 'Höchstgradig patientenspezifische Analysen.'
        }
      }
    ]
  }
]; 