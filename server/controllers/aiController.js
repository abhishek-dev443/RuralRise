const generateMockResponse = (type, prompt, language) => {
  const delays = {
    title: 1000,
    description: 2000,
    caption: 1500,
    tags: 1000,
    business: 2000
  };

  const delay = delays[type] || 1500;

  return new Promise((resolve) => {
    setTimeout(() => {
      let result = '';
      if (language === 'hi') {
        result = `Mocked Hindi ${type} for: ${prompt}`;
      } else if (language === 'mr') {
        result = `Mocked Marathi ${type} for: ${prompt}`;
      } else {
        // English default
        switch (type) {
          case 'title':
            result = `Premium Organic ${prompt} - Handcrafted Quality`;
            break;
          case 'description':
            result = `Discover our authentic ${prompt}, carefully crafted by local artisans. Made with sustainable materials and traditional techniques, this product brings the essence of rural craftsmanship to your home.`;
            break;
          case 'caption':
            result = `Elevate your lifestyle with our handcrafted ${prompt}. Support local artisans and embrace sustainable living! 🌿✨ #Handcrafted #LocalRoots`;
            break;
          case 'tags':
            result = `organic, handcrafted, ${prompt.replace(/\s+/g, ', ')}, sustainable, local, premium`;
            break;
          case 'business':
            result = `Welcome to our store! We are passionate about bringing the finest ${prompt} directly from our village to your doorstep, ensuring fair trade and exceptional quality.`;
            break;
          default:
            result = `Generated ${type} for: ${prompt}`;
        }
      }
      resolve(result);
    }, delay);
  });
};

// @desc    Generate AI Content
// @route   POST /api/ai/generate
// @access  Private
const generateContent = async (req, res, next) => {
  try {
    const { type, prompt, language = 'en' } = req.body;

    if (!type || !prompt) {
      res.status(400);
      throw new Error('Type and prompt are required');
    }

    const validTypes = ['title', 'description', 'caption', 'tags', 'business'];
    if (!validTypes.includes(type)) {
      res.status(400);
      throw new Error('Invalid generation type');
    }

    // In a real implementation, we would check process.env.AI_API_KEY
    // and call OpenAI/Anthropic/Gemini here.
    // For now, we always use the mock provider as requested for Phase 4.

    const generatedText = await generateMockResponse(type, prompt, language);

    res.json({
      success: true,
      data: generatedText,
      provider: process.env.AI_API_KEY ? 'ai' : 'mock'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateContent
};
