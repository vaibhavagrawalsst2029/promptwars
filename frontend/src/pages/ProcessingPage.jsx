import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiDocumentText, HiCpuChip, HiSparkles, HiRocketLaunch } from 'react-icons/hi2';
import { useResume } from '../context/ResumeContext';
import { analyzeResume } from '../services/api';

const steps = [
  { icon: HiDocumentText, label: 'Extracting text...', color: '#D4AF37' },
  { icon: HiCpuChip, label: 'AI analyzing content...', color: '#00ff88' },
  { icon: HiSparkles, label: 'Enhancing descriptions...', color: '#c084fc' },
  { icon: HiRocketLaunch, label: 'Generating portfolio...', color: '#ff6b6b' },
];

export default function ProcessingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useResume();
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => prev < 3 ? prev + 1 : prev);
    }, 1800);

    const process = async () => {
      try {
        const result = await analyzeResume(id);
        if (cancelled) return;
        clearInterval(stepTimer);
        setCurrentStep(3);
        dispatch({ type: 'SET_ALL', payload: {
          portfolioId: id,
          enhancedData: result.data.enhancedData,
          resumeData: result.data.structuredData,
          score: result.data.score,
        }});
        setTimeout(() => { if (!cancelled) navigate(`/portfolio/${id}`); }, 1500);
      } catch (err) {
        if (cancelled) return;
        clearInterval(stepTimer);
        setError(err.response?.data?.error || 'Processing failed.');
      }
    };
    process();
    return () => { cancelled = true; clearInterval(stepTimer); };
  }, [id, dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <div className="max-w-md w-full text-center">
        {/* Spinner */}
        <motion.div className="relative w-32 h-32 mx-auto mb-14">
          <motion.div animate={{rotate:360}} transition={{duration:3,repeat:Infinity,ease:'linear'}}
            className="absolute inset-0 rounded-full" style={{border:'2px solid transparent',borderTopColor:'#D4AF37',borderRightColor:'rgba(212,175,55,0.3)'}} />
          <motion.div animate={{rotate:-360}} transition={{duration:5,repeat:Infinity,ease:'linear'}}
            className="absolute inset-3 rounded-full" style={{border:'2px solid transparent',borderTopColor:'#C0C0C0',borderLeftColor:'rgba(192,192,192,0.3)'}} />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div animate={{scale:[1,1.2,1]}} transition={{duration:2,repeat:Infinity}}>
              {(() => { const Icon = steps[currentStep]?.icon || HiSparkles; return <Icon className="text-4xl" style={{color:steps[currentStep]?.color||'#D4AF37'}} />; })()}
            </motion.div>
          </div>
        </motion.div>

        <motion.h2 key={currentStep} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="text-xl font-bold mb-4" style={{fontFamily:'Orbitron'}}>
          {steps[currentStep]?.label || 'Processing...'}
        </motion.h2>
        <p style={{fontFamily:'Space Grotesk',color:'#8a8a9a',fontSize:'0.9rem',marginBottom:'2.5rem'}}>
          Please wait while AI analyzes your resume
        </p>

        {/* Steps Progress */}
        <div className="flex flex-col gap-4">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.2}}
              className="flex items-center gap-4 px-5 py-4 rounded-xl" style={{
                background: i <= currentStep ? `${step.color}10` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${i <= currentStep ? step.color+'40' : 'rgba(255,255,255,0.05)'}`,
              }}>
              <step.icon style={{color: i <= currentStep ? step.color : '#555', fontSize:'1.2rem'}} />
              <span style={{fontFamily:'Space Grotesk',color: i <= currentStep ? '#e0e0e0' : '#555',fontSize:'0.85rem',flex:1,textAlign:'left'}}>{step.label}</span>
              {i < currentStep && <motion.span initial={{scale:0}} animate={{scale:1}} style={{color:'#22c55e',fontSize:'1rem'}}>✓</motion.span>}
              {i === currentStep && <motion.div animate={{opacity:[0.3,1,0.3]}} transition={{duration:1.5,repeat:Infinity}} className="w-2 h-2 rounded-full" style={{background:step.color}} />}
            </motion.div>
          ))}
        </div>

        {error && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-8 p-5 rounded-xl" style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',fontFamily:'Space Grotesk',color:'#ef4444'}}>
            {error}
            <button onClick={()=>navigate('/upload')} className="btn-secondary mt-3 text-sm mx-auto">Try Again</button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
