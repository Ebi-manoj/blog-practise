import express from 'express';
import Post from '../model/post.js';

const router = express.Router();

// home

router.get('', async (req, res) => {
  try {
    let perPage = 5;
    const page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage =
      nextPage <= Math.ceil(count / perPage) ? nextPage : null;

    res.render('index', { data, nextPage, hasNextPage });
  } catch (error) {
    console.log(error);
  }
});

export default router;

// const insertData = function () {
//   Post.insertMany([
//     { title: 'Building Blog', body: 'This is the body of the Blog content 1' },
//     {
//       title: 'Learning Mongoose',
//       body: 'This is the body of the Blog content 2',
//     },
//     {
//       title: 'Intro to MongoDB',
//       body: 'This is the body of the Blog content 3',
//     },
//     {
//       title: 'Express.js Basics',
//       body: 'This is the body of the Blog content 4',
//     },
//     {
//       title: 'Node.js Performance',
//       body: 'This is the body of the Blog content 5',
//     },
//     {
//       title: 'JavaScript Tips',
//       body: 'This is the body of the Blog content 6',
//     },
//     {
//       title: 'Web Development Trends',
//       body: 'This is the body of the Blog content 7',
//     },
//     { title: 'HTML5 and CSS3', body: 'This is the body of the Blog content 8' },
//     { title: 'Building APIs', body: 'This is the body of the Blog content 9' },
//     {
//       title: 'MongoDB Aggregation',
//       body: 'This is the body of the Blog content 10',
//     },
//     {
//       title: 'Express Middleware',
//       body: 'This is the body of the Blog content 11',
//     },
//     {
//       title: 'Debugging Node.js',
//       body: 'This is the body of the Blog content 12',
//     },
//     { title: 'React Basics', body: 'This is the body of the Blog content 13' },
//     {
//       title: 'Frontend Frameworks',
//       body: 'This is the body of the Blog content 14',
//     },
//     {
//       title: 'Asynchronous JavaScript',
//       body: 'This is the body of the Blog content 15',
//     },
//     {
//       title: 'Building Scalable Apps',
//       body: 'This is the body of the Blog content 16',
//     },
//     { title: 'Using Webpack', body: 'This is the body of the Blog content 17' },
//     {
//       title: 'Testing Node.js Applications',
//       body: 'This is the body of the Blog content 18',
//     },
//     {
//       title: 'Building REST APIs',
//       body: 'This is the body of the Blog content 19',
//     },
//     {
//       title: 'Database Design Tips',
//       body: 'This is the body of the Blog content 20',
//     },
//   ]);
// };
// insertData();
