import React, {Component} from 'react';
import './UserCollection.css';
import Mana_B from './Mana_B.png'
import Mana_G from './Mana_G.png'
import Mana_W from './Mana_W.png'
import Mana_R from './Mana_R.png'
import Mana_U from './Mana_U.png'

export class CardList extends Component {
    constructor() {

        super()
    
        this.state = {
          //cards will be an array filled with objects sent from the server
          cards: [],
          filteredCards: [],
          name: '',
          cardid: '',
          imageuripng: '',
          artist: '',
          cmc: '',
          rarity: '',
          power: '',
          price: 0,
          value: 0,
          color: '',
          coloridentity: '',

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

    filterCards(colorfilter) {
        console.log("Attempting to filter cards!")
        let cards = this.state.cards
        let filteredCards = cards.filter(function(card) {
            if(card.color.includes(colorfilter)) return card
        })
        this.setState({
        filteredCards: filteredCards
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
            <h1 className="Text">Collection Value: ${this.state.value}</h1>
            <li className="ColorList">
                <img onClick={() => this.filterCards("B")} className="ColorImages" src={Mana_B}/>
                <img onClick={() => this.filterCards("W")} className="ColorImages" src={Mana_W}/>
                <img onClick={() => this.filterCards("R")} className="ColorImages" src={Mana_R}/>
                <img onClick={() => this.filterCards("U")} className="ColorImages" src={Mana_U}/>
                <img onClick={() => this.filterCards("G")} className="ColorImages" src={Mana_G}/>
            </li>
            <ul className="UList">{cardItems}</ul>
            </div>
        )
    }
}