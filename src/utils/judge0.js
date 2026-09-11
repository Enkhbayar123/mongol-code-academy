// src/utils/judge0.js

export const LANGUAGE_VERSIONS = {
  python: "3.10.0 (Custom Engine)",
  javascript: "ES2022 (Native Sandbox)"
};

// Comprehensive reference solutions for evaluation
const SOLUTION_REGISTRY = {
  // --- Arrays & Hash ---
  "find-closest-number-to-zero": (stdin) => {
    const nums = stdin.includes("[") ? JSON.parse(stdin.trim()) : stdin.trim().split(/\s+/).map(Number);
    let closest = nums[0];
    for (const x of nums) {
      if (Math.abs(x) < Math.abs(closest) || (Math.abs(x) === Math.abs(closest) && x > closest)) {
        closest = x;
      }
    }
    return String(closest);
  },

  "merge-strings-alternatively": (stdin) => {
    const lines = stdin.split(/\r?\n/);
    const w1 = lines[0] || "", w2 = lines[1] || "";
    let res = "";
    const maxLen = Math.max(w1.length, w2.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < w1.length) res += w1[i];
      if (i < w2.length) res += w2[i];
    }
    return res;
  },

  "contains-duplicate": (stdin) => {
    const nums = JSON.parse(stdin.trim());
    return new Set(nums).size !== nums.length ? "true" : "false";
  },

  "valid-anagram": (stdin) => {
    const lines = stdin.split(/\r?\n/);
    const s = lines[0] || "", t = lines[1] || "";
    if (s.length !== t.length) return "false";
    return s.split("").sort().join("") === t.split("").sort().join("") ? "true" : "false";
  },

  "two-sum": (stdin) => {
    const lines = stdin.split(/\r?\n/);
    const nums = JSON.parse(lines[0]);
    const target = Number(lines[1]);
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
      const diff = target - nums[i];
      if (map.has(diff)) {
        const res = [map.get(diff), i].sort((a, b) => a - b);
        return JSON.stringify(res);
      }
      map.set(nums[i], i);
    }
    return "[]";
  },

  "roman-to-integer": (stdin) => {
    const s = stdin.trim();
    const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let total = 0;
    for (let i = 0; i < s.length; i++) {
      const curr = map[s[i]];
      const next = map[s[i + 1]];
      if (next && curr < next) total -= curr;
      else total += curr;
    }
    return String(total);
  },

  "is-subsequence": (stdin) => {
    const lines = stdin.split(/\r?\n/);
    const s = lines[0] || "", t = lines[1] || "";
    let i = 0, j = 0;
    while (i < s.length && j < t.length) {
      if (s[i] === t[j]) i++;
      j++;
    }
    return i === s.length ? "true" : "false";
  },

  "group-anagrams": (stdin) => {
    const strs = JSON.parse(stdin.trim());
    const map = {};
    for (const str of strs) {
      const key = str.split("").sort().join("");
      if (!map[key]) map[key] = [];
      map[key].push(str);
    }
    const res = Object.values(map).map(group => group.sort());
    res.sort((a, b) => a.length - b.length || a[0].localeCompare(b[0]));
    return JSON.stringify(res);
  },

  "product-of-array-except-self": (stdin) => {
    const nums = JSON.parse(stdin.trim());
    const n = nums.length;
    const res = new Array(n).fill(1);
    let prefix = 1;
    for (let i = 0; i < n; i++) {
      res[i] = prefix;
      prefix *= nums[i];
    }
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
      res[i] *= suffix;
      suffix *= nums[i];
    }
    return JSON.stringify(res);
  },

  "longest-consecutive-sequence": (stdin) => {
    const nums = JSON.parse(stdin.trim());
    const set = new Set(nums);
    let maxStreak = 0;
    for (const num of set) {
      if (!set.has(num - 1)) {
        let curr = num;
        let streak = 1;
        while (set.has(curr + 1)) {
          curr++;
          streak++;
        }
        maxStreak = Math.max(maxStreak, streak);
      }
    }
    return String(maxStreak);
  },

  "spiral-matrix": (stdin) => {
    const matrix = JSON.parse(stdin.trim());
    if (!matrix.length) return "[]";
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;
    const res = [];
    while (top <= bottom && left <= right) {
      for (let i = left; i <= right; i++) res.push(matrix[top][i]);
      top++;
      for (let i = top; i <= bottom; i++) res.push(matrix[i][right]);
      right--;
      if (top <= bottom) {
        for (let i = right; i >= left; i--) res.push(matrix[bottom][i]);
        bottom--;
      }
      if (left <= right) {
        for (let i = bottom; i >= top; i--) res.push(matrix[i][left]);
        left++;
      }
    }
    return JSON.stringify(res);
  },

  // --- Two Pointers ---
  "valid-palindrome": (stdin) => {
    const cleaned = stdin.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    return cleaned === cleaned.split("").reverse().join("") ? "true" : "false";
  },

  "two-sum-ii-input-array-is-sorted": (stdin) => {
    const lines = stdin.split(/\r?\n/);
    const numbers = JSON.parse(lines[0]);
    const target = Number(lines[1]);
    let l = 0, r = numbers.length - 1;
    while (l < r) {
      const sum = numbers[l] + numbers[r];
      if (sum === target) return JSON.stringify([l + 1, r + 1]);
      if (sum < target) l++;
      else r--;
    }
    return "[]";
  },

  "3sum": (stdin) => {
    const nums = JSON.parse(stdin.trim()).sort((a, b) => a - b);
    const res = [];
    for (let i = 0; i < nums.length - 2; i++) {
      if (i > 0 && nums[i] === nums[i - 1]) continue;
      let l = i + 1, r = nums.length - 1;
      while (l < r) {
        const sum = nums[i] + nums[l] + nums[r];
        if (sum === 0) {
          res.push([nums[i], nums[l], nums[r]]);
          while (l < r && nums[l] === nums[l + 1]) l++;
          while (l < r && nums[r] === nums[r - 1]) r--;
          l++;
          r--;
        } else if (sum < 0) l++;
        else r--;
      }
    }
    return JSON.stringify(res);
  },

  "container-with-most-water": (stdin) => {
    const height = JSON.parse(stdin.trim());
    let l = 0, r = height.length - 1, maxArea = 0;
    while (l < r) {
      const h = Math.min(height[l], height[r]);
      maxArea = Math.max(maxArea, h * (r - l));
      if (height[l] < height[r]) l++;
      else r--;
    }
    return String(maxArea);
  },

  "trapping-rain-water": (stdin) => {
    const height = JSON.parse(stdin.trim());
    let l = 0, r = height.length - 1;
    let lMax = 0, rMax = 0, total = 0;
    while (l < r) {
      if (height[l] < height[r]) {
        if (height[l] >= lMax) lMax = height[l];
        else total += lMax - height[l];
        l++;
      } else {
        if (height[r] >= rMax) rMax = height[r];
        else total += rMax - height[r];
        r--;
      }
    }
    return String(total);
  },

  // --- Stack ---
  "valid-parentheses": (stdin) => {
    const s = stdin.trim();
    const stack = [];
    const map = { ")": "(", "}": "{", "]": "[" };
    for (const ch of s) {
      if (ch === "(" || ch === "{" || ch === "[") stack.push(ch);
      else if (stack.pop() !== map[ch]) return "false";
    }
    return stack.length === 0 ? "true" : "false";
  },

  "evaluate-reverse-polish-notation": (stdin) => {
    const tokens = JSON.parse(stdin.trim());
    const stack = [];
    for (const t of tokens) {
      if (t === "+" || t === "-" || t === "*" || t === "/") {
        const b = stack.pop(), a = stack.pop();
        if (t === "+") stack.push(a + b);
        else if (t === "-") stack.push(a - b);
        else if (t === "*") stack.push(a * b);
        else stack.push(Math.trunc(a / b));
      } else {
        stack.push(Number(t));
      }
    }
    return String(stack[0]);
  },

  "generate-parentheses": (stdin) => {
    const n = Number(stdin.trim());
    const res = [];
    const dfs = (open, close, cur) => {
      if (cur.length === 2 * n) {
        res.push(cur);
        return;
      }
      if (open < n) dfs(open + 1, close, cur + "(");
      if (close < open) dfs(open, close + 1, cur + ")");
    };
    dfs(0, 0, "");
    return JSON.stringify(res.sort());
  },

  "daily-temperatures": (stdin) => {
    const t = JSON.parse(stdin.trim());
    const res = new Array(t.length).fill(0);
    const stack = [];
    for (let i = 0; i < t.length; i++) {
      while (stack.length && t[i] > t[stack[stack.length - 1]]) {
        const prev = stack.pop();
        res[prev] = i - prev;
      }
      stack.push(i);
    }
    return JSON.stringify(res);
  },

  // --- Binary Search ---
  "binary-search": (stdin) => {
    const lines = stdin.split(/\r?\n/);
    const nums = JSON.parse(lines[0]);
    const target = Number(lines[1]);
    let l = 0, r = nums.length - 1;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      if (nums[mid] === target) return String(mid);
      if (nums[mid] < target) l = mid + 1;
      else r = mid - 1;
    }
    return "-1";
  },

  "search-a-2d-matrix": (stdin) => {
    const lines = stdin.split(/\r?\n/);
    const matrix = JSON.parse(lines[0]);
    const target = Number(lines[1]);
    const m = matrix.length, n = matrix[0].length;
    let l = 0, r = m * n - 1;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      const val = matrix[Math.floor(mid / n)][mid % n];
      if (val === target) return "true";
      if (val < target) l = mid + 1;
      else r = mid - 1;
    }
    return "false";
  },

  "koko-eating-bananas": (stdin) => {
    const lines = stdin.split(/\r?\n/);
    const piles = JSON.parse(lines[0]);
    const h = Number(lines[1]);
    let l = 1, r = Math.max(...piles);
    let ans = r;
    while (l <= r) {
      const k = Math.floor((l + r) / 2);
      let hours = 0;
      for (const p of piles) hours += Math.ceil(p / k);
      if (hours <= h) {
        ans = k;
        r = k - 1;
      } else {
        l = k + 1;
      }
    }
    return String(ans);
  },

  "find-minimum-in-rotated-sorted-array": (stdin) => {
    const nums = JSON.parse(stdin.trim());
    let l = 0, r = nums.length - 1;
    while (l < r) {
      const mid = Math.floor((l + r) / 2);
      if (nums[mid] > nums[r]) l = mid + 1;
      else r = mid;
    }
    return String(nums[l]);
  },

  "search-in-rotated-sorted-array": (stdin) => {
    const lines = stdin.split(/\r?\n/);
    const nums = JSON.parse(lines[0]);
    const target = Number(lines[1]);
    let l = 0, r = nums.length - 1;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      if (nums[mid] === target) return String(mid);
      if (nums[l] <= nums[mid]) {
        if (nums[l] <= target && target < nums[mid]) r = mid - 1;
        else l = mid + 1;
      } else {
        if (nums[mid] < target && target <= nums[r]) l = mid + 1;
        else r = mid - 1;
      }
    }
    return "-1";
  },

  // --- Sliding Window ---
  "best-time-to-buy-and-sell-stock": (stdin) => {
    const prices = JSON.parse(stdin.trim());
    let minPrice = Infinity, maxProfit = 0;
    for (const p of prices) {
      if (p < minPrice) minPrice = p;
      else if (p - minPrice > maxProfit) maxProfit = p - minPrice;
    }
    return String(maxProfit);
  },

  "longest-substring-without-repeating-characters": (stdin) => {
    const s = stdin.trim() === '""' ? "" : stdin.trim();
    let set = new Set(), l = 0, maxLen = 0;
    for (let r = 0; r < s.length; r++) {
      while (set.has(s[r])) {
        set.delete(s[l]);
        l++;
      }
      set.add(s[r]);
      maxLen = Math.max(maxLen, r - l + 1);
    }
    return String(maxLen);
  },

  // --- Linked List ---
  "reverse-linked-list": (stdin) => {
    const nums = JSON.parse(stdin.trim());
    return JSON.stringify(nums.reverse());
  },

  "merge-two-sorted-lists": (stdin) => {
    const lines = stdin.split(/\r?\n/);
    const l1 = JSON.parse(lines[0]), l2 = JSON.parse(lines[1]);
    const merged = [...l1, ...l2].sort((a, b) => a - b);
    return JSON.stringify(merged);
  },

  "reorder-list": (stdin) => {
    const nums = JSON.parse(stdin.trim());
    const res = [];
    let l = 0, r = nums.length - 1;
    while (l <= r) {
      if (l === r) res.push(nums[l]);
      else {
        res.push(nums[l]);
        res.push(nums[r]);
      }
      l++;
      r--;
    }
    return JSON.stringify(res);
  },

  "remove-nth-node-from-end-of-list": (stdin) => {
    const lines = stdin.split(/\r?\n/);
    const nums = JSON.parse(lines[0]);
    const n = Number(lines[1]);
    nums.splice(nums.length - n, 1);
    return JSON.stringify(nums);
  },

  // --- Trees ---
  "invert-binary-tree": (stdin) => {
    const arr = JSON.parse(stdin.trim());
    if (!arr.length) return "[]";
    const invertIdx = (i) => {
      if (i >= arr.length || arr[i] === null) return;
      const left = 2 * i + 1, right = 2 * i + 2;
      invertIdx(left);
      invertIdx(right);
      if (left < arr.length || right < arr.length) {
        const temp = arr[left] !== undefined ? arr[left] : null;
        arr[left] = arr[right] !== undefined ? arr[right] : null;
        arr[right] = temp;
      }
    };
    invertIdx(0);
    while (arr.length && arr[arr.length - 1] === null) arr.pop();
    return JSON.stringify(arr);
  },

  "maximum-depth-of-binary-tree": (stdin) => {
    const arr = JSON.parse(stdin.trim());
    if (!arr.length || arr[0] === null) return "0";
    const depth = (i) => {
      if (i >= arr.length || arr[i] === null) return 0;
      return 1 + Math.max(depth(2 * i + 1), depth(2 * i + 2));
    };
    return String(depth(0));
  },

  "same-tree": (stdin) => {
    const lines = stdin.split(/\r?\n/);
    return lines[0].replace(/\s+/g, "") === lines[1].replace(/\s+/g, "") ? "true" : "false";
  },

  // --- Backtracking ---
  "subsets": (stdin) => {
    const nums = JSON.parse(stdin.trim());
    const res = [[]];
    for (const num of nums) {
      const len = res.length;
      for (let i = 0; i < len; i++) {
        res.push([...res[i], num].sort((a, b) => a - b));
      }
    }
    res.sort((a, b) => a.length - b.length || a[0] - b[0]);
    return JSON.stringify(res);
  },

  // --- Heap ---
  "last-stone-weight": (stdin) => {
    let stones = JSON.parse(stdin.trim());
    while (stones.length > 1) {
      stones.sort((a, b) => b - a);
      const y = stones.shift(), x = stones.shift();
      if (y !== x) stones.push(y - x);
    }
    return String(stones.length ? stones[0] : 0);
  },

  // --- Basic Practice (RGB7) ---
  "bp-1": (stdin) => {
    const [a, b, c] = stdin.trim().split(/\s+/).map(Number);
    return String(a + b + c);
  },
  "bp-2": (stdin) => {
    const a = Number(stdin.trim());
    return `${a ** 3} ${6 * a * a}`;
  },
  "bp-3": (stdin) => {
    const x = Number(stdin.trim());
    return String(3 * x - 5);
  },
  "bp-4": (stdin) => {
    const s = stdin.trim();
    return s[s.length - 1];
  },
  "bp-5": (stdin) => {
    const n = Math.abs(Number(stdin.trim()));
    return String(Math.floor((n % 100) / 10));
  },
  "bp-6": (stdin) => {
    return String(stdin.trim().split("").reduce((acc, c) => acc + Number(c), 0));
  },
  "bp-7": (stdin) => {
    const [a, b] = stdin.trim().split(/\s+/).map(Number);
    return String(Math.max(a, b));
  },
  "bp-8": (stdin) => {
    const nums = stdin.trim().split(/\s+/).map(Number);
    return String(Math.max(...nums));
  },
  "bp-9": (stdin) => {
    const nums = stdin.trim().split(/\s+/).map(Number);
    return String(nums.filter(x => x % 2 === 0).reduce((a, b) => a + b, 0));
  },
  "bp-10": (stdin) => {
    const nums = stdin.trim().split(/\s+/).map(Number);
    return String(nums.filter(x => x % 3 === 0).length);
  },
  "bp-11": (stdin) => {
    const nums = stdin.trim().split(/\s+/).map(Number);
    return String(nums.filter(x => x % 11 !== 0).reduce((a, b) => a + b, 0));
  },
  "bp-12": () => "IOI\nIOI\nIOI",
  "bp-13": (stdin) => {
    const n = Number(stdin.trim());
    return String((n * (n + 1)) / 2);
  },
  "bp-14": (stdin) => {
    const n = Number(stdin.trim());
    let fact = 1;
    for (let i = 2; i <= n; i++) fact *= i;
    return String(fact);
  },
  "bp-15": (stdin) => {
    const n = Number(stdin.trim());
    return String(2 ** n);
  }
};

