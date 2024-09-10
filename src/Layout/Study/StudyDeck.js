import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import {readDeck} from "../../utils/api/index";

function Study() {

    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState({});
    const [facing, setFacing] = useState(true);
    const [cardNum, setCardNum] = useState(0);
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
                if (error.name === "AbortError") {
                    console.error("Aborted");
                } else {
                    throw error;
                }
            }
        }
        loadData();
    }, [deckId]);

    function handleCardFlip() {
        setFacing(!facing);
    }

    function cardOrder() {
        if (cardNum + 1 < cards.length) {
            setCardNum(cardNum + 1);
            setFacing(true);
        } else {
            const restart = window.confirm("Restart Cards? Click 'cancel' to return to the home page.");
             if (restart) {
                 setCardNum(0);
                 setFacing(true);
             } else {
                 history.push("/");
             }
        }
    }
    if (cards.length > 1) {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item" aria-current="page" key="1"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page" key="2">Study</li>
                    </ol>
                </nav>
                <h2 className="my-4">Study: {deck.name}</h2>
                <div className="d-flex card">
                    <div className="card-body justify-content-between">
                        <div className="row">
                            <h3 className="card-title">Card {cardNum + 1} of {cards.length}</h3>
                            <div className="card-text col-6">{(facing) ? `${cards[cardNum].front}` : `${cards[cardNum].back}`}</div>
                            <div className="btn-toolbar justify-content-end">
                                <button className="btn btn-warning mx-2" onClick={handleCardFlip}>Flip</button>
                                {(facing) ? " " : <button className="btn btn-primary" onClick={cardOrder}>Next</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" key="3"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item" aria-current="page" key="4"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page" key="5">Study</li>
                    </ol>
                </nav>
                    <h2>Study: {deck.name}</h2>
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Not Enough Cards.</h3>
                            <Link className="btn btn-primary" to={`/decks/${deckId}/cards/new`}>Add Cards</Link>
                        </div>
                    </div>
            </div>
        );
    }

}

export default Study;

