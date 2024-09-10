import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {createCard, readDeck} from "../../utils/api/index";
import CardForm from "./CardForm";

function AddCard() {

    const history = useHistory();
    const [deck, setDeck] = useState([]);
    const params = useParams();
    const deckId = params.deckId;

    const initialCardState = {
        Front: "",
        Back: "",
        deckId
    };

    const [formData, setFormData] = useState({...initialCardState});
    
    const handleChange = ({target}) => {
        const value = target.value;
        setFormData({...formData, [target.name]: value, });
    };

    useEffect(() => {
        async function loadData() {
            try {
                const response = await readDeck(deckId);
                setDeck(response);
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Aborted');
                } else {
                    throw error;
                }
            }
        }
        loadData();
    }, [deckId]);

    const handleSave = (event) => {
        event.preventDefault();
        async function updateForm() {
            try {
                const response = await createCard(deckId, formData);
                setFormData(initialCardState, response);
            } catch(error) {
                if (error.name === 'AbortError'){
                    console.log('Aborted');
                } else {
                    throw error;
                }
            }
        }
        updateForm();
        window.confirm("Card was saved succesfully!")
    }

    const handleSubmit = () => {
        history.push(`/decks/${deckId}`);
    }
 
    return (
        <div className="col-12 justify-content-center">
        <nav className="justify-content-center" aria-label="breadcrum">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">{" "}Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Add Card
                </li>
            </ol>
        </nav>
        <br/>
        <h1>{deck.name}</h1>
        <form className="form col-12" onSubmit={handleSave}>
            <CardForm formData={formData} handleChange={handleChange}/>
            <button type="button" className="btn btn-primary mx-2" onClick={handleSave}>Save</button>
            <button type="button" className="btn btn-warning mx-2" onClick={handleSubmit}>Done</button>
        </form>
        </div>
    );
}

export default AddCard;