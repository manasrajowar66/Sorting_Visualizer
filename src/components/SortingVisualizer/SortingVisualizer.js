/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Grid, Slider, Typography,useMediaQuery } from "@material-ui/core";
import { getMergeSortAnimation } from "../SortingAlgorithms/getMergeSortAnimation";
import {getBubbleSortAnimation} from '../SortingAlgorithms/getBubbleSortAnimation';
import { makeStyles, withStyles } from "@material-ui/styles";
import { TweenMax, Power3 } from "gsap";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#282c34",
    width: "100vw",
    height: "100%",
    overflowX:'hidden'
  },
  button: {
    backgroundImage: "linear-gradient(to right, #fa709a 0%, #fee140 100%)",
    borderRadius: 50,
    margin: "0 1em 0",
    color: "#111",
    fontWeight: 500,
    letterSpacing: 1,
    [theme.breakpoints.down("xs")]:{
      marginBottom:'1em'
    }
  },
}));


const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const SortingVisualizer = () => {
  const classes = useStyles();
  const [state, setState] = useState({ array: [] });
  const [arraySize,setArraySize] = useState(10);
  const [speed, setSpeed] = useState(90);
  const [disable,setDisable] = useState({
    button:false,
    heightTransition:true
  })
  // const theme = useTheme();
  // const matchMd = useMediaQuery("(max-width:1200px)");
  const matchSm = useMediaQuery("(max-width:900px)");
  const matchXs = useMediaQuery("(max-width:600px)");
  // const matchLg = useMediaQuery("(min-width:1201px)");

 

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const array = [];

    for (let i = 0; i <= (arraySize*3); i++) {
      array.push(randomIntFromInterval(5, 500));
    }
    console.log(array);
    setState({ array: array });
  };

  // useEffect(() => {
  //   resetArray();
  // }, []);
  

  const PRIMARY_COLOR = "turquoise";
  const SECONDARY_COLOR = "red";

  const mergerSort = () => {
    setDisable({button:true,heightTransition:true});
    const animations = getMergeSortAnimation(state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneInd, barTwoInd] = animations[i];
        const barOneStyle = arrayBars[barOneInd].style;
        const barTwoStyle = arrayBars[barTwoInd].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * (100 - speed));
        // if(i % 3 === 0) {
        //       TweenMax.to([barOneStyle, barTwoStyle], {
        //         css: { backgroundColor: "red" },
        //         delay: convertToMilisec(i*50),
        //       });
        //     }else{
        //       TweenMax.to([barOneStyle, barTwoStyle],{
        //         css: { backgroundColor: "turquoise" },
        //         delay:  convertToMilisec((i+1)*50),
        //       });
        //     }
      } else {
        const [barOneInd, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneInd];
        TweenMax.to(barOneStyle, {
          css: { height: `${newHeight}px` },
          ease: Power3.easeInOut,
          delay: convertToMilisec(i * (100 - speed)),
        });
        // setTimeout(() => {
        //   const [barOneInd, newHeight] = animations[i];
        //   const barOneStyle = arrayBars[barOneInd].style;
        //   barOneStyle.height = `${newHeight}px`;
        // }, i * 10);
      }
      if(i === animations.length-1){
        setTimeout(() => {
          setDisable({button:false,heightTransition:true});
        },i*(100-speed));
      }
    }
    
  };

  const bubbleSort = ()=>{
    setDisable({button:true,heightTransition:false});
    const animations = getBubbleSortAnimation(state.array);
    for(let a=0;a<animations.length;a++){
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = a % 3 !== 2;
      if (isColorChange) {
        const [barOneInd] = animations[a];
        const barOneStyle = arrayBars[barOneInd].style;
        const barTwoStyle = arrayBars[barOneInd + 1].style;
        const color = a % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, a * (100 - speed));
      }else {
        // console.log(animations[a][0].i.ind,animations[a][0].j.ind);
        if(animations[a][0].swaped){
          const barOneStyle = arrayBars[animations[a][0].i.ind].style;
          const barTwoStyle = arrayBars[animations[a][0].j.ind].style;
          setTimeout(() => {
           barOneStyle.height = `${animations[a][0].i.val}px`;
           barTwoStyle.height = `${animations[a][0].j.val}px`;
          }, a * (100-speed));
        }
      }
      if(a === animations.length-1){
        setTimeout(() => {
          setDisable({button:false,heightTransition:true});
        },a*(100-speed));
      }
    }
  };

  return (
    <>
      <Grid
        container
        className={classes.container}
        direction="column"
        justify="center"
      >
        <Grid item container justify={matchSm?undefined:"center"} alignItems={matchSm?"center" : undefined} style={{margin:'2em 0 3em 0'}} direction={matchSm?"column":"row"} >
          <Grid item style={{marginRight:matchSm?0:'3em'}}>
            <Typography variant="body1" style={{ color: PRIMARY_COLOR }}>
              Animation Speed
            </Typography>
            <PrettoSlider
              value={speed}
              style={{ width: "15em" }}
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              onChange={(e, newValue) => {
                setSpeed(newValue);
                // console.log(speed);
              }}
            />
          </Grid>
          <Grid item>
            <Typography variant="body1" style={{ color: PRIMARY_COLOR }}>
              Array Size
            </Typography>
            <PrettoSlider
              value={arraySize}
              style={{ width: "15em" }}
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              onChange={(e, newValue) => {
                setArraySize(newValue);
                resetArray();
                // console.log(speed);
              }}
            />
          </Grid>
        </Grid>
        <Grid item container justify="center" alignItems="flex-end">
          {state.array &&
            state.array.map((val, ind) => {
              return (
                <Grid
                  item
                  key={ind}
                  style={{
                    backgroundColor: PRIMARY_COLOR,
                    height: `${val}px`,
                    width: arraySize >= 0 && arraySize <=40?"8px":arraySize >= 41 && arraySize <=70?"4.5px":"2.7px",
                    margin: "0 1px",
                    transition: disable.heightTransition ? "height 0.1s ease":undefined,
                  }}
                  className="array-bar"
                ></Grid>
              );
            })}
        </Grid>
        <Grid item container justify={matchXs?undefined:"center"} alignItems={matchXs?"center" : undefined} style={{margin:'2em 0 3em 0'}} direction={matchXs?"column":"row"}>
        {!disable.button 
        ? <> 
        <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              onClick={resetArray}
              disabled={disable.button}
            >
              Reset the Array
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              onClick={mergerSort}
              disabled={disable.button}
            >
              Merge Sort
            </Button>
          </Grid>
          <Grid item>
            <Button
              disabled={disable.button}
              className={classes.button}
              variant="contained"
              onClick={bubbleSort}
            >
              Bubble Sort
            </Button>
          </Grid>
           </>
         :
        ( 
          <Grid item>
            <Button
              disabled={!disable.button}
              className={classes.button}
              variant="contained"
              onClick={()=>{window.location.reload();}}
            >
              Stop
            </Button>
          </Grid>)
         }
         
          
        </Grid>
      </Grid>
    </>
  );
};;;

const convertToMilisec = (sec) => {
  return sec / 1000;
};

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default SortingVisualizer;
