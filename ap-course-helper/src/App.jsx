import React, { useState } from 'react';

// AI response function
const fetchAIResponse = async (subject, question) => {
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_API_KEY`
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `You're an expert in ${subject}. Simplify the following problem: ${question}`,
      max_tokens: 100
    })
  });

  const data = await response.json();
  return data.choices[0].text.trim();
};

const App = () => {
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSubjectChange = (e) => setSubject(e.target.value);
  const handleQuestionChange = (e) => setQuestion(e.target.value);

  const handleSubmit = async () => {
    const apiResponse = await fetchAIResponse(subject, question);
    setResponse(apiResponse);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-black text-white flex flex-col items-center justify-center font-sans p-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-pulse">
        AP Course Helper
      </h1>

      <div className="mb-4 w-full max-w-md">
        <label className="block text-lg font-medium mb-2">Select Subject:</label>
        <select 
          value={subject} 
          onChange={handleSubjectChange} 
          className="w-full border-2 border-blue-500 bg-transparent text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300 ease-in-out">
          <option value="" className="bg-black">Select an AP Subject</option>
          <option value="ap-physics" className="bg-black">AP Physics</option>
          <option value="ap-calculus" className="bg-black">AP Calculus</option>
          {/* Add more AP courses here */}
        </select>
      </div>

      <div className="mb-4 w-full max-w-md">
        <label className="block text-lg font-medium mb-2">Enter Your Question:</label>
        <input 
          type="text" 
          value={question} 
          onChange={handleQuestionChange} 
          className="w-full border-2 border-purple-500 bg-transparent text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300 ease-in-out" 
        />
      </div>

      <button 
        onClick={handleSubmit} 
        className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
        Get Answer
      </button>

      {response && (
        <div className="mt-6 p-4 bg-black bg-opacity-40 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-cyan-400">AI's Response:</h2>
          <p className="text-lg text-white">{response}</p>
        </div>
      )}
    </div>
  );
};

export default App;
