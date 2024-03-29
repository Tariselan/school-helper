document.addEventListener('DOMContentLoaded', () => {
    let currentWord = {}; // Variable to store the current word
    let points = 0;
    let highscore = 0;
    const pointsSpan = document.getElementById('points');
    const hsSpan = document.getElementById('hs')
    
    // Function to fetch and display all words from the Maori table
    const fetchWords = () => {
        fetch('/maori')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched words:', data); // Log fetched data
                // Randomly select a word
                currentWord = data[Math.floor(Math.random() * data.length)];
                console.log('Current word:', currentWord); // Log selected word
                // Display the word for translation
                document.getElementById('wordToTranslate').textContent = currentWord.word;
            })
            .catch(error => console.error('Error fetching words:', error));
    };
    
    // Function to check the translation
    const checkTranslation = () => {
        const userTranslation = document.getElementById('translationInput').value.trim();
        if (userTranslation.toLowerCase() === currentWord.meaning.toLowerCase()) {
            // If correct, add points (you can implement this part)
            fetchWords();
            points++;
            if (points >= highscore) {
                highscore = points;
            }
            pointsSpan.innerText = points;
            hsSpan.innerText = highscore;
        } else {
            // If incorrect, show alert with correct translation
            alert(`Incorrect! The correct translation is: ${currentWord.meaning}`);
            points = 0;
            pointsSpan.innerText = points;
        }
        // Clear the input field
        document.getElementById('translationInput').value = '';
    };
    
    // Event listener for the form submission
    document.getElementById('translationForm').addEventListener('submit', event => {
        event.preventDefault();
        checkTranslation();
    });
    
    // Initial fetch of words when the page loads
    fetchWords();
});
