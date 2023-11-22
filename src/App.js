import React, { useState, useRef } from 'react';
import { analyzeImage } from './azure-image-analysis';
import { generateImage } from './azure-image-generation';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const [analysisList, setAnalysisList] = useState(JSON.parse(localStorage.getItem('analysisList')) || [])
  const [generatedList, setGeneratedList] = useState(JSON.parse(localStorage.getItem('generatedList')) || [])

  const handleAnalyzeClick = async () => {
    const promptValue = inputRef.current.value;
    setIsLoading(true);
    const res = await analyzeImage(promptValue);
    if (res === null)
      return;
    localStorage.setItem('analysisList', JSON.stringify([res, ...analysisList]));
    setAnalysisList([res, ...analysisList]);
    inputRef.current.value = '';
    setIsLoading(false);
  };

  const handleGenerateClick = async () => {
    const promptValue = inputRef.current.value;
    setIsLoading(true);
    const res = await generateImage(promptValue);
    console.log('res: ', res);
    if (res === null)
      return;
    localStorage.setItem('generatedList', JSON.stringify([res, ...generatedList]));
    setGeneratedList([res, ...generatedList]);
    inputRef.current.value = '';
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Computer vision</h1>
      <label htmlFor="prompt">Insert URL or type prompt:</label><br />
      <input name="prompt"
        type="text"
        placeholder="Enter URL to analyze or textual prompt to generate an image"
        ref={inputRef}
        style={{ width: "400px" }} /> <br />
      <button onClick={handleAnalyzeClick} style={{ marginRight: "6px" }}>Analyze</button>
      <button onClick={handleGenerateClick}>Generate</button>
      {isLoading && (
        <img style={{ width: "20px" }} src="https://i.gifer.com/ZKZg.gif" alt="loading" />
      )}
      <div className="content-container">
        <section className="analyzed">
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
        </section>
        <section className="generated">
          {!!generatedList.length && (
            <h2>Open AI Images Generated</h2>
          )}
          {!!generatedList.length && generatedList.map((res, i) => (
            <div key={i}>
              <h3>Result {generatedList.length - i}</h3>
              <img src={res.data[0].url} style={{ width: "480px" }} alt="generated from prompt" />
              <br />
              <pre>
                {JSON.stringify(res, null, 2)}
              </pre>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
