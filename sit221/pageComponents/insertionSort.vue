<template>
  <div ref="containerRef" style="width: 100%; height: 100%; outline: 4px black solid;">
    <v-stage :config="{
      width: stageWidth,
      height: stageHeight,
      scaleX: scale,
      scaleY: scale
    }">
      <!--UI layer-->
      <v-layer>
        <v-group @click="insertionSort" :config="{ x: 235, y: 250 }" @mouseover="handleMouseOver($event, 'pointer')"
          @mouseout="handleMouseOut">
          <v-rect
            :config="{ x: 0, y: 0, height: 60, width: 130, fill: '#22c55e', stroke: '#84cc16', strokeWidth: 5, cornerRadius: 10 }" />
          <v-text
            :config="{ x: 0, y: 15, height: 60, width: 130, align: 'center', fontSize: 30, fill: 'white', fontStyle: 'bold', fontFamily: 'monospace', text: 'Sort!' }" />
        </v-group>
        <v-group @click="randomiseValues" :config="{ x: 320, y: 345 }" @mouseover="handleMouseOver($event, 'pointer')"
          @mouseout="handleMouseOut">
          <v-rect
            :config="{ x: 0, y: 0, height: 50, width: 100, fill: 'white', stroke: 'lightblue', strokeWidth: 5, cornerRadius: 10 }" />
          <v-text
            :config="{ x: 0, y: 9, height: 50, width: 100, align: 'center', fontSize: 15, fontStyle: 'bold', text: 'Randomise Values' }" />
        </v-group>
        <v-group :config="{ x: 475, y: 340 }">
          <v-text
            :config="{ x: -50, y: 0, width: 165, align: 'center', fontSize: 15, wrap: 'none', text: 'Number of elements' }" />
          <v-regular-polygon @click="elementCounterUpdate(-1)" @mouseover="handleMouseOver($event, 'pointer')"
            @mouseout="handleMouseOut" :config="{
              x: 0,
              y: 30,
              sides: 3,
              rotation: -90,
              radius: 15,
              fill: 'black',
              cursor: 'move'
            }" />
          <v-text :config="{
            x: 15,
            y: 15,
            width: 35,
            fontSize: 35,
            text: data.length,
            align: 'center'
          }" />
          <v-regular-polygon @click="elementCounterUpdate(1)" @mouseover="handleMouseOver($event, 'pointer')"
            @mouseout="handleMouseOut" :config="{
              x: 65,
              y: 30,
              sides: 3,
              rotation: 90,
              radius: 15,
              fill: 'black'
            }" />
        </v-group>
        <v-group :config="{ x: 10, y: 300 }">
          <v-rect :config="{ x: 0, y: 0, width: 25, height: 25, fill: 'grey' }" />
          <v-text :config="{ x: 30, y: 5, fontSize: 15, fontStyle: 'bold', text: '= Unsorted' }" />

          <v-rect :config="{ x: 0, y: 30, width: 25, height: 25, fill: 'blue' }" />
          <v-text :config="{ x: 30, y: 35, fontSize: 15, fontStyle: 'bold', text: '= Sorted Elements' }" />

          <v-rect :config="{ x: 0, y: 60, width: 25, height: 25, fill: 'limegreen' }" />
          <v-text :config="{ x: 30, y: 65, fontSize: 15, fontStyle: 'bold', text: '= Current Element' }" />
        </v-group>
        <v-text
          :config="{ x: 10, y: 5, text: 'Insertion Sort', fontStyle: 'bold', fontFamily: 'monospace', fontSize: 45, textDecoration: 'underline' }" />
        <v-text
          :config="{ x: 380, y: 15, width: 220, text: 'Note: Double click an element\'s value to change it!', fontStyle: 'bold', fontFamily: 'monospace', fontSize: 13 }" />
      </v-layer>

      <!-- Elements layer -->
      <v-layer ref="arrayLayerRef">
        <v-group ref="arrowRef" :config="{ visible: false }">
          <v-text
            :config="{ x: -15, y: -15, fontSize: 15, width: 30, text: 'Min', align: 'center', fontStyle: 'bold' }" />
          <v-arrow :config="arrowConfig" />
        </v-group>
        <v-group
          :config="{ x: (sceneWidth - (data.length * config.element.width + ((data.length - 1) * config.element.xSpacing))) / 2 }">
          <v-group v-for="(element, index) in data" :key="element.id" :config="{
            x: (config.element.width + config.element.xSpacing) * index,
            y: config.element.y,
            id: `el_${element.id}`,
            draggable: true
          }">
            <v-rect :config="{
              x: 0,
              y: 0,
              width: config.element.width,
              height: config.element.height,
              stroke: element.outline,
              strokeWidth: 4,
              cornerRadius: 10,
              fill: 'white'
            }"></v-rect>
            <v-text @dblclick="handleTextDblClick" @dbltap="handleTextDblClick"
              @mouseover="handleMouseOver($event, 'pointer')" @mouseout="handleMouseOut" :config="{
                x: 0,
                y: (config.element.height - config.element.fontSize) / 2,
                width: config.element.width,
                height: config.element.height,
                align: 'center',
                text: element.value,
                fontSize: config.element.fontSize,
                fontFamily: 'Calibri',
                fill: 'black'
              }"></v-text>
          </v-group>
        </v-group>
      </v-layer>
    </v-stage>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Stage as VStage, Layer as VLayer, Rect as VRect, Group as VGroup, Text as VText, RegularPolygon as VRegularPolygon } from 'vue-konva';
