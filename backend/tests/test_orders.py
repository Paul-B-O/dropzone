from datetime import UTC, datetime, timedelta

from fastapi.testclient import TestClient

from tests.conftest import iso


def order(client: TestClient, drop_id: int):
    return client.post(f"/drops/{drop_id}/orders")


def test_an_order_decrements_the_stock(client: TestClient, make_drop) -> None:
    drop = make_drop(stock=3)
    response = order(client, drop["id"])
    assert response.status_code == 201
    assert response.json()["drop_id"] == drop["id"]
    assert response.json()["drop"]["remaining"] == 2
    assert client.get(f"/drops/{drop['id']}").json()["remaining"] == 2


def test_the_last_pair_sells_out_the_drop(client: TestClient, make_drop) -> None:
    drop = make_drop(stock=1)
    body = order(client, drop["id"]).json()
    assert body["drop"]["remaining"] == 0
    assert body["drop"]["status"] == "sold_out"


def test_a_sold_out_drop_cannot_be_ordered(client: TestClient, make_drop) -> None:
    drop = make_drop(stock=1)
    order(client, drop["id"])
    response = order(client, drop["id"])
    assert response.status_code == 409
    assert response.json()["detail"] == f"Le drop {drop['id']} est épuisé"
    assert client.get(f"/drops/{drop['id']}").json()["remaining"] == 0  # jamais négatif


def test_an_upcoming_drop_cannot_be_ordered(client: TestClient, make_drop) -> None:
    drop = make_drop(stock=5, opens_at=iso(datetime.now(UTC) + timedelta(days=1)))
    response = order(client, drop["id"])
    assert response.status_code == 409
    assert response.json()["detail"] == f"Le drop {drop['id']} n'est pas encore ouvert"
    assert client.get(f"/drops/{drop['id']}").json()["remaining"] == 5


def test_ordering_an_unknown_drop(client: TestClient) -> None:
    response = order(client, 999)
    assert response.status_code == 404
    assert response.json()["detail"] == "Drop 999 introuvable"
