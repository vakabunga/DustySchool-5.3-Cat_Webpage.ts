type CatBreed = {
    id: string;
    name: string;
};

type CatImage = {
    url: string;
};

const app: HTMLElement = document.body;
const catList: HTMLSelectElement = document.createElement('select');
catList.add(new Option('Choose cat breed', '0'));
const catImageContainer: HTMLDivElement = document.createElement('div');
catImageContainer.classList.add('cat-image-container');
const notFoundImageUrl: string = 'https://avatars.mds.yandex.net/i?id=526a3bced1959c262520a44dcca2931b_l-12305949-images-thumbs&n=13';

fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
        'x-api-key': API_KEY,
    },
})
    .then((response) => response.json())
    .then((data: []) => {
        data.forEach((elem: CatBreed) => {
            const option = new Option(elem.name, elem.id);
            catList.add(option);
        });

        app.appendChild(catList);
        app.appendChild(catImageContainer);
    });

catList.addEventListener('change', () => {
    if (catList.value === '0') {
        return;
    }

    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${catList.value}&api_key=${API_KEY}`)
        .then((response) => response.json())
        .then((data: CatImage[]) => {
            const catImage = document.createElement('img');
            
            catImage.src = data.length !== 0 ? data[0].url : notFoundImageUrl;

            catImageContainer.innerHTML = '';
            catImageContainer.appendChild(catImage);
        });
});