import Konva from 'konva';

// Define virtual size for our scene
const sceneWidth = 600;
const sceneHeight = 400;

// Reactive references
const containerRef = ref(null);
const scale = ref(1);

// Computed properties for stage dimensions
const stageWidth = computed(() => sceneWidth * scale.value);
const stageHeight = computed(() => sceneHeight * scale.value);

const arrowConfig = {
  x: 0,
  y: 0,
  points: [0, 0, 0, 15],
  pointerLength: 10,
  pointerWidth: 10,
  fill: 'black',
  stroke: 'black',
  strokeWidth: 10
};

const arrowRef = ref(null);

function arrowPointAt(index) {
  let group = arrowRef.value.getNode()
  let element = getElementWithIndex(index);
  let x = element.x() + (config.element.width / 2) + element.getParent().x();
  let y = element.y() - arrowConfig.pointerLength - arrowConfig.points[3] - 5;
  group.x(x);
  group.y(y);
}

function arrowShow() {
  let arrow = arrowRef.value.getNode();
  arrow.show();
}

function arrowHide() {
  let arrow = arrowRef.value.getNode();
  arrow.hide();
}


// Function to handle resize
const updateSize = () => {
  if (!containerRef.value) return;

  // Get container width
  const containerWidth = containerRef.value.offsetWidth;

  // Calculate scale
  scale.value = containerWidth / sceneWidth;
};


// Add event listeners
onMounted(() => {
  updateSize();
  window.addEventListener('resize', updateSize);
});

// Clean up
onUnmounted(() => {
  window.removeEventListener('resize', updateSize);
});

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const config = {
  element: {
    width: 70,
    height: 40,
    fontSize: 20,
    xSpacing: 10,
    y: 190
  }
}

//Create the main array to hold state. Updates here are updated automaticly on the canvas
const data = ref([]);

//Varible to store if sorting is currently happening.
let isSorting = false;

const arrayLayerRef = ref(null);

//The id helps vue keep track of the elements to where they are in the DOM as we swap them arround
let lastId = 0;
for (let i = 0; i < 6; i++) {
  data.value.push({ id: lastId++, value: randomInt(1, 20), outline: "grey" });
}

function randomiseValues() {
  if (isSorting) return;
  resetAllElementColour();
  data.value.map(function (x) {
    x.value = randomInt(1, 20);
    return x
  });
}

