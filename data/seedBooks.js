// seedCourses.js
"use strict";

/**
 * Listing 15.9 (p. 224)
 */
const mongoose = require("mongoose"),
  Book = require("../models/Book");

// 데이터베이스 연결 설정
mongoose.connect(
  "mongodb+srv://UT-Node-kssjshyjyh:WmiQZIUoz9PpIZQp@ut-node-kssjshyjyh.ryfofzj.mongodb.net/?retryWrites=true&w=majority&appName=UT-Node-kssjshyjyh",
  { useNewUrlParser: true }
);

mongoose.connection;

var books = [
  {
    title: "PCB Artwork",
    subtitle: "Altium Designer를 활용한 3D PCB 설계",
    authors: "송재진 , 김은원 , 김송민 , 이상학 저자(글)",
    publisher: "성안당 · 2020년 06월 02일",
    BookImg: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788931556735.jpg",
  },
  {
    title: "리눅스 프로그래밍 원리와 실제",
    subtitle: "개정판",
    authors: "창병모 저자(글)",
    publisher: "생능출판 · 2022년 02월 15일",
    BookImg: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788970505343.jpg",
  },
  {
    title: "Mano의 컴퓨터시스템구조",
    subtitle: "Computer System Architecture | 3 판",
    authors: "M. Morris Mano 저자(글) · 김종상 번역",
    publisher: "프로텍미디어 · 2017년 01월 20일",
    BookImg: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791195444977.jpg",
  },
  {
    title: "Android Studio를 활용한 안드로이드 프로그래밍",
    subtitle: "9 판",
    authors: "우재남 , 박길식 저자(글)",
    publisher: "한빛아카데미 · 2024년 01월 19일",
    BookImg: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791156640219.jpg",
  },
  {
    title: "Node.js로 프로그래밍 시작하기",
    subtitle: "Get Programming with Node.Js/Wexler, Jonathan",
    authors: "조나단 웩슬러 저자(글) · 김성준 번역",
    publisher: "에이콘출판 · 2020년 01월 31일",
    BookImg: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791161753829.jpg",
  },
];

var commands = [];

// 1. Delete all previous data. / 이전 데이터 모두 삭제
// 2. Set a timeout to allow the database to be cleared. / 데이터베이스가 지워지는 것을 기다리기 위해 타임아웃 설정
// 3. Create a promise for each courses object. / 코스 객체마다 프라미스 생성.
// 4. Use Promise.all() to wait for all promises to resolve. / 모든 프라미스가 해결될 때까지 기다리기 위해 Promise.all() 사용.
// 5. Close the connection to the database. / 데이터베이스 연결 닫기.

Book.deleteMany({})
  .exec()
  .then((result) => {
    console.log(`Deleted ${result.deletedCount} course records!`);
  });

setTimeout(() => {
  // 프라미스 생성을 위한 구독자 객체 루프
  books.forEach((b) => {
    commands.push(
      Book.create({
        title: b.title,
        subtitle: b.subtitle,
        authors: b.authors,
        publisher: b.publisher,
        BookImg: b.BookImg,
      }).then((book) => {
        console.log(`Created course: ${book.title}`);
      })
    );
  });

  console.log(`${commands.length} commands created!`);

  Promise.all(commands)
    .then((r) => {
      console.log(JSON.stringify(r));
      mongoose.connection.close();
      console.log("Connection closed!");
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
}, 1500);
