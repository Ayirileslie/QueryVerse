import axios from 'axios';

const API_URL = 'https://hybrid-rag-api.onrender.com';  // Replace with your FastAPI backend URL

export const uploadPdf = async (pdfFile, onUploadProgress) => {
  const formData = new FormData();
  formData.append('pdf', pdfFile);

  try {
    const response = await axios.post(`${API_URL}/upload-doc`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000, // ⏱️ Increase timeout to 60 seconds for large files
      onUploadProgress: onUploadProgress || (() => {}),
    });

    return response.data;
  } catch (error) {
    // Better logging for Axios error
    if (error.response) {
      console.error('Server responded with:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response from server. Request details:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

export const askQuestion = async (question) => {
  const formData = new FormData();
  formData.append('question', question);

  try {
    const response = await axios.post(`${API_URL}/ask`, formData);
    return response.data;
  } catch (error) {
    console.error('Error asking question:', error);
    throw error;
  }
};

export const refreshBackend = async () => {
  try {
    const response = await axios.post(`${API_URL}/refresh-backend`);
    return response.data;
  } catch (error) {
    console.error('Error refreshing backend:', error);
    throw error;
  }
};