function elementCounterUpdate(amount) {
  if (isSorting) return;

  if (amount == -1) {
    if (data.value.length > 3) {
      resetAllElementColour();
      data.value.pop();
    }
  }

  if (amount == 1) {
    if (data.value.length < 7) {
      resetAllElementColour();
      data.value.push({ id: lastId++, value: randomInt(1, 20), outline: "grey" })
    }
  }
}

function getElementWithIndex(index) {
  return arrayLayerRef.value.getNode().findOne(`#el_${data.value[index].id}`)
}

async function swap(i1, i2) {
  let element1 = getElementWithIndex(i1);
  let element2 = getElementWithIndex(i2);
  let targetY = config.element.y - 50;

  //Move elements up
  await new Promise(resolve => {
    element1.to({
      duration: 1,
      y: targetY,
      easing: Konva.Easings.EaseInOut
    });
    element2.to({
      duration: 1,
      y: targetY,
      easing: Konva.Easings.EaseInOut,
      onFinish: resolve
    });
  });

  //Swap element positions
  let x1 = element2.x();
  let x2 = element1.x();
  await new Promise(resolve => {
    element1.to({
      duration: 1,
      x: x1,
      easing: Konva.Easings.EaseInOut
    });
    element2.to({
      duration: 1,
      x: x2,
      easing: Konva.Easings.EaseInOut,
      onFinish: resolve
    });
  });

  //Move both back down
  await new Promise(resolve => {
    element1.to({
      duration: 1,
      y: config.element.y,
      easing: Konva.Easings.EaseInOut
    });
    element2.to({
      duration: 1,
      y: config.element.y,
      easing: Konva.Easings.EaseInOut,
      onFinish: resolve
    });
  });

  //Update state with this swap
  let temp = data.value[i1];
  data.value[i1] = data.value[i2];
  data.value[i2] = temp;

}

function setElementColour(index, colour) {
  data.value[index].outline = colour;
  data.value = [...data.value]
}

function setAllElementColour(colour) {
  data.value.map(function (x) {
    x.outline = colour;
    return x
  });
}

function resetAllElementColour() {
  data.value.map(function (x) {
    x.outline = "grey";
    return x
  });
}

function getElementValue(index) {
  return data.value[index].value;
}

const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};

const STEP_DURATION = 1500;
async function stepDelay(startTime) {
  const elapsed = performance.now() - startTime;
  const remaining = STEP_DURATION - elapsed;
  if (remaining > 0) {
    await delay(remaining);
  } else {
    console.log("Step took longer than step lenght!");
  }
}

async function insertionElementSlide(lift, place) {
  let liftElement = getElementWithIndex(lift);
  let currentPlaceElement = getElementWithIndex(place);
  let finalX = currentPlaceElement.x();
  let targetY = config.element.y - 50;

  //Lift element up
  await new Promise(resolve => {
    liftElement.to({
      duration: 1,
      y: targetY,
      easing: Konva.Easings.EaseInOut,
      onFinish: resolve
    });
  });

  //Slide elements
  for (let i = lift - 1; i >= place; i--) {
    let element = getElementWithIndex(i);
    await new Promise(resolve => {
      element.to({
        duration: 1,
        x: element.x() + config.element.width + config.element.xSpacing,
        easing: Konva.Easings.EaseInOut,
        onFinish: resolve
      });
    });
  }

  //Move final element back down
  await new Promise(resolve => {
    liftElement.to({
      duration: 1,
      y: config.element.y,
      x: finalX,
      easing: Konva.Easings.EaseInOut,
      onFinish: resolve
    });
  });

  //Actually make the change to the array to reflect how it looks on screen
  let elementValue = data.value[lift];
  for (let i = lift; i > place; i--) {
    data.value[i] = data.value[i - 1];
  }
  data.value[place] = elementValue;
  data.value = [...data.value];
}

