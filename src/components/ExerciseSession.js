import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

const ExerciseSession = ({ initialMode = 'STRENGTH', wsUrl = 'ws://127.0.0.1:8000/ws/kineia', onClose, onResult }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const ws = useRef(null);
  const cameraRef = useRef(null);
  const isActiveRef = useRef(true);
  const [mode, setMode] = useState(initialMode);
  const [wsState, setWsState] = useState('Connexion...');
  const [backendResult, setBackendResult] = useState({ angle: 0, status: 'En attente...', diagnostic: '' });

  const stopWebcam = () => {
    isActiveRef.current = false;
    if (cameraRef.current?.stop) {
      cameraRef.current.stop();
      cameraRef.current = null;
    }

    const stream = webcamRef.current?.stream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const handleCloseSession = () => {
    stopWebcam();
    ws.current?.close();
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => setWsState('✅ Connecté');
    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setBackendResult({ angle: data.angle ?? 0, status: data.status ?? 'Analyse en cours...', diagnostic: data.diagnostic ?? '' });
        if (onResult) onResult({ angle: data.angle, status: data.status, mode });
      } catch (err) {
        console.error('WS parse error', err);
      }
    };
    ws.current.onerror = () => setWsState('⚠️ Erreur connexion');
    ws.current.onclose = () => setWsState('Fermé');

    const pose = new Pose({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}` });
    pose.setOptions({ modelComplexity: 1, smoothLandmarks: true, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });

    pose.onResults((results) => {
      if (!canvasRef.current || !webcamRef.current) return;
      const canvasCtx = canvasRef.current.getContext('2d');
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      if (results.image) canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);
      if (results.poseLandmarks) {
        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 4 });
        drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#FF0000', lineWidth: 2 });
      }
      canvasCtx.restore();

      if (ws.current?.readyState === WebSocket.OPEN) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) ws.current.send(JSON.stringify({ image: imageSrc, mode }));
      }
    });

    if (webcamRef.current && webcamRef.current.video) {
      isActiveRef.current = true;
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          if (!isActiveRef.current || !webcamRef.current?.video) return;
          await pose.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480
      });
      cameraRef.current = camera;
      camera.start();
    }

    return () => {
      stopWebcam();
      ws.current?.close();
      if (pose && typeof pose.close === 'function') pose.close();
    };
  }, [wsUrl, mode, onResult]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '640px' }}>
        <div style={{ flex: 1 }}>
          <p style={{ margin: '0 0 8px', fontSize: '0.85rem', color: '#666' }}><strong>Mode :</strong> {mode === 'STRENGTH' ? '🏋️ Renforcement' : '🧘 Étirement'}</p>
          <p style={{ margin: 0, fontSize: '0.85rem', color: wsState.includes('Connecté') ? '#00aa00' : wsState.includes('Erreur') ? '#ff3333' : '#ff9900' }}>{wsState}</p>
        </div>
        <button onClick={() => setMode('STRENGTH')} style={{ padding: '8px 16px', background: mode === 'STRENGTH' ? '#007bff' : '#ddd', color: mode === 'STRENGTH' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>Renforcement</button>
        <button onClick={() => setMode('STRETCHING')} style={{ padding: '8px 16px', background: mode === 'STRETCHING' ? '#28a745' : '#ddd', color: mode === 'STRETCHING' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>Étirement</button>
      </div>

      <div style={{ position: 'relative', width: '640px', height: '480px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
        <Webcam ref={webcamRef} screenshotFormat="image/jpeg" style={{ display: 'none' }} />
        <canvas ref={canvasRef} width="640" height="480" style={{ transform: 'scaleX(-1)', width: '100%', display: 'block' }} />
        <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(0,0,0,0.75)', color: 'white', padding: '12px 16px', borderRadius: '8px', fontSize: '0.95rem', minWidth: '200px', backdropFilter: 'blur(4px)' }}>
          <p style={{ margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 'bold' }}>{backendResult.status}</p>
          <p style={{ margin: '0 0 4px 0', fontSize: '0.9rem' }}>📐 Angle : <span style={{ fontWeight: 'bold', color: '#ffff99' }}>{backendResult.angle.toFixed(1)}°</span></p>
          {backendResult.diagnostic && <p style={{ margin: '0', fontSize: '0.85rem', color: '#66ff99', fontStyle: 'italic' }}>💡 {backendResult.diagnostic}</p>}
        </div>
      </div>

      <button
        type="button"
        onClick={handleCloseSession}
        style={{ padding: '10px 24px', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', transition: 'background 0.3s' }}
        onMouseEnter={(e) => e.target.style.background = '#ff5252'}
        onMouseLeave={(e) => e.target.style.background = '#ff6b6b'}
      >
        ❌ Fermer la session
      </button>
    </div>
  );
};

export default ExerciseSession;