/**
 * 2022/08/02 每日一题 622. 设计循环队列
 * 设计你的循环队列实现。 循环队列是一种线性数据结构，其操作表现基于 FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。它也被称为“环形缓冲器”。
 *
 * 循环队列的一个好处是我们可以利用这个队列之前用过的空间。在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，即使在队列前面仍有空间。但是使用循环队列，我们能使用这些空间去存储新的值。
 *
 * 你的实现应该支持如下操作：
 *
 * MyCircularQueue(k): 构造器，设置队列长度为 k 。
 * Front: 从队首获取元素。如果队列为空，返回 -1 。
 * Rear: 获取队尾元素。如果队列为空，返回 -1 。
 * enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真。
 * deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
 * isEmpty(): 检查循环队列是否为空。
 * isFull(): 检查循环队列是否已满。
 *
 *
 * 示例：
 *
 * MyCircularQueue circularQueue = new MyCircularQueue(3); // 设置长度为 3
 * circularQueue.enQueue(1);  // 返回 true
 * circularQueue.enQueue(2);  // 返回 true
 * circularQueue.enQueue(3);  // 返回 true
 * circularQueue.enQueue(4);  // 返回 false，队列已满
 * circularQueue.Rear();  // 返回 3
 * circularQueue.isFull();  // 返回 true
 * circularQueue.deQueue();  // 返回 true
 * circularQueue.enQueue(4);  // 返回 true
 * circularQueue.Rear();  // 返回 4
 *
 *
 * 提示：
 *
 * 所有的值都在 0 至 1000 的范围内；
 * 操作数将在 1 至 1000 的范围内；
 * 请不要使用内置的队列库。
 */
class MyCircularQueue {
  private capacity: number
  private elements: number[]
  private rear: number
  private front: number
  constructor(k: number) {
    this.capacity = k + 1
    this.elements = new Array(this.capacity).fill(0)
    this.rear = 0
    this.front = 0
  }

  enQueue(value: number): boolean {
    if (this.isFull()) {
      return false
    }
    this.elements[this.rear] = value
    this.rear = (this.rear + 1) % this.capacity
    return true
  }

  deQueue(): boolean {
    if (this.isEmpty()) {
      return false
    }
    this.front = (this.front + 1) % this.capacity
    return true
  }

  Front(): number {
    if (this.isEmpty()) {
      return -1
    }
    return this.elements[this.front]
  }

  Rear(): number {
    if (this.isEmpty()) {
      return -1
    }
    return this.elements[(this.rear - 1 + this.capacity) % this.capacity]
  }

  isEmpty(): boolean {
    return this.rear == this.front
  }

  isFull(): boolean {
    return (this.rear + 1) % this.capacity === this.front
  }
}

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
