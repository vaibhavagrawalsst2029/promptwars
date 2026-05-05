import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowUpTray, HiDocumentText, HiXMark, HiCheckCircle, HiSparkles } from 'react-icons/hi2';
import { useResume } from '../context/ResumeContext';
import { uploadResume } from '../services/api';

export default function UploadPage() {
  const navigate = useNavigate();
  const { dispatch } = useResume();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((accepted, rejected) => {
    setError(null);
    if (rejected.length > 0) {
      setError(rejected[0].errors[0]?.code === 'file-too-large'
        ? 'File too large. Max 5MB.' : 'Invalid file. Use PDF or DOCX.');
      return;
    }
    if (accepted.length > 0) setFile(accepted[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    maxSize: 5 * 1024 * 1024, multiple: false,
  });

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true); setError(null);
    const iv = setInterval(() => setUploadProgress(p => Math.min(p + Math.random() * 15, 90)), 300);
    try {
      const result = await uploadResume(file);
      clearInterval(iv); setUploadProgress(100);
      dispatch({ type: 'SET_PORTFOLIO_ID', payload: result.data.portfolioId });
      setTimeout(() => navigate(`/processing/${result.data.portfolioId}`), 500);
    } catch (err) {
      clearInterval(iv); setUploadProgress(0);
      setError(err.response?.data?.error || 'Upload failed.');
      setUploading(false);
    }
  };

  const fmt = (b) => b < 1024*1024 ? (b/1024).toFixed(1)+' KB' : (b/(1024*1024)).toFixed(1)+' MB';

  return (
    <div
      className="min-h-screen"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '8rem',
        paddingBottom: '4rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
      }}
    >
      <div style={{ maxWidth: '42rem', width: '100%', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div
            style={{
              width: '4rem',
              height: '4rem',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
              border: '1px solid rgba(212,175,55,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
            }}
          >
            <HiSparkles style={{ fontSize: '1.75rem', color: '#D4AF37' }} />
          </div>
          <h1
            style={{
              fontFamily: 'Orbitron',
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: '700',
              marginBottom: '0.75rem',
            }}
          >
            Upload Your <span className="gradient-gold">Resume</span>
          </h1>
          <p style={{ fontFamily: 'Space Grotesk', color: '#8a8a9a', fontSize: '1rem', lineHeight: 1.6 }}>
            Drop your resume file and let AI transform it into a stunning portfolio.
          </p>
        </motion.div>

        {/* Dropzone / File Preview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          {!file ? (
            <div
              {...getRootProps()}
              style={{
                borderRadius: '1.25rem',
                padding: '4rem 2rem',
                textAlign: 'center',
                cursor: 'pointer',
                border: isDragActive ? '2px solid #D4AF37' : '2px dashed rgba(212,175,55,0.25)',
                background: isDragActive
                  ? 'linear-gradient(135deg, rgba(212,175,55,0.06), rgba(212,175,55,0.02))'
                  : 'rgba(255,255,255,0.015)',
                boxShadow: isDragActive ? '0 0 60px rgba(212,175,55,0.15), inset 0 0 60px rgba(212,175,55,0.03)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <input {...getInputProps()} />

              {/* Centered Icon */}
              <motion.div
                animate={isDragActive ? { y: -8, scale: 1.1 } : { y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  width: '5rem',
                  height: '5rem',
                  borderRadius: '1.25rem',
                  background: isDragActive
                    ? 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.1))'
                    : 'rgba(212,175,55,0.08)',
                  border: `1px solid ${isDragActive ? 'rgba(212,175,55,0.4)' : 'rgba(212,175,55,0.15)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                }}
              >
                <HiArrowUpTray style={{ fontSize: '2rem', color: '#D4AF37' }} />
              </motion.div>

              <h3
                style={{
                  fontFamily: 'Orbitron',
                  fontSize: '1.15rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: isDragActive ? '#D4AF37' : '#e0e0e0',
                }}
              >
                {isDragActive ? 'Drop it here!' : 'Drag & Drop your resume'}
              </h3>
              <p style={{ fontFamily: 'Space Grotesk', color: '#8a8a9a', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                or <span style={{ color: '#D4AF37', fontWeight: '600', cursor: 'pointer' }}>browse files</span>
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  marginTop: '1.5rem',
                }}
              >
                <span
                  style={{
                    padding: '0.3rem 0.75rem',
                    borderRadius: '0.4rem',
                    fontSize: '0.7rem',
                    fontFamily: 'Space Grotesk',
                    fontWeight: '600',
                    background: 'rgba(212,175,55,0.08)',
                    color: '#D4AF37',
                    border: '1px solid rgba(212,175,55,0.15)',
                  }}
                >
                  PDF
                </span>
                <span
                  style={{
                    padding: '0.3rem 0.75rem',
                    borderRadius: '0.4rem',
                    fontSize: '0.7rem',
                    fontFamily: 'Space Grotesk',
                    fontWeight: '600',
                    background: 'rgba(0,204,255,0.08)',
                    color: '#00ccff',
                    border: '1px solid rgba(0,204,255,0.15)',
                  }}
                >
                  DOCX
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontFamily: 'Space Grotesk',
                    color: '#555',
                  }}
                >
                  Max 5MB
                </span>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                borderRadius: '1.25rem',
                padding: '2rem',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* File info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    borderRadius: '0.85rem',
                    background: 'rgba(212,175,55,0.1)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <HiDocumentText style={{ fontSize: '1.5rem', color: '#D4AF37' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: 'Space Grotesk',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {file.name}
                  </p>
                  <p style={{ fontFamily: 'Space Grotesk', color: '#666', fontSize: '0.8rem' }}>{fmt(file.size)}</p>
                </div>
                {!uploading && (
                  <button
                    onClick={() => { setFile(null); setError(null); setUploadProgress(0); }}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#8a8a9a',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  >
                    <HiXMark style={{ fontSize: '1.1rem' }} />
                  </button>
                )}
              </div>

              {/* Progress bar */}
              {uploading && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'Space Grotesk', color: '#8a8a9a', fontSize: '0.8rem' }}>
                      {uploadProgress < 100 ? 'Uploading...' : 'Done!'}
                    </span>
                    <span style={{ fontFamily: 'Orbitron', color: '#D4AF37', fontSize: '0.8rem', fontWeight: '600' }}>
                      {Math.round(uploadProgress)}%
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      borderRadius: '3px',
                      overflow: 'hidden',
                      background: 'rgba(255,255,255,0.06)',
                    }}
                  >
                    <motion.div
                      style={{
                        height: '100%',
                        borderRadius: '3px',
                        background: 'linear-gradient(90deg, #D4AF37, #e8c84a)',
                        boxShadow: '0 0 12px rgba(212,175,55,0.4)',
                      }}
                      animate={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Upload button */}
              {!uploading && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUpload}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    padding: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <HiCheckCircle /> Process with AI
                </motion.button>
              )}

              {/* Redirect indicator */}
              {uploadProgress === 100 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    justifyContent: 'center',
                    marginTop: '0.75rem',
                  }}
                >
                  <HiCheckCircle style={{ color: '#22c55e' }} />
                  <span style={{ fontFamily: 'Space Grotesk', color: '#22c55e', fontSize: '0.9rem' }}>Redirecting...</span>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  marginTop: '1.25rem',
                  padding: '1rem 1.25rem',
                  borderRadius: '0.85rem',
                  textAlign: 'center',
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  fontFamily: 'Space Grotesk',
                  color: '#ef4444',
                  fontSize: '0.9rem',
                }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
