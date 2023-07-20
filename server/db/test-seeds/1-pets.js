const userId = 'auth0|649015576ef896963ad50a97'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  return knex('pets').insert([
    {
      id: 1,
      ownerId: userId,
      name: 'Aileen',
      bio: "The canine comedian who lives by his motto: 'If you can't make them laugh, give them the puppy eyes.' Famous for his incessant tail wagging and unyielding belief that every delivery person is an undercover spy, Bark never fails to keep us entertained.",
      animal: 'dog',
      imageUrl:
        'https://cdn.pixabay.com/photo/2019/08/19/07/45/corgi-4415649_1280.jpg',
      points: 0,
    },
    {
      id: 2,
      ownerId: userId,
      name: 'Giralda',
      bio: "An aspiring astronaut who firmly believes that every tall furniture in the house is her personal rocket. With a PhD in pushing things off tables and a minor in nocturnal sprints, she's always ready to knock out the competition (and the flower vases).",
      animal: 'cat',
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg',
      points: 7,
    },
    {
      id: 3,
      ownerId: userId,
      name: 'Letizia',
      bio: "The world's most prolific birdwatcher. Though he occasionally confuses a good nap with cardio, he's unbeatable when it comes to catching laser dots. His three passions in life are sunbathing, sushi, and, oddly enough, the news channel.",
      animal: 'cat',
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg',
      points: 0,
    },
    {
      id: 4,
      ownerId: userId,
      name: 'Dominique',
      bio: 'Reverse-engineered intermediate data-warehouse',
      animal: 'cat',
      imageUrl:
        'https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg',
      points: 0,
    },
    {
      id: 5,
      ownerId: userId,
      name: 'Bob',
      bio: "For you I'll create, artistic works of poo since, you save them in bags",
      animal: 'dog',
      imageUrl:
        'https://cdn.pixabay.com/photo/2016/07/15/15/55/dachshund-1519374_1280.jpg',
      points: 0,
    },
    {
      id: 6,
      ownerId: userId,
      name: 'Bodhi',
      bio: 'Focused for four-legged fur friends fun, frolicking fast forever from fantastically frightening flickering ferns',
      animal: 'dog',
      imageUrl:
        'https://cdn.pixabay.com/photo/2014/08/21/14/51/dog-423398_1280.jpg',
      points: 0,
    },
    {
      id: 7,
      ownerId: userId,
      name: 'Bean',
      bio: 'It is 2am, time to lick your face until you pat me',
      animal: 'cat',
      imageUrl:
        'https://cdn.pixabay.com/photo/2018/04/20/17/18/cat-3336579_1280.jpg',
      points: 0,
    },
  ])
}
