import React, { useState, useEffect } from 'react';

const InteractiveFrequencySlider = () => {
  const [frequency, setFrequency] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [oscillator, setOscillator] = useState(null);

  // Initialize Web Audio API
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        setAudioContext(new AudioContext());
      }
    }
  }, []);

  const startTone = () => {
    if (!audioContext) return;

    try {
      const osc = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      osc.connect(gainNode);
      gainNode.connect(audioContext.destination);

      osc.frequency.setValueAtTime(frequency, audioContext.currentTime);
      osc.type = 'sine';

      // Set volume (low to avoid hearing damage)
      gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);

      osc.start();
      setOscillator(osc);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error starting audio:', error);
    }
  };

  const stopTone = () => {
    if (oscillator) {
      oscillator.stop();
      setOscillator(null);
      setIsPlaying(false);
    }
  };

  const handleFrequencyChange = (newFrequency) => {
    setFrequency(newFrequency);
    if (isPlaying && oscillator) {
      oscillator.frequency.setValueAtTime(newFrequency, audioContext.currentTime);
    }
  };

  const getWaveTypeInfo = (freq) => {
    if (freq < 4) return { type: 'Delta', description: 'Deep sleep, unconscious' };
    if (freq < 8) return { type: 'Theta', description: 'Deep meditation, creativity' };
    if (freq < 13) return { type: 'Alpha', description: 'Relaxed alertness, focus' };
    if (freq < 30) return { type: 'Beta', description: 'Active thinking, concentration' };
    return { type: 'Gamma', description: 'High-level cognitive processing' };
  };

  const waveInfo = getWaveTypeInfo(frequency);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Interactive Brainwave Frequency Explorer
      </h3>
      
      <div className="space-y-6">
        {/* Frequency Display */}
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {frequency} Hz
          </div>
          <div className="text-lg font-semibold text-gray-700 mb-1">
            {waveInfo.type} Waves
          </div>
          <div className="text-sm text-gray-600">
            {waveInfo.description}
          </div>
        </div>

        {/* Frequency Slider */}
        <div className="px-4">
          <label htmlFor="frequency-slider" className="block text-sm font-medium text-gray-700 mb-2">
            Frequency Range: 1 Hz - 40 Hz
          </label>
          <input
            id="frequency-slider"
            type="range"
            min="1"
            max="40"
            value={frequency}
            onChange={(e) => handleFrequencyChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((frequency - 1) / 39) * 100}%, #e5e7eb ${((frequency - 1) / 39) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 Hz</span>
            <span>20 Hz</span>
            <span>40 Hz</span>
          </div>
        </div>

        {/* Play/Stop Button */}
        <div className="text-center">
          <button
            onClick={isPlaying ? stopTone : startTone}
            className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
              isPlaying 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isPlaying ? 'Stop Tone' : 'Play Tone'}
          </button>
          <p className="text-xs text-gray-500 mt-2">
            {isPlaying ? 'Playing audio tone at current frequency' : 'Click to hear the frequency'}
          </p>
        </div>

        {/* Wave Type Information */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Brainwave Types Guide</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="font-medium">Delta (1-4 Hz):</span>
              <span className="text-gray-600 ml-1">Deep sleep</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="font-medium">Theta (4-8 Hz):</span>
              <span className="text-gray-600 ml-1">Meditation</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="font-medium">Alpha (8-13 Hz):</span>
              <span className="text-gray-600 ml-1">Relaxed focus</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="font-medium">Beta (13-30 Hz):</span>
              <span className="text-gray-600 ml-1">Active thinking</span>
            </div>
          </div>
        </div>

        {/* Alpha Wave Focus */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">Alpha Wave Benefits (8-12 Hz)</h4>
          <ul className="text-green-700 text-sm space-y-1">
            <li>• Enhanced creativity and problem-solving</li>
            <li>• Improved focus and concentration</li>
            <li>• Reduced stress and anxiety</li>
            <li>• Better sleep quality</li>
            <li>• Increased learning capacity</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Important Notice</h4>
          <p className="text-yellow-700 text-sm">
            This is a demonstration tool. The Edison Wave uses advanced binaural beat 
            technology for safe, effective brainwave entrainment. If you have epilepsy 
            or are sensitive to audio frequencies, consult a healthcare professional 
            before using any brainwave entrainment technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveFrequencySlider;
