---
title: java Pinyin4jUtil
date: '2020-12-20 21:44:46'
categories: java
tags:
    - java
---

# java Pinyin4jUtil

## java 汉字转为拼音

```java
import lombok.extern.slf4j.Slf4j;
import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

@Slf4j
public class Pinyin4jUtil {

    /**
     * 汉字转为拼音
     * @param src 字符串
     * @return 拼音字符串
     */
    public static String toPinyin(String src){
        StringBuilder pinyinStr = new StringBuilder();
        char[] newChar = src.toCharArray();

        // 输出的格式
        HanyuPinyinOutputFormat defaultFormat = new HanyuPinyinOutputFormat();
        defaultFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        defaultFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);

        try {
            for (char c : newChar) {
                if (Character.toString(c).matches("[\\u4E00-\\u9FA5]+")) {
                    //如果是多音字，返回多个拼音，这里只取第一个
                    pinyinStr.append(PinyinHelper.toHanyuPinyinStringArray(c, defaultFormat)[0]);
                } else {
                    pinyinStr.append(c);
                }
            }
        } catch (BadHanyuPinyinOutputFormatCombination e) {
            log.warn("convert str {} to pinyin failed: {}", src, e);
        }
 
        // 返回格式化后的字符
        return pinyinStr.toString();
    }

}
```
