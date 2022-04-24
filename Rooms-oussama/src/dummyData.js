import image1 from "./images/post1.jpg"
import image2 from "./images/post2.jpg"
import image3 from "./images/post3.jpg"
import image4 from "./images/post4.jpg"

export const Posts = [
    {
      id: 1,
      desc: "This anime hits",
      photo: image1,
      date: "17h ago",
      user: "amine",
      room:"Anime",
      roomers: 392,
      vote:201,
      comments:[
        {
          id: 1,
          user: "mohamed",
          content: "Indeed, the first episode only was enough to get it to high ranks",
          vote: 13,
          date: "16h ago"
        },
        {
          id: 2,
          user: "ali",
          content: "Indeed, the first episode only was enough to get it to high ranks",
          vote: 23,
          date: "2d ago"
        },
        {
          id: 3,
          user: "john",
          content: "Indeed, the first episode only was enough to get it to high ranks",
          vote: 8,
          date: "7h ago"
        },
      ]
    },
    {
        id: 2,
        desc: "Any good Sci-fi movie.",
        photo: image2,
        date: "29s ago",
        user: "mohamed",
        room:"Movies",
        roomers: 13,
        vote:7,
        comments:[],
      },
      {
        id: 3,
        desc: "First episode is good.",
        photo: image3,
        date: "17mins ago",
        user: "hamid",
        room:"Anime",
        roomers: 32,
        vote:21,
        comments:[],
      },
      {
        id: 4,
        desc: "History of Japan.",
        photo: image4,
        date: "57mins ago",
        user: "Sarah",
        room:"History",
        roomers: 69,
        vote:41,
        comments:[],
      },
]