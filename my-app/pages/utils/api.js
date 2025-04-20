import axios from 'axios';

const API_URL = 'https://hybrid-rag-api.onrender.com';  // Replace with your FastAPI backend URL

export const uploadPdf = async (pdfFile) => {
  const formData = new FormData();
  formData.append('pdf', pdfFile);

  try {
    const response = await axios.post(`${API_URL}/upload-doc`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading PDF:', error);
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

