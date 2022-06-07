import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {readDeck, deleteDeck, deleteCard, listCards} from "../../utils/api/index";

function Deck() {

    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState({});
    const params = useParams();
    const history = useHistory();
    const deckId = params.deckId;

    useEffect(() => {

        setCards({});

        async function loadData() {

            try {
                const response = await readDeck(deckId);
                setDeck(response);
                setCards(response.cards);
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.error("Aborted");
                } else {
                    throw error;
                }
            }
        }
        loadData();
    }, [deckId]);

    const handleDeleteDeck = async () => {
        const result = window.confirm('Delete this deck? You will not be able to recover it.');
        if (result) {
            async function deleteData() {
                try {
                    await deleteDeck(deckId);
                    history.push('/');
                } catch (error) {
                    if (error.name === "AbortError") {
                        console.log('Aborted')
                    } else {
                        throw error;
                    }
                }
            }
            deleteData();
        }
    };

    const handleDeleteCard = async ({target}) => {
        const value = target.value;
        const result = window.confirm('Delete this card? You will not be able to recover it.');

        if (result) {
            async function deleteData() {
                try {
                    await deleteCard(value);
                    const response = await listCards(deckId);
                    setCards(response);
                } catch (error) {
                    if (error.name === 'AbortError') {
                        console.log('Aborted');
                    } else {
                        throw error;
                    }
                }
            }
            deleteData();
        }
    };

    if (cards.length > 0) {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page" key="1">{deck.name}</li>
                    </ol>
                </nav>
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                <div className="row justify-content-center justify-content-md-start">
                    <div className="btn-group px-4">
                        <Link to={`/decks/${deckId}/edit`}className="btn btn-secondary mx-2">Edit</Link>
                        <Link to={`/decks/${deckId}/study`}className="btn btn-primary mx-2">Study</Link>
                        <Link to={`/decks/${deckId}/cards/new`}className="btn btn-primary mx-2">Add Cards</Link>
                        <button onClick={handleDeleteDeck} className="btn btn-danger mx-2">Delete</button>
                    </div>
                </div>
                <br/>
                <h2 className="text-center text-md-left">Cards</h2>
                <br/>
                {cards.map((card, index) => (
                    <div className="card" key={index}>
                        <div className="card-body">
                            <div className="container">
                                <div className="row justify-content-start">
                                    <div className="col-6">{card.front}</div>
                                    <div className="col-6">{card.back}</div>
                                </div>
                                <div className="row">
                                    <div className="mt-5 col-9">
                                        <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary">Edit</Link> &nbsp;
                                        <button onClick={handleDeleteCard} value={card.id} className="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div>
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                        </ol>
                    </nav>
                    <h3>{deck.name}</h3>
                    <p>{deck.description}</p>
                    <div className="row justify-content-between">
                        <div className="col-8">
                            <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mx-2">Edit</Link> &nbsp;
                            <Link to={`/decks/${deckId}/study`} className="btn btn-primary mx-2">Study</Link> &nbsp;
                            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mx-2">Add Cards</Link>
                        </div>
                        <div className="col-2">
                            <button onClick={handleDeleteDeck} className="btn btn-danger mx-2">Delete</button>
                        </div>
                    </div>
                    <br/>
                    <h2>No cards, please add one.</h2>
                </div>
            </div>
        );
    }
}

export default Deck;