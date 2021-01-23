# bin/bash
if [ $# -eq 2 ]
then
    if [ ! -d "docs/posts/$1" ]
    then
        mkdir "docs/posts/$1";
    fi
    echo "---
title: $2
date: `date +"%Y-%m-%d %H:%M:%S"`
categories:
    - $1
tags:
    - $1
---" > "docs/posts/$1/$2.md";
else
    echo "参数错误";
fi
