export type DomainType = 'quantitative' | 'reflective' | 'health' | 'knowledge' | 'unknown';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Send query to backend to get the 3 clarifying questions
export const getClarifyingQuestions = async (query: string): Promise<{ needs_clarification: boolean, questions: string[] }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/triage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const data = await response.json();
    return {
      needs_clarification: data.needs_clarification || false,
      questions: data.questions || []
    };
  } catch (error) {
    console.error("Error fetching triage:", error);
    return { needs_clarification: false, questions: [] };
  }
};

// Send query + user answers to backend for the final deep analysis
export const analyzeQuery = async (query: string, answers: Record<number, string>): Promise<{ type: DomainType, data?: any }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, answers })
    });
    const data = await response.json();
    return {
      type: data.domain || 'reflective',
      data: data
    };
  } catch (error) {
    console.error("Error fetching analysis:", error);
    return { type: 'unknown' };
  }
};