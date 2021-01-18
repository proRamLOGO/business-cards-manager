import React, {useState} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import './App.css';

function imageUpdate( e, setImageFile, setImageURL, setDisplayImage ) {
  e.preventDefault();

  let reader = new FileReader();
  let file = e.target.files[0];
  reader.onloadend = () => {
    setImageFile(file);
    setImageURL(reader.result);
    setDisplayImage(true);
  };
  reader.readAsDataURL(file);
}

function CardImage( {src, displayImage} ) {

  if ( displayImage===true ) {
    return (
      <>
        <img src={src} height={200} />
      </>
    )
  } else {
    return (<></> );
  }

}

function addNewCardToStorage( imageURL,cardName,cardNote,setUserCards ) {
  
  let cards = JSON.parse(localStorage.getItem('userCards'));
  if ( cards==null ){
    cards = [];
  }
  cards.push({imageURL,cardName,cardNote});
  try {
    localStorage.setItem('userCards',JSON.stringify(cards));
  } catch(err) {
    alert( 'Limit Full' );
    cards.pop();
    return null;
  }
  alert("Card Added Successfully");
  setUserCards(cards);
  return null;
}

function NewCard( {userCards,setUserCards} ) {

  const [image,setImage] = useState(null,imageUpdate);
  const [imageFile,setImageFile] = useState('');
  const [imageURL,setImageURL] = useState('');
  const [displayImage,setDisplayImage] = useState(false);
  const [cardName,setCardName] = useState('');
  const [cardNote,setCardNote] = useState('');

  return (
    <div className="newCard">

      <Typography variant="h4" style={{ paddingBottom: '20px'}} >
        Add a new Card
      </Typography>

      <Button variant="contained" component="label" >
        Upload Card image
        <input type="file" hidden onChange={(e) => imageUpdate(e,setImageFile,setImageURL,setDisplayImage) } accept="image/*"/>
      </Button>

      <br/>
  
      <form className="NewCard__form" >
        <CardImage src={imageURL} displayImage={displayImage} />
          <br /><br />
        <TextField id="name" label="Name" variant="outlined" 
          onChange={(e) => {setCardName(e.target.value)} } />
          <br /><br />
        <TextField id="note" label="Note" variant="outlined" multiline rows={4} 
          onChange={(e) => {setCardNote(e.target.value)} } />
          <br /><br />
        <Button variant="contained" component="label" color="primary"
          onClick={ (e) => {addNewCardToStorage( imageURL,cardName,cardNote,setUserCards )} }
        > 
          Add Card </Button>

      </form>

    </div>
  );

}

function YourCards( {userCards} ) {
  
  if ( userCards==null ){
    userCards = [];
  }
  return (
      <div className="yourCards" >
       <Typography variant="h4">
        Your Cards
      </Typography>

      <div className="yourCards__list">
        { userCards.map( (card) => {
          return (
            <Card className="yourCards__Card">
              <CardActionArea>
                <img
                  className="yourCards__Card--CardMedia"
                  src={card['imageURL']}
                  title={card['cardName']}
                />
              </CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {card['cardName']}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {card['cardNote']}
              </Typography>
            </CardContent>
            </Card>
          )
        } ) }
      </div>
      </div>
  )
}

function App() {
  const [userCards,setUserCards] = useState( JSON.parse(localStorage.getItem('userCards')) );

  return (
    <div className="App">

      <AppBar position="static" className="AppBar">
        <Toolbar>
          <Typography variant="h5">
            Business Cards Manager
          </Typography>
        <a classname="AppBar__GithubIcon" href="https://github.com/proRamLOGO/business-cards-manager"><GitHubIcon style={{ color: '#fff'}}/></a>
        </Toolbar>
      </AppBar >

      <div>
        <NewCard userCards={userCards} setUserCards={setUserCards}/>
        <hr style={{marginTop: '50px'}} />
        <YourCards userCards={userCards} />
      </div>

    </div>
  );
}

export default App;
