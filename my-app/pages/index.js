import { useState } from 'react';
import { uploadPdf, askQuestion, refreshBackend } from './utils/api'; // Added refreshBackend

export default function Home() {
  const [pdfFile, setPdfFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isAsking, setIsAsking] = useState(false);

  // Handle PDF file upload
  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  // Handle question input change
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  // Upload PDF with backend refresh
  const handleUploadPdf = async () => {
    if (!pdfFile) return;

    setIsUploading(true);
    try {
      // 🔁 Refresh backend before uploading
      await refreshBackend();

      const result = await uploadPdf(pdfFile);
      alert(result.message || 'PDF uploaded successfully');
      setResponse('');
      setQuestion('');
    } catch (error) {
      alert('Error uploading PDF');
    } finally {
      setIsUploading(false);
    }
  };

  // Ask question
  const handleAskQuestion = async () => {
    if (!question) return;

    setIsAsking(true);
    try {
      const answer = await askQuestion(question);
      setResponse(answer.answer || 'No answer found');
    } catch (error) {
      setResponse('Error asking question');
    } finally {
      setIsAsking(false);
    }
  };

  // Optional: manual backend reset
  const handleResetBackend = async () => {
    try {
      await refreshBackend();
      alert('Backend reset successfully');
      setResponse('');
      setQuestion('');
    } catch (error) {
      alert('Failed to reset backend');
    }
  };

  return (
    <div className="container">
      <h1>Upload PDF and Ask Questions</h1>

      <div>
        <h2>Upload PDF</h2>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleUploadPdf} disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload PDF'}
        </button>
        <button onClick={handleResetBackend} style={{ marginLeft: '10px' }}>
          Reset Backend
        </button>
      </div>

      <div>
        <h2>Ask a Question</h2>
        <input
          type="text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Ask your question here"
        />
        <button onClick={handleAskQuestion} disabled={isAsking}>
          {isAsking ? 'Asking...' : 'Ask'}
        </button>
      </div>

      {response && (
        <div>
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