//The actual sorting algo
async function insertionSort() {
  if (isSorting) return;
  isSorting = true;
  resetAllElementColour();

  //Begin
  let len = data.value.length;
  setElementColour(0, "blue");
  for (let i = 1; i < len; i++) {
    setElementColour(i, "limegreen");
    let key = getElementValue(i);
    let j = i - 1;
    while (j >= 0 && getElementValue(j) > key) {
      j = j - 1;
    }
    await delay(500);
    await insertionElementSlide(i, j + 1);
    setElementColour(j + 1, "blue")
  }
  isSorting = false;
}

//Looks after the user input to change an elements value. Modified version of an example from the Konva docs.
const handleTextDblClick = (e) => {
  if (isSorting) return; //Don't allow changes while sorting

  resetAllElementColour();

  const textNodeKonva = e.target;
  const stage = textNodeKonva.getStage();
  const textPosition = textNodeKonva.absolutePosition();
  const stageBox = stage.container().getBoundingClientRect();

  const areaPosition = {
    x: stageBox.left + textPosition.x,
    y: stageBox.top + textPosition.y,
  };

  const textarea = document.createElement('textarea');
  document.body.appendChild(textarea);

  textarea.value = textNodeKonva.text();
  textarea.style.position = 'absolute';
  textarea.style.top = areaPosition.y + 'px';
  textarea.style.left = areaPosition.x + 'px';
  textarea.style.width = textNodeKonva.width() - textNodeKonva.padding() * 2 + 'px';
  textarea.style.height = textNodeKonva.height() - textNodeKonva.padding() * 2 + 5 + 'px';
  textarea.style.fontSize = textNodeKonva.fontSize() + 'px';
  textarea.style.border = 'none';
  textarea.style.padding = '0px';
  textarea.style.margin = '0px';
  textarea.style.overflow = 'hidden';
  textarea.style.background = 'none';
  textarea.style.outline = 'none';
  textarea.style.resize = 'none';
  textarea.style.lineHeight = textNodeKonva.lineHeight();
  textarea.style.fontFamily = textNodeKonva.fontFamily();
  textarea.style.transformOrigin = 'left top';
  textarea.style.textAlign = textNodeKonva.align();
  textarea.style.color = textNodeKonva.fill();

  const rotation = textNodeKonva.rotation();
  let transform = '';
  if (rotation) {
    transform += 'rotateZ(' + rotation + 'deg)';
  }
  textarea.style.transform = transform;

  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 3 + 'px';

  textNodeKonva.hide();
  textarea.focus();

  function removeTextarea() {
    textarea.parentNode.removeChild(textarea);
    window.removeEventListener('click', handleOutsideClick);
    textNodeKonva.show();
  }

  function saveText() {
    let text = textarea.value;
    let elementId = textNodeKonva.getParent().id().slice(3);
    let index = data.value.findIndex(x => x.id == elementId);
    let number = Number(text);
    //Ensure that the text was a number before seting it
    if (!isNaN(number)) {
      data.value[index].value = Number(text);
    } else {
      alert("Input must be number!");
    }
  }

  function setTextareaWidth(newWidth) {
    if (!newWidth) {
      newWidth = textNodeKonva.placeholder?.length * textNodeKonva.fontSize();
    }
    textarea.style.width = newWidth + 'px';
  }

  textarea.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      saveText();
      removeTextarea();
    }
    if (e.key === 'Escape') {
      removeTextarea();
    }
  });

  textarea.addEventListener('keydown', function () {
    const scale = textNodeKonva.getAbsoluteScale().x;
    setTextareaWidth(textNodeKonva.width() * scale);
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + textNodeKonva.fontSize() + 'px';
  });

  function handleOutsideClick(e) {
    if (e.target !== textarea) {
      saveText();
      removeTextarea();
    }
  }
  setTimeout(() => {
    window.addEventListener('click', handleOutsideClick);
    window.addEventListener('touchstart', handleOutsideClick);
  });
};

//Pointer hover control
const handleMouseOver = (e, cursor) => {
  e.target.getStage().container().style.cursor = cursor;
};

const handleMouseOut = (e) => {
  e.target.getStage().container().style.cursor = 'default';
};

function test() {
  insertionElementSlide(4, 1);
}


</script>