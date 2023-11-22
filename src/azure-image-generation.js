async function generateImage(prompt) {
  const endpoint = process.env.REACT_APP_OPEN_AI_GENERATION_ENDPOINT;
  const key = process.env.REACT_APP_OPEN_AI_KEY;

  try {
    const response = await fetch(endpoint + '/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + key
      },
      body: JSON.stringify({
        "model": "dall-e-2",
        prompt,
      })
    });

    if (!response.ok) {
      throw new Error('Error al llamar al endpoint de Computer Vision');
    }

    const data = await response.json();
    return { ...data, prompt };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export {
  generateImage
}
