# Assessment-Complete Pipeline Editor

A polished full-stack pipeline editor built with React, React Flow, Zustand, and FastAPI. Users can create visual pipelines by dragging nodes onto a canvas, connecting them into a graph, editing node fields, and sending the graph to a backend that reports the number of nodes, number of edges, and whether the graph is a DAG.

## Features

- drag-and-drop node editor
- reusable node abstraction
- 9 node types including 5 extra demo nodes
- dynamic Text node variables with auto-generated handles
- centralized Zustand graph state
- FastAPI backend with DAG detection
- frontend and backend test coverage
- polished responsive UI

## Tech Stack

- React
- React Flow
- Zustand
- FastAPI
- Pydantic
- Jest and React Testing Library
- Pytest

## Project Structure

```text
.
├── backend/
├── frontend/
├── README.md
├── PROJECT_DESCRIPTION.md
├── BUILT_PROJECT_SUMMARY.md
├── TECH_STACK_AND_RATIONALE.md
└── SETUP_GUIDE.md
```

## Quick Start

### Backend

```bash
cd backend
python3 -m pip install fastapi uvicorn pytest httpx
python3 -m uvicorn main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

### Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm start
```

Frontend URL:

```text
http://localhost:3000
```

## How to Use

1. Drag nodes from the toolbar to the canvas.
2. Connect node handles to create a directed graph.
3. Edit the node fields.
4. Add placeholders like `{{input}}` inside the Text node to generate variable handles.
5. Click `Analyze Pipeline`.
6. Review the alert showing:
   - node count
   - edge count
   - DAG status

## Run Tests

### Frontend tests

```bash
cd frontend
CI=true npm test -- --watch=false
```

### Frontend build

```bash
cd frontend
npm run build
```

### Backend tests

```bash
python3 -m pytest backend -q
```

## Documentation

- [Project Description](/Users/rishab/Downloads/drive-download-20260313T150513Z-1-001/PROJECT_DESCRIPTION.md)
- [Built Project Summary](/Users/rishab/Downloads/drive-download-20260313T150513Z-1-001/BUILT_PROJECT_SUMMARY.md)
- [Tech Stack and Rationale](/Users/rishab/Downloads/drive-download-20260313T150513Z-1-001/TECH_STACK_AND_RATIONALE.md)
- [Detailed Setup Guide](/Users/rishab/Downloads/drive-download-20260313T150513Z-1-001/SETUP_GUIDE.md)

## Notes

- The backend endpoint is `POST /pipelines/parse`.
- The frontend uses `REACT_APP_API_URL` if you want to point it at a custom backend.
- The existing `frontend/README.md` is the default Create React App README and is not the main project documentation.
