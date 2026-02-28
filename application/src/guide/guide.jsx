import React from 'react';
import './guide.css';

export function Guide() {
    const mountain_image = ["mountain_1.png", "mountain_2.png", "mountain_3.png"];

    function get_random_mountain_image() {
        const random_index = Math.floor(Math.random() * mountain_image.length);
        return mountain_image[random_index];
    }


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
            One thing to note is that most paths for 3 letter words are possible so do not give up so easily.
        </p>
        <p>
            As the amount of letters increase the higher the chance there is for a chain to not be possible.
        </p>
        <p>
            Do not worry about making an ineffecient path as you are ranked based on time not by fewest path.
        </p>


        <img src={get_random_mountain_image()} alt='mountain image' className='uniform-image'></img>
    </main>
  );
}