import React, { useState } from 'react';

const ParentView: React.FC = () => {
  // State variables
  const [cadetName, setCadetName] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [mediaRelease, setMediaRelease] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const payload = {
      cadetName,
      allergies,
      medications,
      emergencyContact,
      emergencyPhone,
      mediaRelease,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/consent/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Submission result:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="bg-[#18181b] border border-[#27272a] p-6 rounded-sm max-w-2xl mx-auto mt-6">
      <h1 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-[#27272a] pb-4">Parent Portal</h1>
      
      <div className="space-y-5">
        
        {/* Cadet Name */}
        <div>
          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Cadet Name</label>
          <input
            type="text"
            value={cadetName}
            onChange={(e) => setCadetName(e.target.value)}
            className="w-full bg-[#0f0f11] border border-zinc-700 text-white text-sm rounded-sm p-2.5 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-700"
            placeholder="Enter cadet full name"
          />
        </div>

        {/* Health Information Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Allergies */}
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Allergies</label>
            <input
              type="text"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="w-full bg-[#0f0f11] border border-zinc-700 text-white text-sm rounded-sm p-2.5 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Medications */}
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Medications</label>
            <input
              type="text"
              value={medications}
              onChange={(e) => setMedications(e.target.value)}
              className="w-full bg-[#0f0f11] border border-zinc-700 text-white text-sm rounded-sm p-2.5 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Emergency Contact Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Emergency Contact Name */}
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Emergency Contact</label>
            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              className="w-full bg-[#0f0f11] border border-zinc-700 text-white text-sm rounded-sm p-2.5 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Emergency Phone */}
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Emergency Phone</label>
            <input
              type="tel"
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              className="w-full bg-[#0f0f11] border border-zinc-700 text-white text-sm rounded-sm p-2.5 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Media Release Checkbox */}
        <div className="bg-[#0f0f11] p-3 rounded border border-zinc-800 flex items-center gap-3 mt-4">
          <input
            type="checkbox"
            checked={mediaRelease}
            onChange={(e) => setMediaRelease(e.target.checked)}
            id="mediaRelease"
            className="w-4 h-4 accent-blue-600 bg-zinc-900 border-zinc-700 rounded cursor-pointer"
          />
          <label htmlFor="mediaRelease" className="text-sm text-zinc-300 cursor-pointer select-none">
            I consent to photo/video use (CCF 20-5)
          </label>
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-sm uppercase tracking-widest text-xs transition-colors mt-6 shadow-lg shadow-blue-900/20"
        >
          Sign & Submit
        </button>

      </div>
    </div>
  );
};

export default ParentView;