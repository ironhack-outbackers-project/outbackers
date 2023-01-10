const mongoose = require("mongoose");
const Recom = require("../models/Recom.model");
const Service = require("../models/Service.model");
const User = require("../models/User.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/library-project";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

// Recom.collection.drop();  // Warning, drops book collection :)
// Service.collection.drop();  // Warning, drops author collection :)
// User.collection.drop();  // Warning, drops author collection :)

const users = [
  {
    username: "Aphrodite",
    email: "Aphrodite@posteo.de",
    password: "Aphrodite123",
  },
  {
    username: "Apollo",
    email: "Apollo@posteo.de",
    password: "Apollo123",
  },
  {
    username: "Ares",
    email: "Ares@posteo.de",
    password: "Ares123",
  },
];

const services = [
  {
    title: "Barista/All rounder Monday to Friday",
    serviceType: "Job",
    description:
      "Cross Eatery is currently looking for a Barista/ all rounder to join our team. We are a CBD based specialty coffee bar/cafe working closely with Mecca Coffee roasters focusing on great Coffee, food and impeccable service. The right candidate will enjoy: Working roughly a 40 hour week, Monday to Fridays only. Above industry award pay rate (and also negotiable depending on experience). Working with some cutting edge equipment such as La Marzocco Linea, Ubermilk, Markibar Izaga grinder, EK 47 grinder and fetco. Candidates with previous experience with specialty coffee and working in a busy environments would be preferred but this role would also be perfect for someone with little experience but wants to take their coffee game to the next level. If you are reliable, have a knack for great customer service and love espresso please send your resume to athena@mailbox.org",
    country: "Australia",
    city: "Sydney",
    language: "English",
    dateFrom: 2023-01-10T00:00:00.000+00:00,
    dateTo: 2023-03-31T00:00:00.000+00:00,
    image: "https://cdn-icons-png.flaticon.com/512/834/834096.png",
    creator: isObjectIdOrHexString('63b7fcc02b4e16ab17033fe2'),
    createdAt: 2023-01-09T21:50:37.930+00:00,
    updatedAt: 2023-01-09T21:50:37.930+00:00
  },
  {
    title: "Looking for a Cool Place with Cool People",
    serviceType: "Housing",
    description: "Hi! I'm Hayden, a 34 year old mature student finishing up a degree at UBC (He/Him). I'm generally quiet, easygoing, and easy to deal with. Great at cleaning up after myself, and more than happy to take part in however chores are divided (or happy to help engineer a fair system in the absence of one). In my free time (not that I have a lot of that these days) I cook, read, cycle, climb, kayak, and snowboard. I come with my own fridge and a bunch of retro gaming consoles. Ideally I'm looking for a group of relaxed individuals to share a home with for the foreseeable future. Preferably mid twenties to late thirties, but I'm open minded. LGTBQ+ friendly. My budget is for no more than 900$ Please do not contact me offering a room for more than that. That said, I am a fiscally responsible, mature adult who knows how to budget, and always pays his bills/rent on time. References available upon request. If any of this resonates shoot me a message :)Looking for Feb 1st, although January would be fine too.",
    country: "Canada",
    city: "Vancouver",
    language: "English",
    dateFrom: 2023-01-10T00:00:00.000+00:00,
    dateTo: 2023-03-31T00:00:00.000+00:00,
    image: "https://cdn-icons-png.flaticon.com/512/834/834096.png",
    creator: isObjectIdOrHexString('63b7fcc02b4e16ab17033fe2'),
    createdAt: 2023-01-09T21:50:37.930+00:00,
    updatedAt: 2023-01-09T21:50:37.930+00:00
  },
  {
    title: "All Rounder (Front and Kitchen)",
    serviceType: "Job",
    description:
      "A busy takeaway food shop in Sydney CBD is looking for a Allrounder. The candidates must have Availability during DAYTIME (10am-3pm) on Tuesday, Wednesday and Thursday. The job includes Serving customers. Cutting vegetables. Washing dishes. Frying. Cleaning. Helping Chef. IF YOU SEE THIS AD, THE POSITION IS STILL AVAILABLE Email your resume to athena@mailbox.org",
    country: "USA",
    city: "Denver",
    language: "English",
    dateFrom: 2023-01-10T00:00:00.000+00:00,
    dateTo: 2023-03-31T00:00:00.000+00:00,
    image: "https://cdn-icons-png.flaticon.com/512/834/834096.png",
    creator: isObjectIdOrHexString('63b7fcc02b4e16ab17033fe2'),
    createdAt: 2023-02-09T21:50:37.930+00:00,
    updatedAt: 2023-02-09T21:50:37.930+00:00
  },
  {
    title: "Looking for a cool new roommate",
    serviceType: "Housing",
    description: "Hi! I'm Zeus, a 131 year old God from Greece (He/Him). I'm generally quiet, easygoing, and easy to deal with. Great at cleaning up after myself, and more than happy to take part in however chores are divided (or happy to help engineer a fair system in the absence of one). In my free time (not that I have a lot of that these days) I cook, read, cycle, climb, kayak, and snowboard. I come with my own fridge and a bunch of retro gaming consoles. Ideally I'm looking for a group of relaxed individuals to share a home with for the foreseeable future. Preferably mid twenties to late thirties, but I'm open minded. LGTBQ+ friendly. My budget is for no more than 900$ Please do not contact me offering a room for more than that. That said, I am a fiscally responsible, mature adult who knows how to budget, and always pays his bills/rent on time. References available upon request. If any of this resonates shoot me a message :)Looking for Feb 1st, although January would be fine too.",
    country: "Porto",
    city: "Portugal",
    language: "Portuguese",
    dateFrom: 2023-01-10T00:00:00.000+00:00,
    dateTo: 2023-03-31T00:00:00.000+00:00,
    image: "https://cdn-icons-png.flaticon.com/512/834/834096.png",
    creator: isObjectIdOrHexString('63b7fcc02b4e16ab17033fe2'),
    createdAt: 2023-01-09T21:50:37.930+00:00,
    updatedAt: 2023-01-09T21:50:37.930+00:00
  }
];

const booksPromise = Book.create(books);
const authorsPromise = Author.create(authors);

Promise.all([booksPromise, authorsPromise])
  .then((result) => {
    const booksCreated = result[0];
    const authorsCreated = result[1];
    console.log(`Number of books created... ${booksCreated.length} `);
    console.log(`Number of authors created... ${authorsCreated.length} `);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((e) => console.log("error seeding data in DB....", e));
