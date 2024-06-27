---
title: java 用位运算写一个俄罗斯方块
date: '2021-02-12 14:07:56'
categories:
    - java
tags:
    - java
---

# java 用位运算写一个俄罗斯方块


## 前言

春节临近，闲来无事，偶得一文 [适合 Java 新手的开源项目集合](https://zhuanlan.zhihu.com/p/312484956)，其中提到 [FlappyBird](https://github.com/kingyuluk/FlappyBird) 这个项目
赶紧 `git clone` 下来学习一番，学习过后：能不能搞一个俄罗斯方块？

俄罗斯方块项目地址: [tetris](https://github.com/dreamhunter2333/java-tetris)

## 准备

- 首先肯定是俄罗斯方块的格子，我选择了 `20 x 10` 参考 `FlappyBird` 的图形展示，实现格子的展示
- 记录最高分的方式同 `FlappyBird`
- 按键监听的方式同 `FlappyBird`

格子的存储采用二进制数据的列表，格子不为空就为 1，例如下面

```java
// I 型方块
Arrays.asList(
        0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x10, 0x10, 0x10, 0x10
)
```

## 设计

主要使用两个类完成主要逻辑的实现

- Block 负责方块的所有动作
- Tetris 负责整个游戏的动作

## 方块状态

使用二进制数据的列表存储，已经落下的方块为一个列表，下落中的为另一个列表

```java
// 已经落下的方块
List<Integer> blockList1 = Arrays.asList(
        0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00
);
// 下落中的方块
List<Integer> blockList2 = Arrays.asList(
        0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x10, 0x10, 0x10, 0x10
);
```

### 方块移动边界判断

利用位运算，防止移动后超出当前 `20 x 10` 的工作区

- 方块碰撞检测，使用位运算，碰撞检测只需四行，两个列表只要有任何与操作后值为 1 的即碰撞

```java
/**
    * 判断两个数组的二进制数字是否有交集
    * 有交集时返回 false
    */
public static boolean checkBlockMove(List<Integer> blockList1, List<Integer> blockList2) {
    for (int i = 0; i < Constant.BLOCK_ROW_SIZE; i++) {
        if ((blockList1.get(i) & blockList2.get(i)) != 0) {
            return false;
        }
    }
    return true;
}
```

- 左移右移时将所有列的值与操作，合并为一行，再移位进行判断是否越界

```java
// 方块左移
public void moveBlockLeft(int length, List<Integer> tetrisBlockList) {
    // 新建数组
    List<Integer> newBlockList = new ArrayList<>(Constant.INIT_BLOCK_LIST);
    // 计算右移之前的所有有方块的列
    int rightValue = 0;
    for (int i = 0; i < blockList.size(); i++) {
        rightValue |= blockList.get(i);
        // 右移，即方块左移
        int rowValue = blockList.get(i) >> length;
        newBlockList.set(i, rowValue);
    }
    // 计算右移之后，是否越界，为 0 时不越界
    rightValue &= (int) Math.pow(2, length) - 1;

    if (rightValue == 0 && TetrisUtil.checkBlockMove(newBlockList, tetrisBlockList)) {
        // 更新偏移量和方块列表
        moveROW += length;
        blockList = newBlockList;
    }
}

// 方块右移
public void moveBlockRight(int length, List<Integer> tetrisBlockList) {
    // 新建数组
    List<Integer> newBlockList = new ArrayList<>(Constant.INIT_BLOCK_LIST);
    // 计算左移之前的所有有方块的列
    int leftValue = 0;
    for (int i = 0; i < blockList.size(); i++) {
        leftValue |= blockList.get(i);
        // 左移，即方块右移
        int rowValue = blockList.get(i) << length;
        newBlockList.set(i, rowValue);
    }
    // 计算左移之后，是否越界，为 0 时不越界
    leftValue = (leftValue >> (Constant.BLOCK_COLUMN_SIZE - length)) & ((int) Math.pow(2, length) - 1);

    if (leftValue == 0 && TetrisUtil.checkBlockMove(newBlockList, tetrisBlockList)) {
        // 更新偏移量和方块列表
        moveROW -= length;
        blockList = newBlockList;
    }
}
```

### 方块旋转

枚举方块的所有状态，每次变动，每次进行水平和垂直移动时记录偏移量，
对旋转后的方块进行相同偏移量的移动，对移动后的位置进行碰撞检测，
如果通过了碰撞检测，即可以旋转，否则维持原状。

```java
// 方块旋转
public void rotateBlock(List<Integer> tetrisBlockList) {
    // 方块不存在
    if (block == null) return;

    // 获取方块下一状态
    int newBlockState = blockState + 1;
    if (newBlockState >= block.size()) {
        newBlockState = 0;
    }
    List<Integer> rotateBlockList = block.get(newBlockState);

    // 垂直偏移量大于 0 时，判断是否可以移动过去
    if (moveDown > 0) {
        int bottomValue = rotateBlockList.get(moveDown - 1);
        if (bottomValue != 0) return;
    }

    // 计算移位之前的所有有方块的列
    int moveValue = 0;

    // 新建列表, 并将偏移量应用
    List<Integer> newBlockList = new ArrayList<>(Constant.INIT_BLOCK_LIST);
    for (int i = moveDown; i < blockList.size(); i++) {
        int rowValue;
        // 进行移位
        if (moveROW >= 0) {
            rowValue = rotateBlockList.get(i) >> moveROW;
        } else {
            rowValue = rotateBlockList.get(i) << Math.abs(moveROW);
        }
        moveValue |= rotateBlockList.get(i);
        newBlockList.set(i - moveDown, rowValue);
    }

    // 判断是否越界，moveValue 为 0 时不越界
    int tempValue = (int) Math.pow(2, Math.abs(moveROW)) - 1;
    if (moveROW >= 0) {
        moveValue &= tempValue;
    } else {
        moveValue = (moveValue >> (Constant.BLOCK_COLUMN_SIZE - Math.abs(moveROW))) & tempValue;
    }

    // 方块列表和方块状态
    if (moveValue == 0 && TetrisUtil.checkBlockMove(newBlockList, tetrisBlockList)) {
        blockList = newBlockList;
        blockState = newBlockState;
    }
}

```

## 完善

- 方块自动下落，刷新页面时以一定速度下移
- 方块展示，位运算或之后展示
- 方块消除，行的值全为 1 时消除
