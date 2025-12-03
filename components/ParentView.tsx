import React, { useState } from 'react';

const ParentView: React.FC = () => {
  // State variables
  const [cadetName, setCadetName] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [mediaRelease, setMediaRelease] = useState(false);
  
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubmitting(true);

    // Mock Payload construction
    const payload = { 
      cadetName,
      allergies,
      medications,
      emergencyContact,
      emergencyPhone,
      mediaRelease,
    };

    // Simulate Network Request
    setTimeout(() => {
      console.log('Mock Submission Payload:', payload);
      setSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="bg-[#252525] border border-[#5f686e] p-6 rounded-sm max-w-2xl mx-auto mt-6">
      <h1 className="text-2xl font-bold text-[#c7d7e2] mb-6 uppercase tracking-wider border-b border-[#5f686e] pb-4">Parent Portal</h1>
      
      <div className="space-y-5">
        
        {/* Cadet Name */}
        <div>
          <label className="block text-[10px] font-bold text-[#96a3ae] uppercase tracking-widest mb-1">Cadet Name</label>
          <input
            type="text"
            value={cadetName}
            onChange={(e) => setCadetName(e.target.value)}
            className="w-full bg-[#191818] border border-[#5f686e] text-[#c7d7e2] text-sm rounded-sm p-2.5 focus:outline-none focus:border-[#3684ca] transition-colors placeholder:text-[#5f686e]"
            placeholder="Enter cadet full name"
            disabled={submitting}
          />
        </div>

        {/* Health Information Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Allergies */}
          <div>
            <label className="block text-[10px] font-bold text-[#96a3ae] uppercase tracking-widest mb-1">Allergies</label>
            <input
              type="text"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="w-full bg-[#191818] border border-[#5f686e] text-[#c7d7e2] text-sm rounded-sm p-2.5 focus:outline-none focus:border-[#3684ca] transition-colors"
              disabled={submitting}
            />
          </div>

          {/* Medications */}
          <div>
            <label className="block text-[10px] font-bold text-[#96a3ae] uppercase tracking-widest mb-1">Medications</label>
            <input
              type="text"
              value={medications}
              onChange={(e) => setMedications(e.target.value)}
              className="w-full bg-[#191818] border border-[#5f686e] text-[#c7d7e2] text-sm rounded-sm p-2.5 focus:outline-none focus:border-[#3684ca] transition-colors"
              disabled={submitting}
            />
          </div>
        </div>

        {/* Emergency Contact Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Emergency Contact Name */}
          <div>
            <label className="block text-[10px] font-bold text-[#96a3ae] uppercase tracking-widest mb-1">Emergency Contact</label>
            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              className="w-full bg-[#191818] border border-[#5f686e] text-[#c7d7e2] text-sm rounded-sm p-2.5 focus:outline-none focus:border-[#3684ca] transition-colors"
              disabled={submitting}
            />
          </div>

          {/* Emergency Phone */}
          <div>
            <label className="block text-[10px] font-bold text-[#96a3ae] uppercase tracking-widest mb-1">Emergency Phone</label>
            <input
              type="tel"
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              className="w-full bg-[#191818] border border-[#5f686e] text-[#c7d7e2] text-sm rounded-sm p-2.5 focus:outline-none focus:border-[#3684ca] transition-colors"
              disabled={submitting}
            />
          </div>
        </div>

        {/* Media Release Checkbox */}
        <div className="bg-[#191818] p-3 rounded border border-[#5f686e] flex items-center gap-3 mt-4">
          <input
            type="checkbox"
            checked={mediaRelease}
            onChange={(e) => setMediaRelease(e.target.checked)}
            id="mediaRelease"
            className="w-4 h-4 accent-[#3684ca] bg-[#252525] border-[#5f686e] rounded cursor-pointer"
            disabled={submitting}
          />
          <label htmlFor="mediaRelease" className="text-sm text-[#c7d7e2] cursor-pointer select-none">
            I consent to photo/video use (CCF 20-5)
          </label>
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleSubmit}
          disabled={submitting}
          className={`w-full bg-[#3684ca] hover:bg-[#3684ca]/80 text-white font-bold py-3 rounded-sm uppercase tracking-widest text-xs transition-colors mt-6 shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {submitting ? (
            <>
               <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
               Encrypting & Sending...
            </>
          ) : submitSuccess ? (
             <span className="text-emerald-300">✓ Signed & Verified</span>
          ) : (
            'Sign & Submit'
          )}
        </button>

      </div>
    </div>
  );
};

export default ParentView;