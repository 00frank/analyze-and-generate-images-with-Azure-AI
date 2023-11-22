import React, { useState } from 'react';
import { analyzeImage } from './azure-image-analysis';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisList, setAnalysisList] = useState(JSON.parse(localStorage.getItem('analysisList')) || [])
  const [generatedList, setGeneratedList] = useState([])

  const handleAnalyzeClick = async () => {
    const promptValue = document.querySelector('input[name="prompt"]').value;
    setIsLoading(true);
    const res = await analyzeImage(promptValue);
    if (res === null)
      return;
    localStorage.setItem('analysisList', JSON.stringify([res, ...analysisList]));
    setAnalysisList([res, ...analysisList]);
    setIsLoading(false);
  };

  const handleGenerateClick = () => {
    console.log("Generate");
  };

  return (
    <div>
      <h1>Computer vision</h1>
      <label htmlFor="prompt">Insert URL or type prompt:</label><br />
      <input name="prompt"
        type="text"
        placeholder="Enter URL to analyze or textual prompt to generate an image"
        style={{ width: "400px" }} /> <br />
      <button onClick={handleAnalyzeClick} style={{ marginRight: "6px" }}>Analyze</button>
      <button onClick={handleGenerateClick}>Generate</button>
      <div>
        {isLoading && (
          <img style={{ width: "48px" }} src="https://i.gifer.com/ZKZg.gif" alt="loading" />
        )}
        {!!analysisList.length && (
          <h2>Computer vision Analysis</h2>
        )}
        {!!analysisList.length && analysisList.map((res, i) => (
          <div key={i}>
            <h3>Result {analysisList.length - i}</h3>
            <img src={res.imageUrl} style={{ width: "480px" }} alt="loaded from url" />
            <br />
            <pre>
              {JSON.stringify(res, null, 2)}
            </pre>
          </div>
        ))}
        {!!generatedList.length && (
          <h2>Computer vision Generated</h2>
        )}
        {!!generatedList.length && generatedList.map((res, i) => (
          <div key={i}>
            <h3>Result {i + 1}</h3>
            <img src={res.imageUrl} alt="generated from prompt" />
            {JSON.stringify(res)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
