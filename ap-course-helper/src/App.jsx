import React, { useState } from 'react';

// Place fetchAIResponse here, outside the App component
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
    // Call fetchAIResponse here to get the AI-generated response
    const apiResponse = await fetchAIResponse(subject, question);
    setResponse(apiResponse);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">AP Course Helper</h1>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Subject:</label>
        <select 
          value={subject} 
          onChange={handleSubjectChange} 
          className="border rounded-lg px-3 py-2">
          <option value="">Select an AP Subject</option>
          <option value="ap-physics">AP Physics</option>
          <option value="ap-calculus">AP Calculus</option>
          {/* Add more AP courses as options */}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Enter Your Question:</label>
        <input 
          type="text" 
          value={question} 
          onChange={handleQuestionChange} 
          className="border rounded-lg px-3 py-2 w-full" />
      </div>

      <button 
        onClick={handleSubmit} 
        className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Get Answer
      </button>

      {response && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">AI's Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default App;


