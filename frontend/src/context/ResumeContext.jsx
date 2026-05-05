import { createContext, useContext, useReducer } from 'react';

const ResumeContext = createContext();

const initialState = {
  portfolioId: null,
  resumeData: null,
  enhancedData: null,
  score: null,
  theme: 'developer',
  loading: false,
  error: null,
};

function resumeReducer(state, action) {
  switch (action.type) {
    case 'SET_PORTFOLIO_ID':
      return { ...state, portfolioId: action.payload, error: null };
    case 'SET_RESUME_DATA':
      return { ...state, resumeData: action.payload };
    case 'SET_ENHANCED_DATA':
      return { ...state, enhancedData: action.payload };
    case 'SET_SCORE':
      return { ...state, score: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_ALL':
      return { ...state, ...action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function ResumeProvider({ children }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}

export default ResumeContext;
