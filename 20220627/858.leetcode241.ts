/**
 * 2022/07/01 每日一题 241. 为运算表达式设计优先级
 * 给你一个由数字和运算符组成的字符串 expression ，按不同优先级组合数字和运算符，计算并返回所有可能组合的结果。你可以 按任意顺序 返回答案。
 * 
 * 生成的测试用例满足其对应输出值符合 32 位整数范围，不同结果的数量不超过 104 。
 * 
 * 示例 1：
 * 
 * 输入：expression = "2-1-1"
 * 输出：[0,2]
 * 解释：
 * ((2-1)-1) = 0 
 * (2-(1-1)) = 2
 * 示例 2：
 * 
 * 输入：expression = "2*3-4*5"
 * 输出：[-34,-14,-10,-10,10]
 * 解释：
 * (2*(3-(4*5))) = -34 
 * ((2*3)-(4*5)) = -14 
 * ((2*(3-4))*5) = -10 
 * (2*((3-4)*5)) = -10 
 * (((2*3)-4)*5) = 10
 *  
 * 
 * 提示：
 * 
 * 1 <= expression.length <= 20
 * expression 由数字和算符 '+'、'-' 和 '*' 组成。
 * 输入表达式中的所有整数值在范围 [0, 99]
 */
 let memo = new Map()
 function diffWaysToCompute(expression: string): number[] {
   // 避免重复计算
   if (memo.has(expression)) {
     return memo.get(expression)
   }
   let res = []
   for (let i = 0; i < expression.length; i++) {
     let c = expression.charAt(i)
     // 扫描算式 expression 中的运算符
     if (c == "*" || c == "+" || c == "-") {
       /****** 分 ******/
       let left = diffWaysToCompute(expression.substring(0, i));
       let right = diffWaysToCompute(expression.substring(i + 1));
       /****** 治 ******/
       // 通过子问题的结果，合成原问题的结果
       for (let a of left) {
         for (let b of right) {
           switch (c) {
             case "*":
               res.push(a * b)
               break;
             case "+":
               res.push(a + b)
               break;
             case "-":
               res.push(a - b)
               break;
           }
         }
       }
     }
   }
   // base case，递归函数必须有个 base case 用来结束递归，其实这段代码就是我们分治算法的 base case，代表着你「分」到什么时候可以开始「治」
   // 如果 res 为空，说明算式是一个数字，没有运算符（因为当算式中不存在运算符的时候，就不会触发 if 语句，也就不会给res中添加任何元素）
   if (!res.length) {
     res.push(parseInt(expression))
   }
   // 将结果添加进备忘录
   memo.set(expression, res)
   return res
 };
 