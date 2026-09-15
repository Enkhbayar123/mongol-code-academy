// src/data/exam1Data.js

const CPP_STARTER = `#include <iostream>
using namespace std;

int main() {
    // your code goes here
    return 0;
}`;

export const exam1Problems = [
  {
    id: "exam1-p1",
    name: "Функц 1 (y = 4x² - 3x + 5)",
    category: "Илэрхийлэл бодох",
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн бүхэл тоо <code>x</code>-ийн хувьд <code>y = 4x² - 3x + 5</code> тэгшитгэлийн утгыг олж хэвлэ.</p>
      <h4>Оролт</h4>
      <p><code>x</code> - бүхэл тоон утга нэг мөрөнд өгөгдөнө.</p>
      <h4>Гаралт</h4>
      <p><code>y</code>-ийн утгыг хэвлэнэ.</p>
      <h4>Жишээ</h4>
      <p><strong>Оролт:</strong></p>
      <pre>-2</pre>
      <p><strong>Гаралт:</strong></p>
      <pre>27</pre>
    `,
    starterCode: CPP_STARTER,
    testCases: [
      { input: "-2", output: "27" },
      { input: "0", output: "5" },
      { input: "1", output: "6" },
      { input: "3", output: "32" },
      { input: "-5", output: "120" }
    ]
  },
  {
    id: "exam1-p2",
    name: "Аравтын орны цифр",
    category: "Орон салгах",
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн бүхэл тооны аравтын орны цифрийг ол.</p>
      <h4>Оролт</h4>
      <p>Бүхэл тоо нэг мөрөнд өгөгдөнө.</p>
      <h4>Гаралт</h4>
      <p>Аравтын орны цифр.</p>
      <h4>Жишээ</h4>
      <p><strong>Оролт:</strong></p>
      <pre>423</pre>
      <p><strong>Гаралт:</strong></p>
      <pre>2</pre>
    `,
    starterCode: CPP_STARTER,
    testCases: [
      { input: "423", output: "2" },
      { input: "87", output: "8" },
      { input: "105", output: "0" },
      { input: "999", output: "9" },
      { input: "12345", output: "4" }
    ]
  },
  {
    id: "exam1-p3",
    name: "Секундыг минут, секунд болгох",
    category: "Хугацааны хувиргалт",
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн секундыг минут, секунд болгон хувирга.</p>
      <h4>Оролт</h4>
      <p>Секунд бүхэл тоогоор нэг мөрөнд өгөгдөнө.</p>
      <h4>Гаралт</h4>
      <p>Минут ба секундыг нэг зайгаар тусгаарлан хэвлэнэ.</p>
      <h4>Жишээ</h4>
      <p><strong>Оролт:</strong></p>
      <pre>200</pre>
      <p><strong>Гаралт:</strong></p>
      <pre>3 20</pre>
    `,
    starterCode: CPP_STARTER,
    testCases: [
      { input: "200", output: "3 20" },
      { input: "60", output: "1 0" },
      { input: "59", output: "0 59" },
      { input: "3600", output: "60 0" },
      { input: "125", output: "2 5" }
    ]
  },
  {
    id: "exam1-p4",
    name: "Минут секундыг секунд болгох",
    category: "Хугацааны хувиргалт",
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн минут, секундыг нийт секунд рүү шилжүүл.</p>
      <h4>Оролт</h4>
      <p>Минут ба секунд зайгаар тусгаарлагдан өгөгдөнө.</p>
      <h4>Гаралт</h4>
      <p>Нийт секундын утгыг хэвлэнэ.</p>
      <h4>Жишээ</h4>
      <p><strong>Оролт:</strong></p>
      <pre>3 4</pre>
      <p><strong>Гаралт:</strong></p>
      <pre>184</pre>
    `,
    starterCode: CPP_STARTER,
    testCases: [
      { input: "3 4", output: "184" },
      { input: "0 45", output: "45" },
      { input: "1 0", output: "60" },
      { input: "10 10", output: "610" },
      { input: "2 30", output: "150" }
    ]
  },
  {
    id: "exam1-p5",
    name: "Хоног цагийг цагт шилжүүлэх",
    category: "Хугацааны хувиргалт",
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн хоног, цагийг нийт цагт шилжүүл.</p>
      <h4>Оролт</h4>
      <p>Хоног ба цаг зайгаар тусгаарлагдан нэг мөрөнд өгөгдөнө.</p>
      <h4>Гаралт</h4>
      <p>Нийт цагийн тоог хэвлэнэ.</p>
      <h4>Жишээ</h4>
      <p><strong>Оролт:</strong></p>
      <pre>2 5</pre>
      <p><strong>Гаралт:</strong></p>
      <pre>53</pre>
    `,
    starterCode: CPP_STARTER,
    testCases: [
      { input: "2 5", output: "53" },
      { input: "1 0", output: "24" },
      { input: "0 12", output: "12" },
      { input: "3 4", output: "76" },
      { input: "10 1", output: "241" }
    ]
  }
];