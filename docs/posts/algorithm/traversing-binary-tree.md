---
title: 四种遍历二叉树
date: '2021-05-23 16:24:46'
categories:
    - algorithm
tags:
    - algorithm
---

节点类

```java
Public Class Node {
    public String data;
    public Node left;
    public Node right;
}
```

## 层序遍历二叉树

```java
public static void levelOrder(Node node) {
    if (node == null) return;
    List<String> res = new ArraryList<>();
    Queue<Node> queue = new LinkedList<>();
    queue.offer(node);
    while (!queue.isEmpty()) {
        Node curNode = queue.poll();
        res.add(curNode.data);
        if (curNode.left != null) queue.offer(curNode.left);
        if (curNode.right != null) queue.offer(curNode.right);
    }
    System.out.println(res);
}
```

## 前序遍历二叉树

递归

```java
public static void preOrderTraveral(Node node) {
    if (node == null) return;
    System.out.print(node.data);
    preOrderTraveral(node.left);
    preOrderTraveral(node.right);
}
```

非递归

```java
public static void preOrderTraveral(Node node) {
    if (node == null) return;
    List<String> res = new ArraryList<>();
    Stack<Node> stack = new Stack<>();
    stack.push(node);
    while (!stack.isEmpty()) {
        Node curNode = queue.pop();
        res.add(curNode.data);
        if (curNode.right != null) stack.push(curNode.right);
        if (curNode.left != null) stack.push(curNode.left);
    }
    System.out.println(res);
}
```

## 中序遍历二叉树

递归

```java
public static void inOrderTraveral(Node node) {
    if (node == null) return;
    inOrderTraveral(node.left);
    System.out.print(node.data);
    inOrderTraveral(node.right);
}
```

非递归

```java
public static void inOrderTraveral(Node node) {
    if (node == null) return;
    List<String> res = new ArraryList<>();
    Stack<Node> stack = new Stack<>();
    TreeNode curNode = node;
    while (curNode != null || !stack.isEmpty()) {
        while (curNode != null) {
            stack.push(curNode);
            curNode = cur.left;
        }
        Node popNode = queue.pop();
        res.add(popNode.data);
        curNode = popNode.right;
    }
    System.out.println(res);
}
```

## 后序遍历二叉树

递归

```java
public static void postOrderTraveral(Node node) {
    if (node == null) return;
    postOrderTraveral(node.left);
    postOrderTraveral(node.right);
    System.out.print(node.data);
}
```

非递归

```java
public static void postOrderTraveral(Node node) {
    if (node == null) return;
    List<String> res = new ArraryList<>();
    Stack<Node> stack = new Stack<>();
    stack.push(node);
    while (!stack.isEmpty()) {
        Node curNode = queue.pop();
        res.add(curNode.data);
        if (curNode.left != null) stack.push(curNode.left);
        if (curNode.right != null) stack.push(curNode.right);
    }
    Collections.reverse(res);
    System.out.println(res);
}
```
