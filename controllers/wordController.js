const WordController = {
  getRandomWord: (req, res) => {
    if (!req.session.token) {
      return res.status(401).send('No autorizado. Debes iniciar sesión para buscar palabras.');
    }
  
    const words = [
      { word: 'apple', definitions: ['A fruit', 'A tech company'] },
      { word: 'dog', definitions: ['A domesticated carnivorous mammal', 'A pet'] },
      { word: 'computer', definitions: ['An electronic device for storing and processing data'] },
    ];
  
    const randomWord = words[Math.floor(Math.random() * words.length)];
    res.json(randomWord);
  }
  };
  
  module.exports = WordController;
  