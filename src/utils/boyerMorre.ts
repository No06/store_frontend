// 计算坏字符数组
function badChar(str: string): number[] {
    const len = str.length; // 模式串长度
    const bc = new Array(256).fill(-1); // 坏字符数组
    for (let i = 0; i < len; i++) {
        const ascii = str.charCodeAt(i); // 字符对应的ASCII码
        bc[ascii] = i; // 记录字符最后出现的位置
    }
    return bc;
}

// 计算好后缀数组
function goodSuffix(str: string): number[] {
    const len = str.length; // 模式串长度
    const gs = new Array(len).fill(0); // 好后缀数组
    const suffix = new Array(len).fill(0); // 后缀子串数组
    suffix[len - 1] = len; // 最后一个字符的后缀子串就是整个模式串
    let lastPrefix = len - 1; // 最大公共前缀的最右位置
    for (let i = len - 2; i >= 0; i--) {
        if (i > lastPrefix && suffix[i + len - 1 - lastPrefix] < i - lastPrefix) {
            // 如果i在lastPrefix左边，并且i对应的后缀子串已经包含在lastPrefix对应的后缀子串中，则直接复制lastPrefix对应的值
            suffix[i] = suffix[i + len - 1 - lastPrefix];
        } else {
            // 否则需要重新计算i对应的后缀子串长度，并更新lastPrefix
            lastPrefix = Math.min(i, lastPrefix);
            while (lastPrefix >= 0 && str[lastPrefix] == str[lastPrefix + len - 1 - i]) {
                // 如果两个字符相等，则继续向左比较
                lastPrefix--;
            }
            suffix[i] = i - lastPrefix;
        }
    }
    for (let i = 0; i < len; i++) {
        gs[i] = len; // 初始化好后缀数组为len
    }
    let j = 0;
    for (let i = len - 1; i >= 0; i--) {
        if (suffix[i] == i + 1) {
            // 如果i对应的后缀子串也是模式串的前缀，则更新gs数组
            while (j < len - 1 - i) {
                if (gs[j] == len) {
                    // 如果gs数组还没有被赋值，则赋值为len - 1 - i
                    gs[j] = len - 1 - i;
                }
                j++;
            }
        }
    }
    for (let i = 0; i < len - 1; i++) {
        // 如果i对应的后缀子串在模式串中有匹配，则更新gs数组
        gs[len - 1 - suffix[i]] = len - 1 - i;
    }
    return gs;
}

// 执行BM算法
export function boyerMoore(main: string, pattern: string): number {
    const n = main.length; // 主串长度
    const m = pattern.length; // 模式串长度
    const bc = badChar(pattern); // 坏字符数组
    const gs = goodSuffix(pattern); // 好后缀数组
    let i = 0; // 主串的索引
    while (i <= n - m) {
        // 如果主串剩余长度大于等于模式串长度，则继续匹配
        let j = m - 1; // 模式串的索引，从右向左匹配
        while (j >= 0 && main[i + j] == pattern[j]) {
            // 如果两个字符相等，则继续向左比较
            j--;
        }
        if (j < 0) {
            // 如果匹配成功，则返回匹配位置的索引
            return i;
        } else {
            // 如果匹配失败，则根据两个规则计算移动距离，并取最大值
            const x = j - bc[main.charCodeAt(i + j)]; // 坏字符规则计算的移动距离
            const y = gs[j]; // 好后缀规则计算的移动距离
            i += Math.max(x, y); // 移动模式串
        }
    }
    return -1; // 如果没有匹配成功，则返回-1
}
