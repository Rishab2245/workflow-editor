from fastapi.testclient import TestClient

from backend.main import app


client = TestClient(app)


def test_parse_empty_graph():
    response = client.post("/pipelines/parse", json={"nodes": [], "edges": []})

    assert response.status_code == 200
    assert response.json() == {"num_nodes": 0, "num_edges": 0, "is_dag": True}


def test_parse_simple_chain():
    response = client.post(
        "/pipelines/parse",
        json={
            "nodes": [{"id": "a"}, {"id": "b"}, {"id": "c"}],
            "edges": [
                {"source": "a", "target": "b"},
                {"source": "b", "target": "c"},
            ],
        },
    )

    assert response.status_code == 200
    assert response.json() == {"num_nodes": 3, "num_edges": 2, "is_dag": True}


def test_parse_branching_graph():
    response = client.post(
        "/pipelines/parse",
        json={
            "nodes": [{"id": "a"}, {"id": "b"}, {"id": "c"}, {"id": "d"}],
            "edges": [
                {"source": "a", "target": "b"},
                {"source": "a", "target": "c"},
                {"source": "c", "target": "d"},
            ],
        },
    )

    assert response.status_code == 200
    assert response.json() == {"num_nodes": 4, "num_edges": 3, "is_dag": True}


def test_parse_cycle():
    response = client.post(
        "/pipelines/parse",
        json={
            "nodes": [{"id": "a"}, {"id": "b"}, {"id": "c"}],
            "edges": [
                {"source": "a", "target": "b"},
                {"source": "b", "target": "c"},
                {"source": "c", "target": "a"},
            ],
        },
    )

    assert response.status_code == 200
    assert response.json() == {"num_nodes": 3, "num_edges": 3, "is_dag": False}


def test_parse_self_loop():
    response = client.post(
        "/pipelines/parse",
        json={
            "nodes": [{"id": "a"}],
            "edges": [{"source": "a", "target": "a"}],
        },
    )

    assert response.status_code == 200
    assert response.json() == {"num_nodes": 1, "num_edges": 1, "is_dag": False}


def test_parse_disconnected_acyclic_graph():
    response = client.post(
        "/pipelines/parse",
        json={
            "nodes": [{"id": "a"}, {"id": "b"}, {"id": "c"}, {"id": "d"}],
            "edges": [
                {"source": "a", "target": "b"},
                {"source": "c", "target": "d"},
            ],
        },
    )

    assert response.status_code == 200
    assert response.json() == {"num_nodes": 4, "num_edges": 2, "is_dag": True}
