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
      name: 'Apocalypse',
      bio: "If there's a competition for being cute, I'd win paws down!",
      animal: 'red panda',
      points: 7,
      imageUrl:
        'https://cdn.discordapp.com/attachments/1120465010347487343/1121311841952477254/image.png',
    },
    {
      id: 2,
      ownerId: userId,
      name: 'Doug',
      bio: 'His name is Doug. Sometimes Douglas, but mainly Doug. Doug the dog',
      animal: 'dog the doug',
      points: 2_147_483_647,
      imageUrl:
        'https://cdn.discordapp.com/attachments/1120465010347487343/1121311988572749824/20230622_094709.jpg',
    },
    {
      id: 3,
      ownerId: userId,
      name: 'Dougal (AKA dougél, poo-smell, shmoo-shmell)',
      bio: 'Former Profession:  infamous gutter rat, Current Profession: lap rat',
      animal: 'cat (part rat?)',
      points: 590_000,
      imageUrl:
        'https://cdn.discordapp.com/attachments/1120465010347487343/1121317622500298813/IMG_4893.jpg',
    },
    {
      id: 4,
      ownerId: userId,
      name: 'Mulan',
      bio: "Mulan, a majestic feline with a heart full of curiosity and a passion for exploration, reigns as the Fluffy Queen in her domain. Despite her petite stature, Mulan possesses an undeniable charm that captivates everyone she encounters.\n\nWith an insatiable love for the great outdoors, Mulan delights in venturing into the world, fearlessly embracing the wonders it has to offer. Whether it's climbing trees, chasing butterflies, or embarking on daring expeditions, Mulan's spirit of adventure knows no bounds.\n\nOne cannot help but be enchanted by Mulan's luxurious and voluminous coat, as if she were draped in a regal mantle of pure fluffiness. Her fluffy fur serves as a testament to her royal heritage, emphasising her rightful place as the queen of all things soft and cuddly.\n\nWhile Mulan may be the epitome of elegance and grace, she also possesses a mischievous streak that adds an extra spark to her character. Playtime with her is always filled with laughter and joy, as she delights in entertaining her loyal subjects with her acrobatic prowess and captivating charm.\n\nJoin Mulan on her grand adventures as she fearlessly explores the world, showcasing her fluffy magnificence and embracing her role as the one and only Fluffy Queen!\n\nNote: This bio is purely fictional and created for entertainment purposes.",
      animal: 'cat queen',
      points: 777_777_777,
      imageUrl:
        'https://cdn.discordapp.com/attachments/1120465010347487343/1121347941135814706/2A49459D-B1B8-4224-9E8F-4D00BCA2E2D8_1_105_c.jpeg',
    },
    {
      id: 5,
      ownerId: userId,
      name: 'Morrissey',
      bio: 'An absolute slut for dental biscuits. My passion is murder 🗡️.',
      animal: 'cat',
      points: -3,
      imageUrl:
        'https://cdn.discordapp.com/attachments/1120465010347487343/1121360224490639411/image.png',
    },
    {
      id: 6,
      ownerId: userId,
      name: 'Cedric',
      bio: '@cedricthepug',
      animal: 'dog',
      points: 73_909_065,
      imageUrl:
        'https://cdn.discordapp.com/attachments/1120465010347487343/1121360771872469102/image.png',
    },
    {
      id: 7,
      ownerId: userId,
      name: 'Cream',
      bio: 'I love playing hide and seek with mummy ❤️',
      animal: 'cat',
      points: 0,
      imageUrl:
        'https://cdn.discordapp.com/attachments/1120465010347487343/1121375607385767986/2C809582-E83B-4578-B790-227C81441879.JPG',
    },
    {
      id: 8,
      ownerId: userId,
      name: 'Ari',
      bio: 'I am glorious looking but a dumb little princess that once ate a paper star',
      animal: 'cat',
      points: 321_489,
      imageUrl:
        'https://cdn.discordapp.com/attachments/1120465010347487343/1121392670556815440/26025706_1770347406322898_2683792454716494885_o.png',
    },
    {
      id: 9,
      ownerId: userId,
      name: 'Munta, Mr Muntz, Mr Moo, Moo Moo',
      bio: 'The king of snugs. Loves car rides, long walks on the beach, and car rides that end with long walks on the beach',
      animal: 'Doggo. Snuggle Monster',
      points: 6_000_011,
      imageUrl:
        'https://cdn.discordapp.com/attachments/1120465010347487343/1121334706965856276/mr_muntz.jpeg',
    },
    {
      id: 10,
      ownerId: userId,
      name: 'Lily (AKA wee-wee, weenie-bby, me-me)',
      bio: 'The sweetest, loveliest girl to ever exist. Drools lots when happy. Quirk: has one eyeball smaller than the other ',
      animal: 'Definitely full cat',
      points: 590_000,
      imageUrl:
        'https://cdn.discordapp.com/attachments/1120465010347487343/1121317622500298813/IMG_4893.jpg',
    },
    {
      id: 21,
      ownerId: userId,
      name: 'Aileen',
      bio: "The canine comedian who lives by his motto: 'If you can't make them laugh, give them the puppy eyes.' Famous for his incessant tail wagging and unyielding belief that every delivery person is an undercover spy, Bark never fails to keep us entertained.",
      animal: 'dog',
      imageUrl:
        'https://cdn.pixabay.com/photo/2019/08/19/07/45/corgi-4415649_1280.jpg',
      points: 24,
    },
    {
      id: 22,
      ownerId: userId,
      name: 'Giralda',
      bio: "An aspiring astronaut who firmly believes that every tall furniture in the house is her personal rocket. With a PhD in pushing things off tables and a minor in nocturnal sprints, she's always ready to knock out the competition (and the flower vases).",
      animal: 'cat',
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg',
      points: 7,
    },
    {
      id: 23,
      ownerId: userId,
      name: 'Letizia',
      bio: "The world's most prolific birdwatcher. Though he occasionally confuses a good nap with cardio, he's unbeatable when it comes to catching laser dots. His three passions in life are sunbathing, sushi, and, oddly enough, the news channel.",
      animal: 'cat',
      imageUrl:
        'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg',
      points: 45,
    },
    {
      id: 24,
      ownerId: userId,
      name: 'Dominique',
      bio: 'Reverse-engineered intermediate data-warehouse',
      animal: 'cat',
      imageUrl:
        'https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg',
      points: 818,
    },
    {
      id: 25,
      ownerId: userId,
      name: 'Bob',
      bio: "For you I'll create, artistic works of poo since, you save them in bags",
      animal: 'dog',
      imageUrl:
        'https://cdn.pixabay.com/photo/2016/07/15/15/55/dachshund-1519374_1280.jpg',
      points: 12,
    },
    {
      id: 26,
      ownerId: userId,
      name: 'Bodhi',
      bio: 'Focused for four-legged fur friends fun, frolicking fast forever from fantastically frightening flickering ferns',
      animal: 'dog',
      imageUrl:
        'https://cdn.pixabay.com/photo/2014/08/21/14/51/dog-423398_1280.jpg',
      points: 86,
    },
    {
      id: 27,
      ownerId: userId,
      name: 'Bean',
      bio: 'It is 2am, time to lick your face until you pat me',
      animal: 'cat',
      imageUrl:
        'https://cdn.pixabay.com/photo/2018/04/20/17/18/cat-3336579_1280.jpg',
      points: 1200,
    },
  ])
}
