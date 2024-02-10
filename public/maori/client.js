document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch and display all words from the Maori table
    const fetchWords = () => {
        fetch('/maori')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById('wordTableBody');
                tableBody.innerHTML = ''; // Clear existing table rows
                // Sort words alphabetically by word
                data.sort((a, b) => a.word.localeCompare(b.word));
                data.forEach(word => {
                    const row = tableBody.insertRow();
                    // Insert word and meaning into table
                    row.innerHTML = `<td>${word.word}</td><td>${word.meaning}</td><td><button class="action-button remove-button" data-word="${word.word}">Remove</button></td>`;
                });
            })
            .catch(error => console.error('Error fetching words:', error));
    };

    // Initial fetch of words when the page loads
    fetchWords();

    // Form submit event listener to add a new word
    const addWordForm = document.getElementById('addWordForm');
    addWordForm.addEventListener('submit', event => {
        event.preventDefault();
        const word = document.getElementById('wordInput').value;
        const meaning = document.getElementById('meaningInput').value;
        fetch('/maori', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ word, meaning })
        })
        .then(response => response.json())
        .then(data => {
            // Clear form inputs after adding word
            document.getElementById('wordInput').value = '';
            document.getElementById('meaningInput').value = '';
            // Fetch and display updated list of words
            fetchWords();
        })
        .catch(error => console.error('Error adding word:', error));
    });

    // Function to remove a word
    const removeWord = (word) => {
        fetch(`/maori/${word}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                fetchWords(); // Fetch and display updated list of words
            } else {
                console.error('Error removing word');
            }
        })
        .catch(error => console.error('Error removing word:', error));
    };

    // Event delegation for remove word buttons
    const wordTable = document.getElementById('wordTable');
    wordTable.addEventListener('click', event => {
        if (event.target.classList.contains('remove-button')) {
            const word = event.target.dataset.word;
            removeWord(word);
        }
    });
});
