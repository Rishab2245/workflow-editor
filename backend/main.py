from collections import defaultdict, deque

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class PipelineNode(BaseModel):
    id: str


class PipelineEdge(BaseModel):
    source: str
    target: str


class PipelinePayload(BaseModel):
    nodes: list[PipelineNode]
    edges: list[PipelineEdge]


class PipelineAnalysis(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def is_directed_acyclic_graph(node_ids: list[str], edges: list[PipelineEdge]) -> bool:
    adjacency = defaultdict(list)
    in_degree = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        if edge.source == edge.target:
            return False

        if edge.source not in in_degree:
            in_degree[edge.source] = 0
        if edge.target not in in_degree:
            in_degree[edge.target] = 0

        adjacency[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    queue = deque(node_id for node_id, degree in in_degree.items() if degree == 0)
    visited_count = 0

    while queue:
        current = queue.popleft()
        visited_count += 1

        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == len(in_degree)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse", response_model=PipelineAnalysis)
def parse_pipeline(payload: PipelinePayload):
    node_ids = [node.id for node in payload.nodes]

    return PipelineAnalysis(
        num_nodes=len(payload.nodes),
        num_edges=len(payload.edges),
        is_dag=is_directed_acyclic_graph(node_ids, payload.edges),
    )
