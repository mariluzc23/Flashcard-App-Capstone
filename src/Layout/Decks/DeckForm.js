import React from "react";
import {Link} from "react-router-dom"

const DeckForm = ({handleSubmit, handleChange, name, description}) => {

    return (
        <form onSubmit={(event) =>handleSubmit(event)}>
            <div>
                <label>Name</label>
                <br/>
                <input 
                    type="text" 
                    name="name"
                    id="name"
                    placeholder="Deck name"
                    onChange={handleChange}
                    value={name || ""}
                    style={{ width: '100%' }}
                    required
                />
                <br/>
                <br/>
                <label>Description</label>
                <textarea
                    type="textarea"
                    id="description"
                    name="description"
                    placeholder="Brief description of the deck"
                    rows="5"
                    onChange={handleChange}
                    value={description || ""}
                    style={{ width: '100%' }}
                    required
                />
                <br/>      
            </div>
            <Link to={'/'} className="btn btn-secondary m-4">Cancel</Link>
            <button type="submit" className="btn btn-primary m-4">Submit</button>
        </form>
    )
};

export default DeckForm;