---
title: ansible deploy docker-compose services
date: '2022-07-19 21:24:09'
categories:
    - devops
tags:
    - devops
    - ansible
    - python
---

# ansible deploy docker-compose services

## Install Ansible

```bash
python3 -m venv ./venv
./venv/bin/python3 -m pip install ansible
export PATH="`pwd`/venv/bin:$PATH"
ansible-inventory -i inventory.yaml --list
ansible virtualmachines -m ping -i inventory.yaml
```

## create files

目录结构如下

```bash
roles
├── common
│   └── tasks
│       └── main.yaml
└── nginx
    ├── files
    │   ├── conf.d
    │   │   ├── forbidden.conf
    │   │   ├── jdk8-api.dev.conf
    │   │   └── status.conf
    │   └── docker-compose.yml
    └── tasks
        └── main.yaml
site.yaml
inventory.yaml
```

### inventory.yaml 填写 vm 分组信息

```yaml
tool_vms:
  hosts:
    tool:
      ansible_host: ip/hostname
```

### site.yaml

```yaml
---
- name: Deploy to tool nodes
  hosts: tool_vms
  roles:
    - nginx
```

### roles 编写具体步骤

files 放用到的文件，tasks 放具体的任务

common/tasks/main.yaml

```yaml
---
- name: apt install python3-pip
  apt:
    name: python3-pip
    state: present
    update_cache: yes
  become: true

- name: pip install docker docker-compose
  ansible.builtin.pip:
    name:
      - docker
      - docker-compose

- name: Create docker network
  community.docker.docker_network:
    name: nginx_net
```

nginx/tasks/main.yaml

```yaml
---
- name: "Set variables"
  set_fact:
    path: "/opt/projects/nginx"

- name: Create Folder
  file:
    path: "{{ path }}"
    state: directory

- name: copy Docker Compose and nginx conf files
  copy:
    src: files/{{ item }}
    dest: "{{ path }}/{{ item }}"
  loop:
    - conf.d/
    - docker-compose.yml

- name: Docker Compose down
  community.docker.docker_compose:
    project_src: "{{ path }}"
    state: absent

- name: Docker Compose up
  community.docker.docker_compose:
    project_src: "{{ path }}"
    state: present
```

## deploy website

开始部署，冲冲冲

```bash
ansible-playbook -i inventory.yaml site.yaml
```
