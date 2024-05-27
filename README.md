
# Task Board Application

## Overview

The Task Board is a simple, web-based Kanban board application that allows users to manage tasks by categorizing them into three columns: To Do, In Progress, and Done. Users can add new tasks with a name, description, and due date. Tasks can be dragged and dropped between columns, and the application persists the tasks using the browser's localStorage.

## Features

- **Add New Tasks**: Users can create new tasks with a name, description, and due date.
- **Drag and Drop**: Tasks can be dragged and dropped between the To Do, In Progress, and Done columns.
- **Due Date Color Coding**: Tasks are color-coded based on their due date.
  - Grey: Task is due in 2 or more days.
  - Yellow: Task is due within 1 day.
  - Red: Task is past due.
- **Persistence**: Tasks are saved in localStorage and persist even after a page refresh.
- **Delete Tasks**: Users can delete tasks from the board.

## Technologies Used

- **HTML**: Structure of the web page.
- **CSS**: Styling of the web page.
- **JavaScript**: Functionality for adding, dragging, dropping, and saving tasks.

## Setup and Usage

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Edge).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/velazqe/planner.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd task-board
   ```

### Usage

1. **Open `index.html` in a web browser**:
   - You can simply double-click the `index.html` file in the project directory, or open it in a browser by right-clicking and selecting "Open with" followed by your browser choice.

### File Structure

- `index.html`: Main HTML file containing the structure of the task board.
- `styles.css`: CSS file for styling the task board.
- `script.js`: JavaScript file for adding functionality to the task board.

## Code Explanation

### HTML (`index.html`)

The HTML file contains the structure of the Task Board, including the modal for adding new tasks and the columns for task categories.

### CSS (`styles.css`)

The CSS file styles the Task Board, including the layout of the columns and the appearance of the modal and task cards.

### JavaScript (`script.js`)

The JavaScript file adds functionality to the Task Board, including adding tasks, dragging and dropping tasks, and saving tasks to localStorage.
