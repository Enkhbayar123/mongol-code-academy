// src/data/basic-practice-data.js

export const basicPracticeData = [
  { 
    id: 'bp-1', 
    name: 'Гурвалжин', 
    videoId: 'yc5nRkCKAhM', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн гурвалжны периметрийг ол.</p>
      <h4>Input</h4>
      <p>Гурвалжны талууд бүхэл тоогоор нэг мөрөнд зайгаар тусгаарлагдан өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Гурвалжны периметр.</p>
      <h4>Example</h4>
      <pre><code>Input:
3 4 5

Output:
12</code></pre>`,
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7002/',
    defaultLanguage: "python",
    starterCode: `import sys

# Read line from standard input
line = sys.stdin.readline()
if line:
    # Parse integers
    a, b, c = map(int, line.split())
    
    # Write your code here
    `,
    testCases: [
      { input: "3 4 5", output: "12" },
      { input: "10 20 30", output: "60" },
      { input: "7 8 9", output: "24" },
      { input: "1 1 1", output: "3" },
      { input: "100 200 300", output: "600" },
      { input: "15 25 35", output: "75" },
      { input: "6 8 10", output: "24" },
      { input: "50 50 50", output: "150" },
      { input: "12 13 14", output: "39" },
      { input: "1000 2000 3000", output: "6000" }
    ]
  },
  { 
    id: 'bp-2', 
    name: 'Куб', 
    videoId: 'jz3x9c_unYM', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн кубын эзэлхүүн ба гүйцэд гадаргуугийн талбайг ол.</p>
      <h4>Input</h4>
      <p>Кубын тал бүхэл тоон утгатайгаар нэг мөрөнд өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Кубын эзэлхүүн, гүйцэд гадаргуугийн талбай нэг мөрөнд зайгаар тусгаарлагдан хэвлэгдэнэ.</p>
      <h4>Example</h4>
      <pre><code>Input:
5

Output:
125 150</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7004/',
    defaultLanguage: "python",
    starterCode: `import sys

# Read input
line = sys.stdin.readline()
if line:
    a = int(line)
    
    # Write your code here
    `,
    testCases: [
      { input: "5", output: "125 150" },
      { input: "1", output: "1 6" },
      { input: "3", output: "27 54" },
      { input: "2", output: "8 24" },
      { input: "4", output: "64 96" },
      { input: "6", output: "216 216" },
      { input: "10", output: "1000 600" },
      { input: "7", output: "343 294" },
      { input: "8", output: "512 384" },
      { input: "9", output: "729 486" }
    ]
  },
  { 
    id: 'bp-3', 
    name: 'Функц 1', 
    videoId: 'eAHMa2Tz2M8', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>y = 3x - 5</p>
      <h4>Input</h4>
      <p>x бүхэл тоон утгаар өгөгдөнө.</p>
      <h4>Output</h4>
      <p>y-ийн утга.</p>
      <h4>Example</h4>
      <pre><code>Input:
1

Output:
-2</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7005/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    x = int(line)
    
    # Write your code here
    `,
    testCases: [
      { input: "1", output: "-2" },
      { input: "0", output: "-5" },
      { input: "10", output: "25" },
      { input: "2", output: "1" },
      { input: "5", output: "10" },
      { input: "-1", output: "-8" },
      { input: "-5", output: "-20" },
      { input: "100", output: "295" },
      { input: "-10", output: "-35" },
      { input: "7", output: "16" }
    ]
  },
  { 
    id: 'bp-4', 
    name: 'Сүүлийн цифр', 
    videoId: 'RjzAMZRE1Ro', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн тооны сүүлийн цифрийг ол.</p>
      <h4>Input</h4>
      <p>Бүхэл тоо өгөгдөнө. Int төрөл.</p>
      <h4>Output</h4>
      <p>Сүүлийн цифр.</p>
      <h4>Example</h4>
      <pre><code>Input:
476

Output:
6</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7007/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    n = int(line)
    
    # Write your code here
    `,
    testCases: [
      { input: "476", output: "6" },
      { input: "123", output: "3" },
      { input: "10", output: "0" },
      { input: "7", output: "7" },
      { input: "1009", output: "9" },
      { input: "55555", output: "5" },
      { input: "980", output: "0" },
      { input: "42", output: "2" },
      { input: "8888", output: "8" },
      { input: "301", output: "1" }
    ]
  },
  { 
    id: 'bp-5', 
    name: 'Аравтын орны цифр', 
    videoId: 'xPW4G5m1K5g', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн тооны аравтын орны цифрийг ол.</p>
      <h4>Input</h4>
      <p>Int төрлийн бүхэл тоо өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Аравтын орны цифр.</p>
      <h4>Example</h4>
      <pre><code>Input:
423

Output:
2</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7008/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    n = int(line)
    
    # Write your code here
    `,
    testCases: [
      { input: "423", output: "2" },
      { input: "10", output: "1" },
      { input: "5", output: "0" },
      { input: "1234", output: "3" },
      { input: "99", output: "9" },
      { input: "105", output: "0" },
      { input: "5678", output: "7" },
      { input: "20", output: "2" },
      { input: "789", output: "8" },
      { input: "1000", output: "0" }
    ]
  },
  { 
    id: 'bp-6', 
    name: '3 оронтой тоо', 
    videoId: 'z2qOJmx3WRg', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн 3 оронтой тооны цифрүүдийн нийлбэрийг ол.</p>
      <h4>Input</h4>
      <p>3 оронтой эерэг тоо өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Цифрүүдийн нийлбэр.</p>
      <h4>Example</h4>
      <pre><code>Input:
123

Output:
6</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7010/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    s = line.strip()
    
    # Write your code here
    `,
    testCases: [
      { input: "123", output: "6" },
      { input: "999", output: "27" },
      { input: "100", output: "1" },
      { input: "505", output: "10" },
      { input: "789", output: "24" },
      { input: "333", output: "9" },
      { input: "246", output: "12" },
      { input: "111", output: "3" },
      { input: "900", output: "9" },
      { input: "876", output: "21" }
    ]
  },
  { 
    id: 'bp-7', 
    name: 'Хоёр тооны их', 
    videoId: 'YzA2kn5VzU0', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн 2 бүхэл тооны ихийг ол.</p>
      <h4>Input</h4>
      <p>2 бүхэл тоо нэг мөрөнд зайгаар тусгаарлагдан өгөгдөнө. Int төрөл.</p>
      <h4>Output</h4>
      <p>Их тоо.</p>
      <h4>Example</h4>
      <pre><code>Input:
16 14

Output:
16</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7101/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    a, b = map(int, line.split())
    
    # Write your code here
    `,
    testCases: [
      { input: "16 14", output: "16" },
      { input: "5 10", output: "10" },
      { input: "7 7", output: "7" },
      { input: "-5 -10", output: "-5" },
      { input: "0 -2", output: "0" },
      { input: "-100 100", output: "100" },
      { input: "123 456", output: "456" },
      { input: "999 998", output: "999" },
      { input: "0 0", output: "0" },
      { input: "-15 -3", output: "-3" }
    ]
  },
  { 
    id: 'bp-8', 
    name: '3 тооны их', 
    videoId: 'Ey1AA70gIBo', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн 3 тооны ихийг ол.</p>
      <h4>Input</h4>
      <p>Нэг мөрөнд Int төрлийн 3 тоо зайгаар тусгаарлагдан өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Их тоо.</p>
      <h4>Example</h4>
      <pre><code>Input:
1 3 2

Output:
3</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7103/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    a, b, c = map(int, line.split())
    
    # Write your code here
    `,
    testCases: [
      { input: "1 3 2", output: "3" },
      { input: "10 5 8", output: "10" },
      { input: "1 1 1", output: "1" },
      { input: "4 7 9", output: "9" },
      { input: "-1 -5 -2", output: "-1" },
      { input: "0 -5 5", output: "5" },
      { input: "100 20 5", output: "100" },
      { input: "15 80 80", output: "80" },
      { input: "-10 0 -20", output: "0" },
      { input: "42 17 99", output: "99" }
    ]
  },
  { 
    id: 'bp-9', 
    name: 'Тэгш тоонуудын нийлбэр', 
    videoId: 'Fe5gfKLGH8M', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн 3 тоон дахь тэгш тоонуудын нийлбэрийг ол. Ядаж 1 тэгш тоо бий.</p>
      <h4>Input</h4>
      <p>Нэг мөрөнд Int төрлийн 3 тоо зайгаар тусгаарлагдан өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Нийлбэр.</p>
      <h4>Example</h4>
      <pre><code>Input:
10 3 5

Output:
10</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7107/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    nums = list(map(int, line.split()))
    
    # Write your code here
    `,
    testCases: [
      { input: "10 3 5", output: "10" },
      { input: "2 4 6", output: "12" },
      { input: "1 3 5", output: "0" },
      { input: "2 3 5", output: "2" },
      { input: "1 4 5", output: "4" },
      { input: "8 12 1", output: "20" },
      { input: "100 200 301", output: "300" },
      { input: "14 16 18", output: "48" },
      { input: "7 9 2", output: "2" },
      { input: "40 5 60", output: "100" }
    ]
  },
  { 
    id: 'bp-10', 
    name: '3-т хуваагдах', 
    videoId: 'L444RiXQeak', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн 4 тоон дотроос 3-д хуваагддаг тоонуудын тоог ол.</p>
      <h4>Input</h4>
      <p>Нэг мөрөнд Int төрлийн 4 тоо зайгаар тусгаарлагдан өгөгдөнө.</p>
      <h4>Output</h4>
      <p>3-д хуваагддаг тоонуудын тоо.</p>
      <h4>Example</h4>
      <pre><code>Input:
3 12 8 9

Output:
3</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7110/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    nums = list(map(int, line.split()))
    
    # Write your code here
    `,
    testCases: [
      { input: "3 12 8 9", output: "3" },
      { input: "1 2 4 5", output: "0" },
      { input: "3 6 9 12", output: "4" },
      { input: "9 1 2 4", output: "1" },
      { input: "6 15 7 8", output: "2" },
      { input: "21 24 27 10", output: "3" },
      { input: "10 20 40 50", output: "0" },
      { input: "33 66 99 100", output: "3" },
      { input: "0 3 6 9", output: "4" },
      { input: "18 20 22 24", output: "2" }
    ]
  },
  { 
    id: 'bp-11', 
    name: '11-д хуваагдахгүй', 
    videoId: 'a_dcGuMZnEU', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн 4 тооны 11-д хуваагддаггүй тоонуудынх нь нийлбэрийг ол.</p>
      <h4>Input</h4>
      <p>Нэг мөрөнд Int төрлийн 4 тоо зайгаар тусгаарлагдан өгөгдөнө.</p>
      <h4>Output</h4>
      <p>11-д хуваагддаггүй тоонуудын нийлбэр.</p>
      <h4>Example</h4>
      <pre><code>Input:
7 22 13 30

Output:
50</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7111/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    nums = list(map(int, line.split()))
    
    # Write your code here
    `,
    testCases: [
      { input: "7 22 13 30", output: "50" },
      { input: "11 22 33 44", output: "0" },
      { input: "1 2 3 4", output: "10" },
      { input: "11 1 2 3", output: "6" },
      { input: "22 33 5 5", output: "10" },
      { input: "55 10 20 30", output: "60" },
      { input: "10 20 30 40", output: "100" },
      { input: "11 22 33 1", output: "1" },
      { input: "77 88 99 110", output: "0" },
      { input: "9 18 27 36", output: "90" }
    ]
  },
  { 
    id: 'bp-12', 
    name: 'IOI 3 удаа', 
    videoId: 'j7bQDghBjdE', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Дэлгэцэнд IOI гэж 3 удаа хэвлэ.</p>
      <h4>Input</h4>
      <p>Оролт байхгүй.</p>
      <h4>Output</h4>
      <p>IOI үгийг мөр тус бүрт нэг нэгээр хэвлэ.</p>
      <h4>Example</h4>
      <pre><code>Input:
(none)

Output:
IOI
IOI
IOI</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7202/',
    defaultLanguage: "python",
    starterCode: `# Write your code here
`,
    testCases: [
      { input: "", output: "IOI\nIOI\nIOI" },
      { input: "\n", output: "IOI\nIOI\nIOI" },
      { input: " ", output: "IOI\nIOI\nIOI" },
      { input: "test", output: "IOI\nIOI\nIOI" },
      { input: "123", output: "IOI\nIOI\nIOI" },
      { input: "none", output: "IOI\nIOI\nIOI" },
      { input: "ioi", output: "IOI\nIOI\nIOI" },
      { input: "\n\n", output: "IOI\nIOI\nIOI" },
      { input: "hello", output: "IOI\nIOI\nIOI" },
      { input: "run", output: "IOI\nIOI\nIOI" }
    ]
  },
  { 
    id: 'bp-13', 
    name: 'Эхний n тооны нийлбэр', 
    videoId: 'OxpcA6At81A', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Эхний n тооны нийлбэрийг тодорхой давталт ашиглан ол.</p>
      <h4>Input</h4>
      <p>Int төрлийн эерэг бүхэл тоо өгөгдөнө.</p>
      <h4>Output</h4>
      <p>1-ээс n хүртэлх тооны нийлбэр.</p>
      <h4>Example</h4>
      <pre><code>Input:
5

Output:
15</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7204/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    n = int(line)
    
    # Write your code here
    `,
    testCases: [
      { input: "5", output: "15" },
      { input: "10", output: "55" },
      { input: "100", output: "5050" },
      { input: "1", output: "1" },
      { input: "2", output: "3" },
      { input: "3", output: "6" },
      { input: "4", output: "10" },
      { input: "6", output: "21" },
      { input: "20", output: "210" },
      { input: "50", output: "1275" }
    ]
  },
  { 
    id: 'bp-14', 
    name: 'n!', 
    videoId: '-t5T0mKtloI', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>n! ол.</p>
      <h4>Input</h4>
      <p>Int төрлийн бүхэл тоо өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Өгөгдсөн тооны факториал.</p>
      <h4>Example</h4>
      <pre><code>Input:
5

Output:
120</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7205/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    n = int(line)
    
    # Write your code here
    `,
    testCases: [
      { input: "5", output: "120" },
      { input: "3", output: "6" },
      { input: "1", output: "1" },
      { input: "2", output: "2" },
      { input: "4", output: "24" },
      { input: "6", output: "720" },
      { input: "7", output: "5040" },
      { input: "8", output: "40320" },
      { input: "9", output: "362880" },
      { input: "10", output: "3628800" }
    ]
  },
  { 
    id: 'bp-15', 
    name: 'Хоёрын n зэрэг', 
    videoId: 'Kit7hoRUYl4', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>2-ын өгөгдсөн тоон зэргийг ол. (2-ын n зэрэг гэдэг нь 2*2*...*2. Жишээ нь 2-ын 3 зэрэг 2*2*2=8)</p>
      <h4>Input</h4>
      <p>Int төрлийн нэг тоо өгөгдөнө. Тэр тоо нь 2-ыг хэдэн удаа үржүүлэхийг заана.</p>
      <h4>Output</h4>
      <p>2-ын өгөгдсөн тоон зэрэг.</p>
      <h4>Example</h4>
      <pre><code>Input:
5

Output:
32</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7208/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    n = int(line)
    
    # Write your code here
    `,
    testCases: [
      { input: "5", output: "32" },
      { input: "3", output: "8" },
      { input: "10", output: "1024" },
      { input: "1", output: "2" },
      { input: "2", output: "4" },
      { input: "4", output: "16" },
      { input: "6", output: "64" },
      { input: "7", output: "128" },
      { input: "8", output: "256" },
      { input: "9", output: "512" }
    ]
  },
  { 
    id: 'bp-16', 
    name: '1-р хуудас(Бүхэлдээ)', 
    videoId: '5PFnPWmVXh0', 
    description: `
      <p>Spoj - ын 1 - р хуудсан дээрх бүх бодлогыг нэгтгэн бодсон бичлэг</p>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/main/'
  },
  { 
    id: 'bp-17', 
    name: '2 тооны нийлбэр', 
    videoId: 'Z7SVyuQX584', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн бүхэл тооны нийлбэрийг ол.</p>
      <h4>Input</h4>
      <p>2 бүхэл тоо зайгаар тусгаарлагдан нэг мөрөнд өгөгдөнө.</p>
      <h4>Output</h4>
      <p>2 тооны нийлбэр.</p>
      <h4>Example</h4>
      <pre><code>Input:
12 23

Output:
35</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7001/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    a, b = map(int, line.split())
    
    # Write your code here
    `,
    testCases: [
      { input: "12 23", output: "35" },
      { input: "0 0", output: "0" },
      { input: "100 200", output: "300" },
      { input: "-5 5", output: "0" },
      { input: "-10 -20", output: "-30" },
      { input: "7 8", output: "15" },
      { input: "99 1", output: "100" },
      { input: "1234 5678", output: "6912" },
      { input: "-50 20", output: "-30" },
      { input: "42 58", output: "100" }
    ]
  },
  { 
    id: 'bp-18', 
    name: 'Тэгш өнцөгт', 
    videoId: 'PVDxf8Z5zzg', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн тэгш өнцөгтийн талбай ба периметрийг ол.</p>
      <h4>Input</h4>
      <p>Тэгш өнцөгтийн урт ба өргөн нь бүхэл тоон утгаар нэг мөрөнд зайгаар тусгаарлагдан өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Талбай ба периметр зайгаар тусгаарлагдан нэг мөрөнд хэвлэгдэнэ.</p>
      <h4>Example</h4>
      <pre><code>Input:
6 4

Output:
24 20</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7003/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    a, b = map(int, line.split())
    
    # Write your code here
    `,
    testCases: [
      { input: "6 4", output: "24 20" },
      { input: "1 1", output: "1 4" },
      { input: "5 10", output: "50 30" },
      { input: "3 7", output: "21 20" },
      { input: "10 10", output: "100 40" },
      { input: "2 8", output: "16 20" },
      { input: "12 5", output: "60 34" },
      { input: "15 20", output: "300 70" },
      { input: "9 3", output: "27 24" },
      { input: "100 50", output: "5000 300" }
    ]
  },
  { 
    id: 'bp-19', 
    name: 'Функц 2', 
    videoId: 'r2F95nDG0XY', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>y = 4x^2 - 3x + 5</p>
      <h4>Input</h4>
      <p>x - нь Int төрлийн бүхэл тоо.</p>
      <h4>Output</h4>
      <p>y-гийн утга.</p>
      <h4>Example</h4>
      <pre><code>Input:
-2

Output:
27</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7006/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    x = int(line)
    
    # Write your code here
    `,
    testCases: [
      { input: "-2", output: "27" },
      { input: "0", output: "5" },
      { input: "1", output: "6" },
      { input: "2", output: "15" },
      { input: "3", output: "32" },
      { input: "-1", output: "12" },
      { input: "-3", output: "50" },
      { input: "5", output: "90" },
      { input: "10", output: "375" },
      { input: "-5", output: "120" }
    ]
  },
  { 
    id: 'bp-20', 
    name: 'Минут секунд', 
    videoId: 'y5S765vTIAM', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн секундыг минут секунд болго.</p>
      <h4>Input</h4>
      <p>Секунд Int тоон утгаар өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Минут секундыг зайгаар тусгаарлан хэвлэ.</p>
      <h4>Example</h4>
      <pre><code>Input:
200

Output:
3 20</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7011/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    sec = int(line)
    
    # Write your code here
    `,
    testCases: [
      { input: "200", output: "3 20" },
      { input: "60", output: "1 0" },
      { input: "59", output: "0 59" },
      { input: "0", output: "0 0" },
      { input: "3600", output: "60 0" },
      { input: "125", output: "2 5" },
      { input: "500", output: "8 20" },
      { input: "1000", output: "16 40" },
      { input: "45", output: "0 45" },
      { input: "85", output: "1 25" }
    ]
  },
  { 
    id: 'bp-21', 
    name: 'Минут секунд -> секунд', 
    videoId: 'YvCVoBBXIP0', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн минут, секундыг секунд рүү шилжүүл.</p>
      <h4>Input</h4>
      <p>Минут, секунд зайгаар тусгаарлагдан Int төрлөөр өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Секунд гарна.</p>
      <h4>Example</h4>
      <pre><code>Input:
3 4

Output:
184</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7013/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    m, s = map(int, line.split())
    
    # Write your code here
    `,
    testCases: [
      { input: "3 4", output: "184" },
      { input: "1 0", output: "60" },
      { input: "0 45", output: "45" },
      { input: "10 15", output: "615" },
      { input: "0 0", output: "0" },
      { input: "5 30", output: "330" },
      { input: "60 0", output: "3600" },
      { input: "2 5", output: "125" },
      { input: "8 20", output: "500" },
      { input: "16 40", output: "1000" }
    ]
  },
  { 
    id: 'bp-22', 
    name: 'Цаг, минут, секунд -> секунд', 
    videoId: 'V6lpKfoeXhg', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн цаг, минут, секундыг секунд рүү шилжүүл.</p>
      <h4>Input</h4>
      <p>Цаг, минут, секунд зайгаар тусгаарлагдан нэг мөрөнд Int төрлөөр өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Секунд гарна.</p>
      <h4>Example</h4>
      <pre><code>Input:
1 2 3

Output:
3723</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7014/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    h, m, s = map(int, line.split())
    
    # Write your code here
    `,
    testCases: [
      { input: "1 2 3", output: "3723" },
      { input: "0 0 0", output: "0" },
      { input: "1 0 0", output: "3600" },
      { input: "0 1 0", output: "60" },
      { input: "0 0 1", output: "1" },
      { input: "2 30 15", output: "9015" },
      { input: "10 0 0", output: "36000" },
      { input: "5 12 45", output: "18765" },
      { input: "12 0 0", output: "43200" },
      { input: "24 0 0", output: "86400" }
    ]
  },
  { 
    id: 'bp-23', 
    name: 'Хоног цаг', 
    videoId: 'F6XR5wVaXdM', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн цагийг хоног цагт шилжүүл.</p>
      <h4>Input</h4>
      <p>Цаг Int төрлөөр өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Хоног, цаг нэг мөрөнд зайгаар тусгаарлагдан хэвлэгдэнэ.</p>
      <h4>Example</h4>
      <pre><code>Input:
44

Output:
1 20</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7015/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    h = int(line)
    
    # Write your code here
    `,
    testCases: [
      { input: "44", output: "1 20" },
      { input: "24", output: "1 0" },
      { input: "12", output: "0 12" },
      { input: "0", output: "0 0" },
      { input: "48", output: "2 0" },
      { input: "50", output: "2 2" },
      { input: "100", output: "4 4" },
      { input: "23", output: "0 23" },
      { input: "25", output: "1 1" },
      { input: "72", output: "3 0" }
    ]
  },
  { 
    id: 'bp-24', 
    name: 'Хоног цаг -> цаг', 
    videoId: '15Qkhm0TDIE', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн хоног, цагийг цагт шилжүүл.</p>
      <h4>Input</h4>
      <p>Хоног, цаг Int төрлөөр нэг зайгаар тусгаарлагдан өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Цаг гарна.</p>
      <h4>Example</h4>
      <pre><code>Input:
2 5

Output:
53</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7016/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    d, h = map(int, line.split())
    
    # Write your code here
    `,
    testCases: [
      { input: "2 5", output: "53" },
      { input: "1 0", output: "24" },
      { input: "0 12", output: "12" },
      { input: "0 0", output: "0" },
      { input: "1 20", output: "44" },
      { input: "2 0", output: "48" },
      { input: "4 4", output: "100" },
      { input: "10 0", output: "240" },
      { input: "3 12", output: "84" },
      { input: "5 5", output: "125" }
    ]
  },
  { 
    id: 'bp-25', 
    name: 'Жил сар -> сар', 
    videoId: 'SO907v9FXgc', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн жил, сарыг сард шилжүүл.</p>
      <h4>Input</h4>
      <p>Жил, сар нэг мөрөнд зайгаар тусгаарлагдан Int төрлөөр өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Сар хэвлэгдэнэ.</p>
      <h4>Example</h4>
      <pre><code>Input:
2 7

Output:
31</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7018/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    y, m = map(int, line.split())
    
    # Write your code here
    `,
    testCases: [
      { input: "2 7", output: "31" },
      { input: "1 0", output: "12" },
      { input: "0 6", output: "6" },
      { input: "0 0", output: "0" },
      { input: "5 2", output: "62" },
      { input: "10 0", output: "120" },
      { input: "3 11", output: "47" },
      { input: "1 5", output: "17" },
      { input: "4 8", output: "56" },
      { input: "12 0", output: "144" }
    ]
  },
  { 
    id: 'bp-26', 
    name: 'Цаг минут секунд', 
    videoId: 'sT1ZaOzn_MY', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн секундыг цаг минут секунд болго.</p>
      <h4>Input</h4>
      <p>Секунд Int төрлийн тоон утгаар өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Цаг, минут, секундууд хоорондоо 1 зайгаар тусгаарлагдан хэвлэгдэнэ. Цаг минут руу шилжихгүй бол 0 хэвлэнэ.</p>
      <h4>Example</h4>
      <pre><code>Input:
3612

Output:
1 0 12</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7012/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    sec = int(line)
    
    # Write your code here
    `,
    testCases: [
      { input: "3612", output: "1 0 12" },
      { input: "3600", output: "1 0 0" },
      { input: "60", output: "0 1 0" },
      { input: "45", output: "0 0 45" },
      { input: "0", output: "0 0 0" },
      { input: "3723", output: "1 2 3" },
      { input: "9015", output: "2 30 15" },
      { input: "86400", output: "24 0 0" },
      { input: "18765", output: "5 12 45" },
      { input: "500", output: "0 8 20" }
    ]
  },
  { 
    id: 'bp-27', 
    name: 'Нэмэлт сонирхолтой бодлого (Max without IF)', 
    videoId: 'auv6Am8KAQk', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>4 бүхэл тоо өгөгдөнө. Тэдний хамгийн ихийг нь <code>if</code> нөхцөл ашиглахгүй олох.</p>
      <h4>Input</h4>
      <p>Нэг мөрөнд 4 бүхэл тоо зайгаар тусгаарлагдан өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Хамгийн их тоо.</p>
      <h4>Example</h4>
      <pre><code>Input:
1 2 3 4

Output:
4</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/KHLDH_qCfNA/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    nums = list(map(int, line.split()))
    
    # Write your code here (Without using if statements)
    `,
    testCases: [
      { input: "1 2 3 4", output: "4" },
      { input: "10 5 8 2", output: "10" },
      { input: "-1 -5 -2 -10", output: "-1" },
      { input: "0 0 0 0", output: "0" },
      { input: "100 200 150 50", output: "200" },
      { input: "7 7 7 7", output: "7" },
      { input: "9 1 3 5", output: "9" },
      { input: "-10 0 10 -20", output: "10" },
      { input: "15 80 80 12", output: "80" },
      { input: "42 17 99 3", output: "99" }
    ]
  },
  { 
    id: 'bp-28', 
    name: 'Ихээс бусдыг тэг болго (Without IF)', 
    videoId: 'I1-81CAe0a4', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>4 бүхэл тоо өгөгдөнө. Тэдний ихээс бусдыг <code>if</code> нөхцөл ашиглахгүйгээр тэг болго.</p>
      <h4>Input</h4>
      <p>Нэг мөрөнд 4 бүхэл тоо зайгаар тусгаарлагдан өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Ихээс бусад тоонуудыг 0 болгон нэг мөрөнд зайгаар тусгаарлан хэвлэнэ.</p>
      <h4>Example</h4>
      <pre><code>Input:
12 13 14 15

Output:
0 0 0 15</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7104/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    nums = list(map(int, line.split()))
    
    # Write your code here (Without using if statements)
    `,
    testCases: [
      { input: "12 13 14 15", output: "0 0 0 15" },
      { input: "10 5 8 2", output: "10 0 0 0" },
      { input: "1 20 3 4", output: "0 20 0 0" },
      { input: "5 5 10 2", output: "0 0 10 0" },
      { input: "100 20 30 40", output: "100 0 0 0" },
      { input: "1 2 9 4", output: "0 0 9 0" },
      { input: "-10 -5 -1 -20", output: "0 0 -1 0" },
      { input: "0 0 5 0", output: "0 0 5 0" },
      { input: "7 14 21 28", output: "0 0 0 28" },
      { input: "50 40 30 20", output: "50 0 0 0" }
    ]
  },
  { 
    id: 'bp-29', 
    name: '2 оронтой тоо', 
    videoId: 'BiIJ982HjxA', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн 2 оронтой тооны цифрүүдийн нийлбэрийг ол.</p>
      <h4>Input</h4>
      <p>2 оронтой эерэг бүхэл тоо өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Цифрүүдийн нийлбэр.</p>
      <h4>Example</h4>
      <pre><code>Input:
27

Output:
9</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7009/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    n = int(line)
    
    # Write your code here
    `,
    testCases: [
      { input: "27", output: "9" },
      { input: "10", output: "1" },
      { input: "99", output: "18" },
      { input: "55", output: "10" },
      { input: "42", output: "6" },
      { input: "80", output: "8" },
      { input: "11", output: "2" },
      { input: "63", output: "9" },
      { input: "74", output: "11" },
      { input: "38", output: "11" }
    ]
  },
  { 
    id: 'bp-30', 
    name: 'Минут секунд (Модуло үйлдэл)', 
    videoId: 'ZHs8XnycUjs', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн секундыг минут секунд болго. (Модуло үйлдэл ашиглах)</p>
      <h4>Input</h4>
      <p>Секунд Int тоон утгаар өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Минут секундыг зайгаар тусгаарлан хэвлэ.</p>
      <h4>Example</h4>
      <pre><code>Input:
200

Output:
3 20</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7011/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    sec = int(line)
    
    # Write your code here
    `,
    testCases: [
      { input: "200", output: "3 20" },
      { input: "60", output: "1 0" },
      { input: "59", output: "0 59" },
      { input: "0", output: "0 0" },
      { input: "3600", output: "60 0" },
      { input: "125", output: "2 5" },
      { input: "500", output: "8 20" },
      { input: "1000", output: "16 40" },
      { input: "45", output: "0 45" },
      { input: "85", output: "1 25" }
    ]
  },
  { 
    id: 'bp-31', 
    name: 'Хоног цаг (Модуло үйлдэл)', 
    videoId: 'JW798c6W8Gc', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн цагийг хоног ба цаг болгон хувирга.</p>
      <h4>Input</h4>
      <p>Цаг Int тоон утгаар өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Хоног ба цагийг зайгаар тусгаарлан хэвлэ.</p>
      <h4>Example</h4>
      <pre><code>Input:
27

Output:
1 3</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7015/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    hours = int(line)
    
    # Write your code here
    `,
    testCases: [
      { input: "27", output: "1 3" },
      { input: "24", output: "1 0" },
      { input: "48", output: "2 0" },
      { input: "50", output: "2 2" },
      { input: "12", output: "0 12" },
      { input: "0", output: "0 0" },
      { input: "100", output: "4 4" },
      { input: "73", output: "3 1" },
      { input: "15", output: "0 15" },
      { input: "500", output: "20 20" }
    ]
  },
  { 
    id: 'bp-32', 
    name: 'Жил сар (Модуло үйлдэл)', 
    videoId: 'KGIYmBUy1gA', 
    description: `
      <h4>Бодлогын тодорхойлолт</h4>
      <p>Өгөгдсөн сарыг жил ба сар болгон хувирга.</p>
      <h4>Input</h4>
      <p>Сар Int тоон утгаар өгөгдөнө.</p>
      <h4>Output</h4>
      <p>Жил ба сарыг зайгаар тусгаарлан хэвлэ.</p>
      <h4>Example</h4>
      <pre><code>Input:
27

Output:
2 3</code></pre>`, 
    spojLink: 'https://www.spoj.com/RGB7/problems/RGB7017/',
    defaultLanguage: "python",
    starterCode: `import sys

line = sys.stdin.readline()
if line:
    months = int(line)
    
    # Write your code here
    `,
    testCases: [
      { input: "27", output: "2 3" },
      { input: "12", output: "1 0" },
      { input: "24", output: "2 0" },
      { input: "5", output: "0 5" },
      { input: "0", output: "0 0" },
      { input: "35", output: "2 11" },
      { input: "100", output: "8 4" },
      { input: "13", output: "1 1" },
      { input: "50", output: "4 2" },
      { input: "120", output: "10 0" }
    ]
  }
];

export const basicProblemMap = {};
for (const problem of basicPracticeData) {
  basicProblemMap[problem.id] = problem;
}
