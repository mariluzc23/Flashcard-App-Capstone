import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {readCard, updateCard} from "../../utils/api/index"
import CardForm from "./CardForm";

function EditCard() {

    const history = useHistory();
    const params = useParams();
    const deckId = params.deckId;
    const cardId = params.cardId;
    const [card, setCard] = useState({});

    useEffect(() => {

        async function loadData() {
            try{
                const response = await readCard(cardId)
                setCard(response);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.error("Aborted");
                } else {
                    throw error;
                }
            }
        }
        loadData();
    }, [cardId]);

    const handleChange = ({target}) => {
        const value = target.value;
        setCard({...card, [target.name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        async function updateForm() {
            try {
                await updateCard(card);
                history.push(`/decks/${deckId}/cards`);
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

    return (
        <div>
            <nav className="justify-content-center" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">{" "}Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card</li>
                </ol>
            </nav>
            <form className="form col-12" onSubmit={handleSubmit}>
                <CardForm formData={card} handleChange={handleChange}/>
                <Link to="/" className="btn btn-danger">Cancel</Link>
                <button type="submit" className="btn btn-primary m-2">Submit</button>
            </form>
        </div>
    )

}

export default EditCard