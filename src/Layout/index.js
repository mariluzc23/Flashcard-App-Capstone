import React from "react";
import {Switch, Route} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home/Home";
import CreateDeck from "./New/CreateDeck";
import Deck from "./Decks/ViewDeck";
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";
import Study from "./Study/StudyDeck";
import EditDeck from "./Decks/EditDeck";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
      
      <Switch>
        <Route exact={true} path={'/'}>
          <Home />
        </Route>

        <Route path={'/decks/:deckId/study'}>
          <Study />
        </Route>

        <Route path={'/decks/new'}>
          <CreateDeck />
        </Route>

        <Route path={'/decks/:deckId/cards/:cardId/edit'}>
          <EditCard />
        </Route>

        <Route path={'/decks/:deckId/cards/new'}>
          <AddCard />
        </Route>

        <Route path={'/decks/:deckId/edit'}>
          <EditDeck />
        </Route>

        <Route path={'/decks/:deckId'}>
          <Deck />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    
      </div>
    </div>
  );
}

export default Layout;
