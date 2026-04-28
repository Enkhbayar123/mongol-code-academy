// src/data/problem-data.js

export const problemData = [
  {
    category: 'Arrays & Hash',
    problems: [
      { 
        id: 'find-closest-number-to-zero', 
        name: '0-д хамгийн ойр тоог олох', 
        videoId: 'xm-aOYVRe_g', 
        description: `
          <p class="mb-4">Өгөгдсөн <code>n</code> хэмжээтэй бүхэл тоон массив <code>nums</code> дотроос <strong>0-д хамгийн ойр</strong> утгатай тоог буцаа. Хэрэв олон хариу байвал <strong>хамгийн том утгатайг</strong> нь буцаа.</p>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
            <pre class="text-sm">Input: nums = [-4,-2,1,4,8]
Output: 1
Тайлбар:
-4 -өөс 0 хүртэлх зай |-4| = 4.
-2 -оос 0 хүртэлх зай |-2| = 2.
1 -ээс 0 хүртэлх зай |1| = 1.
4 -өөс 0 хүртэлх зай |4| = 4.
8 -аас 0 хүртэлх зай |8| = 8.
0-д хамгийн ойр тоо нь 1 байна.</pre>
          </div>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
            <pre class="text-sm">Input: nums = [2,-1,1]
Output: 1
Тайлбар: 1 болон -1 нь хоёулаа 0-д хамгийн ойр боловч 1 нь илүү их тул буцаана.</pre>
          </div>`,
        defaultLanguage: "python",
        starterCode: `import sys
import json

# Example Input: "-4 -2 1 4 8"
input_data = sys.stdin.read().strip()
if not input_data:
    print("0")
    sys.exit()

# Handle cases where input might be space separated or JSON
try:
    nums = json.loads(input_data)
except:
    nums = list(map(int, input_data.split()))

def findClosestNumber(nums):
    # Write your code here
    pass

print(findClosestNumber(nums))`,
        testCases: [
            { input: "-4 -2 1 4 8", output: "1" },
            { input: "2 -1 1", output: "1" }
        ]
      },
      {
        id: "merge-strings-alternatively",
        name: "Тэмдэгт мөрүүдийг ээлжлэн нэгтгэх", 
        videoId: "OVAXrpRsYKo",
        description: `
          <p class="mb-4">Танд <code>word1</code> ба <code>word2</code> гэсэн хоёр тэмдэгт мөр өгөгдсөн. <code>word1</code>-ээс эхлэн үсгүүдийг ээлжлүүлэн нэмэх замаар тэмдэгт мөрүүдийг нэгтгэ. Хэрэв аль нэг мөр нь нөгөөгөөсөө урт байвал үлдсэн үсгүүдийг нэгтгэсэн мөрийн төгсгөлд залгана.</p>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
            <pre class="text-sm">Input: word1 = "abc", word2 = "pqr"
Output: "apbqcr"
Тайлбар: Нэгтгэсэн мөр дараах байдалтай байна:
word1:  a   b   c
word2:    p   q   r
merged: a p b q c r</pre>
          </div>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
            <pre class="text-sm">Input: word1 = "ab", word2 = "pqrs"
Output: "apbqrs"
Тайлбар: word2 нь илүү урт тул "rs" нь төгсгөлд залгагдана.</pre>
          </div>`,
        defaultLanguage: "python",
        starterCode: `import sys

lines = sys.stdin.read().splitlines()
if len(lines) < 2: sys.exit()
word1, word2 = lines[0], lines[1]

def mergeAlternately(word1, word2):
    # Write your code here
    pass

print(mergeAlternately(word1, word2))`,
        testCases: [
            { input: "abc\npqr", output: "apbqcr" },
            { input: "ab\npqrs", output: "apbqrs" }
        ]
      },
      {
        id: "contains-duplicate",
        name: "Давхардлыг агуулсан эсэх", 
        videoId: "jl_tC-gOflE",
        description: `
          <p class="mb-4">Бүхэл тоон <code>nums</code> массив өгөгдсөн. Хэрэв аль нэг утга массив дотор <strong>ядаж хоёр удаа</strong> гарч байвал <code>true</code>, бүх элементүүд ялгаатай бол <code>false</code> утгыг буцаа.</p>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
            <pre class="text-sm">Input: nums = [1,2,3,1]
Output: true</pre>
          </div>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
            <pre class="text-sm">Input: nums = [1,2,3,4]
Output: false</pre>
          </div>`,
        defaultLanguage: "python",
        starterCode: `import sys
import json

input_data = sys.stdin.read().strip()
try: nums = json.loads(input_data)
except: nums = list(map(int, input_data.split()))

def containsDuplicate(nums):
    # Write your code here
    pass

print("true" if containsDuplicate(nums) else "false")`,
        testCases: [
            { input: "[1,2,3,1]", output: "true" },
            { input: "[1,2,3,4]", output: "false" }
        ]
      },
      {
        id: "valid-anagram",
        name: "Хүчинтэй Анаграм", 
        videoId: "SAMBLGS607c",
        description: `
          <p class="mb-4"><code>s</code> ба <code>t</code> гэсэн хоёр тэмдэгт мөр өгөгдсөн. Хэрэв <code>t</code> нь <code>s</code>-ийн анаграм бол <code>true</code>, үгүй бол <code>false</code> утгыг буцаа.</p>
          <p class="mb-4 text-sm text-slate-400">Анаграм гэдэг нь үг эсвэл хэллэгийн үсгүүдийг өөрчилж, ихэвчлэн бүх анхны үсгүүдийг яг нэг удаа ашиглан үүсгэсэн өөр үг эсвэл хэллэг юм.</p>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
            <pre class="text-sm">Input: s = "anagram", t = "nagaram"
Output: true</pre>
          </div>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
            <pre class="text-sm">Input: s = "rat", t = "car"
Output: false</pre>
          </div>`,
        defaultLanguage: "python",
        starterCode: `import sys
lines = sys.stdin.read().splitlines()
s, t = lines[0], lines[1]

def isAnagram(s, t):
    # Write your code here
    pass

print("true" if isAnagram(s, t) else "false")`,
        testCases: [
            { input: "anagram\nnagaram", output: "true" },
            { input: "rat\ncar", output: "false" }
        ]
      },
      {
        id: 'two-sum',
        name: 'Хоёр тооны нийлбэр', 
        videoId: 'OF66Kzj09E0',
        description: `
          <p class="mb-4"><code>nums</code> бүхэл тоон массив болон <code>target</code> бүхэл тоо өгөгдсөн. Нийлбэр нь <code>target</code>-тай тэнцэх хоёр тооны индексийг буцаа.</p>
          <p class="mb-4">Оролт бүр <strong>яг нэг шийдтэй</strong> ба та нэг элементийг хоёр удаа ашиглах боломжгүй гэж үзэж болно. Хариултыг дурын дарааллаар буцааж болно.</p>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
            <pre class="text-sm">Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Тайлбар: nums[0] + nums[1] == 9 тул [0, 1] буцаана.</pre>
          </div>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
            <pre class="text-sm">Input: nums = [3,2,4], target = 6
Output: [1,2]</pre>
          </div>`,
        defaultLanguage: "python",
        starterCode: `import sys
import json

lines = sys.stdin.read().splitlines()
nums = json.loads(lines[0])
target = int(lines[1])

def twoSum(nums, target):
    # Write your code here
    pass

res = twoSum(nums, target)
if res:
    res.sort()
    print(json.dumps(res).replace(" ", ""))
else:
    print("[]")`,
        testCases: [
            { input: "[2,7,11,15]\n9", output: "[0,1]" },
            { input: "[3,2,4]\n6", output: "[1,2]" }
        ]
      },
      {
        id: 'roman-to-integer',
        name: 'Ром тоог бүхэл тоо руу хөрвүүлэх', 
        videoId: 'ctXg9PJrp7E',
        description: `
          <p class="mb-4">Ром тоонууд нь <code>I, V, X, L, C, D, M</code> гэсэн долоон өөр тэмдэгтээр илэрхийлэгддэг.</p>
          <p class="mb-4">Өгөгдсөн ром тоог бүхэл тоо руу хөрвүүл.</p>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
            <pre class="text-sm">Input: s = "III"
Output: 3
Тайлбар: III = 3.</pre>
          </div>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
            <pre class="text-sm">Input: s = "MCMXCIV"
Output: 1994
Тайлбар: M = 1000, CM = 900, XC = 90 ба IV = 4.</pre>
          </div>`,
        defaultLanguage: "python",
        starterCode: `import sys
s = sys.stdin.read().strip()

def romanToInt(s):
    # Write your code here
    pass

print(romanToInt(s))`,
        testCases: [
            { input: "III", output: "3" },
            { input: "MCMXCIV", output: "1994" }
        ]
      },
      {
        id: 'is-subsequence',
        name: 'Дэд дараалал мөн эсэх', 
        videoId: 'vCBZwfebqdE',
        description: `
          <p class="mb-4"><code>s</code> ба <code>t</code> гэсэн хоёр тэмдэгт мөр өгөгдсөн. Хэрэв <code>s</code> нь <code>t</code>-ийн <strong>дэд дараалал</strong> (subsequence) бол <code>true</code>, үгүй бол <code>false</code> утгыг буцаа.</p>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
            <pre class="text-sm">Input: s = "abc", t = "ahbgdc"
Output: true</pre>
          </div>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
            <pre class="text-sm">Input: s = "axc", t = "ahbgdc"
Output: false</pre>
          </div>`,
        defaultLanguage: "python",
        starterCode: `import sys
lines = sys.stdin.read().splitlines()
s, t = lines[0], lines[1]

def isSubsequence(s, t):
    # Write your code here
    pass

print("true" if isSubsequence(s, t) else "false")`,
        testCases: [
            { input: "abc\nahbgdc", output: "true" },
            { input: "axc\nahbgdc", output: "false" }
        ]
      },
      {
        id: 'group-anagrams',
        name: 'Анаграмуудыг бүлэглэх', 
        videoId: 'vgLlhXQBn-A',
        description: `
          <p class="mb-4"><code>strs</code> тэмдэгт мөрүүдийн массив өгөгдсөн бол <strong>анаграмуудыг</strong> хамтад нь бүлэглэ. Хариултыг дурын дарааллаар буцааж болно.</p>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
            <pre class="text-sm">Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]</pre>
          </div>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
            <pre class="text-sm">Input: strs = [""]
Output: [[""]]</pre>
          </div>`,
        defaultLanguage: "python",
        starterCode: `import sys
import json
from collections import defaultdict

strs = json.loads(sys.stdin.read().strip())

def groupAnagrams(strs):
    # Write your code here
    pass

# Helper to sort and print result
res = groupAnagrams(strs)
if res:
    final_res = []
    for group in res:
        group.sort()
        final_res.append(group)
    final_res.sort(key=lambda x: (len(x), x[0]))
    print(json.dumps(final_res).replace(" ", ""))
else:
    print("[]")`,
        testCases: [
            { input: '["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' }
        ]
      },
      {
        id: 'product-of-array-except-self',
        name: 'Өөрөөс бусдын үржвэр', 
        videoId: 'WufBYDjU6HY',
        description: `
          <p class="mb-4">Бүхэл тоон <code>nums</code> массив өгөгдсөн бол <code>answer[i]</code> нь <code>nums[i]</code>-ээс бусад <code>nums</code>-ийн бүх элементийн үржвэртэй тэнцүү байх <code>answer</code> массивыг буцаа.</p>
          <p class="mb-4">Та хуваах үйлдэл ашиглахгүйгээр, <code>O(n)</code> хугацаанд ажиллах алгоритм бичих ёстой.</p>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
            <pre class="text-sm">Input: nums = [1,2,3,4]
Output: [24,12,8,6]</pre>
          </div>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
            <pre class="text-sm">Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]</pre>
          </div>`,
        defaultLanguage: "python",
        starterCode: `import sys
import json

nums = json.loads(sys.stdin.read().strip())

def productExceptSelf(nums):
    # Write your code here
    pass

print(json.dumps(productExceptSelf(nums)).replace(" ", ""))`,
        testCases: [
            { input: "[1,2,3,4]", output: "[24,12,8,6]" }
        ]
      },
      {
        id: 'longest-consecutive-sequence',
        name: 'Хамгийн урт дараалсан дараалал', 
        videoId: 'RVUghs3KR60',
        description: `
          <p class="mb-4">Эрэмбэлэгдээгүй бүхэл тоон <code>nums</code> массив өгөгдсөн бол хамгийн урт дараалсан элементүүдийн дарааллын уртыг ол.</p>
          <p class="mb-4">Та <code>O(n)</code> хугацаанд ажиллах алгоритм бичих ёстой.</p>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
            <pre class="text-sm">Input: nums = [100,4,200,1,3,2]
Output: 4
Тайлбар: Хамгийн урт дараалсан дараалал нь [1, 2, 3, 4] ба урт нь 4 байна.</pre>
          </div>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
            <pre class="text-sm">Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9</pre>
          </div>`,
        defaultLanguage: "python",
        starterCode: `import sys
import json

nums = json.loads(sys.stdin.read().strip())

def longestConsecutive(nums):
    # Write your code here
    pass

print(longestConsecutive(nums))`,
        testCases: [
            { input: "[100,4,200,1,3,2]", output: "4" }
        ]
      },
      {
        id: 'spiral-matrix',
        name: 'Спираль Матриц', 
        videoId: '_QLJav7qaJg',
        description: `
          <p class="mb-4"><code>m x n</code> хэмжээтэй <code>matrix</code> өгөгдсөн бол матрицын бүх элементийг <strong>спираль дарааллаар</strong> буцаа.</p>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
            <pre class="text-sm">Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]</pre>
          </div>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
            <pre class="text-sm">Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]</pre>
          </div>`,
        defaultLanguage: "python",
        starterCode: `import sys
import json

matrix = json.loads(sys.stdin.read().strip())

def spiralOrder(matrix):
    # Write your code here
    pass

print(json.dumps(spiralOrder(matrix)).replace(" ", ""))`,
        testCases: [
            { input: "[[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" }
        ]
      }
    ]
  },
  {
    category: 'Two Pointers',
    problems: [
      {
        id: 'valid-palindrome',
        name: 'Хүчинтэй Палиндром', 
        videoId: '1lWnk8ssgQI',
        description: `
          <p class="mb-4">Хэрэв бүх том үсгийг жижиг үсэгт хөрвүүлж, үсэг болон тооноос бусад тэмдэгтүүдийг хассаны дараа урагш болон хойш ижил уншигдаж байвал тухайн хэллэгийг <strong>палиндром</strong> гэнэ.</p>
          <p class="mb-4">Өгөгдсөн <code>s</code> тэмдэгт мөр палиндром бол <code>true</code>, үгүй бол <code>false</code> утгыг буцаа.</p>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
            <pre class="text-sm">Input: s = "A man, a plan, a canal: Panama"
Output: true
Тайлбар: "amanaplanacanalpanama" бол палиндром юм.</pre>
          </div>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
            <pre class="text-sm">Input: s = "race a car"
Output: false
Тайлбар: "raceacar" бол палиндром биш.</pre>
          </div>`,
        defaultLanguage: "python",
        starterCode: `import sys
s = sys.stdin.read().strip()

def isPalindrome(s):
    # Write your code here
    pass

print("true" if isPalindrome(s) else "false")`,
        testCases: [
            { input: "A man, a plan, a canal: Panama", output: "true" }
        ]
      },
      {
        id: 'two-sum-ii-input-array-is-sorted',
        name: 'Хоёр тооны нийлбэр II', 
        videoId: 'WIpH8rVzk7A',
        description: `
          <p class="mb-4"><strong>Үл буурах дарааллаар эрэмбэлэгдсэн</strong>, 1-ээс эхлэлтэй <code>numbers</code> бүхэл тоон массив өгөгдсөн. Нийлбэр нь тодорхой <code>target</code> тоотой тэнцэх хоёр тоог ол.</p>
          <p class="mb-4">Хоёр тооны индексийг (<code>index1</code> ба <code>index2</code>) 1-ээр нэмэгдүүлсэн <code>[index1, index2]</code> гэсэн 2 урттай бүхэл тоон массив хэлбэрээр буцаа.</p>
          <p class="mb-4">Тестүүд нь <strong>яг нэг шийдтэй</strong> байхаар зохиогдсон. Та нэг элементийг хоёр удаа ашиглах боломжгүй.</p>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
            <pre class="text-sm">Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Тайлбар: 2 ба 7-ийн нийлбэр 9. Тиймээс index1 = 1, index2 = 2. Бид [1, 2] буцаана.</pre>
          </div>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
            <pre class="text-sm">Input: numbers = [2,3,4], target = 6
Output: [1,3]</pre>
          </div>`,
        defaultLanguage: "python",
        starterCode: `import sys
import json

lines = sys.stdin.read().splitlines()
numbers = json.loads(lines[0])
target = int(lines[1])

def twoSum(numbers, target):
    # Write your code here
    pass

print(json.dumps(twoSum(numbers, target)).replace(" ", ""))`,
        testCases: [
            { input: "[2,7,11,15]\n9", output: "[1,2]" }
        ]
      },
      {
        id: '3sum',
        name: 'Гурван тооны нийлбэр', 
        videoId: 'mNST1MXE3eo',
        description: `
          <p class="mb-4">Бүхэл тоон <code>nums</code> массив өгөгдсөн. <code>i != j</code>, <code>i != k</code>, <code>j != k</code> байх бөгөөд <code>nums[i] + nums[j] + nums[k] == 0</code> байх бүх <code>[nums[i], nums[j], nums[k]]</code> гурвалыг буцаа.</p>
          <p class="mb-4">Шийдийн олонлогт давхардсан гурвал байж болохгүй.</p>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
            <pre class="text-sm">Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]</pre>
          </div>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
            <pre class="text-sm">Input: nums = [0,1,1]
Output: []</pre>
          </div>`,
        defaultLanguage: "python",
        starterCode: `import sys
import json

nums = json.loads(sys.stdin.read().strip())

def threeSum(nums):
    # Write your code here
    pass

print(json.dumps(threeSum(nums)).replace(" ", ""))`,
        testCases: [
            { input: "[-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" }
        ]
      },
      {
        id: 'container-with-most-water',
        name: 'Хамгийн их ус агуулах сав', 
        videoId: 'pzAby69Xot8',
        description: `
          <p class="mb-4">Танд <code>n</code> урттай бүхэл тоон <code>height</code> массив өгөгдсөн. <code>(i, 0)</code> ба <code>(i, height[i])</code> цэгүүдийн хооронд <code>i</code>-р босоо шугам татагдсан гэж үз.</p>
          <p class="mb-4">x тэнхлэгтэй хамт сав үүсгэх, уг сав нь хамгийн их ус агуулах хоёр шугамыг ол. Савны агуулах хамгийн их усны хэмжээг буцаа.</p>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
            <pre class="text-sm">Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49</pre>
          </div>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
            <pre class="text-sm">Input: height = [1,1]
Output: 1</pre>
          </div>`,
        defaultLanguage: "python",
        starterCode: `import sys
import json

height = json.loads(sys.stdin.read().strip())

def maxArea(height):
    # Write your code here
    pass

print(maxArea(height))`,
        testCases: [
            { input: "[1,8,6,2,5,4,8,3,7]", output: "49" }
        ]
      },
      {
        id: 'trapping-rain-water',
        name: 'Борооны ус тогтоох', 
        videoId: 'FwIF-VJEKjw',
        description: `
          <p class="mb-4"><code>n</code> ширхэг сөрөг биш бүхэл тоо өгөгдсөн нь өндрийн газрын зургийг илэрхийлэх бөгөөд мөр бүрийн өргөн нь <code>1</code> бол бороо орсны дараа хэр их ус тогтохыг тооцоол.</p>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
            <pre class="text-sm">Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6</pre>
          </div>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
            <pre class="text-sm">Input: height = [4,2,0,3,2,5]
Output: 9</pre>
          </div>`,
        defaultLanguage: "python",
        starterCode: `import sys
import json

height = json.loads(sys.stdin.read().strip())

def trap(height):
    # Write your code here
    pass

print(trap(height))`,
        testCases: [
            { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }
        ]
      }
    ]
  },
  {
    category: 'Stack',
    problems: [
      {
        id: 'valid-parentheses',
        name: 'Хүчинтэй хаалт', 
        videoId: '145vbb4kMRg',
        description: `
          <p class="mb-4"><code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> ба <code>']'</code> тэмдэгтүүдийг агуулсан <code>s</code> тэмдэгт мөр өгөгдсөн бол оролтын мөр хүчинтэй эсэхийг тодорхойл.</p>
          <p class="mb-4">Оролтын мөр дараах тохиолдолд хүчинтэй байна:</p>
          <ul class="list-disc ml-5 mb-4">
            <li>Нээгдсэн хаалт ижил төрлийн хаалтаар хаагдах ёстой.</li>
            <li>Нээгдсэн хаалтууд зөв дарааллаар хаагдах ёстой.</li>
          </ul>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
            <pre class="text-sm">Input: s = "()"
Output: true</pre>
          </div>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
            <pre class="text-sm">Input: s = "()[]{}"
Output: true</pre>
          </div>`,
        defaultLanguage: "python",
        starterCode: `import sys
s = sys.stdin.read().strip()

def isValid(s):
    # Write your code here
    pass

print("true" if isValid(s) else "false")`,
        testCases: [
            { input: "()", output: "true" },
            { input: "()[]{}", output: "true" }
        ]
      },
      {
        id: 'evaluate-reverse-polish-notation',
        name: 'RPN илэрхийллийг бодох', 
        videoId: 'oPH7EpHwlRs',
        description: `
          <p class="mb-4"><strong>Урвуу Польш Тэмдэглэгээ (RPN)</strong>-г илэрхийлэх <code>tokens</code> тэмдэгт мөрүүдийн массив өгөгдсөн. Илэрхийллийг бод.</p>
          <p class="mb-4">Илэрхийллийн утгыг илэрхийлэх бүхэл тоог буцаа.</p>
          <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
            <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
            <pre class="text-sm">Input: tokens = ["2","1","+","3","*"]
Output: 9
Тайлбар: ((2 + 1) * 3) = 9</pre>
          </div>`,
        defaultLanguage: "python",
        starterCode: `import sys
import json
tokens = json.loads(sys.stdin.read().strip())

def evalRPN(tokens):
    # Write your code here
    pass

print(evalRPN(tokens))`,
        testCases: [
            { input: '["2","1","+","3","*"]', output: "9" }
        ]
      },
      {
          id: 'generate-parentheses',
          name: 'Хаалт үүсгэх', 
          videoId: 'mjFC9L30MW4',
          description: `
            <p class="mb-4"><code>n</code> хос хаалт өгөгдсөн бол зөв бүтэцтэй хаалтны бүх боломжит хувилбарыг үүсгэх функц бич.</p>
            <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
              <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
              <pre class="text-sm">Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]</pre>
            </div>
            <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
              <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
              <pre class="text-sm">Input: n = 1
Output: ["()"]</pre>
            </div>`,
          defaultLanguage: "python",
          starterCode: `import sys
import json

n = int(sys.stdin.read().strip())

def generateParenthesis(n):
    # Write your code here
    pass

print(json.dumps(generateParenthesis(n)).replace(" ", ""))`,
          testCases: [
              { input: "3", output: '["((()))","(()())","(())()","()(())","()()()"]' }
          ]
      },
      {
          id: 'daily-temperatures',
          name: 'Өдөр тутмын температур', 
          videoId: '862QzHRxUXE',
          description: `
            <p class="mb-4">Өдөр тутмын температурыг илэрхийлэх <code>temperatures</code> бүхэл тоон массив өгөгдсөн бол <code>answer[i]</code> нь <code>i</code>-р өдрөөс хойш илүү дулаан температур авахын тулд хүлээх өдрийн тоо байх <code>answer</code> массивыг буцаа. Хэрэв ирээдүйд боломжгүй бол <code>answer[i] == 0</code> байна.</p>
            <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
              <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
              <pre class="text-sm">Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]</pre>
            </div>
            <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
              <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
              <pre class="text-sm">Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]</pre>
            </div>`,
          defaultLanguage: "python",
          starterCode: `import sys
import json

temps = json.loads(sys.stdin.read().strip())

def dailyTemperatures(temperatures):
    # Write your code here
    pass

print(json.dumps(dailyTemperatures(temps)).replace(" ", ""))`,
          testCases: [
              { input: "[73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" }
          ]
      }
    ]
  },
  {
    category: 'Binary Search',
    problems: [
        { 
            id: 'binary-search', 
            name: 'Бинар хайлт', 
            videoId: 'tRarHXuFXDk', 
            description: `
              <p class="mb-4">Өсөх дарааллаар эрэмбэлэгдсэн бүхэл тоон <code>nums</code> массив болон <code>target</code> бүхэл тоо өгөгдсөн. <code>nums</code> дотроос <code>target</code>-ийг хайх функц бич. Хэрэв <code>target</code> олдвол индексийг нь, үгүй бол <code>-1</code> буцаа.</p>
              <p class="mb-4">Та <code>O(log n)</code> хугацаанд ажиллах алгоритм бичих ёстой.</p>
              <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
                <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
                <pre class="text-sm">Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Тайлбар: 9 нь nums дотор байгаа бөгөөд индекс нь 4</pre>
              </div>
              <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
                <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
                <pre class="text-sm">Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Тайлбар: 2 нь nums дотор байхгүй тул -1 буцаана</pre>
              </div>`,
            defaultLanguage: "python",
            starterCode: `import sys
import json

lines = sys.stdin.read().splitlines()
nums = json.loads(lines[0])
target = int(lines[1])

def search(nums, target):
    # Write your code here
    pass

print(search(nums, target))`,
            testCases: [
                { input: "[-1,0,3,5,9,12]\n9", output: "4" },
                { input: "[-1,0,3,5,9,12]\n2", output: "-1" }
            ]
        },
        { 
            id: 'search-a-2d-matrix', 
            name: '2D Матрицаас хайх', 
            videoId: 'z5mNlZnnzZM', 
            description: `
              <p class="mb-4">Танд дараах хоёр шинж чанартай <code>m x n</code> хэмжээтэй бүхэл тоон <code>matrix</code> өгөгдсөн:</p>
              <ul class="list-disc ml-5 mb-4">
                <li>Мөр бүр үл буурах дарааллаар эрэмбэлэгдсэн.</li>
                <li>Мөр бүрийн эхний бүхэл тоо нь өмнөх мөрийн сүүлийн тооноос их байна.</li>
              </ul>
              <p class="mb-4"><code>target</code> бүхэл тоо өгөгдсөн. Хэрэв <code>target</code> нь <code>matrix</code>-д байвал <code>true</code>, үгүй бол <code>false</code> утгыг буцаа.</p>
              <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
                <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
                <pre class="text-sm">Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true</pre>
              </div>`,
            defaultLanguage: "python",
            starterCode: `import sys
import json

lines = sys.stdin.read().splitlines()
matrix = json.loads(lines[0])
target = int(lines[1])

def searchMatrix(matrix, target):
    # Write your code here
    pass

print("true" if searchMatrix(matrix, target) else "false")`,
            testCases: [
                { input: "[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n3", output: "true" }
            ]
        },
        { 
            id: 'koko-eating-bananas', 
            name: 'Коко гадил идэж байна', 
            videoId: '3Ln5PDV6ITw', 
            description: `
              <p class="mb-4">Коко гадил идэх дуртай. <code>n</code> сагс гадил байгаа ба <code>i</code>-р сагс <code>piles[i]</code> гадилтай. Харуулууд явсан бөгөөд <code>h</code> цагийн дараа буцаж ирнэ.</p>
              <p class="mb-4">Коко цагт <code>k</code> гадил идэх хурдаа сонгож болно. Тэрээр <code>h</code> цагийн дотор бүх гадилыг идэж дуусгах хамгийн бага <code>k</code> бүхэл тоог ол.</p>
              <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
                <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
                <pre class="text-sm">Input: piles = [3,6,7,11], h = 8
Output: 4</pre>
              </div>`,
            defaultLanguage: "python",
            starterCode: `import sys
import json
import math

lines = sys.stdin.read().splitlines()
piles = json.loads(lines[0])
h = int(lines[1])

def minEatingSpeed(piles, h):
    # Write your code here
    pass

print(minEatingSpeed(piles, h))`,
            testCases: [
                { input: "[3,6,7,11]\n8", output: "4" }
            ]
        },
        { 
            id: 'find-minimum-in-rotated-sorted-array', 
            name: 'Эргүүлсэн эрэмбэлэгдсэн массивын хамгийн бага утгыг олох', 
            videoId: 'GmpT8HA8K50', 
            description: `
              <p class="mb-4">Өсөх дарааллаар эрэмбэлэгдсэн <code>n</code> урттай массив 1-ээс <code>n</code> удаа эргүүлэгдсэн байж болно. Жишээ нь <code>nums = [0,1,2,4,5,6,7]</code> массив:</p>
              <ul class="list-disc ml-5 mb-4">
                <li><code>[4,5,6,7,0,1,2]</code> (4 удаа эргүүлсэн).</li>
                <li><code>[0,1,2,4,5,6,7]</code> (7 удаа эргүүлсэн).</li>
              </ul>
              <p class="mb-4"><strong>Давтагдахгүй</strong> элементүүдтэй эргүүлсэн эрэмбэлэгдсэн <code>nums</code> массив өгөгдсөн бол уг массивын хамгийн бага элементийг буцаа.</p>
              <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
                <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
                <pre class="text-sm">Input: nums = [3,4,5,1,2]
Output: 1
Тайлбар: Анхны массив нь [1,2,3,4,5] байсан ба 3 удаа эргүүлэгдсэн.</pre>
              </div>`,
            defaultLanguage: "python",
            starterCode: `import sys
import json

nums = json.loads(sys.stdin.read().strip())

def findMin(nums):
    # Write your code here
    pass

print(findMin(nums))`,
            testCases: [
                { input: "[3,4,5,1,2]", output: "1" }
            ]
        },
        { 
            id: 'search-in-rotated-sorted-array', 
            name: 'Эргүүлсэн эрэмбэлэгдсэн массиваас хайх', 
            videoId: '6Zp3OVr1_2E', 
            description: `
              <p class="mb-4">Өсөх дарааллаар эрэмбэлэгдсэн (<strong>ялгаатай</strong> утгуудтай) бүхэл тоон <code>nums</code> массив өгөгдсөн.</p>
              <p class="mb-4"><code>nums</code> нь мэдэгдэхгүй индексээр эргүүлэгдсэн байж болно.</p>
              <p class="mb-4"><code>target</code> тоо <code>nums</code>-д байвал индексийг, байхгүй бол <code>-1</code>-ийг буцаа.</p>
              <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
                <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
                <pre class="text-sm">Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4</pre>
              </div>`,
            defaultLanguage: "python",
            starterCode: `import sys
import json

lines = sys.stdin.read().splitlines()
nums = json.loads(lines[0])
target = int(lines[1])

def search(nums, target):
    # Write your code here
    pass

print(search(nums, target))`,
            testCases: [
                { input: "[4,5,6,7,0,1,2]\n0", output: "4" }
            ]
        }
    ]
  },
  {
      category: 'Sliding Window',
      problems: [
          { 
              id: 'best-time-to-buy-and-sell-stock', 
              name: 'Хувьцаа авч, зарахад тохиромжтой үе', 
              videoId: '-_MDt81x0yY', 
              description: `
                <p class="mb-4"><code>prices</code> массив өгөгдсөн ба <code>prices[i]</code> нь <code>i</code>-р өдрийн хувьцааны үнэ юм.</p>
                <p class="mb-4">Та нэг өдөр хувьцаа худалдан авч, <strong>ирээдүйн өөр нэг өдөр</strong> түүнийгээ зарж ашгаа хамгийн их байлгахыг зорьж байна.</p>
                <p class="mb-4">Энэ гүйлгээнээс олж болох хамгийн их ашгийг буцаа. Хэрэв ашиг олох боломжгүй бол <code>0</code>-ийг буцаа.</p>
                <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
                  <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
                  <pre class="text-sm">Input: prices = [7,1,5,3,6,4]
Output: 5
Тайлбар: 2 дахь өдөр авч (үнэ = 1) 5 дахь өдөр зарна (үнэ = 6), ашиг = 6-1 = 5.</pre>
                </div>`,
              defaultLanguage: "python",
              starterCode: `import sys
import json

prices = json.loads(sys.stdin.read().strip())

def maxProfit(prices):
    # Write your code here
    pass

print(maxProfit(prices))`,
              testCases: [
                  { input: "[7,1,5,3,6,4]", output: "5" }
              ]
          },
          { 
              id: 'longest-substring-without-repeating-characters', 
              name: 'Давтагдах тэмдэгтгүй хамгийн урт дэд мөр', 
              videoId: 'V0rC26e5o7Y', 
              description: `
                <p class="mb-4"><code>s</code> тэмдэгт мөр өгөгдсөн бол тэмдэгт давтагдаагүй <strong>хамгийн урт дэд мөрийн</strong> (substring) уртыг ол.</p>
                <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
                  <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
                  <pre class="text-sm">Input: s = "abcabcbb"
Output: 3
Тайлбар: Хариулт нь "abc", урт нь 3.</pre>
                </div>
                <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
                  <p class="font-bold text-slate-300 mb-2">Жишээ 2:</p>
                  <pre class="text-sm">Input: s = "bbbbb"
Output: 1
Тайлбар: Хариулт нь "b", урт нь 1.</pre>
                </div>`,
              defaultLanguage: "python",
              starterCode: `import sys
s = sys.stdin.read().strip()
# Handle case if s is empty string passed as argument
if s == '""': s = ""

def lengthOfLongestSubstring(s):
    # Write your code here
    pass

print(lengthOfLongestSubstring(s))`,
              testCases: [
                  { input: "abcabcbb", output: "3" },
                  { input: "bbbbb", output: "1" }
              ]
          }
      ]
  },
  {
      category: 'Linked List',
      problems: [
          { 
              id: 'reverse-linked-list', 
              name: 'Холбоос жагсаалтыг урвуулах', 
              videoId: 'MCAPgScWs2A', 
              description: `
                <p class="mb-4">Ганц холбоост жагсаалтын (singly linked list) <code>head</code> өгөгдсөн бол жагсаалтыг урвуулж, урвуулсан жагсаалтыг буцаа.</p>
                <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
                  <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
                  <pre class="text-sm">Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]</pre>
                </div>`,
              defaultLanguage: "python",
              starterCode: `import sys
import json

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Helper: List -> ListNode
def listToListNode(nums):
    dummy = ListNode(0)
    ptr = dummy
    for n in nums:
        ptr.next = ListNode(n)
        ptr = ptr.next
    return dummy.next

# Helper: ListNode -> List
def listNodeToList(node):
    res = []
    while node:
        res.append(node.val)
        node = node.next
    return res

nums = json.loads(sys.stdin.read().strip())
head = listToListNode(nums)

def reverseList(head):
    # Write your code here
    pass

resHead = reverseList(head)
print(json.dumps(listNodeToList(resHead)).replace(" ", ""))`,
              testCases: [
                  { input: "[1,2,3,4,5]", output: "[5,4,3,2,1]" }
              ]
          },
          { 
              id: 'merge-two-sorted-lists', 
              name: 'Хоёр эрэмбэлэгдсэн жагсаалтыг нэгтгэх', 
              videoId: 'tgFXfiJm8DQ', 
              description: `
                <p class="mb-4">Хоёр эрэмбэлэгдсэн холбоос жагсаалтын <code>list1</code> ба <code>list2</code> толгойнууд өгөгдсөн.</p>
                <p class="mb-4">Хоёр жагсаалтыг нэг <strong>эрэмбэлэгдсэн</strong> жагсаалт болгон нэгтгэ. Жагсаалт нь эхний хоёр жагсаалтын зангилаануудыг залгах замаар хийгдэх ёстой.</p>
                <p class="mb-4">Нэгтгэсэн холбоос жагсаалтын толгойг буцаа.</p>
                <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
                  <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
                  <pre class="text-sm">Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]</pre>
                </div>`,
              defaultLanguage: "python",
              starterCode: `import sys
import json

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def listToListNode(nums):
    dummy = ListNode(0)
    ptr = dummy
    for n in nums:
        ptr.next = ListNode(n)
        ptr = ptr.next
    return dummy.next

def listNodeToList(node):
    res = []
    while node:
        res.append(node.val)
        node = node.next
    return res

lines = sys.stdin.read().splitlines()
l1 = listToListNode(json.loads(lines[0]))
l2 = listToListNode(json.loads(lines[1]))

def mergeTwoLists(list1, list2):
    # Write your code here
    pass

res = mergeTwoLists(l1, l2)
print(json.dumps(listNodeToList(res)).replace(" ", ""))`,
              testCases: [
                  { input: "[1,2,4]\n[1,3,4]", output: "[1,1,2,3,4,4]" }
              ]
          },
          { 
              id: 'reorder-list', 
              name: 'Жагсаалтыг дахин эрэмбэлэх', 
              videoId: 'rcSRaj7pTEM', 
              description: `
                <p class="mb-4">Танд ганц холбоост жагсаалтын толгой өгөгдсөн. Жагсаалт нь дараах байдлаар илэрхийлэгдэж болно:</p>
                <p class="mb-2"><code>L0 → L1 → … → Ln - 1 → Ln</code></p>
                <p class="mb-4">Жагсаалтыг дараах хэлбэртэй болгож өөрчил:</p>
                <p class="mb-2"><code>L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …</code></p>
                <p class="mb-4">Та жагсаалтын зангилаан дахь утгуудыг өөрчилж болохгүй. Зөвхөн зангилаануудыг өөрсдийг нь өөрчилж болно.</p>
                <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
                  <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
                  <pre class="text-sm">Input: head = [1,2,3,4]
Output: [1,4,2,3]</pre>
                </div>`,
              defaultLanguage: "python",
              starterCode: `import sys
import json

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def listToListNode(nums):
    dummy = ListNode(0)
    ptr = dummy
    for n in nums:
        ptr.next = ListNode(n)
        ptr = ptr.next
    return dummy.next

def listNodeToList(node):
    res = []
    while node:
        res.append(node.val)
        node = node.next
    return res

head = listToListNode(json.loads(sys.stdin.read().strip()))

def reorderList(head):
    # Write your code here
    pass

reorderList(head)
print(json.dumps(listNodeToList(head)).replace(" ", ""))`,
              testCases: [
                  { input: "[1,2,3,4]", output: "[1,4,2,3]" },
                  { input: "[1,2,3,4,5]", output: "[1,5,2,4,3]" }
              ]
          },
          { 
              id: 'remove-nth-node-from-end-of-list', 
              name: 'Жагсаалтын төгсгөлөөс N-р зангилааг устгах', 
              videoId: 'WTe7RJ3_TVM', 
              description: `
                <p class="mb-4">Холбоос жагсаалтын <code>head</code> өгөгдсөн бол жагсаалтын төгсгөлөөс <code>n</code>-р зангилааг устгаж, <code>head</code>-ийг буцаа.</p>
                <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
                  <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
                  <pre class="text-sm">Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]</pre>
                </div>`,
              defaultLanguage: "python",
              starterCode: `import sys
import json

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def listToListNode(nums):
    dummy = ListNode(0)
    ptr = dummy
    for n in nums:
        ptr.next = ListNode(n)
        ptr = ptr.next
    return dummy.next

def listNodeToList(node):
    res = []
    while node:
        res.append(node.val)
        node = node.next
    return res

lines = sys.stdin.read().splitlines()
head = listToListNode(json.loads(lines[0]))
n = int(lines[1])

def removeNthFromEnd(head, n):
    # Write your code here
    pass

res = removeNthFromEnd(head, n)
print(json.dumps(listNodeToList(res)).replace(" ", ""))`,
              testCases: [
                  { input: "[1,2,3,4,5]\n2", output: "[1,2,3,5]" }
              ]
          }
      ]
  },
  {
      category: 'Tree',
      problems: [
          { 
              id: 'invert-binary-tree', 
              name: 'Бинар модыг урвуулах', 
              videoId: 'cGGZcLtrX-A', 
              description: `
                <p class="mb-4">Бинар модны <code>root</code> өгөгдсөн бол модыг урвуулж (толин тусгал мэт), үндсийг нь буцаа.</p>
                <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
                  <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
                  <pre class="text-sm">Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]</pre>
                </div>`,
              defaultLanguage: "python",
              starterCode: `import sys
import json
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Helper to build tree from level order array [4,2,7,1,3,6,9]
def buildTree(nodes):
    if not nodes: return None
    root = TreeNode(nodes[0])
    queue = deque([root])
    i = 1
    while queue and i < len(nodes):
        node = queue.popleft()
        if i < len(nodes) and nodes[i] is not None:
            node.left = TreeNode(nodes[i])
            queue.append(node.left)
        i += 1
        if i < len(nodes) and nodes[i] is not None:
            node.right = TreeNode(nodes[i])
            queue.append(node.right)
        i += 1
    return root

# Helper to convert tree to array (level order)
def treeToArray(root):
    if not root: return []
    res = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        if node:
            res.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            res.append(None)
    # Remove trailing Nones
    while res and res[-1] is None:
        res.pop()
    return res

nodes = json.loads(sys.stdin.read().strip())
root = buildTree(nodes)

def invertTree(root):
    # Write your code here
    pass

res = invertTree(root)
print(json.dumps(treeToArray(res)).replace(" ", ""))`,
              testCases: [
                  { input: "[4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" }
              ]
          },
          { 
              id: 'maximum-depth-of-binary-tree', 
              name: 'Бинар модны хамгийн их гүн', 
              videoId: 'LVmVM5lRfDg', 
              description: `
                <p class="mb-4">Бинар модны <code>root</code> өгөгдсөн бол түүний хамгийн их гүнийг ол.</p>
                <p class="mb-4">Бинар модны <strong>хамгийн их гүн</strong> нь үндэс зангилаанаас хамгийн алслагдсан навч зангилаа хүртэлх хамгийн урт замын дагуух зангилаануудын тоо юм.</p>
                <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
                  <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
                  <pre class="text-sm">Input: root = [3,9,20,null,null,15,7]
Output: 3</pre>
                </div>`,
              defaultLanguage: "python",
              starterCode: `import sys
import json
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def buildTree(nodes):
    if not nodes: return None
    root = TreeNode(nodes[0])
    queue = deque([root])
    i = 1
    while queue and i < len(nodes):
        node = queue.popleft()
        if i < len(nodes) and nodes[i] is not None:
            node.left = TreeNode(nodes[i])
            queue.append(node.left)
        i += 1
        if i < len(nodes) and nodes[i] is not None:
            node.right = TreeNode(nodes[i])
            queue.append(node.right)
        i += 1
    return root

nodes = json.loads(sys.stdin.read().strip())
root = buildTree(nodes)

def maxDepth(root):
    # Write your code here
    pass

print(maxDepth(root))`,
              testCases: [
                  { input: "[3,9,20,null,null,15,7]", output: "3" }
              ]
          },
          { 
              id: 'same-tree', 
              name: 'Ижил мод', 
              videoId: 'nMK4qYwD9Lw', 
              description: `
                <p class="mb-4">Хоёр бинар модны <code>p</code> ба <code>q</code> үндсүүд өгөгдсөн бол тэдгээр нь ижил эсэхийг шалгах функц бич.</p>
                <p class="mb-4">Хоёр бинар мод нь бүтцийн хувьд ижил, зангилаанууд нь ижил утгатай байвал ижилд тооцогдоно.</p>
                <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
                  <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
                  <pre class="text-sm">Input: p = [1,2,3], q = [1,2,3]
Output: true</pre>
                </div>`,
              defaultLanguage: "python",
              starterCode: `import sys
import json
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def buildTree(nodes):
    if not nodes: return None
    root = TreeNode(nodes[0])
    queue = deque([root])
    i = 1
    while queue and i < len(nodes):
        node = queue.popleft()
        if i < len(nodes) and nodes[i] is not None:
            node.left = TreeNode(nodes[i])
            queue.append(node.left)
        i += 1
        if i < len(nodes) and nodes[i] is not None:
            node.right = TreeNode(nodes[i])
            queue.append(node.right)
        i += 1
    return root

lines = sys.stdin.read().splitlines()
p = buildTree(json.loads(lines[0]))
q = buildTree(json.loads(lines[1]))

def isSameTree(p, q):
    # Write your code here
    pass

print("true" if isSameTree(p, q) else "false")`,
              testCases: [
                  { input: "[1,2,3]\n[1,2,3]", output: "true" },
                  { input: "[1,2]\n[1,null,2]", output: "false" }
              ]
          }
      ]
  },
  {
      category: 'Backtracking',
      problems: [
          { 
              id: 'subsets', 
              name: 'Дэд олонлогууд', 
              videoId: '1qSf491gjFM', 
              description: `
                <p class="mb-4"><strong>Давтагдахгүй</strong> элементүүдтэй бүхэл тоон <code>nums</code> массив өгөгдсөн бол бүх боломжит дэд олонлогуудыг (power set) буцаа.</p>
                <p class="mb-4">Шийдийн олонлогт давхардсан дэд олонлог байж болохгүй. Шийдийг <strong>дурын дарааллаар</strong> буцааж болно.</p>
                <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
                  <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
                  <pre class="text-sm">Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]</pre>
                </div>`,
              defaultLanguage: "python",
              starterCode: `import sys
import json

nums = json.loads(sys.stdin.read().strip())

def subsets(nums):
    # Write your code here
    pass

# Helper to sort and print result
res = subsets(nums)
if res:
    res = [sorted(x) for x in res]
    res.sort(key=lambda x: (len(x), x))
    print(json.dumps(res).replace(" ", ""))
else:
    print("[]")`,
              testCases: [
                  { input: "[1,2,3]", output: "[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]" }
              ]
          }
      ]
  },
  {
      category: 'Heap / Priority Queue',
      problems: [
          { 
              id: 'last-stone-weight', 
              name: 'Сүүлийн чулууны жин', 
              videoId: 'Ol-cUXKP3Ic', 
              description: `
                <p class="mb-4">Танд бүхэл тоон <code>stones</code> массив өгөгдсөн ба <code>stones[i]</code> нь <code>i</code>-р чулууны жин юм.</p>
                <p class="mb-4">Бид чулуунуудтай тоглоом тоглож байна. Ээлж бүрт бид <strong>хамгийн хүнд хоёр чулууг</strong> сонгож, хооронд нь мөргөлдүүлнэ. Хамгийн хүнд хоёр чулуу <code>x</code> ба <code>y</code> жинтэй ба <code>x <= y</code> гэж үзье. Мөргөлдөөний үр дүнд:</p>
                <ul class="list-disc ml-5 mb-4">
                  <li>Хэрэв <code>x == y</code> бол хоёр чулуу хоёулаа устана.</li>
                  <li>Хэрэв <code>x != y</code> бол <code>x</code> жинтэй чулуу устаж, <code>y</code> жинтэй чулуу <code>y - x</code> жинтэй болно.</li>
                </ul>
                <p class="mb-4">Тоглоомын төгсгөлд <strong>хамгийн ихдээ нэг</strong> чулуу үлдэнэ.</p>
                <p class="mb-4">Үлдсэн чулууны жинг буцаа. Хэрэв чулуу үлдэхгүй бол <code>0</code>-ийг буцаа.</p>
                <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
                  <p class="font-bold text-slate-300 mb-2">Жишээ 1:</p>
                  <pre class="text-sm">Input: stones = [2,7,4,1,8,1]
Output: 1
Тайлбар: 
7 ба 8-ийг нэгтгэснээр 1 болно -> [2,4,1,1,1].
2 ба 4-ийг нэгтгэснээр 2 болно -> [2,1,1,1].
2 ба 1-ийг нэгтгэснээр 1 болно -> [1,1,1].
1 ба 1-ийг нэгтгэснээр 0 болно -> [1]. Энэ бол сүүлийн үлдсэн чулуу.</pre>
                </div>`,
              defaultLanguage: "python",
              starterCode: `import sys
import json
import heapq

stones = json.loads(sys.stdin.read().strip())

def lastStoneWeight(stones):
    # Write your code here
    pass

print(lastStoneWeight(stones))`,
              testCases: [
                  { input: "[2,7,4,1,8,1]", output: "1" }
              ]
          }
      ]
  }
];

export const problemMap = {};
for (const category of problemData) {
  for (const p of category.problems) {
    problemMap[p.id] = { ...p, category: category.category };
  }
}