import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Views/Home";
import Level from "./Views/Level";
import { AppWrapper } from './Styled/Styled';
import { randomizeBlocks } from "./algorithms/helpers";
import { lasVegas } from './algorithms/las-vegas';
import { tremaux } from './algorithms/tremaux';
import { aStar } from './algorithms/a-star';
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();
function App() {
	let [mounted, setMounted] = useState(false)
	let [level, setLevel] = useState(0);
	let [replayRunning, setReplayRunning] = useState(false);
	let [start, setStart] = useState([0, 4]);
	let [end, setEnd] = useState([9, 4]);
	let [current, setCurrent] = useState([...start])
	let [size, setSize] = useState([10, 10]);
	let [blocks, setBlocks] = useState([]);
	let [results, setResults] = useState([]);
	let [maze, setMaze] = useState([]);
	let [algorithm, setAlgorithm] = useState(1);
	useEffect(() => {
		const path = window.location.pathname;
		const lev = parseInt(path.substring(path.lastIndexOf('/') + 1, path.length));
		if (lev) {
			setLevel(lev);
		} else {
			setLevel(0);
		}
	});
	useEffect(() => {
		const newBlocks = randomizeBlocks(level, start, end, size);
		setBlocks(newBlocks);
		setCurrent(...start)
	}, [level]);

	useEffect(() => {
		setMounted(true);
		let mazeCopy = []
		for (let i = 0; i < size[0]; i++) {
			for (let j = 0; j < size[1]; j++) {
				mazeCopy.push([i, j])
			}
		}
		let localSize, localStart, localEnd;

		if (!localStorage.getItem("size")) {
			localStorage.setItem("size", [10, 10]);
			localSize = [10, 10];
		} else {
			localSize = localStorage.getItem("size").split(",");
		}
		if (!localStorage.getItem("start")) {
			localStorage.setItem("start", [0, 4]);
			localStart = [0, 4];
		} else {
			localStart = localStorage.getItem("start").split(",");
		}
		if (!localStorage.getItem("end")) {
			localStorage.setItem("end", [9, 4]);
			localEnd = [9, 4];
		} else {
			localEnd = localStorage.getItem("end").split(",");
		}

		if (!localStorage.getItem('algorithm')) {
			localStorage.setItem("algorithm", 1)
		} else {
			const alg = localStorage.getItem('algorithm');
			setAlgorithm(parseInt(alg))
		}

		for (let i = 0; i < 2; i++) {
			localSize[i] = parseInt(localSize[i]);
			localStart[i] = parseInt(localStart[i]);
			localEnd[i] = parseInt(localEnd[i]);
		}
		setSize([...localSize]);
		setStart([...localStart]);
		setEnd([...localEnd]);
		setMaze([...mazeCopy]);
	}, []);

	useEffect(() => {
		if (mounted) {
			let mazeCopy = [...maze];
			maze.forEach((elem, index) => {
				blocks.forEach((block, i) => {
					if (elem[0] === block[0] && elem[1] === block[1]) {
						mazeCopy[index] = [[...elem], { block: true }]
					} else {
						mazeCopy[index] = [elem[0], elem[1]];
					}
					setMaze(mazeCopy)
				});
			});
		}
		setCurrent([...start])
	}, [blocks]);

	return (
		<AppWrapper>
			<Router history={history}>
				<Route path="/" render={(props) => <Header {...props} level={level} setLevel={setLevel} />} />
				<Switch>
					<Route exact path="/" render={(props) => <Home {...props} maze={maze} start={start} setStart={setStart} end={end} setEnd={setEnd} size={size} setSize={setSize} algorithm={algorithm} setAlgorithm={setAlgorithm} />} />
					<Route
						exact
						path={'/level/start/:level?'}
						render={(props) => <Level {...props} level={level} maze={maze} start={start} end={end} current={current} setCurrent={setCurrent} size={size} blocks={blocks} results={results} setResults={setResults} replayRunning={replayRunning} setReplayRunning={setReplayRunning} solve={algorithm === 1 ? lasVegas : algorithm === 2 ? tremaux : aStar} setLevel={setLevel} />}
					/>
				</Switch>
			</Router>
		</AppWrapper>
	);
}

export default App;
