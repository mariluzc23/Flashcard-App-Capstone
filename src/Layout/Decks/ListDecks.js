import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {listDecks, deleteDeck} from "../../utils/api/index"

function ListDecks() {

    const [decks, setDecks] = useState([]);

    useEffect(() => {
        async function loadDecks() {
            try {
                const response = await listDecks();
                setDecks(response);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.error(error.message);
                } else {
                    throw error;
                }
            }
        }
        loadDecks();
    }, []);

    const handleDeleteDecks = ({target}) => {
        const selected = target.value;
        const result = window.confirm("Delete this deck? You will not be able to recover it.");

        if (result) {
            async function deleteData() {
                try {
                    await deleteDeck(selected);
                    const response = await listDecks();
                    setDecks(response)
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
    if (decks.length > 0) {
        return (
            <div key="35">
                {decks.map((deck) => (
                    <div className="card mb-4" key={deck.id}>
                        <div className="container">
                            <div className="card-header row">
                                <div className="col-10">
                                    <h4>{deck.name}</h4>
                                </div>
                                <div>
                                    <p>{deck.cards.length} cards</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{deck.description}</p>
                            <div>
                            <div className="container">
                                <div className="btn-toolbar align-center d-md-block">
                                    <Link to={`decks/${deck.id}`} className="btn btn-primary mx-1" key="11">View</Link>
                                    <Link to={`decks/${deck.id}/study`} className="btn btn-success mx-1" key="12">Study</Link>
                                    <button className="btn btn-danger mx-1" value={deck.id} onClick={handleDeleteDecks} key="13">Delete</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        "Please create a deck."
    );

}

export default ListDecks;