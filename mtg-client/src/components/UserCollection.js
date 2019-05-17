import React, {Component} from 'react';
import './UserCollection.css';

export class CardList extends Component {
    constructor() {

        super()
    
        this.state = {
          //cards will be an array filled with objects sent from the server
          cards: [],
          name: '',
          cardid: '',
          imageuripng: '',
          artist: '',
          cmc: '',
          rarity: '',
          power: '',
          price: 0,
          value: 0,

          isUpdated:false
          }
      }



    populateCards() {
    console.log("Generating card collection!")
    let url = 'http://localhost:8080/api/cards'
    fetch(url)
    .then(response => response.json())
    .then(json => {
        console.log("setting the state.")
        this.setState({
        //Sets value of the cards array in the state to the json
        cards: json
            })
        })
    }

    generatePrice() {
        console.log("Generating price!")
        let url = 'http://localhost:8080/api/cards/price'
        fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log("setting the state.")
            this.setState({
            //Sets value of the cards array in the state to the json
            value: json
                })
            })
        }
    componentDidMount() {
        this.populateCards()
        this.generatePrice()
    }


    deleteClick(card) {
        fetch('http://localhost:8080/api/cards/delete', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({idcard:card.id})
        }).then(() => {
            this.populateCards()
        })
        
    }


    render() {
        let cards = this.state.cards
        let cardItems = cards.map((card) => {

          return (
            <li className="List">
            <img className="Card" src={card.imageuripng}/><p></p><span className="Text">Price: ${card.price}</span><button onClick={() => this.deleteClick(card)}>Delete</button></li>
          )
        })
        return (
            <div>
            <h1 className="Text">Collection Value: {this.state.value}</h1>
            <ul className="UList">{cardItems}</ul>
            </div>
        )
    }
}