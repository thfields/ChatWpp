/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { Microphone, Stop, Play } from "@phosphor-icons/react";

const AudioRecorder = ({ onSendAudio }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Erro ao acessar o microfone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendAudio = () => {
    if (audioBlob) {
      onSendAudio(audioBlob);
      setAudioBlob(null); // Limpar o estado de audioBlob após o envio
    }
  };

  return (
    <div className="audio-recorder">
      {isRecording ? (
        <button onClick={stopRecording}><Stop size={32} /></button>
      ) : (
        <button onClick={startRecording}><Microphone size={32} /></button>
      )}
      {audioBlob && !isRecording && (
        <button onClick={sendAudio}><Play size={32} /></button>
      )}
    </div>
  );
};

export default AudioRecorder;
