---
title: Normal Errors
date: '2022-01-21 23:12:51'
categories:
    - python
tags:
    - python
---

# Normal Errors

1. ModuleNotFoundError: No module named 'Tkinter'

    ```bash
    sudo apt-get install python3-tk
    ```

    [https://stackoverflow.com/questions/25905540/importerror-no-module-named-tkinter](https://stackoverflow.com/questions/25905540/importerror-no-module-named-tkinter)

2. fatal error :"python.h" no file or directory?

    ```bash
    sudo apt-get install python3-dev
    ```

    [https://askubuntu.com/questions/526708/fatal-error-python-h-no-file-or-directory](https://askubuntu.com/questions/526708/fatal-error-python-h-no-file-or-directory)

3. The headers or library files could not be found for zlib

    ```bash
    sudo apt install libjpeg8-dev zlib1g-dev
    ```

4. error: invalid command 'bdist_wheel'

    ```bash
    python3 -m pip install wheel
    ```
