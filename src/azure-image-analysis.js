async function analyzeImage(imageUrl) {
  const endpoint = process.env.REACT_APP_COMPUTER_VISION_ENDPOINT;
  const key = process.env.REACT_APP_OCP_APIM_KEY;

  try {
    const response = await fetch(endpoint + '/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=caption', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': key
      },
      body: JSON.stringify({ url: imageUrl })
    });

    if (!response.ok) {
      throw new Error('Error al llamar al endpoint de Computer Vision');
    }

    const data = await response.json();
    return { ...data, imageUrl };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export {
  analyzeImage
}