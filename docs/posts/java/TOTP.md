---
title: 基于时间的一次性密码算法
date: '2021-04-21 08:58:11'
categories:
    - java
tags:
    - java
---

## java GoogleAuth

[GoogleAuth](https://github.com/wstrange/GoogleAuth)

Maven:

```xml
<dependency>
  <groupId>com.warrenstrange</groupId>
  <artifactId>googleauth</artifactId>
  <version>1.4.0</version>
</dependency>
```

Usage

```java
GoogleAuthenticator gAuth = new GoogleAuthenticator();
boolean isCodeValid = gAuth.authorize(secretKey, password);
```

Clinet

```java
GoogleAuthenticator gAuth = new GoogleAuthenticator();
int code = gAuth.getTotpPassword(secretKey);
```

## python pyotp

[pyotp](https://github.com/pyauth/pyotp)

Google Authenticator Compatible

```python
totp = pyotp.TOTP('base32secret3232')
totp.now() # => '492039'

# OTP verified for current time
totp.verify('492039') # => True
time.sleep(30)
totp.verify('492039') # => False
```
