import Graph from "react-graph-vis";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useRef } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './App.css'
import data from './response1.json'

const options = {
  layout: {
    improvedLayout: true,
    clusterThreshold:250
  },
  edges: {
    color: "#000000",
    arrows:{
      to:{enabled:false}
    },
  },
  physics:{
    enabled:false
  },
  interaction:{
    hover:true
  },
  manipulation: {
    enabled: true
  },
  nodes:{
    borderWidth: 1,
    borderWidthSelected: 2,
    brokenImage:undefined,
    chosen: true,
    color: {
      border: '#2B7CE9',
      background: 'red',
      highlight: {
        border: '#2B7CE9',
        background: '#D2E5FF'
      },
      hover: {
        border: '#2B7CE9',
        background: '#D2E5FF'
      }
    }
  }
};

function randomColor() {
  const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  return `#${red}${green}${blue}`;
}

function htmlTitle(html) {
  const container = document.createElement("div");
  container.innerHTML = html;
  return container;
}


const App = () => {
  let nodeData=[]
  let edgeData=[]
  console.log("🚀 ~ data", data)
  data.forEach(element => {
    // console.log(element._fields)
    element?._fields.forEach(innerElement =>{
      var i = nodeData.findIndex(x => x.id === innerElement?.elementId);
      if(i <= -1){
        if(innerElement?.startNodeElementId && innerElement?.endNodeElementId){
          edgeData.push({from:innerElement?.startNodeElementId  , to:innerElement?.endNodeElementId})
        }
        else{
          nodeData.push({id:innerElement?.elementId , label:innerElement?.properties?.name , title: htmlTitle(
            // `<div class="tooltip">Go wild</div>`
            "popover"
          ),})
        }
      }
    })
  });
  console.log("🚀 ~ nodeData", nodeData)
  console.log("🚀 ~ edgeData", edgeData)
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createNode = (x, y) => {
    const color = randomColor();
    setState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      const from = Math.floor(Math.random() * (counter - 1)) + 1;
      return {
        graph: {
          nodes: [
            ...nodes,
            { id, label: `Node ${id}`, color, x, y }
          ],
          edges: [
            ...edges,
            { from, to: id }
          ]
        },
        counter: id,
        ...rest
      }
    });
  }

  const deleteNode = () => {
    const color = randomColor();
    setState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      const from = Math.floor(Math.random() * (counter - 1)) + 1;

      return {
        graph: {
          nodes: nodes.filter((el,ind)=>ind!==1),
          edges: [
            ...edges,
            { from, to: id }
          ]
        },
        counter: id,
        ...rest
      }
    });
  }

  const [state, setState] = useState({
    counter: 5,
    graph: {
      nodes: [...nodeData],
      edges: [...edgeData]
      // nodes: [
      //   {id:1,label:"Centaari"},
      //   {id:2,label:"arsr"},
      //   {id:3,label:"Afham"},
      //   {id:4,label:"Harish"},
      //   {id:5,label:"Charan"},
      //   {id:6,label:"rohan"},
      // ],
      // edges: [
      //   { from: 1, to: 6 , label:"conn" },
      //   { from: 1, to: 3 },
      //   { from: 4, to: 5 },
      //   { from: 1, to: 4 },
      //   { from: 3, to: 4 },
      //   { from: 2, to: 5 },
      // ]
    },
    events: {
      // select: (values) => {
      //   console.log("values in Selected");
      //   console.log(values);

      //   // alert("Selected node: " + nodes);
      //   setShow(true)
      // },
      selectNode:(values)=>{
        console.log(values,"select node")
        setShow(true)
      },
      selectEdge:(values)=>{
        console.log(values,"select edge")
        // setShow(true)
      },
      doubleClick: (values) => {
        console.log(values,"select node")
      },
      hoverNode : (values)=>{
        console.log(values,"hover node")

      },
      hoverEdge : (values)=>{
        console.log(values,"hover edge")

      }
    }
  })
  const { graph, events } = state;

  const renderCounter  = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  console.log("🚀 ~ renderCounter", renderCounter)


  return (
    <div className="App">
      <h1>React graph vis {renderCounter.current}</h1>
      <button onClick={()=>createNode(1,2)} >Add</button>
      <button onClick={()=>deleteNode()} >Delete</button>
      <Graph graph={graph} options={options} events={events} style={{ height: "640px" , border:"2px solid red" }}
      getNetwork={network => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
        console.log(network)
      }}
       />



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );

}

export default App