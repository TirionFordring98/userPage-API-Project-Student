document.addEventListener('DOMContentLoaded', function () {

    const loadUserDataButton = document.querySelector('.buttons button:first-of-type');
    loadUserDataButton.addEventListener('click', function () {
        $.ajax({
            url: 'http://localhost:3000/api/random-users',
            dataType: 'json',
            success: function (randomUsers) {

                updateFriendsContainer(randomUsers);
            },
            error: function (error) {
                console.error('Error fetching random users data:', error);
            },
        });
    });
    
    const displayUserButton = document.querySelector('.buttons button:last-of-type');
    displayUserButton.addEventListener('click', function () {
        const friendsContainer = document.querySelector('.friends-container');
        const friendsList = friendsContainer.querySelectorAll('li');
        if (friendsList.length > 0) {
            const randomFriend = getRandomElement(Array.from(friendsList));
            fetchRandomQuoteAndUpdateUser(randomFriend.textContent.trim());
        } else {
            console.log('No friends available. Load user data first.');
        }
    });

    function fetchRandomQuoteAndUpdateUser(userName) {
        $.ajax({
            url: 'https://api.api-ninjas.com/v1/quotes?category=happiness',
            method: 'GET',
            headers: {
                'X-Api-Key': '8/j9xS5ERS4MNNPn4J9x/g==qS7yCIvb1n0BBrZk'
            },
            contentType: 'application/json',
            success: function (quoteResults) {
                console.log('API Response:', quoteResults);
                if (quoteResults.length > 0 && quoteResults[0].quote) {
                    updateQuoteContainer(quoteResults[0].quote);
                    updateUserContainer({
                        fullName: userName,
                        profilePicture: 'URL_TO_RANDOM_PROFILE_PICTURE_API',
                    });
                    fetchRandomPokemon()
                        .then(pokemonData => {
                            appendPokemonInfo(pokemonData);
                        });
                } else {
                    console.error('Invalid API response structure. Quote not found.');
                }
            },
            error: function (jqXHR) {
                console.error('Error fetching random quote:', jqXHR.responseText);
            }
        });
    }

    function appendPokemonInfo(pokemonData) {
        const userContainer = document.querySelector('.user-container');
        let pokemonContainer = document.querySelector('.pokemon-container');
        if (!pokemonContainer) {
            pokemonContainer = document.createElement('div');
            pokemonContainer.className = 'pokemon-container';
            userContainer.appendChild(pokemonContainer);
        }
        pokemonContainer.innerHTML = '';

        const pokemonInfo = `
        <div id="pokemon-image" style="background-image: url('${pokemonData.imageUrl}')"></div>
        <div id="pokemon-text">
            <p>Favorite Pokemon: ${pokemonData.name}</p>
        </div>`;
        pokemonContainer.innerHTML = pokemonInfo;
    }

    function fetchRandomPokemon() {
        const randomID = Math.floor(Math.random() * 842) + 1;
        return fetch(`https://pokeapi.co/api/v2/pokemon/${randomID}`)
            .then(response => response.json())
            .then(randomPokemon => {
                console.log(randomPokemon);
                return {
                    name: randomPokemon.name[0].toUpperCase() + randomPokemon.name.slice(1),
                    imageUrl: randomPokemon.sprites.front_default,
                };
            })
            .catch(error => {
                console.error('Error fetching random Pokemon data:', error);
            });
    }

    function updateUserContainer(randomUser) {
        const userContainer = document.querySelector('.user-container');
        const profilePictureUrl = `http://localhost:3000/api/random-profile-picture?username=${randomUser.fullName}`;

        userContainer.innerHTML = `
            <div class="user-info">
                <img class="profile-pic" src="${profilePictureUrl}" alt="Profile Picture">
                <p>${randomUser.fullName}</p>
            </div>`;
    }

    function updateQuoteContainer(quoteResult) {
        const quoteContainer = document.querySelector('.quote-container');
        quoteContainer.innerHTML = `<p>Favorite Quote:"${quoteResult}"</p>`;
    }

    function updateFriendsContainer(randomUsers) {
        const friendsContainer = document.querySelector('.friends-container');
        friendsContainer.innerHTML = '<ul>';
        const shuffledUsers = randomUsers.sort(() => Math.random() - 0.5);
        const selectedUsers = shuffledUsers.slice(0, 6);
        selectedUsers.forEach(user => {
            friendsContainer.innerHTML += `<li>${user.fullName}</li>`;
        });

        friendsContainer.innerHTML += '</ul>';
    }
    function getRandomElement(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
});