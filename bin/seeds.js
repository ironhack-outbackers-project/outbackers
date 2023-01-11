const mongoose = require("mongoose");
const Recom = require("../models/Recom.model");
const Service = require("../models/Service.model");
const User = require("../models/User.model");

const MONGO_URI = ;

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

// Recom.collection.drop(); // Warning, drops book collection :)
// Service.collection.drop(); // Warning, drops author collection :)
// User.collection.drop(); // Warning, drops author collection :)

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
    image: "https://cdn-icons-png.flaticon.com/512/834/834096.png",
    creator: "63b7fcc02b4e16ab17033fe2",
  },
  {
    title: "Looking for a Cool Place with Cool People",
    serviceType: "Housing",
    description:
      "Hi! I'm Hayden, a 34 year old mature student finishing up a degree at UBC (He/Him). I'm generally quiet, easygoing, and easy to deal with. Great at cleaning up after myself, and more than happy to take part in however chores are divided (or happy to help engineer a fair system in the absence of one). In my free time (not that I have a lot of that these days) I cook, read, cycle, climb, kayak, and snowboard. I come with my own fridge and a bunch of retro gaming consoles. Ideally I'm looking for a group of relaxed individuals to share a home with for the foreseeable future. Preferably mid twenties to late thirties, but I'm open minded. LGTBQ+ friendly. My budget is for no more than 900$ Please do not contact me offering a room for more than that. That said, I am a fiscally responsible, mature adult who knows how to budget, and always pays his bills/rent on time. References available upon request. If any of this resonates shoot me a message :)Looking for Feb 1st, although January would be fine too.",
    country: "Canada",
    city: "Vancouver",
    language: "English",
    image: "https://cdn-icons-png.flaticon.com/512/834/834096.png",
    creator: "63b7fcc02b4e16ab17033fe2",
  },
  {
    title: "All Rounder (Front and Kitchen)",
    serviceType: "Job",
    description:
      "A busy takeaway food shop in Sydney CBD is looking for a Allrounder. The candidates must have Availability during DAYTIME (10am-3pm) on Tuesday, Wednesday and Thursday. The job includes Serving customers. Cutting vegetables. Washing dishes. Frying. Cleaning. Helping Chef. IF YOU SEE THIS AD, THE POSITION IS STILL AVAILABLE Email your resume to athena@mailbox.org",
    country: "USA",
    city: "Denver",
    language: "English",
    image: "https://cdn-icons-png.flaticon.com/512/834/834096.png",
    creator: "63b7fcc02b4e16ab17033fe2",
  },
  {
    title: "Looking for a cool new roommate",
    serviceType: "Housing",
    description:
      "Hi! I'm Zeus, a 131 year old God from Greece (He/Him). I'm generally quiet, easygoing, and easy to deal with. Great at cleaning up after myself, and more than happy to take part in however chores are divided (or happy to help engineer a fair system in the absence of one). In my free time (not that I have a lot of that these days) I cook, read, cycle, climb, kayak, and snowboard. I come with my own fridge and a bunch of retro gaming consoles. Ideally I'm looking for a group of relaxed individuals to share a home with for the foreseeable future. Preferably mid twenties to late thirties, but I'm open minded. LGTBQ+ friendly. My budget is for no more than 900$ Please do not contact me offering a room for more than that. That said, I am a fiscally responsible, mature adult who knows how to budget, and always pays his bills/rent on time. References available upon request. If any of this resonates shoot me a message :)Looking for Feb 1st, although January would be fine too.",
    country: "Porto",
    city: "Portugal",
    language: "Portuguese",
    image: "https://cdn-icons-png.flaticon.com/512/834/834096.png",
    creator: "63b7fcc02b4e16ab17033fe2",
  },
];

const recommendations = [
  {
    title: "Getting a pizza in Napoli",
    description:
      "Go check out 'Gino e Toto Sorbillo'. In my opinion, it is the best pizza in town!",
    advice:
      "Don't look anybody in the eyes because it could offend them. They are very proud people.",
    country: "Italy",
    city: "Napoli",
    image: "https://cdn-icons-png.flaticon.com/512/834/834096.png",
    creator: "63b7fcc02b4e16ab17033fe2",
  },
  {
    title: "Homemade Arepas",
    description:
      "Go check out 'Guilli arepas'. In my opinion, they have the best arepitas in town!",
    advice:
      "Don't look anybody in the eyes because it could offend them. They are very proud people.",
    country: "Colombia",
    city: "Medellin",
    image: "https://cdn-icons-png.flaticon.com/512/834/834096.png",
    creator: "63b7fcc02b4e16ab17033fe2",
  },
  {
    title: "Getting caipirinhas in Ubatuba",
    description:
      "Go check out 'Caipi House Ubatuba'. In my opinion, it is the best caipirinha in town!",
    advice:
      "You can take the caipirinha and walk to be beach: absolutely lovely!",
    country: "Brazil",
    city: "Ubatuba",
    image: "https://cdn-icons-png.flaticon.com/512/834/834096.png",
    creator: "63b7fcc02b4e16ab17033fe2",
  },
];

const userPromise = User.create(users);
const servicePromise = Service.create(services);
const recomPromise = Recom.create(recommendations);

Promise.all([userPromise, servicePromise, recomPromise])
  .then((result) => {
    const usersCreated = result[0];
    const servicesCreated = result[1];
    const recommendationsCreated = result[2];
    console.log(`Number of users created... ${usersCreated.length} `);
    console.log(`Number of services created... ${servicesCreated.length} `);
    console.log(
      `Number of recommendations created... ${recommendationsCreated.length} `
    );

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((e) => console.log("error seeding data in DB....", e));