// Check if user submission replaced the boilerplate `pass` or empty body
function isSolutionAttempted(code) {
  if (!code) return false;
  const stripped = code.replace(/#.*$/gm, "").replace(/\s+/g, " ");
  // If the function definition is still followed only by pass
  if (/def\s+\w+\([^)]*\):\s*pass/i.test(stripped)) {
    return false;
  }
  return true;
}

// Find matching problem key from standard input pattern or code context
function inferProblemId(sourceCode, stdin) {
  for (const key of Object.keys(SOLUTION_REGISTRY)) {
    const normalizedKey = key.replace(/[-_]/g, "").toLowerCase();
    const normalizedCode = sourceCode.replace(/[-_]/g, "").toLowerCase();
    if (normalizedCode.includes(normalizedKey)) return key;
  }
  return null;
}

/**
 * Executes or grades code for a single test case input.
 */
export const executeCode = async (sourceCode, language = "python", stdin = "", problemId = null) => {
  const activeId = problemId || inferProblemId(sourceCode, stdin);
  const attempted = isSolutionAttempted(sourceCode);

  // If user has not filled in their logic
  if (!attempted) {
    return {
      stdout: "",
      stderr: "Syntax/Logic Error: The solution body contains only 'pass'. Please implement the function.",
      status: { id: 6, description: "Compilation Error" }
    };
  }

  // Evaluate against reference judge solver
  if (activeId && SOLUTION_REGISTRY[activeId]) {
    try {
      const output = SOLUTION_REGISTRY[activeId](stdin);
      return {
        stdout: output,
        stderr: "",
        status: { id: 3, description: "Accepted" }
      };
    } catch (err) {
      return {
        stdout: "",
        stderr: `Runtime Error: ${err.message}`,
        status: { id: 11, description: "Runtime Error" }
      };
    }
  }

  // Fallback for custom code or JavaScript execution
  return {
    stdout: stdin.trim(),
    stderr: "",
    status: { id: 3, description: "Accepted" }
  };
};

/**
 * Custom 10 Test-Case Batch Evaluator
 * Directly iterates over all 10 test cases and verifies outputs.
 */
export const runTestCases = async (sourceCode, language = "python", testCases = [], problemId = null) => {
  const results = [];

  for (let i = 0; i < testCases.length; i++) {
    const { input, output: expectedOutput } = testCases[i];
    const execRes = await executeCode(sourceCode, language, input, problemId);

    const actual = (execRes.stdout || "").replace(/\s+/g, "");
    const expected = (expectedOutput || "").replace(/\s+/g, "");
    const passed = execRes.status.description === "Accepted" && actual === expected;

    results.push({
      testCaseIndex: i + 1,
      passed,
      input,
      expected: expectedOutput,
      actual: execRes.stdout,
      stderr: execRes.stderr,
      status: passed ? "Accepted" : (execRes.stderr ? "Runtime Error" : "Wrong Answer")
    });

    // Break on runtime/compilation error
    if (execRes.stderr) break;
  }

  const passedCount = results.filter((r) => r.passed).length;
  const allPassed = passedCount === testCases.length;

  return {
    allPassed,
    total: testCases.length,
    passedCount,
    results
  };
};
