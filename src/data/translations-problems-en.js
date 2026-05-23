// src/data/translations-problems-en.js

export const enProblemTranslations = {
  // Basic Practice Problems Names
  "bp-1_name": "Triangle",
  "bp-2_name": "Cube",
  "bp-3_name": "Function 1",
  "bp-4_name": "Last Digit",
  "bp-5_name": "Tens Digit",
  "bp-6_name": "3-Digit Number",
  "bp-7_name": "Max of Two Numbers",
  "bp-8_name": "Max of Three Numbers",
  "bp-9_name": "Sum of Even Numbers",
  "bp-10_name": "Divisible by 3",
  "bp-11_name": "Not Divisible by 11",
  "bp-12_name": "IOI 3 Times",
  "bp-13_name": "Sum of First N Numbers",
  "bp-14_name": "N Factorial (n!)",
  "bp-15_name": "2 to the Power of N",
  "bp-16_name": "Page 1 Summary (All-in-One)",

  // Basic Practice Problems Descriptions
  "bp-1_desc": `
    <h4>Problem Description</h4>
    <p>Find the perimeter of the given triangle.</p>
    <h4>Input</h4>
    <p>The sides of the triangle are given as space-separated integers on a single line.</p>
    <h4>Output</h4>
    <p>The perimeter of the triangle.</p>
    <h4>Example</h4>
    <pre><code>Input:
3 4 5

Output:
12</code></pre>`,

  "bp-2_desc": `
    <h4>Problem Description</h4>
    <p>Find the volume and full surface area of the given cube.</p>
    <h4>Input</h4>
    <p>The side length of the cube is given as a single integer on one line.</p>
    <h4>Output</h4>
    <p>Print the volume and surface area of the cube separated by a space on one line.</p>
    <h4>Example</h4>
    <pre><code>Input:
5

Output:
125 150</code></pre>`,

  "bp-3_desc": `
    <h4>Problem Description</h4>
    <p>Calculate: y = 3x - 5</p>
    <h4>Input</h4>
    <p>The integer value of x is given.</p>
    <h4>Output</h4>
    <p>The calculated value of y.</p>
    <h4>Example</h4>
    <pre><code>Input:
1

Output:
-2</code></pre>`,

  "bp-4_desc": `
    <h4>Problem Description</h4>
    <p>Find the last digit of the given integer.</p>
    <h4>Input</h4>
    <p>An integer is given.</p>
    <h4>Output</h4>
    <p>The last digit of the number.</p>
    <h4>Example</h4>
    <pre><code>Input:
476

Output:
6</code></pre>`,

  "bp-5_desc": `
    <h4>Problem Description</h4>
    <p>Find the tens digit of the given integer.</p>
    <h4>Input</h4>
    <p>An integer is given.</p>
    <h4>Output</h4>
    <p>The tens digit of the number.</p>
    <h4>Example</h4>
    <pre><code>Input:
423

Output:
2</code></pre>`,

  "bp-6_desc": `
    <h4>Problem Description</h4>
    <p>Find the sum of digits of the given 3-digit positive integer.</p>
    <h4>Input</h4>
    <p>A positive 3-digit integer is given.</p>
    <h4>Output</h4>
    <p>The sum of its digits.</p>
    <h4>Example</h4>
    <pre><code>Input:
123

Output:
6</code></pre>`,

  "bp-7_desc": `
    <h4>Problem Description</h4>
    <p>Find the maximum of two given integers.</p>
    <h4>Input</h4>
    <p>Two space-separated integers are given on a single line.</p>
    <h4>Output</h4>
    <p>The larger integer.</p>
    <h4>Example</h4>
    <pre><code>Input:
16 14

Output:
16</code></pre>`,

  "bp-8_desc": `
    <h4>Problem Description</h4>
    <p>Find the maximum of three given integers.</p>
    <h4>Input</h4>
    <p>Three space-separated integers are given on a single line.</p>
    <h4>Output</h4>
    <p>The largest integer.</p>
    <h4>Example</h4>
    <pre><code>Input:
1 3 2

Output:
3</code></pre>`,

  "bp-9_desc": `
    <h4>Problem Description</h4>
    <p>Find the sum of even numbers among the three given integers. (At least one even number is guaranteed to exist.)</p>
    <h4>Input</h4>
    <p>Three space-separated integers are given on a single line.</p>
    <h4>Output</h4>
    <p>The sum of the even integers.</p>
    <h4>Example</h4>
    <pre><code>Input:
10 3 5

Output:
10</code></pre>`,

  "bp-10_desc": `
    <h4>Problem Description</h4>
    <p>Count how many of the four given integers are divisible by 3.</p>
    <h4>Input</h4>
    <p>Four space-separated integers are given on a single line.</p>
    <h4>Output</h4>
    <p>The count of integers divisible by 3.</p>
    <h4>Example</h4>
    <pre><code>Input:
3 12 8 9

Output:
3</code></pre>`,

  "bp-11_desc": `
    <h4>Problem Description</h4>
    <p>Find the sum of the integers among four given values that are NOT divisible by 11.</p>
    <h4>Input</h4>
    <p>Four space-separated integers are given on a single line.</p>
    <h4>Output</h4>
    <p>The sum of integers not divisible by 11.</p>
    <h4>Example</h4>
    <pre><code>Input:
7 22 13 30

Output:
50</code></pre>`,

  "bp-12_desc": `
    <h4>Problem Description</h4>
    <p>Print the string "IOI" exactly 3 times, each on a new line.</p>
    <h4>Input</h4>
    <p>No input.</p>
    <h4>Output</h4>
    <p>The word "IOI" printed three times on separate lines.</p>
    <h4>Example</h4>
    <pre><code>Input:
(none)

Output:
IOI
IOI
IOI</code></pre>`,

  "bp-13_desc": `
    <h4>Problem Description</h4>
    <p>Find the sum of the first N positive integers using a loop.</p>
    <h4>Input</h4>
    <p>A positive integer N is given.</p>
    <h4>Output</h4>
    <p>The sum from 1 to N.</p>
    <h4>Example</h4>
    <pre><code>Input:
5

Output:
15</code></pre>`,

  "bp-14_desc": `
    <h4>Problem Description</h4>
    <p>Calculate N factorial (N!).</p>
    <h4>Input</h4>
    <p>An integer N is given.</p>
    <h4>Output</h4>
    <p>The calculated factorial value.</p>
    <h4>Example</h4>
    <pre><code>Input:
5

Output:
120</code></pre>`,

  "bp-15_desc": `
    <h4>Problem Description</h4>
    <p>Find 2 raised to the power of N (2^N).</p>
    <h4>Input</h4>
    <p>An integer power exponent N is given.</p>
    <h4>Output</h4>
    <p>The value of 2^N.</p>
    <h4>Example</h4>
    <pre><code>Input:
5

Output:
32</code></pre>`,

  "bp-16_desc": `
    <p>A summary video containing detailed solutions for all basic problems on Page 1 of the SPOJ platform.</p>`,


  // LeetCode Problem Names
  "find-closest-number-to-zero_name": "Find Closest Number to Zero",
  "merge-strings-alternatively_name": "Merge Strings Alternately",
  "contains-duplicate_name": "Contains Duplicate",
  "valid-anagram_name": "Valid Anagram",
  "two-sum_name": "Two Sum",
  "roman-to-integer_name": "Roman to Integer",
  "is-subsequence_name": "Is Subsequence",
  "group-anagrams_name": "Group Anagrams",
  "product-of-array-except-self_name": "Product of Array Except Self",
  "longest-consecutive-sequence_name": "Longest Consecutive Sequence",
  "spiral-matrix_name": "Spiral Matrix",
  "valid-palindrome_name": "Valid Palindrome",
  "two-sum-ii-input-array-is-sorted_name": "Two Sum II - Input Array Is Sorted",
  "3sum_name": "3Sum",
  "container-with-most-water_name": "Container With Most Water",
  "trapping-rain-water_name": "Trapping Rain Water",
  "valid-parentheses_name": "Valid Parentheses",
  "evaluate-reverse-polish-notation_name": "Evaluate Reverse Polish Notation (RPN)",
  "generate-parentheses_name": "Generate Parentheses",
  "daily-temperatures_name": "Daily Temperatures",
  "binary-search_name": "Binary Search",
  "search-a-2d-matrix_name": "Search a 2D Matrix",
  "koko-eating-bananas_name": "Koko Eating Bananas",

  // LeetCode Problem Descriptions
  "find-closest-number-to-zero_desc": `
    <p class="mb-4">Given an integer array <code>nums</code> of size <code>n</code>, return the number with the value <strong>closest to 0</strong> in <code>nums</code>. If there are multiple answers, return the number with the <strong>largest value</strong>.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: nums = [-4,-2,1,4,8]
Output: 1
Explanation:
The distance from -4 to 0 is |-4| = 4.
The distance from -2 to 0 is |-2| = 2.
The distance from 1 to 0 is |1| = 1.
The distance from 4 to 0 is |4| = 4.
The distance from 8 to 0 is |8| = 8.
Thus, the closest number to 0 is 1.</pre>
    </div>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 2:</p>
      <pre class="text-sm">Input: nums = [2,-1,1]
Output: 1
Explanation: Both 1 and -1 are closest to 0, but 1 is larger, so we return 1.</pre>
    </div>`,

  "merge-strings-alternatively_desc": `
    <p class="mb-4">You are given two strings <code>word1</code> and <code>word2</code>. Merge the strings by adding letters in alternating order, starting with <code>word1</code>. If a string is longer than the other, append the additional letters onto the end of the merged string.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: word1 = "abc", word2 = "pqr"
Output: "apbqcr"
Explanation: The letters are merged as follows:
word1:  a   b   c
word2:    p   q   r
merged: a p b q c r</pre>
    </div>`,

  "contains-duplicate_desc": `
    <p class="mb-4">Given an integer array <code>nums</code>, return <code>true</code> if any value appears <strong>at least twice</strong> in the array, and return <code>false</code> if every element is distinct.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: nums = [1,2,3,1]
Output: true</pre>
    </div>`,

  "valid-anagram_desc": `
    <p class="mb-4">Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>t</code> is an anagram of <code>s</code>, and <code>false</code> otherwise.</p>
    <p class="mb-4 text-sm text-slate-400">An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: s = "anagram", t = "nagaram"
Output: true</pre>
    </div>`,

  "two-sum_desc": `
    <p class="mb-4">Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
    <p class="mb-4">You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice. You can return the answer in any order.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</pre>
    </div>`,

  "roman-to-integer_desc": `
    <p class="mb-4">Roman numerals are represented by seven different symbols: <code>I, V, X, L, C, D, M</code>.</p>
    <p class="mb-4">Given a roman numeral string, convert it to an integer.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: s = "III"
Output: 3</pre>
    </div>`,

  "is-subsequence_desc": `
    <p class="mb-4">Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>s</code> is a <strong>subsequence</strong> of <code>t</code>, or <code>false</code> otherwise.</p>
    <p class="mb-4 text-sm text-slate-400">A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: s = "abc", t = "ahbgdc"
Output: true</pre>
    </div>`,

  "group-anagrams_desc": `
    <p class="mb-4">Given an array of strings <code>strs</code>, group the <strong>anagrams</strong> together. You can return the answer in any order.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]</pre>
    </div>`,

  "product-of-array-except-self_desc": `
    <p class="mb-4">Given an integer array <code>nums</code>, return an array <code>answer</code> such that <code>answer[i]</code> is equal to the product of all the elements of <code>nums</code> except <code>nums[i]</code>.</p>
    <p class="mb-4">You must write an algorithm that runs in <code>O(n)</code> time and without using the division operation.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: nums = [1,2,3,4]
Output: [24,12,8,6]</pre>
    </div>`,

  "longest-consecutive-sequence_desc": `
    <p class="mb-4">Given an unsorted array of integers <code>nums</code>, return the length of the longest consecutive elements sequence.</p>
    <p class="mb-4">You must write an algorithm that runs in <code>O(n)</code> time.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.</pre>
    </div>`,

  "spiral-matrix_desc": `
    <p class="mb-4">Given an <code>m x n</code> <code>matrix</code>, return all elements of the matrix in <strong>spiral order</strong>.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]</pre>
    </div>`,

  "valid-palindrome_desc": `
    <p class="mb-4">A phrase is a <strong>palindrome</strong> if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.</p>
    <p class="mb-4">Given a string <code>s</code>, return <code>true</code> if it is a palindrome, or <code>false</code> otherwise.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.</pre>
    </div>`,

  "two-sum-ii-input-array-is-sorted_desc": `
    <p class="mb-4">Given a <strong>1-indexed</strong> array of integers <code>numbers</code> that is already <strong>sorted in non-decreasing order</strong>, find two numbers such that they add up to a specific <code>target</code> number.</p>
    <p class="mb-4">Return the indices of the two numbers, <code>index1</code> and <code>index2</code>, added by one as an integer array <code>[index1, index2]</code> of length 2.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2. We return [1, 2].</pre>
    </div>`,

  "3sum_desc": `
    <p class="mb-4">Given an integer array <code>nums</code>, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p>
    <p class="mb-4">Notice that the solution set must not contain duplicate triplets.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]</pre>
    </div>`,

  "container-with-most-water_desc": `
    <p class="mb-4">You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i</code>-th line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p>
    <p class="mb-4">Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49</pre>
    </div>`,

  "trapping-rain-water_desc": `
    <p class="mb-4">Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is <code>1</code>, compute how much water it can trap after raining.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6</pre>
    </div>`,

  "valid-parentheses_desc": `
    <p class="mb-4">Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>
    <p class="mb-4">An input string is valid if:</p>
    <ul class="list-disc ml-5 mb-4">
      <li>Open brackets must be closed by the same type of brackets.</li>
      <li>Open brackets must be closed in the correct order.</li>
    </ul>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: s = "()"
Output: true</pre>
    </div>`,

  "evaluate-reverse-polish-notation_desc": `
    <p class="mb-4">You are given an array of strings <code>tokens</code> that represents an arithmetic expression in a <strong>Reverse Polish Notation (RPN)</strong>.</p>
    <p class="mb-4">Evaluate the expression. Return an integer that represents the value of the expression.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: tokens = ["2","1","+","3","*"]
Output: 9</pre>
    </div>`,

  "generate-parentheses_desc": `
    <p class="mb-4">Given <code>n</code> pairs of parentheses, write a function to generate all combinations of well-formed parentheses.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]</pre>
    </div>`,

  "daily-temperatures_desc": `
    <p class="mb-4">Given an array of integers <code>temperatures</code> represents the daily temperatures, return an array <code>answer</code> such that <code>answer[i]</code> is the number of days you have to wait after the <code>i</code>-th day to get a warmer temperature. If there is no future day for which this is possible, keep <code>answer[i] == 0</code> instead.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]</pre>
    </div>`,

  "binary-search_desc": `
    <p class="mb-4">Given an array of integers <code>nums</code> which is sorted in ascending order, and an integer <code>target</code>, write a function to search <code>target</code> in <code>nums</code>. If <code>target</code> exists, then return its index. Otherwise, return <code>-1</code>.</p>
    <p class="mb-4">You must write an algorithm with <code>O(log n)</code> runtime complexity.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4</pre>
    </div>`,

  "search-a-2d-matrix_desc": `
    <p class="mb-4">You are given an <code>m x n</code> integer matrix <code>matrix</code> with the following two properties:</p>
    <ul class="list-disc ml-5 mb-4">
      <li>Each row is sorted in non-decreasing order.</li>
      <li>The first integer of each row is greater than the last integer of the previous row.</li>
    </ul>
    <p class="mb-4">Given an integer <code>target</code>, return <code>true</code> if <code>target</code> is in <code>matrix</code> or <code>false</code> otherwise.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true</pre>
    </div>`,

  "koko-eating-bananas_desc": `
    <p class="mb-4">Koko loves to eat bananas. There are <code>n</code> piles of bananas, the <code>i</code>-th pile has <code>piles[i]</code> bananas. The guards have gone and will come back in <code>h</code> hours.</p>
    <p class="mb-4">Koko can decide her bananas-per-hour eating speed of <code>k</code>. Return the minimum integer <code>k</code> such that she can eat all the bananas within <code>h</code> hours.</p>
    <div class="mb-4 bg-slate-800/50 p-4 rounded-lg">
      <p class="font-bold text-slate-300 mb-2">Example 1:</p>
      <pre class="text-sm">Input: piles = [3,6,7,11], h = 8
Output: 4</pre>
    </div>`
};
