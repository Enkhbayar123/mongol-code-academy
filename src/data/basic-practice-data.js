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
            { input: "7 8 9", output: "24" }
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
            { input: "3", output: "27 54" }
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
            { input: "10", output: "25" }
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
            { input: "10", output: "0" }
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
            { input: "5", output: "0" }
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
            { input: "100", output: "1" }
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
            { input: "7 7", output: "7" }
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
            { input: "1 1 1", output: "1" }
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
            { input: "1 3 5", output: "0" } 
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
            { input: "3 6 9 12", output: "4" }
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
            { input: "1 2 3 4", output: "10" }
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
            { input: "", output: "IOI\nIOI\nIOI" }
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
            { input: "100", output: "5050" }
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
            { input: "1", output: "1" }
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
            { input: "10", output: "1024" }
        ]
    },
    { 
        id: 'bp-16', 
        name: '1-р хуудас(Бүхэлдээ)', 
        videoId: '5PFnPWmVXh0', 
        description: `
            <p>Spoj - ын 1 - р хуудсан дээрх бүх бодлогыг нэгтгэн бодсон бичлэг</p>`, 
        spojLink: 'https://www.spoj.com/RGB7/problems/main/',
        // This is a compilation video, so no code/testcases needed.
    }
];

// Build a flat lookup map for quick/robust lookup
export const basicProblemMap = {};
for (const problem of basicPracticeData) {
  basicProblemMap[problem.id] = problem;
}