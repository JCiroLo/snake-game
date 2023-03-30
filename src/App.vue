<template lang="pug">
router-view
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

* {
  padding: 0;
  margin: 0;
  font-family: 'Press Start 2P', cursive;
}

body {
  background-color: $color-background;
}

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: $color-text;
}

.grid {
  &.drugs {
    @for $i from 1 through 100 {
      .square:nth-child(#{$i}) {
        animation: drugs 100s ease-in-out infinite alternate,
          randomOpacity 2s ease-in-out infinite alternate;
        animation-delay: #{random(10) - 0s};
        transition: background-color 0.2s;
      }
    }

    .snakeSquare {
      animation: randomColor 2s ease-in-out infinite alternate !important;
    }
  }
  .square {
    aspect-ratio: 1;
  }
}

.emptySquare {
  background-color: $color-grid;
}

.snakeSquare {
  background-color: $color-snake-tail;
}

.foodSquare {
  position: relative;
  background-color: $color-food;
}

button.btn {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

@keyframes drugs {
  @for $i from 1 through 50 {
    #{($i * 2%)} {
      $random-minus: random(3) - 2;
      transform: scale((random(5) * $random-minus * 50%))
        translate(
          (random(5) * $random-minus * 2px),
          (random(5) * $random-minus * -2px)
        );
      border-radius: random(50) * 1%;
    }
  }
}

@keyframes randomColor {
  @for $i from 1 through 5 {
    #{($i * 20%)} {
      background-color: rgba(random(255), random(255), random(255));
    }
  }
}

@keyframes randomOpacity {
  @for $i from 1 through 5 {
    #{($i * 20%)} {
      opacity: (random(10) + 10) / 20;
    }
  }
}
</style>
