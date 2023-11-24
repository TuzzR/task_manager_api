# Task Manager RESTful API

The API allows users to perform CRUD operations (Create, Read, Update, and Delete) on tasks. Tasks have a title, description, completion status.

## Table of Contents

- [Endpoints](#endpoints)
  - [Retrieve all tasks](#retrieve-all-tasks)
  - [Retrieve a single task by ID](#retrieve-a-single-task-by-id)
  - [Create a new task](#create-a-new-task)
  - [Update an existing task by ID](#update-an-existing-task-by-id)
  - [Delete a task by ID](#delete-a-task-by-id)
  - [Retrieve tasks based on priority level](#retrieve-tasks-based-on-priority-level)
- [Filtering and Sorting](#filtering-and-sorting)
- [Usage](#usage)
- [Installation](#installation)

## Endpoints

### Retrieve all tasks

`GET /tasks`

### Retrieve a single task by its ID

`GET /tasks/:id`

### Create a new task

`POST /tasks`

#### Request Body

- `title`: Title of the task.
- `description`: Description of the task.
- `completed`: Completion status of the task (`true` or `false`).

### Update an existing task by its ID

`PUT /tasks/:id`

#### Request Body

- `title` (optional): New title of the task.
- `description` (optional): New description of the task.
- `completed` (optional): New completion status of the task (`true` or `false`).

### Delete a task by its ID

`DELETE /tasks/:id`

## Installation

`npm install`
