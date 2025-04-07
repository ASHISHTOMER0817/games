// This file is to create randomID for each game 

function generateRandomID() {
      const words = ["alpha", "beta", "gamma", "delta", "omega", "sigma", "zeta", "kappa", "lambda", "theta"];
      const numbers = "0123456789";
      const signs = "!@#$%^&*()-_=+[]{}|;:',.<>?/";
  
      let id = "";
  
      while (id.length < 32) {
          const randomSource = Math.floor(Math.random() * 3);
          if (randomSource === 0) {
              // Add a random word
              let word = words[Math.floor(Math.random() * words.length)];
              if (id.length + word.length <= 32) {
                  id += word;
              }
          } else if (randomSource === 1) {
              // Add a random number
              id += numbers[Math.floor(Math.random() * numbers.length)];
          } else {
              // Add a random sign
              id += signs[Math.floor(Math.random() * signs.length)];
          }
      }
  
      return id;
  }
  
export default generateRandomID;
  