import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {readDeck, updateDeck} from "../../utils/api/index";
import DeckForm from "./DeckForm";

function EditDeck() {

    const history = useHistory();
    const params = useParams();
    const deckId = params.deckId;
    const [deck, setDeck] = useState({});

    useEffect(() => {
        async function loadData() {
            try {
                const response = await readDeck(deckId);
                setDeck(response);
            } catch(error) {
                if(error.name === "AbortError") {
                    console.error("Aborted");
                } else {
                    throw error;
                }
            }
        }
        loadData();
    }, [deckId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        async function updateForm() {
            try {
                await updateDeck(deck);
                history.push(`/decks/${deckId}`);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        }
        updateForm();
    }

    const handleChange = ({target}) => {
        setDeck({...deck, [target.name]: target.value})
    };

    return (
        <div>
        <nav className="justify-content-center" aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">{" "}Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
            </ol>
        </nav>
        <DeckForm handleChange={handleChange} handleSubmit={handleSubmit} name={deck.name} description={deck.description}/>
        </div>
    )
}

export default EditDeck;