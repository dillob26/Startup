import React from 'react';
import './guide.css';

export function Guide() {
    const [image_url, set_image_url] = React.useState('');

    React.useEffect(() => {
        const random = Math.floor(Math.random() * 1000);
        fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
            .then((response) => response.json())
            .then((data) => {
                const width = 300 + Math.floor(Math.random() * 300);
                const height = 200 + Math.floor(Math.random() * 200);
                const api_url = `https://picsum.photos/id/${data[0].id}/${width}/${height}`;
                set_image_url(api_url);
            })
            .catch();
    }, []);


  return (
    <main className="main-guide container-fluid bg-secondary text-center">
      <h3>guide</h3>
        <p>
            In Word Chain your goal in this game is to go from one word to another word.
        </p>
        <p>
            In order to get to the target word you need to make 1 letter changes to the current word in order to make the target word.
        </p>
        <p>
            Do not worry about making an ineffecient path as you are ranked based on time not by fewest path.
        </p>
        <p>
            All paths are possible so do not give up.
        </p>


        <img src={image_url} alt='random image'></img>
    </main>
  );
}