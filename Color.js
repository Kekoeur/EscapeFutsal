const association = {
    "RRR": "Q",
    "RRV": "P",
    "RRB": "Y",
    "RVR": "V",
    "RVV": "K",
    "RVB": "I",
    "RBR": "F",
    "RBV": "S",
    "RBB": "A",
    "VRR": "R",
    "VRV": "N",
    "VRB": "C",
    "VVR": "U",
    "VVV": "E",
    "VVB": "Z",
    "VBR": "D",
    "VBV": "B",
    "VBB": "M",
    "BRR": "H",
    "BRV": " ",
    "BRB": "J",
    "BVR": "G",
    "BVV": "T",
    "BVB": "X",
    "BBR": "O",
    "BBV": "W",
    "BBB": "L"
  }

function getColorFromLetters(letters) {
  // Convertir en majuscule et transformer en tableau
  const chars = letters.toUpperCase().split('');

  // Vérifier que la chaîne contient exactement 3 lettres
  if (chars.length % 3 || !chars.every(c => ['R', 'V', 'B'].includes(c))) {
    throw new Error("Entrée invalide : fournir exactement 3 lettres parmi R, V, B.");
  }

  const results = [];
  // Compter les occurrences
    for (let i = 0; i < chars.length; i += 2) {
        if(i==chars.length-1){
            switch (chars[i]) {
                case "R": results.push({position: `${i%3 +1}`,color: 'Rouge'}); break;
                case "V": results.push({position: `${i%3 +1}`,color: 'Vert'}); break;
                case "B": results.push({position: `${i%3 +1}`,color: 'Bleu'});break;
            }
        } else {
            const group = chars.slice(i, i + 2);
            const count = { R: 0, V: 0, B: 0 };
            group.forEach(c => count[c]++);

            const { R, V, B } = count;

            // Identifier la couleur en fonction des combinaisons
            let color = 'Couleur inconnue';
            if (R === 2) {
                results.push({position: `${i%3 +1}`,color: 'Rouge'})
                results.push({position: `${(i+1)%3 +1}`,color: 'Rouge'})
            }
            else if (V === 2) {
                results.push({position: `${i%3 +1}`,color: 'Vert'})
                results.push({position: `${(i+1)%3 +1}`,color: 'Vert'})
            }
            else if (B === 2) {
                results.push({position: `${i%3 +1}`,color: 'Bleu'})
                results.push({position: `${(i+1)%3 +1}`,color: 'Bleu'})
            }
            else if (R === 1 && V === 1) {
                results.push({position: `${i%3 +1}-${(i+1)%3 +1}`,color: 'Jaune'})
            }
            else if (R === 1 && B === 1) {
                results.push({position: `${i%3 +1}-${(i+1)%3 +1}`,color: 'Magenta'})
            }
            else if (V === 1 && B === 1) {
                results.push({position: `${i%3 +1}-${(i+1)%3 +1}`,color: 'Cyan'})
            }
            else {
                results.push({position: `${i%3 +1}-${(i+1)%3 +1}`,color: 'Inconnu'})
            }
        }
    }
    return results
}

function reverseAssociation(association) {
    const reversed = {};
    for (const [sequence, letter] of Object.entries(association)) {
      reversed[letter] = sequence;
    }
    return reversed;
}

console.log(reverseAssociation(association))

function reconstructSequenceFromText(text, association) {
    const reversed = reverseAssociation(association);
    let result = '';
  
    for (const char of text.toUpperCase()) {
      const seq = reversed[char];
      if (!seq) {
        throw new Error(`Lettre "${char}" non trouvée dans l'association.`);
      }
      result += seq;
    }
  
    return result;
}
  
  const text = "Tir";
  const reconstructed = reconstructSequenceFromText(text, association);
  console.log(`Texte : ${text}`);
  console.log(`Séquence reconstruite : ${reconstructed}`);

  function reconstructTextFromSequence(sequence, association) {
    let text = '';
  
    // Vérifie que la longueur est un multiple de 3
    if (sequence.length % 3 !== 0) {
      throw new Error("La séquence doit être un multiple de 3 caractères.");
    }
  
    for (let i = 0; i < sequence.length; i += 3) {
      const triplet = sequence.substring(i, i + 3);
      const letter = association[triplet];
      if (!letter) {
        throw new Error(`Aucune lettre trouvée pour la séquence "${triplet}".`);
      }
      text += letter;
    }
  
    return text;
  }
  

  console.log(reconstructSequenceFromText('Match', association))
  const tir = reconstructSequenceFromText('Match', association)
  console.log(reconstructTextFromSequence(tir, association))
  
  console.log(reconstructTextFromSequence("BVVRVBVRR", association))
  console.log(reconstructTextFromSequence("RBRBBRRRBVVVVRR", association))
  console.log(reconstructTextFromSequence("VBVVVRBVV", association))
  
