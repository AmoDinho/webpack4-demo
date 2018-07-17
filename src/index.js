import component from "./component";
import "./main.css";
import "purecss";
import {bake} from "./shake";
import "react";
import "react-dom";

bake();
document.body.appendChild(component());