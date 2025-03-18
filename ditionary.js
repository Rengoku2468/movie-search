// Replace with your new API key
function getword() {
    const search = document.getElementById('search').value;
    if (search === '') {
        alert('Please enter a word');
        return;
    }
    const apiKey = "9d3645ae-1e6d-4b31-9534-2432abce019a";
    const apiUrl = `https://dictionaryapi.com/api/v3/references/sd3/json/${search}?key=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Word not found or API error');
            }
            return response.json();
        })
        .then(data => displayWord(data))
        .catch(error => {
            document.getElementById('dictionary_bod').innerHTML = `<p style="color: red;">${error.message}</p>`;
            console.error('Error fetching word data:', error);
        });
}

function displayWord(data) {
    if (data.length === 0) {
        document.getElementById('dictionary_bod').innerHTML = `<p style="color: red;">No definition found for the word.</p>`;
        return;
    }

    const wordInfo = `
        <h3>${data[0].meta.id}</h3>
        <p>Definition: ${data[0].shortdef.join(', ')}</p>
    `;
    document.getElementById('dictionary_bod').innerHTML = wordInfo;
}