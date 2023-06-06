import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
import { PopoverContext } from "../Context/PopoverContext";
import { useContext } from "react";
import { Slider, Button } from "@mui/material/";
import styles from "./FightPage.css";
// import { makeStyles } from "@mui/styles";

export default function FightPage() {
  const { hero, heroAttributes, enemy, enemyAttributes } =
    useContext(DataContext);

  const [startFighter, setStartFighter] = useState(null);
  const [countRound, setCountRound] = useState(1);
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);

  const [heroHealth, setHeroHealth] = useState(heroAttributes?.base.HP);
  const [enemyHealth, setEnemyHealth] = useState(enemyAttributes?.base.HP);

  const [heroAttack, setHeroAttack] = useState(heroAttributes.base.Attack);
  const [enemyAttack, setEnemyAttack] = useState(enemyAttributes.base.Attack);
  const [heroDefense, setHeroDefense] = useState(heroAttributes.base.Defense);
  const [enemyDefense, setEnemyDefense] = useState(
    enemyAttributes.base.Defense
  );

  console.log("HERO", heroAttributes.base.Speed);
  console.log("ENEMY", enemyAttributes.base.Speed);

  //find out who starts
  const whoStarts = () => {
    if (heroAttributes.base.Speed !== enemyAttributes.base.Speed) {
      console.log("speed is not equal");
      if (heroAttributes?.base.Speed > enemyAttributes.base.Speed) {
        console.log("Hero starts first turn");
        setStartFighter(heroAttributes.name.english);
        console.log("HERO", heroAttributes.name.english);
      } else {
        console.log("Enemy starts first turn");
        setStartFighter(enemyAttributes.name.english);
        console.log("ENEMY", enemyAttributes.name.english);
      }
    } else {
      console.log("speed is equal, coin toss!");
      function tossCoin() {
        let x = Math.floor(Math.random() * 2) === 0;
        if (x) {
          setStartFighter(heroAttributes?.name.english);
        } else {
          setStartFighter(enemyAttributes?.name.english);
        }
      }
      tossCoin();
    }
  };

  useEffect(() => {
    if (!startFighter) {
      whoStarts();
      setCountRound(0)
    }
  }, []);

  console.log("startFighter", startFighter);
  //defense check

  // ###issue### dynamic defense setting doesn't update
  const defenseCheck = () => {
    if (enemyDefense >= heroAttack) {
      let heroCurrentAttack = heroAttack / 2;
      setHeroAttack(heroCurrentAttack);
    } else {
      if (heroDefense >= enemyAttack) {
        let enemyCurrentAttack = enemyAttack / 2;
        setEnemyAttack(enemyCurrentAttack);
      }
    }

    console.log("defense check done");
  };

  useEffect(() => {
    defenseCheck();
  }, []);
  //console.log(`${startFighter} starts the first turn`);

  const fightSequence = () => {
    let currentHP = 0;
    let currentCount = 0;
    if (heroHealth > 0 && enemyHealth > 0) {
      switch (countRound) {
        case 0:
          setCountRound(1)
        break;
        case 1:
          console.log("### Start fight sequence ###");
          console.log("Round#1");
          console.log(`${startFighter} starts the turn`);
          if (startFighter !== heroAttributes.name.english) {
            currentHP = heroHealth - enemyAttack/4;
            console.log(`Hero lost ${enemyAttack} HPs`);
            setHeroHealth(currentHP);
            setStartFighter(heroAttributes.name.english);
          } else {
            currentHP = enemyHealth - heroAttack/4;
            console.log(`Enemy lost ${heroAttack} HPs`);
            setEnemyHealth(currentHP);
            setStartFighter(enemyAttributes.name.english);
          }
          currentCount = countRound + 1;
          setCountRound(currentCount);
          break;
        case 2:
          console.log("Round#2");
          console.log(`${startFighter} starts the turn`);
          if (startFighter !== heroAttributes.name.english) {
            currentHP = heroHealth - enemyAttack/4;
            console.log(`Hero lost ${enemyAttack} HPs`);
            setHeroHealth(currentHP);
            setStartFighter(heroAttributes.name.english);
          } else {
            currentHP = enemyHealth - heroAttack/4;
            console.log(`Enemy lost ${heroAttack} HPs`);
            setEnemyHealth(currentHP);
            setStartFighter(enemyAttributes.name.english);
          }
          currentCount = countRound + 1;
          setCountRound(currentCount);
          break;
        case 3:
          console.log("Round#3");
          console.log(`${startFighter} starts the turn`);
          if (startFighter !== heroAttributes.name.english) {
            currentHP = heroHealth - enemyAttack/4;
            console.log(`Hero lost ${enemyAttack} HPs`);
            setHeroHealth(currentHP);
            setStartFighter(heroAttributes.name.english);
          } else {
            currentHP = enemyHealth - heroAttack/4;
            console.log(`Enemy lost ${heroAttack} HPs`);
            setEnemyHealth(currentHP);
            setStartFighter(enemyAttributes.name.english);
          }
          currentCount = countRound + 1;
          setCountRound(currentCount);
          break;
        case 4:
          console.log("Round#4");
          console.log(`${startFighter} starts the turn`);
          if (startFighter !== heroAttributes.name.english) {
            currentHP = heroHealth - enemyAttack;
            console.log(`Hero lost ${enemyAttack} HPs`);
            setHeroHealth(currentHP);
            setStartFighter(heroAttributes.name.english);
          } else {
            currentHP = enemyHealth - heroAttack;
            console.log(`Enemy lost ${heroAttack} HPs`);
            setEnemyHealth(currentHP);
            setStartFighter(enemyAttributes.name.english);
          }
          currentCount = countRound + 1;
          setCountRound(currentCount);
          break;
        default:
          console.log("ooopsi, something went wrong");
          break;
      }
    } else {
      if (heroHealth <= 0) {
        setWinner(enemyAttributes.name.english);
        setLoser(heroAttributes.name.english);
      } else {
        setWinner(heroAttributes.name.english);
        setLoser(enemyAttributes.name.english);
      }
    }
  };

  useEffect(() => {
    if (startFighter) {
      console.log("start fighter ready");
      setTimeout(() => {
        fightSequence();
      }, 2000);
    } else {
      console.log("start fighter not ready");
    }
  }, [countRound]);

  const navigate = useNavigate();
  const { setHero, setEnemy } = useContext(DataContext);

  function handleClickLeaderboard() {
    navigate("/leaderboard");
  }

  function handleClickRestart() {
    setWinner(null);
    setHero(null);
    setEnemy(null);
    navigate("/");
  }

  // const useStyles = makeStyles({
  //   root: {
  //     color: 'red',
  //     '& p': {
  //       margin: 0,
  //       color: 'green',
  //       '& span': {
  //         color: 'blue',
  //       },
  //     },
  //   },
  // });

  // export default function NestedStylesHook() {
  //   const classes = useStyles();

  async function createFighter () {
    const data = await fetch(`http://localhost:8000/fighters/${heroAttributes.name.english}`)
      const res = await data.json()
      console.log("getFighter", res)
    if(res === null) {
      console.log("if statement createFighter")
        const databody = {
        name: heroAttributes.name.english,
        wins: 0,
        loses: 0
        };
          const newdata = await fetch(`http://localhost:8000/fighters`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(databody),
        })
        const newres = await newdata.json()
          console.log("newres", newres)
        };
    }
  
  async function updateWinner () {
    const databody = {
    wins: 0
    };
      const data = await fetch(`http://localhost:8000/fighters/winner/${winner}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(databody),
    })
    const res = await data.json()
      console.log("res", res)
    };
  
    async function updateLoser () {
      const databody = {
        loses: 0
      };
        const data = await fetch(`http://localhost:8000/fighters/loser/${loser}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(databody),
      })
      const res = await data.json()
        console.log("res", res)
      };
  
    useEffect(()=>{
      createFighter ();
      if(winner) {
        updateWinner ()
      }
      if(loser) {
        updateLoser ()
      }
      }, [winner, loser])
  

  return (
    <>
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Round {countRound +1}</h1>
        <div
          className="fightersWrapper"
          style={{
            backgroundImage: "url(../img/arenaBase.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <img className="simulator" src="../img/simulator.png"></img>
          <div className="player enemy">
            <div className="enemyStats">
              <div className="sliderEnemy">
                <Slider
                  disabled
                  defaultValue={enemyAttributes?.base.HP}
                  max={heroAttributes?.base.HP}
                  aria-label="Hp enemy slider"
                  value={enemyHealth}
                  valueLabelDisplay="auto"
                />
              </div>
              <p className="name">{enemyAttributes?.name.english}</p>
            </div>
            <div className="enemyPicture">
              <img
                src={enemy.pictureAnimBack}
                style={{ width: "10vw", height: "10vw" }}
              />
              {/* <p>Speed: {fighterTwo?.base.Speed}</p>
          <p>HP: {fighterTwo?.base.HP}</p>
          <h3>dynamic HP: {fighterTwoHealth}</h3>
          <p>Attack: {fighterTwo?.base.Attack}</p>
          <p>dynamic Attack: {opponentAttack}</p>
          <p>Defense: {fighterTwo?.base.Defense}</p> */}
            </div>
          </div>
          <div className="player hero">
            <div className="heroPicture">
              <img
                src={hero.pictureAnimFront}
                style={{ width: "10vw", height: "10vw" }}
              />
            </div>
            <div className="heroStats">
              <div className="sliderHero">
                <Slider
                  sx={{ color: "green" }}
                  disabled
                  defaultValue={heroAttributes?.base.HP}
                  max={heroAttributes?.base.HP}
                  aria-label="Hp hero slider"
                  value={heroHealth}
                  valueLabelDisplay="auto"
                  //color="red"
                />
              </div>
              <p className="name">{heroAttributes?.name.english}</p>
              {/* <p>Speed: {fighterOne?.base.Speed}</p>
          <p>HP: {fighterOne?.base.HP}</p>
          <h3>dynamic HP: {fighterOneHealth}</h3>
          <p>Attack: {fighterOne?.base.Attack}</p>
          <p>dynamic Attack: {myAttack}</p>
          <p>Defense: {fighterOne?.base.Defense}</p> */}
            </div>
          </div>
        </div>
        {winner ? (
          <div className="winner" style={{ textAlign: "center" }}>
            <h2>Winner: {winner}</h2>
          </div>
        ) : (
          <div></div>
        )}
        <div className="buttons" style={{ textAlign: "center" }}>
          <Button onClick={handleClickLeaderboard} variant="contained">
            Leaderboard
          </Button>
          <Button onClick={handleClickRestart} variant="contained">
            Start again
          </Button>
        </div>
      </div>
    </>
  );
}
